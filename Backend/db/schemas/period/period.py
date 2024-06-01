from datetime import datetime

from pydantic import BaseModel, Field


class PeriodSchema(BaseModel):
    topic_title: str = Field(min_length=7)


