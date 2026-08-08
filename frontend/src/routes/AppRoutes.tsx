import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";

import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

import Dashboard from "../pages/donor/Dashboard";
import Camera from "../pages/donor/Camera";
import Cart from "../pages/donor/Cart";
import History from "../pages/donor/History";
import Profile from "../pages/donor/Profile";
import Success from "../pages/donor/Success";
import MatchResults from "../pages/donor/MatchResults";
import PackagingChecklist from "../pages/donor/PackagingChecklist";
import PickupSchedule from "../pages/donor/PickupSchedule";
import PickupSuccess from "../pages/donor/PickupSuccess";

import NGODashboard from "../pages/ngo/Dashboard";
import NGORegister from "../pages/ngo/Register";
import NGOLogin from "../pages/ngo/Login";
import AddDemand from "../pages/ngo/AddDemand";
import Demands from "../pages/ngo/Demands";
import EditDemand from "../pages/ngo/EditDemand";
import Notifications from "../pages/ngo/Notifications";
import MatchedDonations from "../pages/ngo/MatchedDonations";
import MatchDetails from "../pages/ngo/MatchDetails";
import DeliveryManagement from "../pages/ngo/DeliveryManagement";
import DeliveryDetails from "../pages/ngo/DeliveryDetails";
import NGOProfile from "../pages/ngo/Profile";

import ProtectedRoute from "../components/ProtectedRoute";
import NGOImpactMetrics from "../pages/ngo/ImpactMetrics";
export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />

      <Route path="/register" element={<Register />} />

      <Route path="/login" element={<Login />} />

      <Route path="/ngo/register" element={<NGORegister />} />

      <Route path="/ngo/login" element={<NGOLogin />} />

      {/* ---------------- DONOR ---------------- */}

      <Route
        path="/donor/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/donor/camera"
        element={
          <ProtectedRoute>
            <Camera />
          </ProtectedRoute>
        }
      />

      <Route
        path="/donor/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/donor/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />
      <Route
  path="/donor/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

      <Route
        path="/donor/success"
        element={
          <ProtectedRoute>
            <Success />
          </ProtectedRoute>
        }
      />

      <Route
        path="/donor/matches"
        element={
          <ProtectedRoute>
            <MatchResults />
          </ProtectedRoute>
        }
      />

      <Route
        path="/donor/checklist/:matchId"
        element={
          <ProtectedRoute>
            <PackagingChecklist />
          </ProtectedRoute>
        }
      />

      <Route
        path="/donor/pickup/:matchId"
        element={
          <ProtectedRoute>
            <PickupSchedule />
          </ProtectedRoute>
        }
      />

      <Route
        path="/donor/pickup-success"
        element={
          <ProtectedRoute>
            <PickupSuccess />
          </ProtectedRoute>
        }
      />

      {/* ---------------- NGO ---------------- */}

      <Route
        path="/ngo/dashboard"
        element={
          <ProtectedRoute>
            <NGODashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/ngo/impact-metrics"
  element={
    <ProtectedRoute>
      <NGOImpactMetrics />
    </ProtectedRoute>
  }
/>
      <Route
  path="/ngo/profile"
  element={
    <ProtectedRoute>
      <NGOProfile />
    </ProtectedRoute>
  }
/>

      <Route
        path="/ngo/demand/add"
        element={
          <ProtectedRoute>
            <AddDemand />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ngo/demands"
        element={
          <ProtectedRoute>
            <Demands />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ngo/demand/edit/:id"
        element={
          <ProtectedRoute>
            <EditDemand />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ngo/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ngo/matches"
        element={
          <ProtectedRoute>
            <MatchedDonations />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ngo/match-details/:matchId"
        element={
          <ProtectedRoute>
            <MatchDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ngo/delivery-management"
        element={
          <ProtectedRoute>
            <DeliveryManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ngo/delivery-management/:matchId"
        element={
          <ProtectedRoute>
            <DeliveryDetails />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}