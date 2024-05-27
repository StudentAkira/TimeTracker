from typing import cast

from sqlalchemy import and_
from sqlalchemy.orm import Session

from db.models.period import Period
from db.models.topic import Topic
from db.schemas.period.period import PeriodSchema


def create_period_db(db: Session, topic_db: Topic, period_data: PeriodSchema):
    period_db = Period(
        start_time=period_data.start_time
    )
    topic_db.periods.append(period_db)
    db.add(period_db)
    db.commit()


def get_unfinished_period_db(db: Session, topic_db: Topic) -> Period | None:
    unfinished_period_db = db.query(Period).filter(and_(
        Period.topic_id == topic_db.id,
        Period.finished == False
    )
    ).first()
    return unfinished_period_db


def get_periods_by_topic_db(db: Session, topic_db: Topic, offset: int, limit: int) -> list[type(Period)]:
    periods = db.query(Period).filter(cast("ColumnElement[bool]", Period.topic_id == topic_db.id)).\
        offset(offset).limit(limit).all()
    return periods
