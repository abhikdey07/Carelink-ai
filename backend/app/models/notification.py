from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey,
    DateTime,
)
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database.database import Base


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    ngo_id = Column(
        Integer,
        ForeignKey("ngo_profiles.id"),
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

    ngo = relationship(
        "NGOProfile",
    )

    donation = relationship(
        "Donation",
    )
    match = relationship(
    "Match",
)