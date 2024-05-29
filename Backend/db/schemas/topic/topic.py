from pydantic import BaseModel, Field


class TopicSchema(BaseModel):
    title: str = Field(min_length=7)
    description: str | None = Field(default=None, min_length=7)
    total_hours: float

    class Config:
        from_attributes = True
