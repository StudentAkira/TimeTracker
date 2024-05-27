from sqlalchemy.orm import Session
from starlette.responses import Response

from db.schemas.period.period import PeriodSchema
from db.schemas.period.period_read_request import PeriodReadRequestSchema
from db.schemas.period.period_read_response import PeriodReadResponseSchema
from managers.period import PeriodManager
from managers.token import TokenManager
from managers.topic import TopicManager
from managers.user import UserManager


class PeriodService:
    def __init__(self, db: Session):
        self.__db = db

        self.__user_manager = UserManager(self.__db)
        self.__token_manager = TokenManager(self.__db)
        self.__topic_manager = TopicManager(self.__db)
        self.__period_manager = PeriodManager(self.__db)

        self.__period_created_message = "period created"

    def create(self, response: Response, token: str, period_data: PeriodSchema):
        decoded_token = self.__token_manager.decode_token(token, response)
        topic_db = self.__topic_manager.get_topic_by_title_and_user_id(decoded_token.user_id, period_data.topic_title)
        self.__period_manager.create(topic_db, period_data)
        return {"message": self.__period_created_message}

    def read(self, response: Response, token: str, period_data: PeriodReadRequestSchema, offset: int, limit: int) \
            -> list[PeriodReadResponseSchema]:
        decoded_token = self.__token_manager.decode_token(token, response)
        topic_db = self.__topic_manager.get_topic_by_title_and_user_id(decoded_token.user_id, period_data.topic_title)
        return self.__period_manager.read(topic_db, offset, limit)

    def update(self, response: Response, token: str):
        pass

    def delete(self, response: Response, token: str):
        pass
