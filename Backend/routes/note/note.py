from typing import Annotated

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from starlette.responses import Response

from db.schemas.note.note import NoteSchema
from db.schemas.note.note_delete import NoteDeleteSchema
from db.schemas.note.note_update import NoteUpdateSchema
from dependencies import get_db, authorized_only
from routes.note.note_service import NoteService

note = APIRouter(prefix="/api/note", tags=["note"])


@note.post("/create")
async def create_note(
        response: Response,
        note_data: NoteSchema,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db),
) -> dict[str, str]:
    service = NoteService(db)
    return service.create(response, token, note_data)


@note.get("/read")
async def read_note(
        response: Response,
        offset: Annotated[int, Query(gte=0)] = 0,
        limit: Annotated[int, Query(lt=50)] = 49,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db)
) -> list[NoteSchema]:
    service = NoteService(db)
    return service.read(response, token, offset, limit)


@note.patch("/patch")
async def update_note(
        response: Response,
        note_data: NoteUpdateSchema,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db)
) -> dict[str, str]:
    service = NoteService(db)
    return service.update(response, token, note_data)


@note.delete("/delete")
async def delete_note(
        response: Response,
        note_data: NoteDeleteSchema,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db)
) -> dict[str, str]:
    service = NoteService(db)
    return service.delete(response, token, note_data)

