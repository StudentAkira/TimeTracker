from fastapi import HTTPException
from sqlalchemy.orm import Session
from starlette import status

from db.crud.note import create_note_db, get_note_by_title_db, read_note_db
from db.schemas.note.note import NoteSchema
from db.schemas.token.token_decoded import TokenDecodedSchema
from managers.user import UserManager


class NoteManager:
    def __init__(self, db: Session):
        self.__db = db

        self.__user_manager = UserManager(self.__db)

        self.__note_title_taken_error = "note_title_taken"

    def create_note(self, decoded_token: TokenDecodedSchema, note_data: NoteSchema):
        self.raise_exception_if_note_title_taken(note_data.title)
        user_db = self.__user_manager.get_user_by_id_or_raise_if_not_found(decoded_token.user_id)
        create_note_db(self.__db, user_db, note_data)

    def get_note_by_title(self, title: str):
        note_db = get_note_by_title_db(self.__db, title)
        return note_db

    def raise_exception_if_note_title_taken(self, title: str):
        note_db = self.get_note_by_title(title)
        if note_db:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail={"error": self.__note_title_taken_error}
            )

    def read_note(self, decoded_token: TokenDecodedSchema):
        user_db = self.__user_manager.get_user_by_id_or_raise_if_not_found(decoded_token.user_id)
        return read_note_db(user_db)

