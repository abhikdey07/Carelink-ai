from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.donation_schema import DonationCreate

from app.services.donation_service import create_donation

router = APIRouter(
    prefix="/donations",
    tags=["Donations"]
)


@router.post("/")
def save_donation(
    donation: DonationCreate,
    db: Session = Depends(get_db)
):
    return create_donation(donation, db)