from typing import Annotated

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from starlette.responses import Response

from db.schemas.period.period import PeriodSchema
from db.schemas.period.period_read_request import PeriodReadRequestSchema
from dependencies import get_db, authorized_only
from routes.period.period_service import PeriodService

period = APIRouter(prefix="/api/period", tags=["period"])


@period.post("/create")
async def create_period(
        response: Response,
        period_data: PeriodSchema,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
):
    service = PeriodService(db)
    return service.create(response, token, period_data)


@period.get("/read")
async def read_period(
        response: Response,
        period_data: PeriodReadRequestSchema = Depends(),
        offset: Annotated[int, Query(gte=0)] = 0,
        limit: Annotated[int, Query(lt=50)] = 49,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
):
    service = PeriodService(db)
    return service.read(response, token, period_data, offset, limit)


@period.patch("/patch")
async def update_period(
        response: Response,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
):
    service = PeriodService(db)
    return service.update(response, token)


@period.delete("/delete")
async def update_period(
        response: Response,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
):
    service = PeriodService(db)
    return service.delete(response, token)


