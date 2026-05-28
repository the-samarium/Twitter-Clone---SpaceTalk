from typing import Optional
from pydantic import BaseModel

class Basepost(BaseModel):
    body: str

# child class
class Usrpost(Basepost):
    id: int
    # --- Code Added by Antigravity ---
    # Optional field that exposes SQLite creation timestamp to API responses
    created_at: Optional[str] = None
    # ---------------------------------

# Adding a comment feature : user will send a post id, his comment and server will return comment, post id and a new comment id
# creating a class 
class BaseComment(BaseModel):
    body:str
    post_id:int
    
class UsrComment(BaseComment):
    cid:int
    # --- Code Added by Antigravity ---
    # Optional field that exposes SQLite creation timestamp to API responses
    created_at: Optional[str] = None
    # ---------------------------------