from typing import Annotated

from fastapi import APIRouter, Depends, Query, Body
from sqlalchemy.orm import Session
from starlette.responses import Response

from db.schemas.subject.subject import SubjectSchema
from db.schemas.subject.subject_create import SubjectCreateSchema
from db.schemas.subject.subject_full_data import SubjectFullDataSchema
from db.schemas.subject.subject_update import SubjectUpdateSchema
from db.schemas.subject.topic_to_subject import TopicToSubjectSchema
from dependencies import get_db, authorized_only
from routes.subject.subject_service import SubjectService

subject = APIRouter(prefix="/api/subject", tags=["subject"])


@subject.post("/create")
async def create_subject(
        response: Response,
        subject_data: SubjectCreateSchema,
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


@subject.get("/read_by_title")
async def read_subject_by_title(
        response: Response,
        title: Annotated[str, Query()],
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
) -> SubjectFullDataSchema | None:
    service = SubjectService(db)
    return service.read_by_title(response, token, title)


@subject.get("/get_topics")
async def remove_topic_from_subject(
        response: Response,
        subject_title: Annotated[str, Query()],
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
):
    service = SubjectService(db)
    return service.read_all_topic_by_subject(response, token, subject_title)


@subject.patch("/patch")
async def update_subject(
        response: Response,
        subject_data: SubjectUpdateSchema,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
):
    service = SubjectService(db)
    return service.update(response, token, subject_data)


@subject.delete("/delete")
async def delete_subject(
        response: Response,
        subject_title: Annotated[str, Query()],
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
):
    service = SubjectService(db)
    return service.delete(response, token, subject_title)


@subject.post("/append_topic")
async def append_topic_to_subject(
        response: Response,
        topic_to_subject_data: TopicToSubjectSchema,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
):
    service = SubjectService(db)
    return service.append_topic_to_subject(response, token, topic_to_subject_data)


@subject.post("/remove_topic")
async def remove_topic_from_subject(
        response: Response,
        topic_to_subject_data: TopicToSubjectSchema,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
):
    service = SubjectService(db)
    return service.remove_topic_from_subject(response, token, topic_to_subject_data)
