from typing import cast

from sqlalchemy.orm import Session

from db.models.note import Note
from db.models.user import User
from db.schemas.note.note import NoteSchema


def create_note_db(db: Session, user_db: User, note_data: NoteSchema):
    note_db = Note(
        title=note_data.title,
        content=note_data.content,
        datetime_=note_data.datetime_
    )
    user_db.notes.append(note_db)
    db.add(note_db)
    db.add(user_db)
    db.commit()


def get_note_by_title_db(db: Session, title: str):
    note_db = db.query(Note).filter(cast("ColumnElement[bool]", Note.title == title)).first()
    return note_db


def read_note_db(user_db: User):
    return [NoteSchema(
        title=note_db.title,
        content=note_db.content,
        datetime_=note_db.datetime_
    ) for note_db in user_db.notes]
