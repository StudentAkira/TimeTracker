from sqlalchemy.orm import Session
from starlette.responses import Response


class TopicService:
    def __init__(self, db: Session):
        self.__db = db

    def create_topic(self, response: Response, token: str) -> dict[str, str]:
        pass

    def read_topic(self, response: Response, token: str) -> dict[str, str]:
        pass

    def update_topic(self, response: Response, token: str) -> dict[str, str]:
        pass

    def delete_topic(self, response: Response, token: str) -> dict[str, str]:
        pass
