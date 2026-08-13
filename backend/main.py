from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db

app = FastAPI(title="Food Freshness Monitoring Platform")

# Allow the React frontend (running on a different port) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default dev port
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Food Freshness Monitoring Platform API is running"}

@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    # Actually test the database connection, not just the API
    db.execute(text("SELECT 1"))
    return {"status": "ok", "database": "connected"}