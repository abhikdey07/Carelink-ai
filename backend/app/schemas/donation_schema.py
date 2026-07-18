from pydantic import BaseModel
from typing import List


class DonationItemCreate(BaseModel):

    item_name: str

    quantity: int

    confidence: float

    condition: str


class DonationCreate(BaseModel):

    donor_id: int

    latitude: float

    longitude: float

    items: List[DonationItemCreate]