from app.api.ai import router as ai_router
from app.api.dashboard import router as dashboard_router
from app.api.donation import router as donation_router
from app.api.upload import router as upload_router
from app.api.auth import router as auth_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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
# CORS Configuration
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
        "version": "1.0.0"
    }