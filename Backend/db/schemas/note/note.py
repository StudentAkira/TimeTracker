import datetime

from pydantic import BaseModel


class NoteSchema(BaseModel):
    title: str
    content: str
    datetime_: datetime.datetime

    class Config:
        from_attributes = True
