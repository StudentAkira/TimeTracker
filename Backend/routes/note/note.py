from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.responses import Response

from db.schemas.note.note import NoteSchema
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
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db)
) -> dict[str, str]:
    service = NoteService(db)
    return service.read(response, token)


@note.put("/update")
async def update_note(
        response: Response,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db)
) -> dict[str, str]:
    service = NoteService(db)
    return service.update(response, token)


@note.delete("/delete")
async def delete_note(
        response: Response,
        token: str = Depends(authorized_only),
        db: Session = Depends(get_db)
) -> dict[str, str]:
    service = NoteService(db)
    return service.delete(response, token)

