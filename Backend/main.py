from fastapi import FastAPI

from config import get_settings
from db import database
from routes.auth.auth import auth
from routes.note.note import note
from routes.user.user import user

settings = get_settings()


app = FastAPI()

from db.models.note import Note
database.Base.metadata.create_all(bind=database.engine)


@app.get("/")
async def main():
    return {"hello": "world"}


app.include_router(auth)
app.include_router(user)
app.include_router(note)
