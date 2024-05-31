from sqlalchemy.orm import Session
from starlette.responses import Response

from db.schemas.subject.subject import SubjectSchema
from db.schemas.subject.subject_full_data import SubjectFullDataSchema
from db.schemas.subject.subject_update import SubjectUpdateSchema
from db.schemas.subject.topic_to_subject import TopicToSubjectSchema
from db.schemas.topic.topic import TopicSchema
from managers.subject import SubjectManager
from managers.token import TokenManager
from managers.topic import TopicManager
from managers.user import UserManager


class SubjectService:
    def __init__(self, db: Session):

        self.__db = db

        self.__user_manager = UserManager(self.__db)
        self.__token_manager = TokenManager(self.__db)
        self.__subject_manager = SubjectManager(self.__db)
        self.__topic_manager = TopicManager(self.__db)

        self.__subject_created_message = "subject created"
        self.__subject_updated_message = "subject updated"
        self.__subject_deleted_message = "subject deleted"
        self.__topic_appended_to_subject_message = "topic appended to subject"
        self.__topic_removed_to_subject_message = "topic removed from subject"

    def create(self, response: Response, token: str, subject_data: SubjectSchema) -> dict[str, str]:
        decoded_token = self.__token_manager.decode_token(token, response)
        user_db = self.__user_manager.get_user_by_id_or_raise_if_not_found(decoded_token.user_id)
        existing_subject_db = self.__subject_manager.get_subject_by_user_id_title(subject_data.title, decoded_token.user_id)
        self.__subject_manager.raise_exception_if_subject_title_taken(existing_subject_db)
        self.__subject_manager.create(user_db, subject_data)
        return {"message": self.__subject_created_message}

    def read(self, response: Response, token: str, offset: int, limit: int) -> list[SubjectSchema]:
        decoded_token = self.__token_manager.decode_token(token, response)
        user_db = self.__user_manager.get_user_by_id_or_raise_if_not_found(decoded_token.user_id)
        return self.__subject_manager.read(user_db, offset, limit)

    def read_by_title(self, response : Response, token: str, title: str) -> SubjectFullDataSchema | None:
        decoded_token = self.__token_manager.decode_token(token, response)
        user_db = self.__user_manager.get_user_by_id_or_raise_if_not_found(decoded_token.user_id)
        return self.__subject_manager.read_by_title(user_db, title)

    def read_all_topic_by_subject(self, response: Response, token: str, subject_title: str) -> list[TopicSchema]:
        decoded_token = self.__token_manager.decode_token(token, response)
        subject_db = self.__subject_manager.get_subject_by_user_id_title(subject_title, decoded_token.user_id)
        self.__subject_manager.raise_exception_if_subject_not_found(subject_db)
        return self.__subject_manager.read_all_topic_by_subject(subject_db)

    def update(self, response: Response, token: str, subject_data: SubjectUpdateSchema):
        decoded_token = self.__token_manager.decode_token(token, response)
        subject_with_taken_title_db = self.__subject_manager.get_subject_by_user_id_title(
            subject_data.new_title, decoded_token.user_id
        )
        existing_subject_db = self.__subject_manager.get_subject_by_user_id_title(
            subject_data.title, decoded_token.user_id
        )

        self.__subject_manager.raise_exception_if_subject_title_taken(subject_with_taken_title_db)
        self.__subject_manager.raise_exception_if_subject_not_found(existing_subject_db)
        self.__subject_manager.update(existing_subject_db, subject_data)
        return {"message": self.__subject_updated_message}

    def delete(self, response: Response, token: str, subject_title: str):
        decoded_token = self.__token_manager.decode_token(token, response)
        subject_db = self.__subject_manager.get_subject_by_user_id_title(subject_title, decoded_token.user_id)
        self.__subject_manager.raise_exception_if_subject_not_found(subject_db)
        self.__subject_manager.delete(subject_db)
        return {"message": self.__subject_deleted_message}

    def append_topic_to_subject(self, response: Response, token: str, append_data: TopicToSubjectSchema):
        decoded_token = self.__token_manager.decode_token(token, response)
        user_db = self.__user_manager.get_user_by_id_or_raise_if_not_found(decoded_token.user_id)
        subject_db = self.__subject_manager.get_subject_by_user_id_title(
            append_data.subject_title, decoded_token.user_id
        )
        topic_db = self.__topic_manager.get_topic_by_title_and_user_id(user_db.id, append_data.topic_title)
        self.__subject_manager.raise_exception_if_subject_owner_wrong(user_db, subject_db)
        self.__topic_manager.raise_exception_if_topic_does_not_exists(topic_db)
        self.__subject_manager.raise_exception_if_topic_in_list(subject_db, topic_db)
        self.__subject_manager.append(subject_db, topic_db)
        return {"message": self.__topic_appended_to_subject_message}

    def remove_topic_from_subject(self, response: Response, token: str, remove_data: TopicToSubjectSchema):
        decoded_token = self.__token_manager.decode_token(token, response)
        user_db = self.__user_manager.get_user_by_id_or_raise_if_not_found(decoded_token.user_id)
        subject_db = self.__subject_manager.get_subject_by_user_id_title(
            remove_data.subject_title, decoded_token.user_id
        )
        topic_db = self.__topic_manager.get_topic_by_title_and_user_id(user_db.id, remove_data.topic_title)
        self.__subject_manager.raise_exception_if_subject_owner_wrong(user_db, subject_db)
        self.__topic_manager.raise_exception_if_topic_does_not_exists(topic_db)
        self.__subject_manager.raise_exception_if_topic_not_in_list(subject_db, topic_db)
        self.__subject_manager.raise_exception_if_topic_not_in_list(subject_db, topic_db)
        self.__subject_manager.remove(subject_db, topic_db)
        return {"message": self.__topic_removed_to_subject_message}

