from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date, time

from app.database.session import get_db

from app.models.pickup_schedule import PickupSchedule
from app.models.match import Match
from app.models.donation import Donation
from app.models.notification import Notification

router = APIRouter(
    prefix="/pickup",
    tags=["Pickup Schedule"],
)


@router.post("/{match_id}")
def schedule_pickup(
    match_id: int,
    pickup_date: date,
    pickup_time: time,
    db: Session = Depends(get_db),
):

    match = (
        db.query(Match)
        .filter(Match.id == match_id)
        .first()
    )

    if match is None:
        return {
            "message": "Match not found"
        }

    pickup = PickupSchedule(

        match_id=match_id,

        pickup_date=pickup_date,

        pickup_time=pickup_time,

        volunteer_name=None,

        volunteer_phone=None,

        status="Scheduled",

    )

    db.add(pickup)

    donation = (
        db.query(Donation)
        .filter(
            Donation.id == match.donation_id
        )
        .first()
    )

    if donation:
        donation.status = "Pickup Scheduled"

    notification = Notification(

        ngo_id=match.ngo_id,

        donation_id=match.donation_id,

        match_id=match.id,

        title="Pickup Scheduled",

        message="The donor has scheduled a pickup. Please assign a delivery partner.",

    )

    db.add(notification)

    db.commit()

    db.refresh(pickup)

    return {
        "message": "Pickup Scheduled",
        "pickup_id": pickup.id,
    }


@router.get("/{match_id}")
def get_pickup(
    match_id: int,
    db: Session = Depends(get_db),
):

    pickup = (
        db.query(PickupSchedule)
        .filter(
            PickupSchedule.match_id == match_id
        )
        .first()
    )

    if pickup is None:
        return {
            "message": "No pickup scheduled"
        }

    return pickup