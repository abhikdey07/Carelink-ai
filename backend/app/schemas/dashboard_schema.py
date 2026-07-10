from pydantic import BaseModel
from typing import List


class RecentDonation(BaseModel):
    id: int
    date: str
    status: str
    items: int


class DashboardStats(BaseModel):
    total_donations: int
    total_items: int
    pending_donations: int
    last_donation: str
    recent_donations: List[RecentDonation]