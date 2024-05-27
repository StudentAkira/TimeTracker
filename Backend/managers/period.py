from fastapi import HTTPException
from sqlalchemy.orm import Session
from starlette import status

from db.crud.period import get_unfinished_period_db, create_period_db, get_periods_by_topic_db, get_period_by_id_db, \
    update_end_time_db, finish_period_db, delete_period_db
from db.models.period import Period
from db.models.topic import Topic
from db.schemas.period.period import PeriodSchema
from db.schemas.period.period_finish import PeriodFinishSchema
from db.schemas.period.period_read_request import PeriodReadRequestSchema
from db.schemas.period.period_read_response import PeriodReadResponseSchema


class PeriodManager:
    def __init__(self, db: Session):
        self.__db = db

        self.__previous_period_unfinished_error = "previous period unfinished"
        self.__period_ownership_wrong_error = "period ownership wrong"
        self.__period_not_found_error = "period not found"

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

    def delete(self, period_db: Period):
        delete_period_db(self.__db, period_db)

    def update_end_time(self, period_db, period_data):
        update_end_time_db(self.__db, period_db, period_data)

    def get_unfinished_period(self, topic_db: Topic) -> Period | None:
        period_db = get_unfinished_period_db(self.__db, topic_db)
        return period_db

    def check_if_unfinished_period_exists(self, period_db: Period | None):
        if period_db:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail={"error": self.__previous_period_unfinished_error}
            )

    def raise_exception_if_period_ownership_wrong(self, user_id: int, period_db: Period):
        if period_db.topic.owner_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail={"error": self.__period_ownership_wrong_error}
            )

    def get_or_raise_exception_if_period_does_not_exists(self, period_id: int) -> Period:
        period_db = get_period_by_id_db(self.__db, period_id)
        if not period_db:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"error": self.__period_not_found_error}
            )
        return period_db

    def finish_period(self, period_db: Period):
        finish_period_db(self.__db, period_db)
