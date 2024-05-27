from datetime import datetime

from pydantic import BaseModel


class PeriodPatchEndTimeSchema(BaseModel):
    id: int
    end_time: datetime
