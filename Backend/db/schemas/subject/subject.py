from pydantic import BaseModel


class SubjectSchema(BaseModel):
    title: str
    description: str

    class Config:
        from_attributes = True
