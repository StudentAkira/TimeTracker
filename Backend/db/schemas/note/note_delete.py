from pydantic import BaseModel


class NoteDeleteSchema(BaseModel):
    title: str
