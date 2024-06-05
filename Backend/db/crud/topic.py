from typing import cast

from sqlalchemy import and_
from sqlalchemy.orm import Session
from sqlalchemy.testing import not_in

from db.models.subject import Subject
from db.models.topic import Topic
from db.models.user import User
from db.schemas.topic.topic_create import TopicCreateSchema
from db.schemas.topic.topic_update import TopicUpdateSchema


def create_topic_db(db: Session, user_db: User, topic_data: TopicCreateSchema):
    topic_db = Topic(
        title=topic_data.title,
        description=topic_data.description
    )
    user_db.topics.append(topic_db)
    db.add(topic_db)
    db.commit()


def read_topic_db(db: Session, user_db: User, offset: int, limit: int) -> list[type(Topic)]:
    topics_db = db.query(Topic).\
        filter(cast("ColumnElement[bool]", Topic.owner_id == user_db.id)).offset(offset).limit(limit).all()
    return topics_db


def get_user_topics_starts_with_db(db: Session, user_db: User, title: str, offset: int, limit: int)\
        -> list[type(Topic)]:
    topics_db = db.query(Topic).filter(and_(
        Topic.owner_id == user_db.id,
        Topic.title.ilike(f"{title}%")
    )).offset(offset).limit(limit).all()
    return topics_db


def get_user_topics_not_related_to_subject(db: Session, user_db: User, subject_db: Subject, offset: int, limit: int):
    topics_not_related_to_subject_db = db.query(Topic).\
        filter(cast("ColumnElement[bool]", Topic.owner_id == user_db.id),
               Topic.title.not_in(
                   set(topic_db.title for topic_db in subject_db.topics) if subject_db.topics is not None else set()
               )).\
        offset(offset).limit(limit)
    return topics_not_related_to_subject_db


def update_topic_db(db: Session, topic_db: Topic, topic_data: TopicUpdateSchema):
    topic_db.title = topic_data.new_title if topic_data.new_title else topic_db.title
    topic_db.description = topic_data.new_description if topic_data.new_description else topic_db.description
    db.add(topic_db)
    db.commit()


def delete_topic_db(db: Session, topic_db: Topic):
    db.delete(topic_db)
    db.commit()


def get_topic_by_title_and_user_id_db(db: Session, user_id: int, title: str) -> Topic | None:
    topic_db = db.query(Topic).filter(and_(
            Topic.owner_id == user_id,
            Topic.title == title
        )
    ).first()
    return topic_db
