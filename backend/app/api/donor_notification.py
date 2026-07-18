from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.donor_notification import DonorNotification

router = APIRouter(
    prefix="/donor-notifications",
    tags=["Donor Notifications"],
)


@router.get("/{donor_id}")
def get_notifications(
    donor_id: int,
    db: Session = Depends(get_db),
):

    notifications = (
        db.query(DonorNotification)
        .filter(
            DonorNotification.donor_id == donor_id
        )
        .order_by(
            DonorNotification.created_at.desc()
        )
        .all()
    )

    result = []

    for n in notifications:

        result.append({

            "id": n.id,

            "donor_id": n.donor_id,

            "donation_id": n.donation_id,

            "match_id": n.match_id,

            "title": n.title,

            "message": n.message,

            "is_read": n.is_read,

            "created_at": n.created_at,

        })

    return result


@router.put("/read/{notification_id}")
def mark_read(
    notification_id: int,
    db: Session = Depends(get_db),
):

    notification = (
        db.query(DonorNotification)
        .filter(
            DonorNotification.id == notification_id
        )
        .first()
    )

    if notification:

        notification.is_read = True

        db.commit()

    return {
        "message": "Notification updated"
    }
@router.put("/read-by-match/{match_id}")
def mark_read_by_match(
    match_id: int,
    db: Session = Depends(get_db),
):

    notification = (
        db.query(DonorNotification)
        .filter(
            DonorNotification.match_id == match_id,
            DonorNotification.is_read == False
        )
        .first()
    )

    if notification:
        notification.is_read = True
        db.commit()

    return {
        "message": "Notification marked as read."
    }