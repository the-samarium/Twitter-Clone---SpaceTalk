from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from database.db_config import database, init_db
from router.post import router
# -----------------------------------------

app = FastAPI()


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
    init_db()
    await database.connect()

# Cleanly disconnect from the database on application shutdown
@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()
# -----------------------------------------

app.include_router(router=router)

# This is a much cleaner way to write API endpoints in their dedicated file and then include their router in main file
