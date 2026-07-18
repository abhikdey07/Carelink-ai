from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.ngo_schema import (
    DemandCreate,
    DemandUpdate,
    DemandResponse,
)

from app.services.demand_service import (
    create_demand,
    get_all_demands,
    get_single_demand,
    update_demand,
    delete_demand,
)

router = APIRouter(
    prefix="/demand",
    tags=["NGO Demand"],
)


@router.post(
    "/{ngo_id}",
    response_model=DemandResponse,
)
def add_demand(
    ngo_id: int,
    demand: DemandCreate,
    db: Session = Depends(get_db),
):

    created = create_demand(
        ngo_id,
        demand,
        db,
    )

    if created is None:
        raise HTTPException(
            status_code=404,
            detail="NGO Profile not found",
        )

    return created


@router.get(
    "/{ngo_id}",
    response_model=list[DemandResponse],
)
def list_demands(
    ngo_id: int,
    db: Session = Depends(get_db),
):

    return get_all_demands(
        ngo_id,
        db,
    )


@router.get(
    "/single/{demand_id}",
    response_model=DemandResponse,
)
def single_demand(
    demand_id: int,
    db: Session = Depends(get_db),
):

    demand = get_single_demand(
        demand_id,
        db,
    )

    if demand is None:
        raise HTTPException(
            status_code=404,
            detail="Demand not found",
        )

    return demand


@router.put(
    "/{demand_id}",
    response_model=DemandResponse,
)
def edit_demand(
    demand_id: int,
    demand: DemandUpdate,
    db: Session = Depends(get_db),
):

    existing = get_single_demand(
        demand_id,
        db,
    )

    if existing is None:
        raise HTTPException(
            status_code=404,
            detail="Demand not found",
        )

    return update_demand(
        existing,
        demand,
        db,
    )


@router.delete(
    "/{demand_id}",
)
def remove_demand(
    demand_id: int,
    db: Session = Depends(get_db),
):

    existing = get_single_demand(
        demand_id,
        db,
    )

    if existing is None:
        raise HTTPException(
            status_code=404,
            detail="Demand not found",
        )

    delete_demand(
        existing,
        db,
    )

    return {
        "message": "Demand deleted successfully",
    }