from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.models.match import Match
from app.models.ngo_profile import NGOProfile
from app.models.donation_item import DonationItem
from app.models.demand import Demand
from app.models.donation import Donation
from app.models.user import User
from app.models.pickup_schedule import PickupSchedule

router = APIRouter(
    prefix="/transparency",
    tags=["Match Transparency"],
)


@router.get("/{donation_id}")
def get_match_transparency(
    donation_id: int,
    db: Session = Depends(get_db),
):

    matches = (
        db.query(Match)
        .filter(
            Match.donation_id == donation_id
        )
        .order_by(
            Match.score.desc()
        )
        .all()
    )

    result = []

    for match in matches:

        ngo = (
            db.query(NGOProfile)
            .filter(
                NGOProfile.id == match.ngo_id
            )
            .first()
        )

        donation_item = (
            db.query(DonationItem)
            .filter(
                DonationItem.id == match.donation_item_id
            )
            .first()
        )
        pickup = (
    db.query(PickupSchedule)
    .filter(
        PickupSchedule.match_id == match.id
    )
    .first()
)
        demands = (
            db.query(Demand)
            .filter(
                Demand.ngo_id == match.ngo_id
            )
            .all()
        )

        matched_demand = None

        for demand in demands:

            if (
                donation_item.item_name.lower()
                in demand.item_name.lower()
                or
                demand.item_name.lower()
                in donation_item.item_name.lower()
            ):
                matched_demand = demand
                break

        if matched_demand is None and len(demands) > 0:
            matched_demand = demands[0]

        result.append(
            {

                "match_id": match.id,

                "ngo_id": ngo.id,

                "ngo_name": ngo.organization_name,

                "match_score": round(
                    match.score,
                    2,
                ),

                "item_score": match.item_score,

                "quantity_score": match.quantity_score,

                "priority_score": match.priority_score,

                "distance_score": match.distance_score,

                "distance_km": match.distance_km,

                "reason": match.match_reason,

                "donated_item": donation_item.item_name,

                "donated_quantity": donation_item.quantity,

                "required_item":
                    matched_demand.item_name
                    if matched_demand
                    else "-",

                "required_quantity":
                    matched_demand.quantity_required
                    if matched_demand
                    else "-",

                "priority":
                    matched_demand.priority
                    if matched_demand
                    else "-",

                "explanation": [

                    f"Donation Item : {donation_item.item_name}",

                    f"NGO Needs : {matched_demand.item_name if matched_demand else '-'}",

                    f"Donated Quantity : {donation_item.quantity}",

                    f"NGO Required : {matched_demand.quantity_required if matched_demand else '-'}",

                    f"Priority : {matched_demand.priority if matched_demand else '-'}",

                    f"Semantic Score : {match.item_score}/40",

                    f"Quantity Score : {match.quantity_score}/30",

                    f"Priority Score : {match.priority_score}/20",

                    f"Distance : {match.distance_km} km",

                    f"Distance Score : {match.distance_score}/10",

                    f"Overall Match Score : {round(match.score,2)}",

                ],

            }
        )

    return result
@router.get("/match/{match_id}")
def get_single_match(
    match_id: int,
    db: Session = Depends(get_db),
):

    match = (
        db.query(Match)
        .filter(
            Match.id == match_id
        )
        .first()
    )

    if match is None:
        return {
            "message": "Match not found"
        }

    ngo = (
        db.query(NGOProfile)
        .filter(
            NGOProfile.id == match.ngo_id
        )
        .first()
    )

    donation = (
        db.query(Donation)
        .filter(
            Donation.id == match.donation_id
        )
        .first()
    )
    donor = (
    db.query(User)
    .filter(
        User.id == donation.donor_id
    )
    .first()
)

    donation_item = (
        db.query(DonationItem)
        .filter(
            DonationItem.id == match.donation_item_id
        )
        .first()
    )
    pickup = (
    db.query(PickupSchedule)
    .filter(
        PickupSchedule.match_id == match.id
    )
    .first()
)
    demands = (
        db.query(Demand)
        .filter(
            Demand.ngo_id == match.ngo_id
        )
        .all()
    )

    matched_demand = None

    for demand in demands:

        if (
            donation_item.item_name.lower()
            in demand.item_name.lower()
            or
            demand.item_name.lower()
            in donation_item.item_name.lower()
        ):

            matched_demand = demand
            break

    if matched_demand is None and len(demands) > 0:
        matched_demand = demands[0]

    return {

        "match_id": match.id,
        "status": match.status,

        "donation_id": donation.id,
        "donor_name": donor.full_name,

"donor_phone": donor.phone,

"donor_address": donor.address,

"donated_at": donation.donated_at,

        "ngo_name": ngo.organization_name,

        "match_score": round(
            match.score,
            2,
        ),

        "item_score": match.item_score,

        "quantity_score": match.quantity_score,

        "priority_score": match.priority_score,

        "condition_score": match.condition_score,

        "distance_score": match.distance_score,

        "distance_km": match.distance_km,

        "donated_item": donation_item.item_name,

        "condition": donation_item.condition,

        "donated_quantity": donation_item.quantity,

        "required_item":
            matched_demand.item_name
            if matched_demand
            else "-",

        "required_quantity":
            matched_demand.quantity_required
            if matched_demand
            else "-",

        "priority":
            matched_demand.priority
            if matched_demand
            else "-",

        "minimum_condition":
            matched_demand.minimum_condition
            if matched_demand
            else "-",

                "explanation": [

            f"Donation Item : {donation_item.item_name}",

            f"Condition : {donation_item.condition}",

            f"NGO Minimum : {matched_demand.minimum_condition if matched_demand else '-'}",

            f"Quantity : {donation_item.quantity}",

            f"NGO Required : {matched_demand.quantity_required if matched_demand else '-'}",

            f"Priority : {matched_demand.priority if matched_demand else '-'}",

            f"Semantic Score : {match.item_score}/40",

            f"Quantity Score : {match.quantity_score}/30",

            f"Priority Score : {match.priority_score}/20",

            f"Condition Score : {match.condition_score}/10",

            f"Distance : {match.distance_km} km",

            f"Distance Score : {match.distance_score}/10",

            f"Overall Score : {round(match.score,2)}",

        ],

        "pickup_status":
            pickup.status
            if pickup
            else None,

        "volunteer_name":
            pickup.volunteer_name
            if pickup
            else None,

        "volunteer_phone":
            pickup.volunteer_phone
            if pickup
            else None,

    }