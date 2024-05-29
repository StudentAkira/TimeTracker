from typing import Annotated

from fastapi import APIRouter, Depends, Query, Body
from sqlalchemy.orm import Session
from starlette.responses import Response

from db.schemas.subject.subject import SubjectSchema
from dependencies import get_db, authorized_only
from routes.subject.subject_service import SubjectService

subject = APIRouter(prefix="/api/subject", tags=["subject"])


@subject.post("/create")
async def create_subject(
        response: Response,
        subject_data: SubjectSchema,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
) -> dict[str, str]:
    service = SubjectService(db)
    return service.create(response, token, subject_data)


@subject.get("/read")
async def read_subject(
        response: Response,
        offset: Annotated[int, Query(gte=0)] = 0,
        limit: Annotated[int, Query(lt=50)] = 49,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
) -> list[SubjectSchema]:
    service = SubjectService(db)
    return service.read(response, token, offset, limit)


@subject.patch("/patch")
async def update_subject(
        response: Response,
        subject_data: SubjectSchema,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
):
    service = SubjectService(db)
    return service.update(response, token, subject_data)


@subject.delete("/delete")
async def delete_subject(
        response: Response,
        subject_title: Annotated[str, Body()],
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
):
    service = SubjectService(db)
    return service.delete(response, token, subject_title)
