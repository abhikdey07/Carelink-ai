from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship

from app.database.database import Base


class Demand(Base):
    __tablename__ = "demands"

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

    item_name = Column(
        String(100),
        nullable=False,
    )

    quantity_required = Column(
        Integer,
        nullable=False,
    )

    priority = Column(
        String(20),
        nullable=False,
    )

    minimum_condition = Column(
        String(20),
        nullable=False,
        default="Good",
    )

    expiry_date = Column(
        Date,
        nullable=False,
    )

    status = Column(
        String(20),
        default="Open",
    )

    ngo = relationship(
        "NGOProfile",
        back_populates="demands",
    )