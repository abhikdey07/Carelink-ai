from datetime import date
from typing import Optional

from pydantic import BaseModel, EmailStr


# ---------- NGO Authentication ----------

class NGORegister(BaseModel):
    organization_name: str
    registration_number: str
    email: EmailStr
    phone: str
    address: str
    password: str

    latitude: float
    longitude: float


class NGOLogin(BaseModel):
    email: EmailStr
    password: str


class NGOResponse(BaseModel):
    id: int
    organization_name: str
    registration_number: str
    email: EmailStr
    phone: str
    address: str

    class Config:
        from_attributes = True


# ---------- NGO Profile ----------

class NGOProfileCreate(BaseModel):
    organization_name: str
    registration_number: str
    description: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class NGOProfileResponse(BaseModel):
    id: int
    user_id: int
    organization_name: str
    registration_number: str
    description: Optional[str]
    latitude: Optional[float]
    longitude: Optional[float]

    class Config:
        from_attributes = True


# ---------- Demand ----------
class DemandCreate(BaseModel):

    item_name: str

    quantity_required: int

    priority: str

    minimum_condition: str

    expiry_date: date


class DemandUpdate(BaseModel):

    item_name: Optional[str] = None

    quantity_required: Optional[int] = None

    priority: Optional[str] = None

    minimum_condition: Optional[str] = None

    expiry_date: Optional[date] = None


class DemandResponse(BaseModel):

    id: int

    ngo_id: int

    item_name: str

    quantity_required: int

    priority: str

    minimum_condition: str

    expiry_date: date

    status: str

    class Config:
        from_attributes = True