# import hashlib
# import bcrypt
# from argon2 import PasswordHasher

# ph = PasswordHasher()

# def run(payload):
#     text = payload.get("text")
#     if not text:
#         raise ValueError("text is required")

#     sha256 = hashlib.sha256(text.encode()).hexdigest()
#     sha512 = hashlib.sha512(text.encode()).hexdigest()
#     bcrypt_hash = bcrypt.hashpw(text.encode(), bcrypt.gensalt()).decode()
#     blake2 = "blake2b$" + hashlib.blake2b(text.encode()).hexdigest()
#     argon_hash = ph.hash(text)

#     return {
#         "sha256": sha256,
#         "sha512": sha512,
#         "bcrypt": bcrypt_hash,
#         "blake2": blake2,
#         "argon2": argon_hash
#     }
import hashlib
import bcrypt
from argon2 import PasswordHasher

ph = PasswordHasher()

def run(payload):
    text = payload.get("text")

    if not text:
        raise ValueError("text is required")

    text = text.strip()

    sha256 = hashlib.sha256(text.encode()).hexdigest()
    sha512 = hashlib.sha512(text.encode()).hexdigest()

    blake2 = "blake2b$" + hashlib.blake2b(
        text.encode(),
        digest_size=32   # 🔥 MUST MATCH CRACKER
    ).hexdigest()

    bcrypt_hash = bcrypt.hashpw(
        text.encode(),
        bcrypt.gensalt()
    ).decode()

    argon_hash = ph.hash(text)

    return {
        "sha256": sha256,
        "sha512": sha512,
        "blake2": blake2,
        "bcrypt": bcrypt_hash,
        "argon2": argon_hash
    }