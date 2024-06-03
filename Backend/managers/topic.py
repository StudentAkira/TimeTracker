from fastapi import HTTPException
from sqlalchemy.orm import Session
from starlette import status

from db.crud.topic import get_topic_by_title_and_user_id_db, create_topic_db, read_topic_db, update_topic_db, \
    delete_topic_db, get_user_topics_starts_with_db
from db.models.topic import Topic
from db.models.user import User
from db.schemas.topic.topic import TopicSchema
from db.schemas.topic.topic_create import TopicCreateSchema
from db.schemas.topic.topic_update import TopicUpdateSchema


class TopicManager:
    def __init__(self, db: Session):
        self.__db = db

        self.__topic_name_taken_error = "topic name taken"
        self.__topic_not_found_error = "topic not found"

    def create(self, user_db: User, topic_data: TopicCreateSchema):
        create_topic_db(self.__db, user_db, topic_data)

    def read(self, user_db: User, offset: int, limit: int) -> list[TopicSchema]:
        topics = [
            TopicSchema.from_orm(topic_db)
            for topic_db in read_topic_db(self.__db, user_db, offset, limit)
                  ]
        return topics

    def update(self, topic_to_update_db: Topic, topic_data: TopicUpdateSchema):
        update_topic_db(self.__db, topic_to_update_db, topic_data)

    def delete(self, topic_db: Topic):
        delete_topic_db(self.__db, topic_db)

    def get_topic_by_title_and_user_id(self, user_id: int, title: str) -> Topic | None:
        topic_db = get_topic_by_title_and_user_id_db(self.__db, user_id, title)
        return topic_db

    def get_user_notes_with_title_starts_with(self, user_db, title, offset, limit):
        topics_db = get_user_topics_starts_with_db(self.__db, user_db, title, offset, limit)
        return [TopicSchema(
            title=topic_db.title,
            description=topic_db.description,
            total_hours=topic_db.total_hours
        ) for topic_db in topics_db]

    def raise_exception_if_topic_exists(self, topic_db: Topic | None):
        if topic_db:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail={"error": self.__topic_name_taken_error}
            )

    def raise_exception_if_topic_does_not_exists(self, topic_db: Topic | None):
        if not topic_db:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail={"error": self.__topic_not_found_error}
            )


