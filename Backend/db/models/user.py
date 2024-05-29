from typing import TYPE_CHECKING

from pydantic import EmailStr
from sqlalchemy import Column, Integer, String
from phonenumbers import PhoneNumber
from sqlalchemy.orm import Mapped, relationship

from db.database import Base


if TYPE_CHECKING:
    from db.models.token import Token
    from db.models.note import Note
    from db.models.topic import Topic
    from db.models.subject import Subject


class User(Base):
    __tablename__ = "users"

    id: int = Column(Integer, unique=True, primary_key=True, autoincrement=True)

    username: str = Column(String, unique=True, nullable=False)
    hashed_password: str = Column(String, nullable=False)

    first_name: str = Column(String, unique=False, nullable=False)
    second_name: str = Column(String, unique=False, nullable=False)
    third_name: str = Column(String, unique=False, nullable=False)

    tokens: Mapped[list["Token"]] = relationship("Token", cascade="all,delete", back_populates="owner")
    notes: Mapped[list["Note"]] = relationship("Note", cascade="all,delete", back_populates="owner")
    topics: Mapped[list["Topic"]] = relationship("Topic", cascade="all,delete", back_populates="owner")
    subjects: Mapped[list["Subject"]] = relationship("Subject", cascade="all,delete", back_populates="owner")
