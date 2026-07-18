from datetime import datetime
from pydantic import BaseModel


class MatchResponse(BaseModel):
    id: int

    donation_id: int

    donation_item_id: int

    ngo_id: int

    score: float

    item_score: float

    quantity_score: float

    priority_score: float

    distance_score: float

    match_reason: str

    created_at: datetime

    class Config:
        from_attributes = True


class NotificationResponse(BaseModel):
    id: int

    ngo_id: int

    donation_id: int

    title: str

    message: str

    is_read: bool

    created_at: datetime

    class Config:
        from_attributes = True