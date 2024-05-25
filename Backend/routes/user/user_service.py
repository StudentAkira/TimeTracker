from sqlalchemy.orm import Session
from starlette.responses import Response

from db.schemas.user.user import UserSchema
from db.schemas.user.user_create import UserCreateSchema
from managers.token import TokenManager
from managers.user import UserManager


class UsersService:

    def __init__(self, db: Session):
        self.__db = db
        self.__user_manager = UserManager(self.__db)
        self.__token_manager = TokenManager(self.__db)

        self.__user_created_message = "user created"
        self.__user_data_updated_message = "user data updated"

    def create_user(self, user: UserCreateSchema) -> dict[str, str]:
        self.__user_manager.create_user(user)
        return {"message": self.__user_created_message}

    def list(self, response: Response, token: str) -> list[UserSchema]:
        self.__token_manager.decode_token(token, response)
        return self.__user_manager.list()
