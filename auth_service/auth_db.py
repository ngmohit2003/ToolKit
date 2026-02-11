# import psycopg2
# import os
# from dotenv import load_dotenv

# load_dotenv(override=True)  # 👈 IMPORTANT

# def get_db():
#     conn = psycopg2.connect(
#         dbname=os.getenv("DB_NAME"),
#         user=os.getenv("DB_USER"),
#         password=os.getenv("DB_PASSWORD"),
#         host=os.getenv("DB_HOST"),
#         port=5432,
#         options="-c search_path=public"
#     )
#     return conn



import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

def get_db():
    """
    Returns a new database connection.
    Caller is responsible for closing it.
    """
    try:
        conn = psycopg2.connect(
            DATABASE_URL,
            sslmode="require"   # REQUIRED for Supabase
        )
        return conn
    except Exception as e:
        print("Failed to connect to database:", e)
        raise