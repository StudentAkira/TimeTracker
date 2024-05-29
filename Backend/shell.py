from typing import cast
from db.database import *
from db.models.period import Period
from db.models.topic import Topic
from db.models.user import User
from db.models.token import Token
from db.models.note import Note
from db.models.subject import Subject

db = SessionLocal()

