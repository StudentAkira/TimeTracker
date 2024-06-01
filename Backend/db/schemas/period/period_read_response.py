from datetime import datetime

from pydantic import BaseModel


class PeriodReadResponseSchema(BaseModel):
    title: str
    description: str
    start_time: datetime
    end_time: datetime | None

    class Config:
        from_attributes = True
