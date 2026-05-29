import logging
import time

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from database.db_config import database, init_db
from logging_config import setup_logging
from router.post import router

# -----------------------------------------

setup_logging()
app = FastAPI()


logger = logging.getLogger(__name__)


# --- Request logging middleware ---
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.time()
    response = await call_next(request)
    duration = (time.time() - start) * 1000
    logger.info(
        f"{request.method} {request.url.path} → {response.status_code} ({duration:.1f}ms)"
    )
    return response


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Connect to the database on application startup and initialize tables if needed
@app.on_event("startup")
async def startup():
    try:
        logger.info("App starting up — connecting to DB")
        init_db()
        await database.connect()
        logger.info("DB connected successfully")

    except Exception as e:
        logger.error(f"Startup failed: {e}")
        raise


# Cleanly disconnect from the database on application shutdown
@app.on_event("shutdown")
async def shutdown():
    try:
        await database.disconnect()
        logger.info("DB disconnected successfully")

    except Exception as e:
        logger.error(f"Shutdown failed: {e}")


# -----------------------------------------

app.include_router(router=router)
