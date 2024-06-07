from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from config import get_settings
from db import database
from routes.auth.auth import auth
from routes.note.note import note
from routes.period.period import period
from routes.subject.subject import subject
from routes.topic.topic import topic
from routes.user.user import user

settings = get_settings()


app = FastAPI()

from db.models.note import Note
from db.models.topic import Topic
from db.models.period import Period
from db.models.subject import Subject

database.Base.metadata.create_all(bind=database.engine)

origins = ['http://localhost:3000', 'http://127.0.0.1:3000',
           'https://localhost:3000', 'https://127.0.0.1:3000',
            'http://localhost:3001', 'http://127.0.0.1:3001',
           'http://127.0.0.1:9000', f"http://{settings.frontend_domain}",
            f"https://{settings.frontend_domain}",
           "http://172.28.32.1:3000",
        ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth)
app.include_router(user)
app.include_router(note)
app.include_router(topic)
app.include_router(period)
app.include_router(subject)
