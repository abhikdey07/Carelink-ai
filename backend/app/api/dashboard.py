from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.services.dashboard_service import (
    get_dashboard_stats,
    get_all_donations
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats/{user_id}")
def dashboard_stats(
    user_id: int,
    db: Session = Depends(get_db)
):
    return get_dashboard_stats(user_id, db)
@router.get("/history/{user_id}")
def donation_history(
    user_id: int,
    db: Session = Depends(get_db)
):
    return get_all_donations(user_id, db)