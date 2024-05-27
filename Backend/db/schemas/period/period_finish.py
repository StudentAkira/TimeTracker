from datetime import datetime

from pydantic import BaseModel


class PeriodFinishSchema(BaseModel):
    id: int
