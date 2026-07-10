import Success from "../pages/donor/Success";
import { Routes, Route } from "react-router-dom";
import History from "../pages/donor/History";
import LandingPage from "../pages/LandingPage";

import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

import Dashboard from "../pages/donor/Dashboard";
import Camera from "../pages/donor/Camera";
import Cart from "../pages/donor/Cart";

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Landing */}

      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
  path="/donor/success"
  element={
    <ProtectedRoute>
      <Success />
    </ProtectedRoute>
  }
/>

      {/* Authentication */}

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      {/* Protected Routes */}

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

    </Routes>
  );
}