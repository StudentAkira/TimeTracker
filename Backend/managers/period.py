from fastapi import HTTPException
from sqlalchemy.orm import Session
from starlette import status

from db.crud.period import get_unfinished_period_db, create_period_db, get_periods_by_topic_db
from db.models.period import Period
from db.models.topic import Topic
from db.schemas.period.period import PeriodSchema
from db.schemas.period.period_read_request import PeriodReadRequestSchema
from db.schemas.period.period_read_response import PeriodReadResponseSchema


class PeriodManager:
    def __init__(self, db: Session):
        self.__db = db

        self.__previous_period_unfinished_error = "previous period unfinished"

    def create(self, topic_db: Topic, period_data: PeriodSchema):
        unfinished_period_db = self.get_unfinished_period(topic_db)
        self.check_if_unfinished_period_exists(unfinished_period_db)
        create_period_db(self.__db, topic_db, period_data)

    def read(self, topic_db: Topic, offset: int, limit: int) -> list[PeriodReadResponseSchema]:
        return [
            PeriodReadResponseSchema.from_orm(period_db)
            for period_db in get_periods_by_topic_db(self.__db, topic_db, offset, limit)
        ]

    def update(self):
        pass

    def delete(self):
        pass

    def get_unfinished_period(self, topic_db: Topic):
        period_db = get_unfinished_period_db(self.__db, topic_db)
        return period_db

    def check_if_unfinished_period_exists(self, period_db: Period | None):
        if period_db:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail={"error": self.__previous_period_unfinished_error}
            )
