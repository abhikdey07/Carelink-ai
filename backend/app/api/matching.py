from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.services.matching_service import generate_matches

from app.models.match import Match
from app.models.donation import Donation
from app.models.demand import Demand
from app.models.donation_item import DonationItem
from app.models.donor_notification import DonorNotification

router = APIRouter(
    prefix="/matching",
    tags=["Matching Engine"],
)


@router.post("/{donation_id}")
def match_donation(
    donation_id: int,
    db: Session = Depends(get_db),
):

    matches = generate_matches(
        donation_id,
        db,
    )

    return {
        "matches": len(matches),
    }


@router.put("/accept/{match_id}")
def accept_match(
    match_id: int,
    db: Session = Depends(get_db),
):

    match = (
        db.query(Match)
        .filter(
            Match.id == match_id
        )
        .first()
    )

    if match is None:
        return {
            "message": "Match not found"
        }

    match.status = "Accepted"

    (
        db.query(Match)
        .filter(
            Match.donation_id == match.donation_id,
            Match.id != match.id,
        )
        .update(
            {
                Match.status: "Rejected"
            },
            synchronize_session=False,
        )
    )

    donation = (
        db.query(Donation)
        .filter(
            Donation.id == match.donation_id
        )
        .first()
    )

    if donation:

        donation.status = "Accepted"

        notification = DonorNotification(

            donor_id=donation.donor_id,

            donation_id=donation.id,

            match_id=match.id,

            title="Donation Accepted",

            message=(
                "Your donation has been accepted by the NGO. "
                "Please complete the packaging checklist and schedule a pickup."
            ),

        )

        db.add(notification)

    donation_item = (
        db.query(DonationItem)
        .filter(
            DonationItem.id == match.donation_item_id
        )
        .first()
    )

    if donation_item:

        demand = (
            db.query(Demand)
            .filter(
                Demand.ngo_id == match.ngo_id,
                Demand.item_name == donation_item.item_name,
                Demand.status == "Active",
            )
            .first()
        )

        if demand:
            demand.status = "Completed"

    db.commit()

    return {
        "message": "Donation accepted"
    }


@router.put("/reject/{match_id}")
def reject_match(
    match_id: int,
    db: Session = Depends(get_db),
):

    match = (
        db.query(Match)
        .filter(
            Match.id == match_id
        )
        .first()
    )

    if match is None:
        return {
            "message": "Match not found"
        }

    match.status = "Rejected"

    donation = (
        db.query(Donation)
        .filter(
            Donation.id == match.donation_id
        )
        .first()
    )

    if donation:
        donation.status = "Rejected"

    db.commit()

    return {
        "message": "Donation rejected"
    }