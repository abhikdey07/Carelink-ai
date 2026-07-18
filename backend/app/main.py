from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.upload import router as upload_router
from app.api.donation import router as donation_router
from app.api.dashboard import router as dashboard_router
from app.api.ai import router as ai_router
from app.api.demand import router as demand_router
from app.api.ngo_auth import router as ngo_auth_router
from app.api.matching import router as matching_router
from app.api.pickup import router as pickup_router
from app.api.notification import router as notification_router
from app.api.match_transparency import router as transparency_router
from app.api.donor_notification import router as donor_notification_router
from app.api.delivery import router as delivery_router


app = FastAPI(
    title="AI Donation Management System API",
    description="Backend API for AI-Based Donation Management System",
    version="1.0.0",
)


app.include_router(auth_router)
app.include_router(upload_router)
app.include_router(donation_router)
app.include_router(dashboard_router)
app.include_router(ai_router)
app.include_router(demand_router)
app.include_router(ngo_auth_router)
app.include_router(matching_router)
app.include_router(pickup_router)
app.include_router(notification_router)
app.include_router(transparency_router)
app.include_router(donor_notification_router)
app.include_router(delivery_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():

    return {

        "project": "AI Donation Management System",

        "status": "Backend Running",

        "version": "1.0.0",

    }