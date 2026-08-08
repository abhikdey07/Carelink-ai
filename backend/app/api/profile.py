from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.user import User
from app.schemas.profile_schema import ProfileUpdate
from app.models.ngo_profile import NGOProfile

router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)

@router.get("/{user_id}")
def get_profile(
    user_id: int,
    db: Session = Depends(get_db)
):

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "id": user.id,
        "full_name": user.full_name,
        "organization_name": user.ngo_profile.organization_name if user.ngo_profile else None,
        "registration_number": user.ngo_profile.registration_number if user.ngo_profile else None,
        "email": user.email,
        "phone": user.phone,
        "address": user.address,
        "role": user.role
    }
@router.put("/{user_id}")
def update_profile(
    user_id: int,
    profile: ProfileUpdate,
    db: Session = Depends(get_db)
):

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # Update User table
    if profile.full_name is not None:
        user.full_name = profile.full_name

    if profile.phone is not None:
        user.phone = profile.phone

    if profile.address is not None:
        user.address = profile.address

    # Update NGO Profile table
    if user.role == "ngo" and user.ngo_profile:

        if profile.organization_name is not None:
            user.ngo_profile.organization_name = profile.organization_name

        if profile.registration_number is not None:
            user.ngo_profile.registration_number = profile.registration_number

    db.commit()
    db.refresh(user)

    return {
        "message": "Profile updated successfully",
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "organization_name": user.ngo_profile.organization_name if user.ngo_profile else None,
            "registration_number": user.ngo_profile.registration_number if user.ngo_profile else None,
            "email": user.email,
            "phone": user.phone,
            "address": user.address,
            "role": user.role
        }
    }