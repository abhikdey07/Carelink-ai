from sqlalchemy import (
    Column,
    Integer,
    Float,
    String,
    ForeignKey,
    DateTime,
)
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database.database import Base


class Match(Base):
    __tablename__ = "matches"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    donation_id = Column(
        Integer,
        ForeignKey("donations.id"),
        nullable=False,
    )

    donation_item_id = Column(
        Integer,
        ForeignKey("donation_items.id"),
        nullable=False,
    )

    ngo_id = Column(
        Integer,
        ForeignKey("ngo_profiles.id"),
        nullable=False,
    )

    score = Column(
        Float,
        nullable=False,
    )

    item_score = Column(
        Float,
        nullable=False,
    )

    quantity_score = Column(
        Float,
        nullable=False,
    )

    priority_score = Column(
        Float,
        nullable=False,
    )

    condition_score = Column(
        Float,
        nullable=False,
        default=0,
    )

    distance_score = Column(
        Float,
        nullable=False,
    )

    distance_km = Column(
        Float,
        nullable=True,
    )

    match_reason = Column(
        String(500),
        nullable=False,
    )
    status = Column(
    String(20),
    nullable=False,
    default="Pending",
)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    donation = relationship(
        "Donation",
    )

    donation_item = relationship(
        "DonationItem",
    )

    ngo = relationship(
        "NGOProfile",
    )