from typing import cast

from sqlalchemy.orm import Session

from db.models.subject import Subject
from db.models.user import User
from db.schemas.subject.subject import SubjectSchema


def create_subject_db(db: Session, user_db: User, subject_data: SubjectSchema):
    subject_db = Subject(
        title=subject_data.title,
        description=subject_data.description
    )
    subject_db.owner_id = user_db.id
    db.add(subject_db)
    db.commit()


def read_subjects_by_owner_db(db:Session, user_db: User, offset: int, limit: int):
    subjects_db = db.query(Subject).\
        filter(cast("ColumnElement[bool]", Subject.owner_id == user_db.id)).offset(offset).limit(limit).all()
    return subjects_db


def get_subject_by_title_db(db: Session, title: str) -> Subject | None:
    subject_db = db.query(Subject).filter(cast("ColumnElement[bool]", Subject.title == title)).first()
    return subject_db
