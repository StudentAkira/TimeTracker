from sqlalchemy.orm import Session


class TopicService:
    def __init__(self, db: Session):
        self.__db = db
