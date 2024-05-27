from pydantic import BaseModel, Field


class TopicDeleteSchema(BaseModel):
    title: str = Field(min_length=7)
