from typing import cast

from sqlalchemy import and_
from sqlalchemy.orm import Session

from db.models.subject import Subject
from db.models.topic import Topic
from db.models.user import User
from db.schemas.subject.subject import SubjectSchema
from db.schemas.subject.subject_create import SubjectCreateSchema
from db.schemas.subject.subject_update import SubjectUpdateSchema


def create_subject_db(db: Session, user_db: User, subject_data: SubjectCreateSchema):
    subject_db = Subject(
        title=subject_data.title,
        description=subject_data.description
    )
    subject_db.owner_id = user_db.id
    db.add(subject_db)
    db.commit()


def read_subjects_by_owner_db(db: Session, user_db: User, offset: int, limit: int) -> list[SubjectSchema]:
    subjects_db = db.query(Subject). \
        filter(cast("ColumnElement[bool]", Subject.owner_id == user_db.id)).offset(offset).limit(limit).all()

    return [SubjectSchema(
            title=subject_db.title,
            description=subject_db.description,
            total_hours=sum([topic_db.total_hours for topic_db in subject_db.topics])
            )
            for subject_db in subjects_db]


def read_subject_by_title_db(db: Session, user_db: User, title: str) -> Subject | None:
    subject_db = db.query(Subject).filter(and_(
        Subject.owner_id == user_db.id,
        Subject.title == title
    )).first()
    return subject_db


def get_user_subjects_starts_with_db(db: Session, user_db: User, title: str, offset: int, limit: int)\
        -> list[type(Subject)]:
    subjects_db = db.query(Subject).filter(and_(
        Subject.owner_id == user_db.id,
        Subject.title.ilike(f"{title}%")
    )).offset(offset).limit(limit).all()
    return subjects_db


def update_subject_db(db: Session, subject_db: Subject, subject_data: SubjectUpdateSchema):
    subject_db.title = subject_data.new_title if subject_data.new_title else subject_db.title
    subject_db.description = subject_data.new_description if subject_data.new_description else subject_db.description
    db.add(subject_db)
    db.commit()


def get_subject_by_user_id_title_db(db: Session, title: str, user_id: int) -> Subject | None:
    subject_db = db.query(Subject).filter(and_(Subject.title == title, Subject.owner_id == user_id)).first()
    return subject_db


def read_all_topic_by_subject_db(db: Session, subject_db: Subject):
    return subject_db.topics


def delete_subject_db(db: Session, subject_db: Subject):
    db.delete(subject_db)
    db.commit()


def append_topic_to_subject_db(db: Session, subject_db: Subject, topic_db: Topic):
    subject_db.topics.append(topic_db)
    db.add(subject_db)
    db.commit()


def remove_topic_from_subject_db(db: Session, subject_db: Subject, topic_db: Topic):
    subject_db.topics.remove(topic_db)
    db.add(subject_db)
    db.commit()
