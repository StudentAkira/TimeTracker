import datetime
from typing import cast

from sqlalchemy import and_, literal, func
from sqlalchemy.orm import Session

from db.models.note import Note
from db.models.user import User
from db.schemas.note.note import NoteSchema
from db.schemas.note.note_create import NoteCreateSchema
from db.schemas.note.note_update import NoteUpdateSchema


def create_note_db(db: Session, user_db: User, note_data: NoteCreateSchema):
    note_db = Note(
        title=note_data.title,
        content=note_data.content,
        datetime_=datetime.datetime.now()
    )
    user_db.notes.append(note_db)
    db.add(note_db)
    db.add(user_db)
    db.commit()


def get_note_by_title_db(db: Session, title: str):
    note_db = db.query(Note).filter(cast("ColumnElement[bool]", Note.title == title)).first()
    return note_db


def read_note_db(db: Session, user_db: User, offset: int, limit: int) -> list[NoteSchema]:
    notes = db.query(Note).\
        filter(cast("ColumnElement[bool]", Note.owner_id == user_db.id)).offset(offset).limit(limit).all()
    return [NoteSchema(
        title=note_db.title,
        content=note_db.content,
        datetime_=note_db.datetime_
    ) for note_db in notes]


def get_user_note_db(db: Session, user_db: User, title: str):
    note_db = db.query(Note).filter(and_(
        Note.owner_id == user_db.id,
        Note.title == title
    )).first()
    return note_db


def get_user_notes_starts_with_db(db: Session, user_db: User, title: str, offset: int, limit: int):
    notes_db = db.query(Note).filter(and_(
        Note.owner_id == user_db.id,
        Note.title.ilike(f"{title}%")
    )).offset(offset).limit(limit).all()
    return notes_db


def update_user_note_db(db: Session, note_db: Note, note_data: NoteUpdateSchema):
    note_db.title = note_data.new_title if note_data.new_title else note_db.title
    note_db.content = note_data.new_content if note_data.new_content else note_db.content
    db.add(note_db)
    db.commit()


def delete_note_db(db: Session, note_db: Note):
    db.delete(note_db)
    db.commit()
