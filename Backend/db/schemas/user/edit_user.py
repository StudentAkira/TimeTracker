from pydantic import BaseModel


class EditUserSchema(BaseModel):
    username: str
    password: str
    first_name: str
    second_name: str
    third_name: str

    class Config:
        from_attributes = True
