from sqlalchemy.orm import Session

from app.models.demand import Demand
from app.models.match import Match
from app.models.notification import Notification


def get_ngo_dashboard(ngo_id: int, db: Session):

    total_demands = (
        db.query(Demand)
        .filter(Demand.ngo_id == ngo_id)
        .count()
    )

    active_demands = (
        db.query(Demand)
        .filter(
            Demand.ngo_id == ngo_id,
            Demand.status.in_(["Open", "Active"])
        )
        .count()
    )

    total_matches = (
        db.query(Match)
        .filter(
            Match.ngo_id == ngo_id,
            Match.status == "Pending",
        )
        .count()
    )

    total_notifications = (
        db.query(Notification)
        .filter(
            Notification.ngo_id == ngo_id,
            Notification.is_read == False,
        )
        .count()
    )

    recent_matches = (
        db.query(Match)
        .filter(Match.ngo_id == ngo_id)
        .order_by(Match.created_at.desc())
        .limit(5)
        .all()
    )

    match_data = []

    for match in recent_matches:

        match_data.append(
            {
                "id": match.id,
                "donation_id": match.donation_id,
                "score": match.score,
                "status": match.status,
                "reason": match.match_reason,
                "date": match.created_at.strftime("%d %b %Y %I:%M %p"),
            }
        )

    recent_notifications = (
        db.query(Notification)
        .filter(Notification.ngo_id == ngo_id)
        .order_by(Notification.created_at.desc())
        .limit(5)
        .all()
    )

    notification_data = []

    for notification in recent_notifications:

        notification_data.append(
            {
                "id": notification.id,
                "title": notification.title,
                "message": notification.message,
                "is_read": notification.is_read,
                "date": notification.created_at.strftime("%d %b %Y %I:%M %p"),
            }
        )

    return {
        "total_demands": total_demands,
        "active_demands": active_demands,
        "total_matches": total_matches,
        "total_notifications": total_notifications,
        "recent_matches": match_data,
        "recent_notifications": notification_data,
    }