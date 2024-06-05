from fastapi import HTTPException
from sqlalchemy.orm import Session
from starlette import status

from db.crud.subject import get_subject_by_user_id_title_db, create_subject_db, read_subjects_by_owner_db, \
    update_subject_db, \
    delete_subject_db, append_topic_to_subject_db, remove_topic_from_subject_db, read_all_topic_by_subject_db, \
    read_subject_by_title_db, get_user_subjects_starts_with_db
from db.models.subject import Subject
from db.models.topic import Topic
from db.models.user import User
from db.schemas.subject.subject import SubjectSchema
from db.schemas.subject.subject_create import SubjectCreateSchema
from db.schemas.subject.subject_full_data import SubjectFullDataSchema
from db.schemas.subject.subject_update import SubjectUpdateSchema
from db.schemas.topic.topic import TopicSchema


class SubjectManager:
    def __init__(self, db: Session):
        self.__db = db

        self.__subject_already_exists_error = "subject already exists"
        self.__subject_not_found_error = "subject not found"
        self.__topic_not_in_subject_error = "topic not in subject"
        self.__topic_already_in_subject_error = "topic already in subject"

    def create(self, user_db: User, subject_data: SubjectCreateSchema):
        create_subject_db(self.__db, user_db, subject_data)

    def read(self, user_db: User, offset: int, limit: int) -> list[SubjectSchema]:
        return [SubjectSchema.from_orm(subject_db)
                for subject_db in read_subjects_by_owner_db(self.__db, user_db, offset, limit)]

    def read_by_title(self, user_db: User, title: str) -> SubjectFullDataSchema | None:
        subject_db = read_subject_by_title_db(self.__db, user_db, title)
        if not subject_db:
            return None
        return SubjectFullDataSchema(
            title=subject_db.title,
            description=subject_db.description,
            total_hours=sum([topic_db.total_hours for topic_db in subject_db.topics]),
            topics=[TopicSchema.from_orm(topic_db) for topic_db in subject_db.topics]
        )

    def update(self, existing_subject_db: Subject, subject_data: SubjectUpdateSchema):
        update_subject_db(self.__db, existing_subject_db, subject_data)

    def delete(self, subject_db: Subject):
        delete_subject_db(self.__db, subject_db)

    def append(self, subject_db: Subject, topic_db: Topic):
        append_topic_to_subject_db(self.__db, subject_db, topic_db)

    def remove(self, subject_db: Subject, topic_db: Topic):
        remove_topic_from_subject_db(self.__db, subject_db, topic_db)

    def get_subject_by_user_id_title(self, title: str, user_id: int):
        subject_db = get_subject_by_user_id_title_db(self.__db, title, user_id)
        return subject_db

    def read_all_topic_by_subject(self, subject_db: Subject) -> list[TopicSchema]:
        topics_db = read_all_topic_by_subject_db(self.__db, subject_db)
        return [TopicSchema.from_orm(topic_db) for topic_db in topics_db]

    def get_user_subjects_with_title_starts_with(self, user_db : User, title: str, offset: int, limit: int) -> list[SubjectSchema]:
        subjects_db = get_user_subjects_starts_with_db(self.__db, user_db, title, offset, limit)
        return [SubjectSchema(
            title=subject_db.title,
            description=subject_db.description,
            total_hours=sum([topic_db.total_hours for topic_db in subject_db.topics])
        ) for subject_db in subjects_db]


    def raise_exception_if_subject_owner_wrong(self, user_db: User, subject_db: Subject):
        if subject_db not in user_db.subjects:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail={"error": self.__subject_not_found_error}
            )

    def raise_exception_if_subject_title_taken(self, subject_db: Subject | None):
        if subject_db:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail={"error": self.__subject_already_exists_error}
            )

    def raise_exception_if_subject_not_found(self, subject_db: Subject | None):
        if not subject_db:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"error": self.__subject_not_found_error}
            )

    def raise_exception_if_topic_not_in_list(self, subject_db: Subject, topic_db: Topic):
        if topic_db not in subject_db.topics:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"error": self.__topic_not_in_subject_error}
            )

    def raise_exception_if_topic_in_list(self, subject_db: Subject, topic_db: Topic):
        if topic_db in subject_db.topics:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"error": self.__topic_already_in_subject_error}
            )




