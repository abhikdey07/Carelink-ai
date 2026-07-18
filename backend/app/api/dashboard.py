from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.services.dashboard_service import (
    get_dashboard_stats,
    get_all_donations,
)

from app.services.ngo_dashboard_service import (
    get_ngo_dashboard,
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


# ---------------- DONOR ----------------

@router.get("/stats/{user_id}")
def dashboard_stats(
    user_id: int,
    db: Session = Depends(get_db),
):
    return get_dashboard_stats(
        user_id,
        db,
    )


@router.get("/history/{user_id}")
def donation_history(
    user_id: int,
    db: Session = Depends(get_db),
):
    return get_all_donations(
        user_id,
        db,
    )


# ---------------- NGO ----------------

@router.get("/ngo/{ngo_id}")
def ngo_dashboard(
    ngo_id: int,
    db: Session = Depends(get_db),
):
    return get_ngo_dashboard(
        ngo_id,
        db,
    )