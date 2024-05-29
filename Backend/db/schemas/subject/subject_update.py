from pydantic import BaseModel, Field


class SubjectUpdateSchema(BaseModel):
    title: str

    new_title: str | None = Field(default=None)
    new_description: str | None = Field(default=None)
