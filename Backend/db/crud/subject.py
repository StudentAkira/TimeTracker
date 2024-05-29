from typing import cast

from sqlalchemy.orm import Session

from db.models.subject import Subject
from db.models.user import User
from db.schemas.subject.subject import SubjectSchema
from db.schemas.subject.subject_update import SubjectUpdateSchema


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


def update_subject_db(db: Session, subject_db: Subject, subject_data: SubjectUpdateSchema):
    subject_db.title = subject_data.new_title if subject_data.new_title else subject_db.title
    subject_db.description = subject_data.new_description if subject_data.new_description else subject_db.description
    db.add(subject_db)
    db.commit()


def get_subject_by_title_db(db: Session, title: str) -> Subject | None:
    subject_db = db.query(Subject).filter(cast("ColumnElement[bool]", Subject.title == title)).first()
    return subject_db


def delete_subject_db(db: Session, subject_db: Subject):
    db.delete(subject_db)
    db.commit()
