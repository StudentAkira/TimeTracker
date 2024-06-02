import datetime

from pydantic import BaseModel


class NoteSchema(BaseModel):
    title: str
    description: str
    datetime_: datetime.datetime

    class Config:
        from_attributes = True
