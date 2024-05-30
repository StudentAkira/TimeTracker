from pydantic import BaseModel, Field


class TopicCreateSchema(BaseModel):
    title: str = Field(min_length=7)
    description: str | None = Field(default=None, min_length=7)

    class Config:
        from_attributes = True
