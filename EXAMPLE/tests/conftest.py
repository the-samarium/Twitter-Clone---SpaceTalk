"""
A file to share fixtures across tests
"""
from typing import AsyncGenerator, Generator
import pytest
from fastapi.testclient import TestClient
from httpx import AsyncClient, ASGITransport       
from main import app

import sqlite3
from database.db_config import init_db

@pytest.fixture
def client() -> Generator:
    with TestClient(app) as c:
        yield c

@pytest.fixture(autouse=True)                      
def db() -> Generator:
    init_db()
    try:
        conn = sqlite3.connect("posts.db")
        cursor = conn.cursor()
        cursor.execute("DELETE FROM comments;")
        cursor.execute("DELETE FROM posts;")
        conn.commit()
        conn.close()
    except sqlite3.OperationalError:
        pass
    yield
    try:
        conn = sqlite3.connect("posts.db")
        cursor = conn.cursor()
        cursor.execute("DELETE FROM comments;")
        cursor.execute("DELETE FROM posts;")
        conn.commit()
        conn.close()
    except sqlite3.OperationalError:
        pass

@pytest.fixture                                    
async def async_client(client) -> AsyncGenerator:
    async with AsyncClient(
        transport=ASGITransport(app=app),          
        base_url=client.base_url                   
    ) as ac:                                       
        yield ac