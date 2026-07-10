from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.donation import Donation
from app.models.donation_item import DonationItem


def get_dashboard_stats(user_id: int, db: Session):

    total_donations = (
        db.query(Donation)
        .filter(Donation.donor_id == user_id)
        .count()
    )

    total_items = (
        db.query(
            func.coalesce(
                func.sum(DonationItem.quantity),
                0
            )
        )
        .join(Donation)
        .filter(Donation.donor_id == user_id)
        .scalar()
    )

    pending_donations = (
        db.query(Donation)
        .filter(
            Donation.donor_id == user_id,
            Donation.status == "Pending"
        )
        .count()
    )

    latest = (
        db.query(Donation)
        .filter(Donation.donor_id == user_id)
        .order_by(Donation.donated_at.desc())
        .first()
    )

    last_donation = (
        latest.donated_at.strftime("%d %b %Y")
        if latest
        else "No Donations"
    )

    recent = (
        db.query(Donation)
        .filter(Donation.donor_id == user_id)
        .order_by(Donation.donated_at.desc())
        .limit(5)
        .all()
    )

    recent_data = []

    for donation in recent:

        total = (
            db.query(
                func.coalesce(
                    func.sum(DonationItem.quantity),
                    0
                )
            )
            .filter(
                DonationItem.donation_id == donation.id
            )
            .scalar()
        )

        recent_data.append(
            {
                "id": donation.id,
                "date": donation.donated_at.strftime("%d %b %Y"),
                "status": donation.status,
                "items": total,
            }
        )

    return {

        "total_donations": total_donations,

        "total_items": total_items,

        "pending_donations": pending_donations,

        "last_donation": last_donation,

        "recent_donations": recent_data,

    }
def get_all_donations(user_id: int, db: Session):

    donations = (
        db.query(Donation)
        .filter(Donation.donor_id == user_id)
        .order_by(Donation.donated_at.desc())
        .all()
    )

    history = []

    for donation in donations:

        total = (
            db.query(
                func.coalesce(
                    func.sum(DonationItem.quantity),
                    0
                )
            )
            .filter(
                DonationItem.donation_id == donation.id
            )
            .scalar()
        )

        history.append(
            {
                "id": donation.id,
                "date": donation.donated_at.strftime("%d %b %Y"),
                "status": donation.status,
                "items": total,
            }
        )

    return history