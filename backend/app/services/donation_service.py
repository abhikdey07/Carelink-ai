from sqlalchemy.orm import Session

from app.models.donation import Donation
from app.models.donation_item import DonationItem

from app.schemas.donation_schema import DonationCreate

from app.services.matching_service import generate_matches


def create_donation(
    data: DonationCreate,
    db: Session,
):

    donation = Donation(

        donor_id=data.donor_id,

        latitude=data.latitude,

        longitude=data.longitude,

    )

    db.add(donation)
    db.commit()
    db.refresh(donation)

    for item in data.items:

        donation_item = DonationItem(

            donation_id=donation.id,

            item_name=item.item_name,

            quantity=item.quantity,

            confidence=item.confidence,

            condition=item.condition,

        )

        db.add(donation_item)

    db.commit()

    generate_matches(
        donation.id,
        db,
    )

    return {

        "id": donation.id,

        "donor_id": donation.donor_id,

        "status": donation.status,

        "message": "Donation submitted successfully. Matching completed.",

    }