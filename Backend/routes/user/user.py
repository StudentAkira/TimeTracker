from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.responses import Response

from db.schemas.user.user_create import UserCreateSchema
from dependencies import get_db, authorized_only
from routes.user.user_service import UsersService

user = APIRouter(prefix="/api/user", tags=["user"])


@user.get("/users")
async def list_users(
        response: Response,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db)
):
    service = UsersService(db)
    return service.list(response, token)


@user.post("/create_user")
async def create_user(
        user_: UserCreateSchema,
        db: Session = Depends(get_db)
):
    service = UsersService(db)
    return service.create_user(user_)
