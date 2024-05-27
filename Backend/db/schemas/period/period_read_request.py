from datetime import datetime

from pydantic import BaseModel, Field


class PeriodReadRequestSchema(BaseModel):
    topic_title: str = Field(min_length=7)
