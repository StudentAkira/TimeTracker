import datetime
from typing import cast

from sqlalchemy import and_
from sqlalchemy.orm import Session

from db.models.period import Period
from db.models.topic import Topic
from db.schemas.period.period_patch_end_time import PeriodPatchEndTimeSchema
from utils.date_util import DateUtil


def create_period_db(db: Session, topic_db: Topic):
    date_util = DateUtil()
    period_db = Period(
        start_time=datetime.datetime.now(),
        end_time=datetime.datetime.now() + datetime.timedelta(seconds=1)
    )
    topic_db.total_hours += date_util.get_difference_in_hours(period_db.end_time, period_db.start_time)
    topic_db.periods.append(period_db)
    topic_db.owner.last_unfinished_period = period_db
    db.add(period_db)
    db.add(topic_db)
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


def get_period_by_id_db(db: Session, period_id: int) -> Period | None:
    period_db = db.query(Period).filter(cast("ColumnElement[bool]", Period.id == period_id)).first()
    return period_db


def update_end_time_db(db: Session, period_db: Period):
    date_util = DateUtil()
    period_db.topic.total_hours -= date_util.get_difference_in_hours(period_db.end_time, period_db.start_time)
    period_db.end_time = datetime.datetime.now()
    period_db.topic.total_hours += date_util.get_difference_in_hours(period_db.end_time, period_db.start_time)
    db.add(period_db)
    db.commit()


def finish_period_db(db: Session, period_db: Period):
    period_db.end_time = datetime.datetime.now()
    period_db.finished = True
    date_util = DateUtil()
    period_db.topic.total_hours = date_util.get_difference_in_hours(period_db.end_time, period_db.start_time)
    period_db.user_started = None
    db.add(period_db)
    db.commit()


def delete_period_db(db: Session, period_db: Period):
    date_util = DateUtil()
    period_db.topic.total_hours -= date_util.get_difference_in_hours(period_db.end_time, period_db.start_time)
    db.delete(period_db)
    db.commit()


