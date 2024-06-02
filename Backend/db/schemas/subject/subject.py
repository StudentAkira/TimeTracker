from pydantic import BaseModel


class SubjectSchema(BaseModel):
    title: str
    description: str

    total_hours: float

    class Config:
        from_attributes = True
