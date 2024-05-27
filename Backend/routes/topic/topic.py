from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.responses import Response

from dependencies import authorized_only, get_db
from routes.topic.topic_service import TopicService

topic = APIRouter(prefix="/api/topic", tags=["topic"])


@topic.post('/create')
async def create_topic(
        response: Response,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
) -> dict[str, str]:
    service = TopicService(db)
    return service.create_topic(response, token)


@topic.get('/read')
async def read_topic(
        response: Response,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
) -> dict[str, str]:
    service = TopicService(db)
    return service.read_topic(response, token)


@topic.patch('/patch')
async def update_topic(
        response: Response,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
) -> dict[str, str]:
    service = TopicService(db)
    return service.update_topic(response, token)


@topic.delete('/delete')
async def delete_topic(
        response: Response,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
) -> dict[str, str]:
    service = TopicService(db)
    return service.delete_topic(response, token)
