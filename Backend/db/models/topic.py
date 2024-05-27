from typing import TYPE_CHECKING

from sqlalchemy import Column, String, ForeignKey, Integer, UniqueConstraint, Float
from sqlalchemy.orm import Mapped, relationship

from db.database import Base

if TYPE_CHECKING:
    from db.models.user import User
    from db.models.period import Period


class Topic(Base):
    __tablename__ = "topic"

    id: int = Column(Integer, unique=True, primary_key=True, autoincrement=True)

    title: str = Column(String, index=True, nullable=False)
    description: str = Column(String, primary_key=True, nullable=False)

    total_hours: float = Column(Float, nullable=False, default=0)

    owner_id: int = Column(Integer, ForeignKey("users.id"), nullable=False)
    owner: Mapped["User"] = relationship("User", back_populates="topics")

    periods: Mapped[list["Period"]] = relationship("Period", cascade="all,delete", back_populates="topic")

    __table_args__ = (UniqueConstraint('title', 'owner_id', name='_title_owner_unique'),)
