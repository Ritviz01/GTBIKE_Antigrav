from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Enable CORS so Next.js (port 3000) can talk to FastAPI (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace "*" with "http://localhost:3000"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from typing import List, Optional
import sqlite3
import os
from fastapi import HTTPException

# 1. Pydantic Model (This automatically validates incoming data and generates docs)
class Bike(BaseModel):
    id: Optional[int] = None
    name: str
    price: str
    image: str
    category: str

DB_PATH = os.path.join(os.path.dirname(__file__), "bikes.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS bikes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price TEXT NOT NULL,
            image TEXT NOT NULL,
            category TEXT NOT NULL
        )
    """)
    conn.commit()
    
    # Check if table is empty, if so seed it
    cursor.execute("SELECT COUNT(*) FROM bikes")
    count = cursor.fetchone()[0]
    if count == 0:
        initial_bikes = [
            ("CONTINENTAL GT 650", "$6,199", "/modern_motorcycle.png", "Modern"),
            ("INTERCEPTOR 650", "$6,149", "/modern_motorcycle.png", "Modern"),
            ("CLASSIC 350", "$4,699", "/vintage_motorcycle.png", "Vintage Heritage"),
            ("BULLET 350", "$4,499", "/vintage_motorcycle.png", "Vintage Heritage")
        ]
        cursor.executemany(
            "INSERT INTO bikes (name, price, image, category) VALUES (?, ?, ?, ?)",
            initial_bikes
        )
        conn.commit()
    conn.close()

@app.on_event("startup")
def startup_event():
    init_db()

@app.get("/api/hello")
def read_root():
    return {"message": "Hello from GT Bikes FastAPI Backend!"}

# Get all bikes
@app.get("/api/bikes", response_model=List[Bike])
def get_bikes():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, price, image, category FROM bikes")
    rows = cursor.fetchall()
    bikes = [dict(row) for row in rows]
    conn.close()
    return bikes

# 2. Path Parameters (e.g., /api/bikes/1)
@app.get("/api/bikes/{bike_id}", response_model=Bike)
def get_bike(bike_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, price, image, category FROM bikes WHERE id = ?", (bike_id,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return dict(row)
    raise HTTPException(status_code=404, detail="Bike not found")

# 3. Handling POST Requests & Body Data
@app.post("/api/bikes")
def create_bike(bike: Bike):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO bikes (name, price, image, category) VALUES (?, ?, ?, ?)",
        (bike.name, bike.price, bike.image, bike.category)
    )
    conn.commit()
    new_id = cursor.lastrowid
    cursor.execute("SELECT id, name, price, image, category FROM bikes WHERE id = ?", (new_id,))
    row = cursor.fetchone()
    new_bike = dict(row)
    conn.close()
    return {"message": f"Successfully added {bike.name}!", "data": new_bike}
