from fastapi import FastAPI, HTTPException, Body, Depends
from datetime import datetime
from otp_service import *
from email_sender import send_otp_email
from auth_db import get_db
from jwt_utils import create_token
from auth_dependencies import get_current_user
from dotenv import load_dotenv
load_dotenv()


app = FastAPI(title="Auth Service")

@app.post("/send-otp")
def send_otp(email: str):
    otp = generate_otp()
    hashed = hash_otp(otp)
    expiry = otp_expiry()

    db = get_db()
    cur = db.cursor()
    
    cur.execute("SELECT current_database(), current_schema()")
    print("DB INFO:", cur.fetchone())


    cur.execute(
         "DELETE FROM public.otp_sessions WHERE email=%s",
    (email,)
    )

    cur.execute(
        "INSERT INTO public.otp_sessions (email, otp_hash, expires_at) VALUES (%s,%s,%s)",
    (email, hashed, expiry)
    )

    db.commit()

    send_otp_email(email, otp)
    return {"message": "OTP sent successfully"}


@app.post("/verify-otp")
def verify_otp_endpoint(
    email: str = Body(...),
    otp: str = Body(...)
):
    db = get_db()
    cur = db.cursor()

    # 1. Fetch OTP record
    cur.execute(
        "SELECT otp_hash, expires_at FROM public.otp_sessions WHERE email=%s",
        (email,)
    )
    record = cur.fetchone()

    if not record:
        raise HTTPException(status_code=400, detail="OTP not found or already used")

    otp_hash, expires_at = record

    # 2. Check expiry
    if datetime.utcnow() > expires_at:
        cur.execute(
            "DELETE FROM public.otp_sessions WHERE email=%s",
            (email,)
        )
        db.commit()
        raise HTTPException(status_code=400, detail="OTP expired")

    # 3. Verify OTP
    if not verify_otp(otp, otp_hash):
        raise HTTPException(status_code=400, detail="Invalid OTP")

    # 4. OTP is valid → delete it (single use)
    cur.execute(
        "DELETE FROM public.otp_sessions WHERE email=%s",
        (email,)
    )

    # 5. Create user if not exists
    cur.execute(
        "SELECT id FROM users WHERE email=%s",
        (email,)
    )
    user = cur.fetchone()

    if not user:
        cur.execute(
            "INSERT INTO users (email) VALUES (%s)",
            (email,)
        )

    db.commit()
    cur.close()
    db.close()

    # 6. Issue JWT
    token = create_token(email)

    return {
        "access_token": token,
        "token_type": "bearer"
    }



# FIREWALL Protection Layer....
@app.get("/protected-test")
def protected_test(current_user: str = Depends(get_current_user)):
    return {
        "message": "Access granted",
        "user": current_user
    }
