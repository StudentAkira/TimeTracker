from sqlalchemy.orm import Session
from starlette.responses import Response

from db.schemas.period.period import PeriodSchema
from db.schemas.period.period_delete import PeriodDeleteSchema
from db.schemas.period.period_patch_end_time import PeriodPatchEndTimeSchema
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
        self.__period_end_time_updated_message = "period end time updated"
        self.__period_finished_message = "period finished"
        self.__period_deleted_message = "period deleted"

    def create(self, response: Response, token: str, period_data: PeriodSchema):
        decoded_token = self.__token_manager.decode_token(token, response)
        user_db = self.__user_manager.get_user_by_id_or_raise_if_not_found(decoded_token.user_id)
        topic_db = self.__topic_manager.get_topic_by_title_and_user_id(decoded_token.user_id, period_data.topic_title)
        period_db = self.__period_manager.get_period_by_title_and_user(user_db, period_data.title)
        self.__period_manager.raise_exception_if_period_already_exists(period_db)
        self.__topic_manager.raise_exception_if_topic_does_not_exists(topic_db)
        self.__period_manager.create(topic_db, user_db, period_data)
        return {"message": self.__period_created_message}

    def read(self, response: Response, token: str, period_data: PeriodReadRequestSchema, offset: int, limit: int) \
            -> list[PeriodReadResponseSchema]:
        decoded_token = self.__token_manager.decode_token(token, response)
        topic_db = self.__topic_manager.get_topic_by_title_and_user_id(decoded_token.user_id, period_data.topic_title)
        self.__topic_manager.raise_exception_if_topic_does_not_exists(topic_db)
        return self.__period_manager.read(topic_db, offset, limit)

    def read_last_unfinished(self, response: Response, token: str) -> PeriodReadResponseSchema | None:
        decoded_token = self.__token_manager.decode_token(token, response)
        user_db = self.__user_manager.get_user_by_id_or_raise_if_not_found(decoded_token.user_id)
        if not user_db.last_unfinished_period:
            return None
        return PeriodReadResponseSchema.from_orm(user_db.last_unfinished_period)

    def update(self, response: Response, token: str):
        pass

    def delete(self, response: Response, token: str, period_data: PeriodDeleteSchema):
        decoded_token = self.__token_manager.decode_token(token, response)
        user_db = self.__user_manager.get_user_by_id_or_raise_if_not_found(decoded_token.user_id)
        period_db = self.__period_manager.get_or_raise_exception_if_period_does_not_exists(user_db, period_data.title)
        self.__period_manager.delete(period_db)
        return {"message": self.__period_deleted_message}

    def update_end_time(self, response: Response, token: str, period_data: PeriodPatchEndTimeSchema):
        decoded_token = self.__token_manager.decode_token(token, response)
        period_db = self.__period_manager.get_or_raise_exception_if_period_does_not_exists(period_data.id)
        self.__period_manager.raise_exception_if_period_ownership_wrong(decoded_token.user_id, period_db)
        self.__period_manager.update_end_time(period_db)
        return {"message": self.__period_end_time_updated_message}

    def finish_period(self, response: Response, token: str):
        decoded_token = self.__token_manager.decode_token(token, response)
        user_db = self.__user_manager.get_user_by_id_or_raise_if_not_found(decoded_token.user_id)
        self.__period_manager.raise_exception_if_period_already_finished(user_db.last_unfinished_period)
        self.__period_manager.finish_period(user_db)
        return {"message": self.__period_finished_message}

