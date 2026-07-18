from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.ngo_schema import (
    NGORegister,
    NGOLogin,
    NGOResponse,
)

from app.services.ngo_service import (
    register_ngo,
    login_ngo,
)

router = APIRouter(
    prefix="/auth/ngo",
    tags=["NGO Authentication"],
)


@router.post(
    "/register",
    response_model=NGOResponse,
)
def ngo_register(
    ngo: NGORegister,
    db: Session = Depends(get_db),
):

    user = register_ngo(ngo, db)

    if user is None:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )

    return user


@router.post(
    "/login",
)
def ngo_login(
    ngo: NGOLogin,
    db: Session = Depends(get_db),
):

    user = login_ngo(ngo, db)

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    return user