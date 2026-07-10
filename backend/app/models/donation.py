from sqlalchemy import Column, Integer, ForeignKey, DateTime, String
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database.database import Base


class Donation(Base):
    __tablename__ = "donations"

    id = Column(Integer, primary_key=True, index=True)

    donor_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    donated_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    status = Column(
        String(30),
        default="Pending"
    )

    items = relationship(
        "DonationItem",
        back_populates="donation",
        cascade="all, delete"
    )