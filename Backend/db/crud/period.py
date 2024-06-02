import datetime
from typing import cast

from sqlalchemy import and_
from sqlalchemy.orm import Session

from db.models.period import Period
from db.models.topic import Topic
from db.models.user import User
from db.schemas.period.period import PeriodSchema
from db.schemas.period.period_patch_end_time import PeriodUpdateSchema
from utils.date_util import DateUtil


def create_period_db(db: Session, topic_db: Topic, period_data: PeriodSchema):
    date_util = DateUtil()
    period_db = Period(
        start_time=datetime.datetime.now(),
        end_time=None
    )
    period_db.title = period_data.title
    period_db.description = period_data.description
    topic_db.total_hours += date_util.get_difference_in_hours(
        datetime.datetime.now() + datetime.timedelta(seconds=1),
        period_db.start_time
    )
    topic_db.periods.append(period_db)
    topic_db.owner.last_unfinished_period = period_db
    db.add(period_db)
    db.add(topic_db)
    db.commit()


def get_periods_by_topic_db(db: Session, topic_db: Topic, offset: int, limit: int) -> list[type(Period)]:
    periods = db.query(Period).filter(cast("ColumnElement[bool]", Period.topic_id == topic_db.id)).\
        offset(offset).limit(limit).all()
    return periods


def get_period_by_id_db(db: Session, period_id: int) -> Period | None:
    period_db = db.query(Period).filter(cast("ColumnElement[bool]", Period.id == period_id)).first()
    return period_db


def get_period_by_title_and_user_db(db: Session, user_db: User, period_title: str) -> Period | None:
    period_db = db.query(Period).filter(and_(
            Period.topic_id.in_(set(topic_db.id for topic_db in user_db.topics)),
            Period.title == period_title
        )
    ).first()
    return period_db


def period_update_db(db: Session, period_db: Period, topic_db: Topic | None, period_data: PeriodUpdateSchema):

    period_db.title = period_data.new_title if period_data.new_title else period_db.title
    period_db.topic = topic_db if topic_db else period_db.topic
    period_db.description = period_data.new_description if period_data.new_description else period_db.description

    db.add(period_db)
    db.commit()


def finish_period_db(db: Session, user_db: User):
    period_db = user_db.last_unfinished_period
    period_db.end_time = datetime.datetime.now()

    date_util = DateUtil()
    period_db.topic.total_hours = date_util.get_difference_in_hours(period_db.end_time, period_db.start_time)

    user_db.last_unfinished_period = None
    db.add(user_db)
    db.add(period_db)
    db.commit()


def delete_period_db(db: Session, period_db: Period):
    date_util = DateUtil()
    period_db.topic.total_hours -= date_util.get_difference_in_hours(period_db.end_time, period_db.start_time)
    db.delete(period_db)
    db.commit()


