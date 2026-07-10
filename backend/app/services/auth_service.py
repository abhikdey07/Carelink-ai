from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user_schema import UserRegister, UserLogin
from app.core.security import hash_password, verify_password


def register_user(user: UserRegister, db: Session):

    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        return None

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password=hash_password(user.password),
        phone=user.phone,
        address=user.address,
        role=user.role,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def login_user(user: UserLogin, db: Session):

    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user is None:
        return None

    if not verify_password(user.password, existing_user.password):
        return None

    return existing_user