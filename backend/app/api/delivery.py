from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.session import get_db
from app.services.email_service import send_email
from app.models.pickup_schedule import PickupSchedule
from app.models.match import Match
from app.models.donation import Donation
from app.models.donation_item import DonationItem
from app.models.user import User
from app.models.donor_notification import DonorNotification
from app.models.demand import Demand
router = APIRouter(
    prefix="/delivery",
    tags=["Delivery Partner"],
)


# ===========================
# DELIVERY LIST
# ===========================

@router.get("/list")
def get_delivery_list(db: Session = Depends(get_db)):

    pickups = (
        db.query(PickupSchedule)
        .join(Match, PickupSchedule.match_id == Match.id)
        .join(Donation, Match.donation_id == Donation.id)
        .join(User, Donation.donor_id == User.id)
        .join(
            DonationItem,
            Match.donation_item_id == DonationItem.id,
        )
        .filter(
            PickupSchedule.status != "Acknowledged"
        )
        .all()
    )

    data = []

    for pickup in pickups:

        match = pickup.match
        donation = match.donation
        item = match.donation_item
        donor = (
    db.query(User)
    .filter(User.id == donation.donor_id)
    .first()
)

        data.append(
            {
                "match_id": match.id,
                "donation_id": donation.id,
                "donor_name": donor.full_name if donor else "Unknown",
                "item_name": item.item_name,
                "quantity": item.quantity,
                "pickup_date": pickup.pickup_date,
                "pickup_time": pickup.pickup_time,
                "status": pickup.status,
            }
        )

    return data


# ===========================
# ASSIGN DELIVERY PARTNER
# ===========================
@router.put("/assign/{match_id}")
def assign_delivery_partner(
    match_id: int,
    volunteer_name: str,
    volunteer_phone: str,
    db: Session = Depends(get_db),
):

    pickup = (
        db.query(PickupSchedule)
        .filter(PickupSchedule.match_id == match_id)
        .first()
    )

    if pickup is None:
        return {"message": "Pickup not found"}

    pickup.volunteer_name = volunteer_name
    pickup.volunteer_phone = volunteer_phone
    pickup.status = "Delivery Partner Assigned"

    match = pickup.match
    donation = match.donation

    donation.status = "Delivery Partner Assigned"

    notification = DonorNotification(
        donor_id=donation.donor_id,
        donation_id=donation.id,
        match_id=match.id,
        title="Delivery Partner Assigned",
        message=(
            f"Volunteer {volunteer_name} "
            f"({volunteer_phone}) has been assigned to collect your donation."
        ),
    )

    db.add(notification)

    donor = (
        db.query(User)
        .filter(User.id == donation.donor_id)
        .first()
    )

    if donor and donor.email:

        body = f"""
<p>Hello <b>{donor.full_name}</b>,</p>

<p>
A delivery partner has been assigned for your donation.
</p>

<table style="width:100%;border-collapse:collapse;">

<tr>
<td><b>Volunteer</b></td>
<td>{volunteer_name}</td>
</tr>

<tr>
<td><b>Phone</b></td>
<td>{volunteer_phone}</td>
</tr>

</table>

<p>
The volunteer will arrive according to your scheduled pickup.
</p>
"""

        send_email(
            recipient=donor.email,
            subject="Delivery Partner Assigned",
            heading="🚚 Delivery Partner Assigned",
            body=body,
        )

    db.commit()
    db.refresh(pickup)

    return {
        "message": "Delivery Partner Assigned",
        "pickup": pickup,
    }

# ===========================
# OUT FOR PICKUP
# ===========================
@router.put("/out-for-pickup/{match_id}")
def out_for_pickup(
    match_id: int,
    db: Session = Depends(get_db),
):

    pickup = (
        db.query(PickupSchedule)
        .filter(PickupSchedule.match_id == match_id)
        .first()
    )

    if pickup is None:
        return {"message": "Pickup not found"}

    pickup.status = "Out For Pickup"

    match = pickup.match
    donation = match.donation

    donation.status = "Out For Pickup"

    notification = DonorNotification(
        donor_id=donation.donor_id,
        donation_id=donation.id,
        match_id=match.id,
        title="Volunteer On The Way",
        message="Your delivery partner is on the way to collect your donation.",
    )

    db.add(notification)

    donor = (
        db.query(User)
        .filter(User.id == donation.donor_id)
        .first()
    )

    if donor and donor.email:

        body = f"""
<p>Hello <b>{donor.full_name}</b>,</p>

<p>
Your delivery partner is now on the way to collect your donation.
</p>

<table style="width:100%;border-collapse:collapse;">

<tr>
<td><b>Volunteer</b></td>
<td>{pickup.volunteer_name}</td>
</tr>

<tr>
<td><b>Phone</b></td>
<td>{pickup.volunteer_phone}</td>
</tr>

</table>

<p>
Please keep your donation packed and ready for pickup.
</p>
"""

        send_email(
            recipient=donor.email,
            subject="Volunteer On The Way",
            heading="🚚 Volunteer On The Way",
            body=body,
        )

    db.commit()
    db.refresh(pickup)

    return {
        "message": "Out For Pickup",
        "pickup": pickup,
    }

# ===========================
# COLLECTED
# ===========================
@router.put("/collected/{match_id}")
def collected(
    match_id: int,
    db: Session = Depends(get_db),
):

    pickup = (
        db.query(PickupSchedule)
        .filter(PickupSchedule.match_id == match_id)
        .first()
    )

    if pickup is None:
        return {"message": "Pickup not found"}

    pickup.status = "Collected"

    match = pickup.match
    donation = match.donation

    donation.status = "Collected"

    notification = DonorNotification(
        donor_id=donation.donor_id,
        donation_id=donation.id,
        match_id=match.id,
        title="Donation Collected",
        message="Your donation has been collected successfully by the delivery partner.",
    )

    db.add(notification)

    donor = (
        db.query(User)
        .filter(User.id == donation.donor_id)
        .first()
    )

    if donor and donor.email:

        body = f"""
<p>Hello <b>{donor.full_name}</b>,</p>

<p>
Your donation has been successfully collected by our delivery partner.
</p>

<p>
It will now be transported to the NGO.
</p>
"""

        send_email(
            recipient=donor.email,
            subject="Donation Collected",
            heading="📦 Donation Collected",
            body=body,
        )

    db.commit()
    db.refresh(pickup)

    return {
        "message": "Donation Collected",
        "pickup": pickup,
    }

# ===========================
# IN TRANSIT
# ===========================
@router.put("/transit/{match_id}")
def in_transit(
    match_id: int,
    db: Session = Depends(get_db),
):

    pickup = (
        db.query(PickupSchedule)
        .filter(PickupSchedule.match_id == match_id)
        .first()
    )

    if pickup is None:
        return {"message": "Pickup not found"}

    pickup.status = "In Transit"

    match = pickup.match
    donation = match.donation

    donation.status = "In Transit"

    notification = DonorNotification(
        donor_id=donation.donor_id,
        donation_id=donation.id,
        match_id=match.id,
        title="Donation In Transit",
        message="Your donation is on the way to the NGO.",
    )

    db.add(notification)

    donor = (
        db.query(User)
        .filter(User.id == donation.donor_id)
        .first()
    )

    if donor and donor.email:

        body = f"""
<p>Hello <b>{donor.full_name}</b>,</p>

<p>
Your donation is now in transit to the NGO.
</p>

<p>
Thank you for your contribution.
</p>
"""

        send_email(
            recipient=donor.email,
            subject="Donation In Transit",
            heading="🚚 Donation In Transit",
            body=body,
        )

    db.commit()
    db.refresh(pickup)

    return {
        "message": "Donation In Transit",
        "pickup": pickup,
    }
# ===========================
# DELIVERED
# ===========================
@router.put("/delivered/{match_id}")
def delivered(
    match_id: int,
    db: Session = Depends(get_db),
):

    pickup = (
        db.query(PickupSchedule)
        .filter(PickupSchedule.match_id == match_id)
        .first()
    )

    if pickup is None:
        return {"message": "Pickup not found"}

    pickup.status = "Delivered"

    match = pickup.match
    donation = match.donation

    donation.status = "Delivered"

    notification = DonorNotification(
        donor_id=donation.donor_id,
        donation_id=donation.id,
        match_id=match.id,
        title="Donation Delivered",
        message="Your donation has been successfully delivered to the NGO.",
    )

    db.add(notification)

    donor = (
        db.query(User)
        .filter(User.id == donation.donor_id)
        .first()
    )

    if donor and donor.email:

        body = f"""
<p>Hello <b>{donor.full_name}</b>,</p>

<p>
Your donation has been successfully delivered to the NGO.
</p>

<p>
The NGO will acknowledge it shortly.
</p>
"""

        send_email(
            recipient=donor.email,
            subject="Donation Delivered",
            heading="🎉 Donation Delivered",
            body=body,
        )

    db.commit()
    db.refresh(pickup)

    return {
        "message": "Donation Delivered",
        "pickup": pickup,
    }

# ===========================
# ACKNOWLEDGED
# ===========================
@router.put("/acknowledged/{match_id}")
def acknowledged(
    match_id: int,
    db: Session = Depends(get_db),
):

    pickup = (
        db.query(PickupSchedule)
        .filter(PickupSchedule.match_id == match_id)
        .first()
    )

    if pickup is None:
        return {"message": "Pickup not found"}

    pickup.status = "Acknowledged"

    match = pickup.match
    donation = match.donation

    print("NGO ID =", match.ngo_id)
    print("Donation Item =", match.donation_item.item_name)
    print("Donation Status =", donation.status)

    donation.status = "Acknowledged"

    # ================= DEBUG =================

    all_demands = (
        db.query(Demand)
        .filter(Demand.ngo_id == match.ngo_id)
        .all()
    )

    print("========== ALL DEMANDS ==========")

    for d in all_demands:
        print(
            "ID =", d.id,
            "| ITEM =", repr(d.item_name),
            "| STATUS =", repr(d.status),
        )

    demand = (
        db.query(Demand)
        .filter(
            Demand.ngo_id == match.ngo_id,
            func.lower(func.trim(Demand.item_name))
            == match.donation_item.item_name.strip().lower(),
            Demand.status.in_(["Active", "Open"]),
        )
        .first()
    )

    print("FOUND DEMAND =", demand)

    # =========================================

    if demand:
        demand.status = "Completed"
        print("Demand Updated Successfully")
    else:
        print("Demand NOT Found")

    notification = DonorNotification(
        donor_id=donation.donor_id,
        donation_id=donation.id,
        match_id=match.id,
        title="Donation Acknowledged",
        message="Thank you! The NGO has acknowledged your donation.",
    )

    db.add(notification)

    donor = (
        db.query(User)
        .filter(User.id == donation.donor_id)
        .first()
    )

    if donor and donor.email:

        body = f"""
<p>Hello <b>{donor.full_name}</b>,</p>

<p>
The NGO has officially acknowledged your donation.
</p>

<p>
Thank you for supporting your community through <b>CareLink AI</b>.
Your donation has reached its destination and will help people in need.
</p>
"""

        send_email(
            recipient=donor.email,
            subject="Donation Acknowledged",
            heading="💙 Donation Acknowledged",
            body=body,
        )

    db.commit()
    db.refresh(pickup)

    return {
        "message": "Donation Acknowledged",
        "pickup": pickup,
    }

# ===========================
# DELIVERY DETAILS
# ===========================

@router.get("/{match_id}")
def get_pickup(
    match_id: int,
    db: Session = Depends(get_db),
):

    pickup = (
        db.query(PickupSchedule)
        .filter(PickupSchedule.match_id == match_id)
        .first()
    )

    return pickup