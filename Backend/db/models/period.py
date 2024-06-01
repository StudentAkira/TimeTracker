from typing import TYPE_CHECKING

from sqlalchemy import Column, ForeignKey, Integer, DateTime, Boolean, String
from sqlalchemy.orm import Mapped, relationship

from db.database import Base

if TYPE_CHECKING:
    from db.models.topic import Topic


class Period(Base):
    __tablename__ = "period"

    id: int = Column(Integer, unique=True, primary_key=True, autoincrement=True)

    title: str = Column(String, unique=True, index=True, nullable=False)  # may be auto generation
    description: str = Column(String, primary_key=True, nullable=False)

    start_time: DateTime = Column(DateTime, nullable=False)
    end_time: DateTime = Column(DateTime, nullable=True)

    topic_id: int = Column(Integer, ForeignKey("topic.id"), nullable=False)
    active_user_id: int = Column(Integer, ForeignKey("users.id"), nullable=True)

    topic: Mapped["Topic"] = relationship("Topic", back_populates="periods")
    active_user: Mapped["Period"] = relationship("User", back_populates="last_unfinished_period")
