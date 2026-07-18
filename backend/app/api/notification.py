from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.notification import Notification
from app.models.pickup_schedule import PickupSchedule

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"],
)


@router.get("/{ngo_id}")
def get_notifications(
    ngo_id: int,
    db: Session = Depends(get_db),
):

    notifications = (
        db.query(Notification)
        .filter(Notification.ngo_id == ngo_id)
        .order_by(Notification.created_at.desc())
        .all()
    )

    data = []

    for notification in notifications:

        pickup = (
            db.query(PickupSchedule)
            .filter(
                PickupSchedule.match_id == notification.match_id
            )
            .first()
        )

        data.append(
            {
                "id": notification.id,
                "ngo_id": notification.ngo_id,
                "donation_id": notification.donation_id,
                "match_id": notification.match_id,
                "title": notification.title,
                "message": notification.message,
                "is_read": notification.is_read,
                "created_at": notification.created_at,

                "pickup_date": pickup.pickup_date if pickup else None,
                "pickup_time": pickup.pickup_time if pickup else None,
                "delivery_status": pickup.status if pickup else "Pending",
            }
        )

    return data


@router.put("/read/{notification_id}")
def mark_as_read(
    notification_id: int,
    db: Session = Depends(get_db),
):

    notification = (
        db.query(Notification)
        .filter(Notification.id == notification_id)
        .first()
    )

    if notification is None:
        return {
            "message": "Notification not found"
        }

    notification.is_read = True

    db.commit()

    return {
        "message": "Notification marked as read"
    }