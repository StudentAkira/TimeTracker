from pydantic import BaseModel

class TokenDecodedSchema(BaseModel):
    user_id: int
    exp: int
