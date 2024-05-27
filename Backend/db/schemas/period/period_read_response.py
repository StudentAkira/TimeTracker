from datetime import datetime

from pydantic import BaseModel


class PeriodReadResponseSchema(BaseModel):
    start_time: datetime
    end_time: datetime | None
    finished: bool

    class Config:
        from_attributes = True
