from pydantic import BaseModel


class SubjectUpdateSchema(BaseModel):
    title: str

    new_title: str
    new_description: str
