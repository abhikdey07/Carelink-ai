from sqlalchemy import Column, Integer, Float, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.database import Base


class DonationItem(Base):
    __tablename__ = "donation_items"

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

    item_name = Column(
        String(100),
        nullable=False,
    )

    quantity = Column(
        Integer,
        nullable=False,
    )

    confidence = Column(
        Float,
        nullable=False,
    )

    condition = Column(
        String(20),
        nullable=False,
        default="Good",
    )

    donation = relationship(
        "Donation",
        back_populates="items",
    )