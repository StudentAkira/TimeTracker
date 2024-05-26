from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.responses import Response

from dependencies import get_db, authorized_only
from routes.period.period_service import PeriodService

period = APIRouter(prefix="/api/period", tags=["period"])


@period.post("/create")
async def create_period(
        response: Response,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
):
    service = PeriodService(db)
    return service.create(response, token)


@period.get("/read")
async def read_period(
        response: Response,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
):
    service = PeriodService(db)
    return service.read(response, token)


@period.put("/update")
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
