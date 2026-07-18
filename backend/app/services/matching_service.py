from math import radians, sin, cos, sqrt, atan2

from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from sqlalchemy.orm import Session

from app.models.donation import Donation
from app.models.donation_item import DonationItem
from app.models.demand import Demand
from app.models.ngo_profile import NGOProfile
from app.models.match import Match
from app.models.notification import Notification
from app.models.user import User
from app.services.email_service import send_email


model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def calculate_quantity_score(
    donated: int,
    required: int,
):

    if donated >= required:
        return 30

    return round(
        (donated / required) * 30,
        2,
    )


def calculate_priority_score(
    priority: str,
):

    priority = priority.lower()

    if priority == "high":
        return 20

    if priority == "medium":
        return 15

    return 10


def calculate_condition_score(
    donor_condition: str,
    minimum_condition: str,
):

    ranking = {

        "new": 6,

        "excellent": 5,

        "good": 4,

        "fair": 3,

        "poor": 2,

        "damaged": 1,

    }

    donor = ranking.get(
        donor_condition.lower(),
        4,
    )

    minimum = ranking.get(
        minimum_condition.lower(),
        4,
    )

    if donor >= minimum:
        return 10

    if donor == minimum - 1:
        return 5

    if donor == minimum - 2:
        return 2

    return 0


def calculate_distance_score(
    donation: Donation,
    ngo: NGOProfile,
):

    if (

        donation.latitude is None

        or donation.longitude is None

        or ngo.latitude is None

        or ngo.longitude is None

    ):

        return 5, None

    earth_radius = 6371

    donor_lat = radians(
        donation.latitude
    )

    donor_lon = radians(
        donation.longitude
    )

    ngo_lat = radians(
        ngo.latitude
    )

    ngo_lon = radians(
        ngo.longitude
    )

    dlat = ngo_lat - donor_lat

    dlon = ngo_lon - donor_lon

    a = (

        sin(dlat / 2) ** 2

        + cos(donor_lat)

        * cos(ngo_lat)

        * sin(dlon / 2) ** 2

    )

    c = 2 * atan2(

        sqrt(a),

        sqrt(1 - a),

    )

    distance = earth_radius * c

    if distance <= 5:

        score = 10

    elif distance <= 10:

        score = 8

    elif distance <= 20:

        score = 6

    elif distance <= 50:

        score = 4

    else:

        score = 2

    return score, round(distance, 2)


def semantic_similarity(
    donation_item: str,
    demand_item: str,
):

    emb1 = model.encode(
        [donation_item]
    )

    emb2 = model.encode(
        [demand_item]
    )

    similarity = cosine_similarity(
        emb1,
        emb2,
    )[0][0]

    return round(
        float(similarity),
        4,
    )
def generate_matches(
    donation_id: int,
    db: Session,
):

    donation = (
        db.query(Donation)
        .filter(
            Donation.id == donation_id
        )
        .first()
    )

    if donation is None:
        return []
    if donation.status == "Acknowledged":
        return []
    items = (
        db.query(DonationItem)
        .filter(
            DonationItem.donation_id == donation.id
        )
        .all()
    )

    demands = (
        db.query(Demand)
        .filter(
            Demand.status == "Active"
        )
        .all()
    )

    matches = []

    for item in items:

        for demand in demands:

            ngo = (
                db.query(NGOProfile)
                .filter(
                    NGOProfile.id == demand.ngo_id
                )
                .first()
            )

            if ngo is None:
                continue

            similarity = semantic_similarity(
                item.item_name,
                demand.item_name,
            )

            if similarity < 0.60:
                continue

            item_score = round(
                similarity * 40,
                2,
            )

            quantity_score = calculate_quantity_score(
                item.quantity,
                demand.quantity_required,
            )

            priority_score = calculate_priority_score(
                demand.priority,
            )

            condition_score = calculate_condition_score(
                item.condition,
                demand.minimum_condition,
            )

            distance_score, distance = calculate_distance_score(
                donation,
                ngo,
            )

            total_score = round(
                item_score
                + quantity_score
                + priority_score
                + condition_score
                + distance_score,
                2,
            )

            reason = (
                f"Semantic Similarity {round(similarity*100)}%, "
                f"Condition : {item.condition}, "
                f"NGO Minimum : {demand.minimum_condition}, "
                f"{demand.priority} Priority"
            )

            existing_match = (
                db.query(Match)
                .filter(
                    Match.donation_item_id == item.id,
                    Match.ngo_id == ngo.id,
                )
                .first()
            )

            if existing_match:
                continue

            match = Match(

                donation_id=donation.id,

                donation_item_id=item.id,

                ngo_id=ngo.id,

                

                score=total_score,

                item_score=item_score,

                quantity_score=quantity_score,

                priority_score=priority_score,

                condition_score=condition_score,

                distance_score=distance_score,

                distance_km=distance,

                match_reason=reason,

            )

            db.add(match)

            db.commit()

            db.refresh(match)

            notification = Notification(

                ngo_id=ngo.id,

                donation_id=donation.id,

                match_id=match.id,

                title="New Matching Donation",

                message=(
                    f"{item.item_name} donation matched with your demand."
                ),

            )

            db.add(notification)

            db.commit()

            # -----------------------------
            # Send email notification to NGO
            # -----------------------------
            ngo_user = (
                db.query(User)
                .filter(User.id == ngo.user_id)
                .first()
            )

            if ngo_user and ngo_user.email:

                body = f"""
<p>Hello <b>{ngo.organization_name}</b>,</p>

<p>A new donation has matched one of your active demands.</p>

<table style="width:100%;border-collapse:collapse;">
<tr>
<td><b>Item</b></td>
<td>{item.item_name}</td>
</tr>

<tr>
<td><b>Quantity</b></td>
<td>{item.quantity}</td>
</tr>

<tr>
<td><b>Condition</b></td>
<td>{item.condition}</td>
</tr>

<tr>
<td><b>Match Score</b></td>
<td>{total_score}</td>
</tr>

</table>

<p>
Please log in to CareLink AI to review and accept this donation.
</p>
"""

                send_email(
                    recipient=ngo_user.email,
                    subject="New Donation Match",
                    heading="🎉 New Donation Match Found",
                    body=body,
                )

            matches.append(match)

    return sorted(
        matches,
        key=lambda match: match.score,
        reverse=True,
    )


def generate_matches_for_all_donations(
    db: Session,
):

    donations = (
        db.query(Donation)
        .filter(
            Donation.status != "Acknowledged"
        )
        .all()
    )

    for donation in donations:

        generate_matches(
            donation.id,
            db,
        )

            