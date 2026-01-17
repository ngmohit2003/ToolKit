import psycopg2
import os
from dotenv import load_dotenv

load_dotenv(override=True)  # 👈 IMPORTANT

def get_db():
    conn = psycopg2.connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=5432,
        options="-c search_path=public"
    )
    return conn
