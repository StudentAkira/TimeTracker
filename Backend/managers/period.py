from sqlalchemy.orm import Session


class PeriodManager:
    def __init__(self, db: Session):
        self.__db = db
