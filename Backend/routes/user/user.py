from typing import Annotated

from fastapi import APIRouter, Depends, Query
from pydantic import Field
from sqlalchemy.orm import Session
from starlette.responses import Response

from db.schemas.user.user_create import UserCreateSchema
from db.schemas.user.user_update import UpdateUserSchema
from dependencies import get_db, authorized_only
from routes.user.user_service import UsersService

user = APIRouter(prefix="/api/user", tags=["user"])


@user.post("/create")
async def create_user(
        user_: UserCreateSchema,
        db: Session = Depends(get_db)
):
    service = UsersService(db)
    return service.create(user_)


@user.get("/read")
async def read_user(
        response: Response,
        offset: Annotated[int | None, Query(gte=0)] = None,
        limit: Annotated[int | None, Query(lt=50, gt=0)] = None,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db)
):
    service = UsersService(db)
    return service.read(response, token, offset, limit)


@user.patch("/patch")
async def update_user(
        response: Response,
        user_data: UpdateUserSchema,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db)
):
    service = UsersService(db)
    return service.update(response, token, user_data)


@user.delete("/delete")
async def delete_user(
        response: Response,
        password: str,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db)
):
    service = UsersService(db)
    return service.delete(response, token, password)
