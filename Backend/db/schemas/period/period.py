from datetime import datetime

from pydantic import BaseModel, Field


class PeriodSchema(BaseModel):
    topic_title: str = Field(min_length=7)

    title: str = Field(min_length=7)
    description: str = Field(min_length=7)

    class Config:
        from_attributes = True
