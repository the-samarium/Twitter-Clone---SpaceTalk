import os

import databases
import sqlalchemy

DATABASE_URL = "sqlite+aiosqlite:///posts.db"

# databases.Database instance to handle asynchronous connections
database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()

# 'posts' table schema defined using SQLAlchemy Table syntax
posts = sqlalchemy.Table(
    "posts",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True, autoincrement=True),
    sqlalchemy.Column("body", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("created_at", sqlalchemy.String, server_default=sqlalchemy.sql.func.now()),
)

# 'comments' table schema defined using SQLAlchemy Table syntax
comments = sqlalchemy.Table(
    "comments",
    metadata,
    sqlalchemy.Column("cid", sqlalchemy.Integer, primary_key=True, autoincrement=True),
    sqlalchemy.Column("post_id", sqlalchemy.Integer, nullable=False),
    sqlalchemy.Column("body", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("created_at", sqlalchemy.String, server_default=sqlalchemy.sql.func.now()),
)


# init_db function dynamically creates tables synchronously on startup using standard sqlite engine
def init_db():
    sync_url = DATABASE_URL.replace("sqlite+aiosqlite", "sqlite")
    engine = sqlalchemy.create_engine(sync_url)
    metadata.create_all(engine)


# ---------------------------------
