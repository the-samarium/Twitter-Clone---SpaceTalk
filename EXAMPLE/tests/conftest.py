"""
A file to share fixtures across tests
"""
from typing import AsyncGenerator, Generator
import pytest
from fastapi.testclient import TestClient
from httpx import AsyncClient, ASGITransport       
from main import app

# --- Code Added/Changed by Antigravity ---
# We replace the in-memory dict imports with sqlite3 and init_db for database-based testing
import sqlite3
from database.db_config import init_db
# -----------------------------------------

@pytest.fixture
def client() -> Generator:
    # --- Code Added/Changed by Antigravity ---
    # Use context manager to trigger FastAPI startup and shutdown event handlers
    with TestClient(app) as c:
        yield c
    # -----------------------------------------

@pytest.fixture(autouse=True)                      
def db() -> Generator:
    # --- Code Added/Changed by Antigravity ---
    # Ensure database and tables are created before running tests
    init_db()
    # Before test: Connect to SQLite and truncate posts and comments tables
    try:
        conn = sqlite3.connect("posts.db")
        cursor = conn.cursor()
        # Truncate tables to ensure a fresh environment for each test
        cursor.execute("DELETE FROM comments;")
        cursor.execute("DELETE FROM posts;")
        conn.commit()
        conn.close()
    except sqlite3.OperationalError:
        # In case tables aren't created yet, we skip quietly
        pass
    # -----------------------------------------
    yield
    # --- Code Added/Changed by Antigravity ---
    # After test: Connect to SQLite and truncate posts and comments tables again
    try:
        conn = sqlite3.connect("posts.db")
        cursor = conn.cursor()
        cursor.execute("DELETE FROM comments;")
        cursor.execute("DELETE FROM posts;")
        conn.commit()
        conn.close()
    except sqlite3.OperationalError:
        pass
    # -----------------------------------------

@pytest.fixture                                    
async def async_client(client) -> AsyncGenerator:
    async with AsyncClient(
        transport=ASGITransport(app=app),          
        base_url=client.base_url                   
    ) as ac:                                       
        yield ac