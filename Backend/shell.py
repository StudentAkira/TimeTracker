from typing import cast

from sqlalchemy import and_, or_

from db.database import *
from db.models.period import Period
from db.models.topic import Topic
from db.models.user import User
from db.models.token import Token
from db.models.note import Note
from db.models.subject import Subject

db = SessionLocal()

user_db = db.query(User).first()
subject_title = "zxcvbnm"
title = ""
subject_db = db.query(Subject).filter(Subject.title == subject_title).first()
offset = 0
limit = 49

topics_db = db.query(Topic).filter(
    and_(
        Topic.title.ilike(f"{title}%"),
        or_(
            Topic.subject == None,
            Topic.subject_id != subject_db.id
        ),
        Topic.owner_id == user_db.id
    )
).offset(offset).limit(limit).all()
topics_not_related = [topic_db.title for topic_db in topics_db]



topics_related_db = db.query(Topic).filter(
    and_(
        Topic.title.ilike(f"{title}%"),
        Topic.subject_id == subject_db.id
    )
).offset(offset).limit(limit).all()
topics_related = [topic_db.title for topic_db in topics_related_db]



topics_empty_db = db.query(Topic).filter(
    and_(
        Topic.title.ilike(f"{title}%"),
    )
).offset(offset).limit(limit).all()
topics_empty = [topic_db.title for topic_db in topics_empty_db]
