from pydantic import BaseModel


class SubjectCreateSchema(BaseModel):
    title: str
    description: str

    class Config:
        from_attributes = True
