from sqlalchemy.orm import Session


class TopicManager:
    def __init__(self, db: Session):
        self.__db = db
