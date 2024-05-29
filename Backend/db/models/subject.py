from typing import TYPE_CHECKING

from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import Mapped, relationship

from db.database import Base

if TYPE_CHECKING:
    from db.models.user import User
    from db.models.topic import Topic


class Subject(Base):
    __tablename__ = "subject"

    id: int = Column(Integer, unique=True, primary_key=True, autoincrement=True)

    title: str = Column(String, unique=True, index=True, nullable=False)#may be auto generation
    description: str = Column(String, primary_key=True, nullable=False)

    owner_id: int = Column(Integer, ForeignKey("users.id"), nullable=False)

    topics: Mapped[list["Topic"]] = relationship("Topic", back_populates="subject")
    owner: Mapped["User"] = relationship("User",  back_populates="subjects")
