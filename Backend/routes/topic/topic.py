from typing import Annotated

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from starlette.responses import Response

from db.schemas.topic.topic import TopicSchema
from db.schemas.topic.topic_create import TopicCreateSchema
from db.schemas.topic.topic_delete import TopicDeleteSchema
from db.schemas.topic.topic_update import TopicUpdateSchema
from dependencies import authorized_only, get_db
from routes.topic.topic_service import TopicService

topic = APIRouter(prefix="/api/topic", tags=["topic"])


@topic.post('/create')
async def create_topic(
        response: Response,
        topic_data: TopicCreateSchema,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
) -> dict[str, str]:
    service = TopicService(db)
    return service.create_topic(response, token, topic_data)


@topic.get('/read')
async def read_topic(
        response: Response,
        offset: Annotated[int, Query(gte=0)] = 0,
        limit: Annotated[int, Query(lt=50)] = 49,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
) -> list[TopicSchema]:
    service = TopicService(db)
    return service.read_topic(response, token, offset, limit)


@topic.get('/read_by_title')
async def read_topic_by_title(
        response: Response,
        title: Annotated[str, Query()],
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
) -> TopicSchema | None:
    service = TopicService(db)
    return service.read_topic_by_title(response, token, title)


@topic.get('/read_by_title_starts_with')
async def read_topic_by_title_starts_with(
        response: Response,
        title: Annotated[str, Query()],
        offset: Annotated[int, Query(gte=0)] = 0,
        limit: Annotated[int, Query(lt=50)] = 49,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
) -> list[TopicSchema] | None:
    service = TopicService(db)
    return service.read_topic_by_title_starts_with(response, token, title, offset, limit)


@topic.patch('/patch')
async def update_topic(
        response: Response,
        topic_data: TopicUpdateSchema,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
) -> dict[str, str]:
    service = TopicService(db)
    return service.update_topic(response, token, topic_data)


@topic.delete('/delete')
async def delete_topic(
        response: Response,
        title: Annotated[str, Query()],
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
) -> dict[str, str]:
    service = TopicService(db)
    return service.delete_topic(response, token, title)
