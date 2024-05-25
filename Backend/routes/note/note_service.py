from sqlalchemy.orm import Session
from starlette.responses import Response

from db.schemas.note.note import NoteSchema
from managers.note import NoteManager
from managers.token import TokenManager


class NoteService:
    def __init__(self, db: Session):
        self.__db = db
        self.__token_manager = TokenManager(self.__db)
        self.__note_manager = NoteManager(self.__db)

        self.__note_created_message = "note_created"

    def create_note(self, response: Response, token: str, note_data: NoteSchema):
        decoded_token = self.__token_manager.decode_token(token, response)
        self.__note_manager.create_note(decoded_token, note_data)
        return {"message": self.__note_created_message}

    def read_note(self, response: Response, token: str):
        decoded_token = self.__token_manager.decode_token(token, response)
        return self.__note_manager.read_note(decoded_token)

    def edit_note(self):
        pass


