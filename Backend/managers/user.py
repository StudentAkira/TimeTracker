from fastapi import HTTPException
from sqlalchemy.orm import Session
from starlette import status

from db.crud.user import get_users_db, get_user_by_id_db, get_user_by_username_db, create_user_db, pwd_context
from db.models.user import User
from db.schemas.user.edit_user import EditUserSchema
from db.schemas.user.user import UserSchema
from db.schemas.user.user_create import UserCreateSchema


class UserManager:
    def __init__(self, db: Session):
        self.__db = db

        self.__wrong_secret_error = "wrong secret"
        self.__username_taken_error = "username taken"
        self.__secret_missing_error = "secret missing"
        self.__invalid_password_error = "invalid password"
        self.__user_not_found_error = "user not found"

    def list(self):
        users_db = get_users_db(self.__db)
        users = [UserSchema.from_orm(user_db) for user_db in users_db]
        return users

    def get_user_by_id_or_raise_if_not_found(self, user_id: int) -> type(User):
        user_db = get_user_by_id_db(self.__db, user_id)
        if not user_db:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"error": self.__user_not_found_error}
            )
        return user_db

    def get_user_by_username_or_raise_if_not_found(self, email: str) -> type(User):
        user_db = get_user_by_username_db(self.__db, email)
        if not user_db:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"error": self.__user_not_found_error}
            )
        return user_db

    def create_user(self, user: UserCreateSchema):
        self.raise_exception_if_username_taken(user)
        create_user_db(self.__db, user)

    def check_user_password(self, user_db: type(User), password: str):
        password_check = pwd_context.verify(password, user_db.hashed_password)
        self.raise_exception_if_password_incorrect(password_check)

    def raise_exception_if_username_taken(self, user: UserSchema | EditUserSchema):
        user_db = get_user_by_username_db(self.__db, user.username)
        if user_db:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail={"error": self.__username_taken_error}
            )

    def raise_exception_if_password_incorrect(self, correct: bool):
        if not correct:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail={"error": self.__invalid_password_error}
            )
