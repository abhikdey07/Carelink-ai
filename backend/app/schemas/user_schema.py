from pydantic import BaseModel, EmailStr
from typing import Optional


class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    phone: Optional[str] = None
    address: Optional[str] = None
    role: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    phone: Optional[str]
    address: Optional[str]
    role: str
    is_active: bool

    class Config:
        from_attributes = True