from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship

from app.database.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    email = Column(String(100), unique=True, nullable=False)

    password = Column(String(255), nullable=False)

    phone = Column(String(20), nullable=True)

    address = Column(String(255), nullable=True)

    role = Column(String(20), nullable=False)

    is_active = Column(Boolean, default=True)

    ngo_profile = relationship(
        "NGOProfile",
        back_populates="user",
        uselist=False,
    )