from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.services.matching_service import generate_matches
from app.services.email_service import send_email

from app.models.match import Match
from app.models.donation import Donation
from app.models.demand import Demand
from app.models.donation_item import DonationItem
from app.models.donor_notification import DonorNotification
from app.models.user import User
from app.models.ngo_profile import NGOProfile

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

    ngo = (
        db.query(NGOProfile)
        .filter(
            NGOProfile.id == match.ngo_id
        )
        .first()
    )

    donor = None

    if donation:
        donor = (
            db.query(User)
            .filter(
                User.id == donation.donor_id
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
    
    if donor and donor.email and donation_item and ngo:

        body = f"""
<p>Hello <b>{donor.full_name}</b>,</p>

<p>
Great news! Your donation has been accepted by
<b>{ngo.organization_name}</b>.
</p>

<table style="width:100%;border-collapse:collapse;">

<tr>
<td><b>Item</b></td>
<td>{donation_item.item_name}</td>
</tr>

<tr>
<td><b>Quantity</b></td>
<td>{donation_item.quantity}</td>
</tr>

<tr>
<td><b>Condition</b></td>
<td>{donation_item.condition}</td>
</tr>

</table>

<p>
Please log in to CareLink AI and complete the packaging checklist and pickup scheduling.
</p>
"""

        send_email(
            recipient=donor.email,
            subject="Donation Accepted",
            heading="🎉 Your Donation Has Been Accepted",
            body=body,
        )

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
        