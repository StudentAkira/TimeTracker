from sqlalchemy.orm import Session
from starlette.responses import Response

from db.schemas.subject.subject import SubjectSchema
from db.schemas.subject.subject_update import SubjectUpdateSchema
from managers.subject import SubjectManager
from managers.token import TokenManager
from managers.user import UserManager


class SubjectService:
    def __init__(self, db: Session):

        self.__db = db

        self.__user_manager = UserManager(self.__db)
        self.__token_manager = TokenManager(self.__db)
        self.__subject_manager = SubjectManager(self.__db)

        self.__subject_created_message = "subject created"
        self.__subject_updated_message = "subject updated"
        self.__subject_deleted_message = "subject deleted"

    def create(self, response: Response, token: str, subject_data: SubjectSchema) -> dict[str, str]:
        decoded_token = self.__token_manager.decode_token(token, response)
        user_db = self.__user_manager.get_user_by_id_or_raise_if_not_found(decoded_token.user_id)
        existing_subject_db = self.__subject_manager.get_subject_by_title(subject_data.title)
        self.__subject_manager.raise_exception_if_subject_title_taken(existing_subject_db)
        self.__subject_manager.create(user_db, subject_data)
        return {"message": self.__subject_created_message}

    def read(self, response: Response, token: str, offset: int, limit: int) -> list[SubjectSchema]:
        decoded_token = self.__token_manager.decode_token(token, response)
        user_db = self.__user_manager.get_user_by_id_or_raise_if_not_found(decoded_token.user_id)
        return self.__subject_manager.read(user_db, offset, limit)

    def update(self, response: Response, token: str, subject_data: SubjectUpdateSchema):
        self.__token_manager.decode_token(token, response)
        subject_with_taken_title_db = self.__subject_manager.get_subject_by_title(subject_data.new_title)
        existing_subject_db = self.__subject_manager.get_subject_by_title(subject_data.title)

        self.__subject_manager.raise_exception_if_subject_title_taken(subject_with_taken_title_db)
        self.__subject_manager.raise_exception_if_subject_not_found(existing_subject_db)
        self.__subject_manager.update(existing_subject_db, subject_data)
        return {"message": self.__subject_updated_message}

    def delete(self, response: Response, token: str, subject_title: str):
        self.__token_manager.decode_token(token, response)
        subject_db = self.__subject_manager.get_subject_by_title(subject_title)
        self.__subject_manager.raise_exception_if_subject_not_found(subject_db)
        self.__subject_manager.delete(subject_db)
        return {"message": self.__subject_deleted_message}
