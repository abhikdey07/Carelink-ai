from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime,
    ForeignKey,
)

from datetime import datetime

from sqlalchemy.orm import relationship

from app.database.database import Base


class DonorNotification(Base):

    __tablename__ = "donor_notifications"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    donor_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    donation_id = Column(
        Integer,
        ForeignKey("donations.id"),
        nullable=False,
    )

    match_id = Column(
        Integer,
        ForeignKey("matches.id"),
        nullable=False,
    )

    title = Column(
        String(150),
        nullable=False,
    )

    message = Column(
        String(500),
        nullable=False,
    )

    is_read = Column(
        Boolean,
        default=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    donor = relationship(
        "User",
    )

    donation = relationship(
        "Donation",
    )

    match = relationship(
        "Match",
    )