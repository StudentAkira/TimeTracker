from sqlalchemy.orm import Session
from starlette.responses import Response

from db.schemas.note.note import NoteSchema
from db.schemas.note.note_create import NoteCreateSchema
from db.schemas.note.note_delete import NoteDeleteSchema
from db.schemas.note.note_update import NoteUpdateSchema
from managers.note import NoteManager
from managers.token import TokenManager
from managers.user import UserManager


class NoteService:
    def __init__(self, db: Session):
        self.__db = db

        self.__user_manager = UserManager(self.__db)
        self.__token_manager = TokenManager(self.__db)
        self.__note_manager = NoteManager(self.__db)

        self.__note_created_message = "note_created"
        self.__note_updated_message = "note updated message"
        self.__note_deleted_message = "note deleted message"

    def create(self, response: Response, token: str, note_data: NoteCreateSchema):
        decoded_token = self.__token_manager.decode_token(token, response)
        self.__note_manager.create_note(decoded_token, note_data)
        return {"message": self.__note_created_message}

    def read(self, response: Response, token: str, offset: int, limit: int) -> list[NoteSchema]:
        decoded_token = self.__token_manager.decode_token(token, response)
        return self.__note_manager.read_note(decoded_token, offset, limit)

    def read_by_title(self, response: Response, token: str, title: str) -> NoteSchema:
        decoded_token = self.__token_manager.decode_token(token, response)
        user_db = self.__user_manager.get_user_by_id_or_raise_if_not_found(decoded_token.user_id)
        note_db = self.__note_manager.get_user_note(user_db, title)
        return NoteSchema(
            title=note_db.title,
            description=note_db.content,
            datetime_=note_db.datetime_
        )

    def read_by_title_by_starts_with(
            self,
            response: Response,
            token: str,
            title: str,
            offset: int,
            limit: int
    ) -> list[NoteSchema]:
        decoded_token = self.__token_manager.decode_token(token, response)
        user_db = self.__user_manager.get_user_by_id_or_raise_if_not_found(decoded_token.user_id)
        notes = self.__note_manager.get_user_notes_with_title_starts_with(user_db, title, offset, limit)
        return notes

    def update(self, response: Response, token: str, note_data: NoteUpdateSchema):
        decoded_token = self.__token_manager.decode_token(token, response)
        user_db = self.__user_manager.get_user_by_id_or_raise_if_not_found(decoded_token.user_id)
        self.__note_manager.update(user_db, note_data)
        return {"message": self.__note_updated_message}

    def delete(self, response: Response, token: str, title: str):
        decoded_token = self.__token_manager.decode_token(token, response)
        user_db = self.__user_manager.get_user_by_id_or_raise_if_not_found(decoded_token.user_id)
        self.__note_manager.delete(user_db, title)
        return {"message": self.__note_deleted_message}


