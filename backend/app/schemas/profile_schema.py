from pydantic import BaseModel
from typing import Optional

class ProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    organization_name: Optional[str] = None
    registration_number: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None