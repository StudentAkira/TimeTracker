import datetime

from pydantic import BaseModel


class NoteCreateSchema(BaseModel):
    title: str
    content: str

    class Config:
        from_attributes = True
