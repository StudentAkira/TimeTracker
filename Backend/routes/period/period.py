from typing import Annotated

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from starlette.responses import Response

from db.schemas.period.period import PeriodSchema
from db.schemas.period.period_delete import PeriodDeleteSchema
from db.schemas.period.period_patch_end_time import PeriodPatchEndTimeSchema
from db.schemas.period.period_read_request import PeriodReadRequestSchema
from db.schemas.period.period_read_response import PeriodReadResponseSchema
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
) -> list[PeriodReadResponseSchema]:
    service = PeriodService(db)
    return service.read(response, token, period_data, offset, limit)


@period.get("/read_last_unfinished")
async def read_last_unfinished_period(
        response: Response,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
) -> PeriodReadResponseSchema | None:
    service = PeriodService(db)
    return service.read_last_unfinished(response, token)


@period.patch("/patch_end_time", deprecated=True)
async def update_end_time_period(
        response: Response,
        period_data: PeriodPatchEndTimeSchema,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
):
    service = PeriodService(db)
    return service.update_end_time(response, token, period_data)


@period.post("/finish")
async def finish_period(
        response: Response,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
):
    service = PeriodService(db)
    return service.finish_period(response, token)


@period.delete("/delete")
async def delete_period(
        response: Response,
        period_data: PeriodDeleteSchema,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
):
    service = PeriodService(db)
    return service.delete(response, token, period_data)
