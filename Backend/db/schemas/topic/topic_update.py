from pydantic import BaseModel, Field


class TopicUpdateSchema(BaseModel):
    title: str = Field(min_length=7)

    new_title: str | None = Field(default=None, min_length=7)
    new_description: str | None = Field(default=None, min_length=7)
