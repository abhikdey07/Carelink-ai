from sqlalchemy.orm import Session

from app.models.demand import Demand
from app.models.ngo_profile import NGOProfile

from app.schemas.ngo_schema import (
    DemandCreate,
    DemandUpdate,
)
from app.services.matching_service import generate_matches_for_all_donations

def create_demand(
    ngo_user_id: int,
    demand: DemandCreate,
    db: Session,
):

    profile = (
        db.query(NGOProfile)
        .filter(
            NGOProfile.user_id == ngo_user_id
        )
        .first()
    )

    if profile is None:
        return None

    new_demand = Demand(

        ngo_id=profile.id,

        item_name=demand.item_name,

        quantity_required=demand.quantity_required,

        priority=demand.priority,

        minimum_condition=demand.minimum_condition,

        expiry_date=demand.expiry_date,

        status="Active",

    )

    db.add(new_demand)

    db.commit()

    db.refresh(new_demand)
    generate_matches_for_all_donations(db)
    return new_demand


def get_all_demands(
    ngo_user_id: int,
    db: Session,
):

    profile = (
        db.query(NGOProfile)
        .filter(
            NGOProfile.user_id == ngo_user_id
        )
        .first()
    )

    if profile is None:
        return []

    return (
        db.query(Demand)
        .filter(
            Demand.ngo_id == profile.id
        )
        .order_by(
            Demand.id.desc()
        )
        .all()
    )


def get_single_demand(
    demand_id: int,
    db: Session,
):

    return (
        db.query(Demand)
        .filter(
            Demand.id == demand_id
        )
        .first()
    )


def update_demand(
    existing: Demand,
    demand: DemandUpdate,
    db: Session,
):

    if demand.item_name is not None:
        existing.item_name = demand.item_name

    if demand.quantity_required is not None:
        existing.quantity_required = demand.quantity_required

    if demand.priority is not None:
        existing.priority = demand.priority

    if demand.minimum_condition is not None:
        existing.minimum_condition = (
            demand.minimum_condition
        )

    if demand.expiry_date is not None:
        existing.expiry_date = demand.expiry_date

    db.commit()

    db.refresh(existing)

    return existing


def delete_demand(
    existing: Demand,
    db: Session,
):

    db.delete(existing)

    db.commit()