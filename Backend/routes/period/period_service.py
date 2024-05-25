from sqlalchemy.orm import Session


class PeriodService:
    def __init__(self, db: Session):
        self.__db = db
