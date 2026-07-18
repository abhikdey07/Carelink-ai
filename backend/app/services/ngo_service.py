from sqlalchemy.orm import Session

from app.models.user import User
from app.models.ngo_profile import NGOProfile

from app.schemas.ngo_schema import (
    NGORegister,
    NGOLogin,
)

from app.core.security import (
    hash_password,
    verify_password,
)


def register_ngo(
    ngo: NGORegister,
    db: Session,
):

    existing = (
        db.query(User)
        .filter(
            User.email == ngo.email
        )
        .first()
    )

    if existing:
        return None

    user = User(

        full_name=ngo.organization_name,

        email=ngo.email,

        password=hash_password(
            ngo.password
        ),

        phone=ngo.phone,

        address=ngo.address,

        role="ngo",

    )

    db.add(user)
    db.commit()
    db.refresh(user)

    profile = NGOProfile(

        user_id=user.id,

        organization_name=ngo.organization_name,

        registration_number=ngo.registration_number,

        description="",

        latitude=ngo.latitude,

        longitude=ngo.longitude,
            )

    db.add(profile)
    db.commit()
    db.refresh(profile)

    return {

        "id": user.id,

        "organization_name": profile.organization_name,

        "registration_number": profile.registration_number,

        "email": user.email,

        "phone": user.phone,

        "address": user.address,

        "latitude": profile.latitude,

        "longitude": profile.longitude,

    }


def login_ngo(
    ngo: NGOLogin,
    db: Session,
):

    user = (
        db.query(User)
        .filter(
            User.email == ngo.email,
            User.role == "ngo",
        )
        .first()
    )

    if user is None:
        return None

    if not verify_password(
        ngo.password,
        user.password,
    ):
        return None

    profile = (
        db.query(NGOProfile)
        .filter(
            NGOProfile.user_id == user.id
        )
        .first()
    )

    return {

        "id": user.id,

        "ngo_id": profile.id,

        "organization_name": profile.organization_name,

        "registration_number": profile.registration_number,

        "email": user.email,

        "phone": user.phone,

        "address": user.address,

        "latitude": profile.latitude,

        "longitude": profile.longitude,

    }