from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship


from app.database.database import Base


class NGOProfile(Base):
    __tablename__ = "ngo_profiles"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        unique=True,
    )

    organization_name = Column(
        String(150),
        nullable=False,
    )

    registration_number = Column(
        String(100),
        unique=True,
        nullable=False,
    )

    description = Column(
        String(500),
        nullable=True,
    )

    latitude = Column(
        Float,
        nullable=True,
    )

    longitude = Column(
        Float,
        nullable=True,
    )

    user = relationship(
        "User",
        back_populates="ngo_profile",
    )

    demands = relationship(
        "Demand",
        back_populates="ngo",
        cascade="all, delete-orphan",
    )
   