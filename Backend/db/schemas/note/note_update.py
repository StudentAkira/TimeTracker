from pydantic import BaseModel, Field


class NoteUpdateSchema(BaseModel):
    title: str

    new_title: str | None = Field(default=None)
    new_content: str | None = Field(default=None)
