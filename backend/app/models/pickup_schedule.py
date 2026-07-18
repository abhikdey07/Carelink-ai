from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    Time,
    ForeignKey,
)

from sqlalchemy.orm import relationship

from app.database.database import Base


class PickupSchedule(Base):
    __tablename__ = "pickup_schedules"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    match_id = Column(
        Integer,
        ForeignKey("matches.id"),
        nullable=False,
        unique=True,
    )

    pickup_date = Column(
        Date,
        nullable=False,
    )

    pickup_time = Column(
        Time,
        nullable=False,
    )

    volunteer_name = Column(
        String(100),
        nullable=True,
    )

    volunteer_phone = Column(
        String(20),
        nullable=True,
    )

    status = Column(
        String(30),
        default="Scheduled",
    )

    match = relationship(
        "Match",
    )