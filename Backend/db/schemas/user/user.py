from pydantic import BaseModel


class UserSchema(BaseModel):
    username: str
    first_name: str
    second_name: str
    third_name: str

    class Config:
        from_attributes = True
