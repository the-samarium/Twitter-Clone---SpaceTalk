from typing import List
from fastapi import APIRouter
from models.model import BaseComment, Basepost, UsrComment, Usrpost

# --- Code Added/Changed by Antigravity ---
# Import the async database instance (we only need the database connection, not the table objects)
from database.db_config import database
# -----------------------------------------

router = APIRouter()
# --- Code Added/Changed by Antigravity ---
# Note: post_db and comment_db in-memory dictionaries are deprecated and removed
# to transition completely to the async SQLite database.
# -----------------------------------------

@router.get("/")
async def read_root():
    return {"message": "Hello World"}


@router.post("/post", response_model=Usrpost, status_code=201)
async def make_post(post: Basepost):
    # --- Code Added/Changed by Antigravity ---
    # Asynchronously insert post into SQLite posts table. The created_at column is auto-populated.
    query = "INSERT INTO posts (body) VALUES (:body)"
    last_id = await database.execute(query, values={"body": post.body})
    # Fetch the newly generated row to return full values including generated created_at timestamp
    new_post = await database.fetch_one("SELECT id, body, created_at FROM posts WHERE id = :id", values={"id": last_id})
    return new_post
    # -----------------------------------------


@router.get("/posts", response_model=List[Usrpost])
async def get_posts():
    # --- Code Added/Changed by Antigravity ---
    # Asynchronously fetch all posts from database including the created_at timestamp
    query = "SELECT id, body, created_at FROM posts"
    return await database.fetch_all(query)
    # -----------------------------------------


@router.post("/comment", response_model=UsrComment, status_code=201)
async def make_comment(comment: BaseComment):
    # --- Code Added/Changed by Antigravity ---
    # Asynchronously insert comment into comments table
    query = "INSERT INTO comments (post_id, body) VALUES (:post_id, :body)"
    comment_id = await database.execute(query, values={"post_id": comment.post_id, "body": comment.body})
    # Fetch the newly generated comment row to return populated database values and timestamp
    new_comment = await database.fetch_one("SELECT cid, post_id, body, created_at FROM comments WHERE cid = :cid", values={"cid": comment_id})
    return new_comment
    # -----------------------------------------


@router.get("/comments", response_model=List[UsrComment])
async def get_comments(post_id: int):
    # --- Code Added/Changed by Antigravity ---
    # Asynchronously fetch comments matching the post_id including the created_at timestamp
    query = "SELECT cid, post_id, body, created_at FROM comments WHERE post_id = :post_id"
    return await database.fetch_all(query, values={"post_id": post_id})
    # -----------------------------------------

