import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaClipboardList,
  FaBell,
  FaHandsHelping,
  FaPlusCircle,
  FaChartBar,
  FaUserCircle,
  FaSignOutAlt,
  FaTruck,
} from "react-icons/fa";

export default function NGODashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [stats, setStats] = useState({

    total_demands: 0,

    active_demands: 0,

    total_matches: 0,

    total_notifications: 0,

    recent_matches: [],

    recent_notifications: [],

  });

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      const response = await axios.get(

        `http://127.0.0.1:8000/dashboard/ngo/${user.ngo_id}`

      );

      setStats(response.data);

    }

    catch (err) {

      console.log(err);

    }

  };

  const logout = () => {

    localStorage.removeItem("user");

    navigate("/ngo/login");

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-8">

      <div className="max-w-7xl mx-auto">

        <motion.div

          initial={{ opacity: 0, y: -20 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: .6 }}

          className="bg-white rounded-3xl shadow-xl p-8 mb-8"

        >

          <div className="flex justify-between items-start">

            <div>

              <h1 className="text-4xl font-black text-slate-800">

                Welcome,

              </h1>

              <h2 className="text-3xl font-bold text-green-600 mt-2">

                {user.organization_name}

              </h2>

              <p className="text-gray-500 mt-2">

                NGO Donation Management Dashboard

              </p>

            </div>

            <div className="flex flex-col items-end gap-4">

              <FaUserCircle

                size={80}

                className="text-green-500"

              />

              <button

                onClick={logout}

                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-semibold shadow-md"

              >

                <FaSignOutAlt />

                Logout

              </button>

            </div>

          </div>

        </motion.div>

        <motion.div

          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ delay: .2 }}

          className="grid md:grid-cols-4 gap-6 mb-8"

        >

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">

                  Total Demands

                </p>

                <h2 className="text-4xl font-black mt-3">

                  {stats.total_demands}

                </h2>

              </div>

              <FaClipboardList

                size={45}

                className="text-blue-600"

              />

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">

                  Active Demands

                </p>

                <h2 className="text-4xl font-black mt-3">

                  {stats.active_demands}

                </h2>

              </div>

              <FaChartBar

                size={45}

                className="text-purple-600"

              />

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">

                  Matches

                </p>

                <h2 className="text-4xl font-black mt-3">

                  {stats.total_matches}

                </h2>

              </div>

              <FaHandsHelping

                size={45}

                className="text-green-600"

              />

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">

                  Notifications

                </p>

                <h2 className="text-4xl font-black mt-3">

                  {stats.total_notifications}

                </h2>

              </div>

              <FaBell

                size={45}

                className="text-red-500"

              />

            </div>

          </div>

        </motion.div>
                <motion.div

          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ delay: .4 }}

          className="grid md:grid-cols-2 gap-8"

        >

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-2xl font-bold mb-6">

              Quick Actions

            </h2>

            <div className="space-y-5">

              <button

                onClick={() =>
                  navigate("/ngo/demands")
                }

                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3"

              >

                <FaClipboardList />

                Manage Demands

              </button>

              <button

                onClick={() =>
                  navigate("/ngo/demand/add")
                }

                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3"

              >

                <FaPlusCircle />

                Add New Demand

              </button>

              <button

                onClick={() =>
                  navigate("/ngo/matches")
                }

                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3"

              >

                <FaHandsHelping />

                View Matched Donations

              </button>

              <button

                onClick={() =>
                  navigate("/ngo/notifications")
                }

                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3"

              >

                <FaBell />

                Notifications

              </button>

              <button

  onClick={() =>
    navigate("/ngo/delivery-management")
  }

  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3"

>

                <FaTruck />

                Delivery Management

              </button>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="flex justify-between items-center mb-6">

  <h2 className="text-2xl font-bold">
    NGO Information
  </h2>

  <div className="flex gap-3">

    <button
      onClick={() => navigate("/ngo/profile")}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
    >
      Edit Details
    </button>

    <button
      onClick={() => navigate("/ngo/impact-metrics")}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
    >
      Impact Metrics
    </button>

  </div>

</div>

            <div className="space-y-5">

              <div>

                <p className="text-gray-500">

                  Organization

                </p>

                <p className="font-bold text-xl">

                  {user.organization_name}

                </p>

              </div>

              <div>

                <p className="text-gray-500">

                  Email

                </p>

                <p className="font-semibold">

                  {user.email}

                </p>

              </div>

              <div>

                <p className="text-gray-500">

                  Contact Number

                </p>

                <p className="font-semibold">

                  {user.phone}

                </p>

              </div>

              <div>

                <p className="text-gray-500">

                  Address

                </p>

                <p className="font-semibold">

                  {user.address}

                </p>

              </div>

              <div>

                <p className="text-gray-500">

                  Registration Number

                </p>

                <p className="font-semibold">

                  {user.registration_number}

                </p>

              </div>

            </div>

          </div>

        </motion.div>

        <motion.div

          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ delay: .6 }}

          className="mt-8 bg-white rounded-3xl shadow-xl p-8"

        >

          <h2 className="text-2xl font-bold mb-6">

            Recent Matching Activity

          </h2>

          <div className="space-y-4">

            {stats.recent_matches.length === 0 ? (

              <div className="border rounded-2xl p-5">

                <p className="font-bold">

                  No matched donations available.

                </p>

                <p className="text-gray-500 mt-2">

                  Matches generated by the AI Matching Engine will appear here.

                </p>

              </div>

            ) : (

              stats.recent_matches.map(

                (match: any) => (

                  <div

                    key={match.id}

                    className="border rounded-2xl p-5"

                  >
                                        <p className="font-bold">

                      Donation #{match.donation_id}

                    </p>

                    <p className="text-gray-500 mt-2">

                      {match.reason}

                    </p>

                    <p className="text-sm text-blue-600 mt-2">

                      Score : {match.score}

                    </p>

                    <p className="text-xs text-gray-400 mt-1">

                      {match.date}

                    </p>

                    <button

                      onClick={() =>
                        navigate(
                          `/ngo/match-details/${match.id}`
                        )
                      }

                      className="mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-semibold"

                    >

                      View Details

                    </button>

                  </div>

                )

              )

            )}

            <h2 className="text-2xl font-bold mt-10 mb-6">

              Recent Notifications

            </h2>

            {stats.recent_notifications.length === 0 ? (

              <div className="border rounded-2xl p-5">

                <p className="font-bold">

                  No notifications available.

                </p>

                <p className="text-gray-500 mt-2">

                  Real-time donation alerts will appear here.

                </p>

              </div>

            ) : (

              stats.recent_notifications.map(

                (notification: any) => (

                  <div

                    key={notification.id}

                    className={`border rounded-2xl p-5 ${
                      notification.is_read
                        ? "bg-gray-50"
                        : "bg-yellow-50"
                    }`}

                  >

                    <p className="font-bold">

                      {notification.title}

                    </p>

                    <p className="text-gray-500 mt-2">

                      {notification.message}

                    </p>

                    <p className="text-xs text-gray-400 mt-2">

                      {notification.date}

                    </p>

                  </div>

                )

              )

            )}

          </div>

        </motion.div>

      </div>

    </div>

  );

}