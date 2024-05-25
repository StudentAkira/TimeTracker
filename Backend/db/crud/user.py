from typing import cast

from passlib.context import CryptContext
from sqlalchemy.orm import Session

from db.models.user import User
from db.schemas.user.user_create import UserCreateSchema

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_user_db(db: Session, user: UserCreateSchema) -> type(User):
    hashed_password = pwd_context.hash(user.password)
    user_db = User(
        username=user.username,
        hashed_password=hashed_password,
        first_name=user.first_name,
        second_name=user.second_name,
        third_name=user.third_name,
    )
    db.add(user_db)
    db.commit()
    db.refresh(user_db)
    return user_db


def get_users_db(db: Session):
    users_db = db.query(User).all()
    return users_db


def get_user_by_username_db(db: Session, username: str) -> type(User) | None:
    user_db = db.query(User).filter(
        cast("ColumnElement[bool]", User.username == username)
    ).first()
    return user_db


def get_user_by_id_db(db: Session, user_id: int) -> type(User) | None:
    user_db = db.query(User).filter(
        cast("ColumnElement[bool]", User.id == user_id)
    ).first()
    if user_db:
        return user_db
