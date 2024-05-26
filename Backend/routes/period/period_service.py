from sqlalchemy.orm import Session
from starlette.responses import Response


class PeriodService:
    def __init__(self, db: Session):
        self.__db = db

    def create(self, response: Response, token: str):
        pass

    def read(self, response: Response, token: str):
        pass

    def update(self, response: Response, token: str):
        pass

    def delete(self, response: Response, token: str):
        pass
