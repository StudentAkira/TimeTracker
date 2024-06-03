import datetime

from pydantic import BaseModel


class NoteCreateSchema(BaseModel):
    title: str
    description: str

    class Config:
        from_attributes = True
