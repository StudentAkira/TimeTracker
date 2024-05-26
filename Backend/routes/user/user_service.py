from sqlalchemy.orm import Session
from starlette.responses import Response

from db.schemas.user.user import UserSchema
from db.schemas.user.user_create import UserCreateSchema
from db.schemas.user.user_update import UpdateUserSchema
from managers.token import TokenManager
from managers.user import UserManager


class UsersService:

    def __init__(self, db: Session):
        self.__db = db
        self.__user_manager = UserManager(self.__db)
        self.__token_manager = TokenManager(self.__db)

        self.__user_created_message = "user created"
        self.__user_updated_message = "user updated"
        self.__user_deleted_message = "user deleted"

    def create(self, user: UserCreateSchema) -> dict[str, str]:
        self.__user_manager.create(user)
        return {"message": self.__user_created_message}

    def read(self, response: Response, token: str, offset: int, limit: int) -> list[UserSchema]:
        decoded_token = self.__token_manager.decode_token(token, response)
        if offset is None and limit is None:
            user_db = self.__user_manager.get_user_by_id_or_raise_if_not_found(decoded_token.user_id)
            return [UserSchema.from_orm(user_db)]
        return self.__user_manager.read(offset, limit)

    def update(self, response: Response, token: str, user_data: UpdateUserSchema):
        decoded_token = self.__token_manager.decode_token(token, response)
        user_db = self.__user_manager.get_user_by_id_or_raise_if_not_found(decoded_token.user_id)
        self.__user_manager.update(user_db, user_data)
        return {"message": self.__user_updated_message}

    def delete(self, response: Response, token: str, password: str):
        decoded_token = self.__token_manager.decode_token(token, response)
        user_db = self.__user_manager.get_user_by_id_or_raise_if_not_found(decoded_token.user_id)
        self.__user_manager.delete(user_db, password)
        return {"message": self.__user_deleted_message}
