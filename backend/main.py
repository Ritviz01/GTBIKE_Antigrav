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

# 1. Pydantic Model (This automatically validates incoming data and generates docs)
class Bike(BaseModel):
    id: Optional[int] = None
    name: str
    price: str
    image: str
    category: str

# Mock database
DB_BIKES = [
    { "id": 1, "name": "CONTINENTAL GT 650", "price": "$6,199", "image": "/modern_motorcycle.png", "category": "Modern" },
    { "id": 2, "name": "INTERCEPTOR 650", "price": "$6,149", "image": "/modern_motorcycle.png", "category": "Modern" },
    { "id": 3, "name": "CLASSIC 350", "price": "$4,699", "image": "/vintage_motorcycle.png", "category": "Vintage Heritage" },
    { "id": 4, "name": "BULLET 350", "price": "$4,499", "image": "/vintage_motorcycle.png", "category": "Vintage Heritage" },
]

@app.get("/api/hello")
def read_root():
    return {"message": "Hello from GT Bikes FastAPI Backend!"}

# Get all bikes
@app.get("/api/bikes", response_model=List[Bike])
def get_bikes():
    return DB_BIKES

# 2. Path Parameters (e.g., /api/bikes/1)
@app.get("/api/bikes/{bike_id}", response_model=Bike)
def get_bike(bike_id: int):
    # Notice `bike_id` is typed as an `int`. FastAPI will automatically throw an error if a user passes a string like /api/bikes/apple!
    for bike in DB_BIKES:
        if bike["id"] == bike_id:
            return bike
    return {"error": "Bike not found"}

# 3. Handling POST Requests & Body Data
@app.post("/api/bikes")
def create_bike(bike: Bike):
    # FastAPI automatically parses the JSON body into the `Bike` object.
    new_bike = bike.dict()
    new_bike["id"] = len(DB_BIKES) + 1
    DB_BIKES.append(new_bike)
    return {"message": f"Successfully added {bike.name}!", "data": new_bike}
