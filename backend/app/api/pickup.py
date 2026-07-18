from datetime import date, time

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.models.pickup_schedule import PickupSchedule
from app.models.match import Match
from app.models.donation import Donation
from app.models.notification import Notification
from app.models.ngo_profile import NGOProfile
from app.models.user import User

from app.services.email_service import send_email

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

    ngo = (
        db.query(NGOProfile)
        .filter(
            NGOProfile.id == match.ngo_id
        )
        .first()
    )

    if ngo:

        ngo_user = (
            db.query(User)
            .filter(
                User.id == ngo.user_id
            )
            .first()
        )

        if ngo_user and ngo_user.email:

            body = f"""
<p>Hello <b>{ngo.organization_name}</b>,</p>

<p>
A donor has scheduled the pickup for an accepted donation.
</p>

<table style="width:100%;border-collapse:collapse;">

<tr>
<td><b>Pickup Date</b></td>
<td>{pickup_date}</td>
</tr>

<tr>
<td><b>Pickup Time</b></td>
<td>{pickup_time}</td>
</tr>

</table>

<p>
Please log in to CareLink AI and assign a delivery partner.
</p>
"""

            send_email(
                recipient=ngo_user.email,
                subject="Pickup Scheduled",
                heading="📦 Pickup Scheduled",
                body=body,
            )

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