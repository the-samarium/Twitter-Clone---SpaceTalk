import os

import databases
import sqlalchemy
from dotenv import load_dotenv
from fastapi import FastAPI

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

database = databases.Database(DATABASE_URL)

app = FastAPI()


# Connect on startup, disconnect on shutdown
@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


# Async route
@app.get("/customers")
async def get_users():
    query = "SELECT * FROM Customer"
    rows = await database.fetch_all(query)  # non-blocking fetch
    return rows


# query = "INSERT INTO Customer(FirstName, LastName) VALUES (:fname, :lname)"
# await database.execute(query, values={"fname": "Sameer", "lname": "Chavan"})
