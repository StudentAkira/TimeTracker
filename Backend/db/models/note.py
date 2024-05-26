from typing import TYPE_CHECKING

from sqlalchemy import Column, String, ForeignKey, Integer, DateTime
from sqlalchemy.orm import Mapped, relationship

from db.database import Base

if TYPE_CHECKING:
    from db.models.user import User


class Note(Base):
    __tablename__ = "note"

    id: int = Column(Integer, unique=True, primary_key=True, autoincrement=True)

    title: str = Column(String, unique=True, index=True, nullable=False)#may be auto generation
    content: str = Column(String, primary_key=True, nullable=False)
    datetime_: DateTime = Column(DateTime)

    owner_id: int = Column(Integer, ForeignKey("users.id"), nullable=False)

    owner: Mapped["User"] = relationship("User",   back_populates="notes")
