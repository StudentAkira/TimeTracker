from datetime import datetime

from pydantic import BaseModel


class PeriodReadResponseSchema(BaseModel):
    id: int
    start_time: datetime
    end_time: datetime | None
    finished: bool

    class Config:
        from_attributes = True
