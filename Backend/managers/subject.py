from fastapi import HTTPException
from sqlalchemy.orm import Session
from starlette import status

from db.crud.subject import get_subject_by_title_db, create_subject_db, read_subjects_by_owner_db, update_subject_db, \
    delete_subject_db
from db.models.subject import Subject
from db.models.user import User
from db.schemas.subject.subject import SubjectSchema
from db.schemas.subject.subject_update import SubjectUpdateSchema





class SubjectManager:
    def __init__(self, db: Session):
        self.__db = db

        self.__subject_already_exists_error = "subject already exists"
        self.__subject_not_found_error = "subject not found"

    def create(self, user_db: User, subject_data: SubjectSchema):
        create_subject_db(self.__db, user_db, subject_data)

    def read(self, user_db: User, offset: int, limit: int) -> list[SubjectSchema]:
        return [SubjectSchema.from_orm(subject_db)
                for subject_db in read_subjects_by_owner_db(self.__db, user_db, offset, limit)]

    def update(self, existing_subject_db: Subject, subject_data: SubjectUpdateSchema):
        update_subject_db(self.__db, existing_subject_db, subject_data)

    def delete(self, subject_db: Subject):
        delete_subject_db(self.__db, subject_db)

    def get_subject_by_title(self, title: str):
        subject_db = get_subject_by_title_db(self.__db, title)
        return subject_db

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

