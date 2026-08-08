# 🤝 CareLink AI – Smart Donation Management System

CareLink AI is an AI-powered donation management platform developed to bridge the gap between donors and NGOs through intelligent resource matching. The system automates donation item detection, categorization, matching, pickup scheduling, and delivery tracking, ensuring that donated resources reach the organizations that need them most.

The application combines Artificial Intelligence, modern web technologies, and cloud deployment to simplify the complete donation lifecycle while improving transparency and efficiency.

---

# 📌 Project Overview

Traditional donation systems rely heavily on manual categorization and matching, which often results in delays and inefficient resource distribution.

CareLink AI addresses these challenges by integrating AI-based object detection with an intelligent matching engine that connects donors with NGOs based on donation categories, quantity, and organizational demand.

The platform provides dedicated dashboards for both Donors and NGOs along with real-time analytics, notification management, profile management, delivery tracking, and impact metrics.

---

# 🚀 Key Features

## 👤 Donor Module

- Secure Registration & Login
- AI-Based Donation Item Detection (YOLOv8)
- Automatic Item Categorization
- Donation Cart Management
- Intelligent NGO Matching
- Packaging Checklist
- Pickup Scheduling
- Donation History
- Profile Management
- Impact Metrics Dashboard

---

## 🏢 NGO Module

- Secure Registration & Login
- NGO Dashboard
- Demand Management (CRUD)
- Donation Matching
- Match Transparency
- Delivery Management
- Notification System
- Profile Management
- Impact Metrics Dashboard

---

## 🤖 AI Features

- YOLOv8-based Donation Item Detection
- Automatic Item Categorization
- Smart Donation Processing
- AI-assisted Resource Identification

---

## 🚚 Delivery Management

- Pickup Scheduling
- Delivery Assignment
- Delivery Tracking
- Status Updates
- Donation Completion Workflow

---

## 📊 Analytics & Reporting

- Donation Statistics
- Monthly Impact Metrics
- Category-wise Distribution
- Weekly Matching Trends
- Donations vs Matches Visualization

---

# 🛠 Technology Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts
- Lucide React

---

## Backend

- FastAPI
- Python
- SQLAlchemy
- Pydantic
- Alembic

---

## Database

- PostgreSQL
- Neon PostgreSQL (Cloud)

---

## Artificial Intelligence

- YOLOv8
- OpenCV

---

## Deployment

- Frontend : Vercel
- Backend : Render
- Database : Neon PostgreSQL

---

# 📂 Project Structure

```
Carelink-ai
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── services
│   └── assets
│
├── backend
│   ├── app
│   │   ├── routers
│   │   ├── models
│   │   ├── schemas
│   │   ├── services
│   │   ├── database
│   │   └── utils
│   │
│   ├── uploads
│   └── alembic
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/abhikdey07/Carelink-ai.git

cd Carelink-ai
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend will run at:

```
http://127.0.0.1:8000
```

---

# 🗄 Database

The project uses **PostgreSQL** as the primary database.

Development:
- Local PostgreSQL

Deployment:
- Neon PostgreSQL

---

# 🌐 Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | Neon PostgreSQL |

---

# 📈 Major Functionalities

- AI-based Donation Detection
- Intelligent NGO Matching
- Smart Donation Workflow
- Pickup Scheduling
- Delivery Tracking
- Notification Management
- Demand Management
- Donation History
- Profile Management
- Impact Metrics Dashboard
- Secure Authentication

---

# 📷 Application Modules

### Donor

- Dashboard
- Detect Donation Items
- Donation Cart
- Match Results
- Pickup Scheduling
- Donation History
- Impact Metrics
- Profile

---

### NGO

- Dashboard
- Manage Demands
- Matching System
- Delivery Management
- Notifications
- Impact Metrics
- Profile

---

# 🔒 Authentication

The system provides secure authentication with separate access for:

- Donors
- NGOs

Each user is redirected to their respective dashboard after successful login.

---

# 📊 Future Enhancements

- Real-Time Notifications
- Live Delivery Tracking
- AI Recommendation Improvements
- Admin Dashboard
- Mobile Application
- Analytics Export (PDF & Excel)

---

# 👨‍💻 Developer

**Abhik Dey**

B.Tech Computer Science & Engineering

---

# 📄 License

This project was developed for educational purposes as part of the **Infosys Springboard Internship Project**.
