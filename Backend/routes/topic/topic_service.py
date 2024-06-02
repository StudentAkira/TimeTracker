from sqlalchemy.orm import Session
from starlette.responses import Response

from db.schemas.topic.topic import TopicSchema
from db.schemas.topic.topic_create import TopicCreateSchema
from db.schemas.topic.topic_delete import TopicDeleteSchema
from db.schemas.topic.topic_update import TopicUpdateSchema
from managers.note import NoteManager
from managers.token import TokenManager
from managers.topic import TopicManager
from managers.user import UserManager


class TopicService:
    def __init__(self, db: Session):
        self.__db = db

        self.__user_manager = UserManager(self.__db)
        self.__token_manager = TokenManager(self.__db)
        self.__note_manager = NoteManager(self.__db)
        self.__topic_manager = TopicManager(self.__db)

        self.__topic_created_message = "topic created"
        self.__topic_updated_message = "topic updated"
        self.__topic_deleted_message = "topic deleted"

    def create_topic(self, response: Response, token: str, topic_data: TopicCreateSchema) -> dict[str, str]:
        decoded_token = self.__token_manager.decode_token(token, response)
        user_db = self.__user_manager.get_user_by_id_or_raise_if_not_found(decoded_token.user_id)
        topic_with_taken_name = self.__topic_manager.\
            get_topic_by_title_and_user_id(decoded_token.user_id, topic_data.title)
        self.__topic_manager.raise_exception_if_topic_exists(topic_with_taken_name)
        self.__topic_manager.create(user_db, topic_data)
        return {"message": self.__topic_created_message}

    def read_topic(self, response: Response, token: str, offset: int, limit: int) -> list[TopicSchema]:
        decoded_token = self.__token_manager.decode_token(token, response)
        user_db = self.__user_manager.get_user_by_id_or_raise_if_not_found(decoded_token.user_id)
        return self.__topic_manager.read(user_db, offset, limit)

    def read_topic_by_title(self, response: Response, token: str, title: str) -> TopicSchema | None:
        decoded_token = self.__token_manager.decode_token(token, response)
        topic_db = self.__topic_manager.get_topic_by_title_and_user_id(decoded_token.user_id, title)
        if not topic_db:
            return None
        return TopicSchema.from_orm(topic_db)

    def update_topic(self, response: Response, token: str, topic_data: TopicUpdateSchema) -> dict[str, str]:
        decoded_token = self.__token_manager.decode_token(token, response)
        topic_to_update_db = self.__topic_manager.\
            get_topic_by_title_and_user_id(decoded_token.user_id, topic_data.title)
        topic_with_taken_title = self.__topic_manager.\
            get_topic_by_title_and_user_id(decoded_token.user_id, topic_data.new_title)
        self.__topic_manager.raise_exception_if_topic_does_not_exists(topic_to_update_db)
        self.__topic_manager.raise_exception_if_topic_exists(topic_with_taken_title)
        self.__topic_manager.update(topic_to_update_db, topic_data)
        return {"message": self.__topic_updated_message}

    def delete_topic(self, response: Response, token: str, title: str) -> dict[str, str]:
        decoded_token = self.__token_manager.decode_token(token, response)
        topic_to_delete = self.__topic_manager.get_topic_by_title_and_user_id(decoded_token.user_id, title)
        self.__topic_manager.raise_exception_if_topic_does_not_exists(topic_to_delete)
        self.__topic_manager.delete(topic_to_delete)
        return {"message": self.__topic_deleted_message}

