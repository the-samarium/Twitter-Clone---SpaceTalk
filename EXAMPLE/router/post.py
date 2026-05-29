import logging
from typing import List

from fastapi import APIRouter

from database.db_config import database
from models.model import BaseComment, Basepost, UsrComment, Usrpost

router = APIRouter()

logger = logging.getLogger(__name__)


@router.get("/")
async def read_root():
    try:
        pass
    except:
        pass
    return {"message": "Hello World"}


@router.post("/post", response_model=Usrpost, status_code=201)
async def make_post(post: Basepost):
    try:
        # Asynchronously insert post into SQLite posts table. The created_at column is auto-populated.
        query = "INSERT INTO posts (body) VALUES (:body)"
        last_id = await database.execute(query, values={"body": post.body})
        # Fetch the newly generated row to return full values including generated created_at timestamp
        new_post = await database.fetch_one(
            "SELECT id, body, created_at FROM posts WHERE id = :id",
            values={"id": last_id},
        )
        logger.info(f"Post created with id = {last_id}")
        return new_post
    except Exception as e:
        logger.error(f"POST FAILED - {e}")


@router.get("/posts", response_model=List[Usrpost])
async def get_posts():
    try:
        query = "SELECT id, body, created_at FROM posts"
        posts = await database.fetch_all(query)
        logger.info(f"Fetched {len(posts)} posts")
        return posts
    except Exception as e:
        logger.error(f"POST FETCH FAILED - {e}")


@router.post("/comment", response_model=UsrComment, status_code=201)
async def make_comment(comment: BaseComment):
    try:
        # Asynchronously insert comment into comments table
        query = "INSERT INTO comments (post_id, body) VALUES (:post_id, :body)"
        comment_id = await database.execute(
            query, values={"post_id": comment.post_id, "body": comment.body}
        )
        new_comment = await database.fetch_one(
            "SELECT cid, post_id, body, created_at FROM comments WHERE cid = :cid",
            values={"cid": comment_id},
        )
        logger.info(f"Comment created with id={comment_id} on post_id={comment.post_id}")
        return new_comment
    except Exception as e:
        logger.error(f"COMMENT ACTION FAILED - {e}")


@router.get("/comments", response_model=List[UsrComment])
async def get_comments(post_id: int):
    try:
        query = "SELECT cid, post_id, body, created_at FROM comments WHERE post_id = :post_id"
        comments = await database.fetch_all(query, values={"post_id": post_id})
        logger.info(f"Fetched {len(comments)} comments for post_id={post_id}")
        return comments
    except Exception as e:
        logger.error(f"COMMENT FETCH FAILED - {e}")
