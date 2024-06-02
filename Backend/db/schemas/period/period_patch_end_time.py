from pydantic import BaseModel


class PeriodUpdateSchema(BaseModel):
    topic_title: str | None

    title: str | None

    new_title: str | None
    new_description: str | None
