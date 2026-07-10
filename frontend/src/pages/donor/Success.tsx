import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Home,
  Camera,
} from "lucide-react";

export default function Success() {

  const navigate = useNavigate();

  const donationId =
    localStorage.getItem("lastDonationId") || "N/A";

  const date = new Date().toLocaleString();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-6">

      <motion.div
        initial={{ opacity: 0, scale: .8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: .5 }}
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
          Donation Successful!
        </h1>

        <p className="text-gray-600 text-lg mt-5">
          Thank you for making a difference.
          <br />
          Your donation has been received successfully.
        </p>

        <div className="bg-slate-100 rounded-2xl p-6 mt-10 text-left space-y-4">

          <div className="flex justify-between">
            <span className="text-gray-500">
              Donation ID
            </span>

            <span className="font-bold">
              #{donationId}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">
              Submitted On
            </span>

            <span className="font-semibold">
              {date}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">
              Status
            </span>

            <span className="font-bold text-green-600">
              Successfully Submitted
            </span>
          </div>

        </div>
                <div className="grid md:grid-cols-2 gap-5 mt-10">

          <button
            onClick={() => navigate("/donor/dashboard")}
            className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-bold transition"
          >
            <Home size={22} />
            Go to Dashboard
          </button>

          <button
            onClick={() => navigate("/donor/camera")}
            className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl text-lg font-bold transition"
          >
            <Camera size={22} />
            Donate Again
          </button>

        </div>

        <p className="text-gray-400 text-sm mt-10">
          AI Donation Management System © 2026
        </p>

      </motion.div>

    </div>
  );
}