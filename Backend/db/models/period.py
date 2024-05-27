from typing import TYPE_CHECKING

from sqlalchemy import Column, ForeignKey, Integer, DateTime, Boolean
from sqlalchemy.orm import Mapped, relationship

from db.database import Base

if TYPE_CHECKING:
    from db.models.topic import Topic


class Period(Base):
    __tablename__ = "period"

    id: int = Column(Integer, unique=True, primary_key=True, autoincrement=True)

    start_time: DateTime = Column(DateTime, nullable=False)
    end_time: DateTime = Column(DateTime, nullable=True)

    finished: bool = Column(Boolean, nullable=False, default=False)

    topic_id: int = Column(Integer, ForeignKey("topic.id"), nullable=False)
    topic: Mapped["Topic"] = relationship("Topic", back_populates="periods")
