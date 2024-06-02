from datetime import datetime

from pydantic import BaseModel


class PeriodReadResponseSchema(BaseModel):
    title: str
    description: str
    start_time: float
    end_time: float | None

    class Config:
        from_attributes = True
