from fastapi import FastAPI

from config import get_settings
from db import database
from routes.auth.auth import auth
from routes.note.note import note
from routes.period.period import period
from routes.topic.topic import topic
from routes.user.user import user

settings = get_settings()


app = FastAPI()

from db.models.note import Note
from db.models.topic import Topic
from db.models.period import Period

database.Base.metadata.create_all(bind=database.engine)


app.include_router(auth)
app.include_router(user)
app.include_router(note)
app.include_router(topic)
app.include_router(period)
