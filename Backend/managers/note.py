from fastapi import HTTPException
from sqlalchemy.orm import Session
from starlette import status

from db.crud.note import create_note_db, get_note_by_title_db, read_note_db, get_user_note_db, update_user_note_db, \
    delete_note_db, get_user_notes_starts_with_db
from db.models.note import Note
from db.models.user import User
from db.schemas.note.note import NoteSchema
from db.schemas.note.note_create import NoteCreateSchema
from db.schemas.note.note_delete import NoteDeleteSchema
from db.schemas.note.note_update import NoteUpdateSchema
from db.schemas.token.token_decoded import TokenDecodedSchema
from managers.user import UserManager


class NoteManager:
    def __init__(self, db: Session):
        self.__db = db

        self.__user_manager = UserManager(self.__db)

        self.__note_title_taken_error = "note title taken"
        self.__note_not_found_error = "note not found"

    def create_note(self, decoded_token: TokenDecodedSchema, note_data: NoteCreateSchema):
        self.raise_exception_if_note_title_taken(note_data.title)
        user_db = self.__user_manager.get_user_by_id_or_raise_if_not_found(decoded_token.user_id)
        create_note_db(self.__db, user_db, note_data)

    def read_note(self, decoded_token: TokenDecodedSchema, offset: int, limit: int) -> list[NoteSchema]:
        user_db = self.__user_manager.get_user_by_id_or_raise_if_not_found(decoded_token.user_id)
        return read_note_db(self.__db, user_db, offset, limit)

    def update(self, user_db: User, note_data: NoteUpdateSchema):
        note_db = self.get_user_note(user_db, note_data.title)
        self.raise_exception_if_note_title_taken(note_data.new_title)
        update_user_note_db(self.__db, note_db, note_data)

    def delete(self, user_db: User, title: str):
        note_db = self.get_user_note(user_db, title)
        delete_note_db(self.__db, note_db)

    def get_user_note(self, user_db: User, title: str) -> Note:
        note_db = get_user_note_db(self.__db, user_db, title)
        if not note_db:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"error": self.__note_not_found_error}
            )
        return note_db

    def get_note_by_title(self, title: str):
        note_db = get_note_by_title_db(self.__db, title)
        return note_db

    def get_user_notes_with_title_starts_with(self, user_db: User, title: str, offset: int, limit: int) -> list[NoteSchema]:
        notes_db = get_user_notes_starts_with_db(self.__db, user_db, title, offset, limit)
        return [NoteSchema.from_orm(note_db) for note_db in notes_db]

    def raise_exception_if_note_title_taken(self, title: str):
        note_db = self.get_note_by_title(title)
        if note_db:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail={"error": self.__note_title_taken_error}
            )



