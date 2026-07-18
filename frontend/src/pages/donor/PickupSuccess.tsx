import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Home } from "lucide-react";

export default function PickupSuccess() {
  const navigate = useNavigate();

  const date = new Date().toLocaleString();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 120,
          }}
          className="flex justify-center"
        >
          <CheckCircle2
            size={120}
            className="text-green-500"
          />
        </motion.div>

        <h1 className="text-5xl font-black text-slate-900 mt-8">
          Pickup Scheduled!
        </h1>

        <p className="text-gray-600 text-lg mt-5">
          Your pickup has been scheduled successfully.
          <br />
          Please wait while the NGO assigns a delivery partner.
        </p>

        <div className="bg-slate-100 rounded-2xl p-6 mt-10 text-left space-y-4">

          <div className="flex justify-between">
            <span className="text-gray-500">
              Pickup Scheduled On
            </span>

            <span className="font-semibold">
              {date}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">
              Current Status
            </span>

            <span className="font-bold text-blue-600">
              Pickup Scheduled
            </span>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
            <p className="text-blue-700 font-medium">
              The NGO has been notified.
              <br />
              Please wait while a delivery partner is assigned.
            </p>
          </div>

        </div>

        <button
          onClick={() => navigate("/donor/dashboard")}
          className="mt-10 w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-bold transition"
        >
          <Home size={22} />
          Go to Dashboard
        </button>

        <p className="text-gray-400 text-sm mt-10">
          AI Donation Management System © 2026
        </p>
      </motion.div>
    </div>
  );
}