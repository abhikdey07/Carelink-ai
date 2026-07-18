import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaBuilding,
  FaBoxOpen,
  FaCheckCircle,
  FaChartLine,
} from "react-icons/fa";

import { getNotifications } from "../../services/matchingService";

export default function MatchedDonations() {

  const navigate = useNavigate();

  const [matches, setMatches] = useState<any[]>([]);

  const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);

const ngoId = user.ngo_id;

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {

    try {

      const data = await getNotifications(
        ngoId
      );

      setMatches(data);

    } catch (err) {
      console.log(err);
    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">

      <div className="max-w-6xl mx-auto">

        <button

          onClick={() => navigate("/ngo/dashboard")}

          className="flex items-center gap-2 text-blue-600 font-semibold mb-8"

        >

          <FaArrowLeft />

          Back to Dashboard

        </button>

        <motion.div

          initial={{ opacity: 0, y: 30 }}

          animate={{ opacity: 1, y: 0 }}

        >

          <h1 className="text-4xl font-black">

            Matched Donations

          </h1>

          <p className="text-gray-500 mt-2">

            Intelligent Matching Engine Results

          </p>

        </motion.div>

        <div className="grid gap-6 mt-10">

          {matches.length === 0 && (

            <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

              <h2 className="text-2xl font-bold">

                No Matches Yet

              </h2>

              <p className="text-gray-500 mt-3">

                Matching donations will appear here automatically.

              </p>

            </div>

          )}

          {matches.map((match) => (

            <motion.div

              key={match.id}

              initial={{ opacity: 0, y: 20 }}

              animate={{ opacity: 1, y: 0 }}

              className="bg-white rounded-3xl shadow-lg p-8"

            >

              <div className="flex justify-between">

                <div>

                  <h2 className="text-2xl font-bold flex items-center gap-3">

                    <FaBuilding />

                    Donation Match

                  </h2>

                  <p className="text-gray-500 mt-2">

                    {match.message}

                  </p>

                </div>

                <FaCheckCircle

                  className="text-5xl text-green-600"

                />

              </div>

              <div className="grid md:grid-cols-3 gap-5 mt-8">

                <div className="bg-blue-50 rounded-2xl p-5">

                  <FaBoxOpen className="text-3xl text-blue-600"/>

                  <p className="font-bold mt-3">

                    Donation ID

                  </p>

                  <p>

                    {match.donation_id}

                  </p>

                </div>

                <div className="bg-green-50 rounded-2xl p-5">

                  <FaChartLine className="text-3xl text-green-600"/>

                  <p className="font-bold mt-3">

                    Status

                  </p>

                  <p>

                    {match.is_read ? "Viewed" : "New"}

                  </p>

                </div>

              <div className="bg-purple-50 rounded-2xl p-5">

  <p className="font-bold">
    Pickup Schedule
  </p>

  <p>
    {match.pickup_date || "Not Scheduled"}
  </p>

  <p className="text-sm text-gray-500">
    {match.pickup_time || "--"}
  </p>

</div>

              </div>
             <div className="flex justify-end items-center gap-4 mt-6">

  <span
    className={`px-4 py-2 rounded-full text-sm font-semibold
      ${
        match.delivery_status === "Scheduled"
          ? "bg-yellow-100 text-yellow-700"
          : match.delivery_status === "Delivery Partner Assigned"
          ? "bg-blue-100 text-blue-700"
          : match.delivery_status === "Out For Pickup"
          ? "bg-orange-100 text-orange-700"
          : match.delivery_status === "Collected"
          ? "bg-purple-100 text-purple-700"
          : match.delivery_status === "In Transit"
          ? "bg-indigo-100 text-indigo-700"
          : match.delivery_status === "Delivered"
          ? "bg-green-100 text-green-700"
          : match.delivery_status === "Acknowledged"
          ? "bg-emerald-100 text-emerald-700"
          : "bg-gray-100 text-gray-700"
      }`}
  >
    {match.delivery_status}
  </span>

  <button
    onClick={() => navigate(`/ngo/match-details/${match.match_id}`)}
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold"
  >
    View Details
  </button>

</div>

            </motion.div>

          ))}

        </div>

      </div>

    </div>

  );

}