import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  Camera,
  Package,
  Gift,
  Clock3,
  ArrowRight,
  LogOut,
} from "lucide-react";

import { getDashboardStats } from "../../services/dashboardService";
import type { DashboardStats } from "../../services/dashboardService";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user.id) {
      navigate("/login");
      return;
    }

    const fetchDashboard = async () => {
      try {
        const data =
          await getDashboardStats(user.id);

        setStats(data);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    fetchDashboard();
  }, []);
  useEffect(() => {

  window.history.pushState(null, "", window.location.href);

  const handlePopState = () => {
    window.history.pushState(
      null,
      "",
      window.location.href
    );
  };

  window.addEventListener("popstate", handlePopState);

  return () => {
    window.removeEventListener(
      "popstate",
      handlePopState
    );
  };

}, []);

 const logout = () => {

  localStorage.clear();

  navigate("/", {
    replace: true,
  });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

        <div className="text-center">

          <div className="w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mx-auto"></div>

          <p className="mt-5 text-xl font-semibold">

            Loading Dashboard...

          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

      <div className="max-w-7xl mx-auto py-10 px-6">

        {/* Header */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="flex justify-between items-center"
        >

          <div>

            <h1 className="text-5xl font-black">

              Welcome,

            </h1>

            <h2 className="text-3xl mt-2 font-bold text-blue-600">

              {user.full_name}

            </h2>

            <p className="text-gray-500 mt-4">

              Ready to donate something today?

            </p>

          </div>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl flex items-center gap-3 transition"
          >

            <LogOut size={20} />

            Logout

          </button>

        </motion.div>

        {/* Camera Card */}

        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          onClick={() =>
            navigate("/donor/camera")
          }
          className="cursor-pointer mt-10 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-2xl p-10"
        >

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-4xl font-black">

                Start New Donation

              </h2>

              <p className="mt-4 text-blue-100 text-lg">

                Open the AI Camera and detect
                donation items instantly.

              </p>

            </div>

            <Camera size={65} />

          </div>

        </motion.div>

        {/* Statistics */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">
                    {/* Total Donations */}

          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500 text-lg">

                  Total Donations

                </p>

                <h2 className="text-5xl font-black mt-3">

                  {stats?.total_donations}

                </h2>

                <p className="text-green-600 font-semibold mt-3">

                  Successfully Submitted

                </p>

              </div>

              <div className="bg-blue-100 p-5 rounded-3xl">

                <Package
                  className="text-blue-600"
                  size={42}
                />

              </div>

            </div>

          </motion.div>

          {/* Total Items */}

          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500 text-lg">

                  Items Donated

                </p>

                <h2 className="text-5xl font-black mt-3">

                  {stats?.total_items}

                </h2>

                <p className="text-green-600 font-semibold mt-3">

                  AI Detected

                </p>

              </div>

              <div className="bg-green-100 p-5 rounded-3xl">

                <Gift
                  className="text-green-600"
                  size={42}
                />

              </div>

            </div>

          </motion.div>

          {/* Pending */}

          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500 text-lg">

                  Pending Donations

                </p>

                <h2 className="text-5xl font-black mt-3">

                  {stats?.pending_donations}

                </h2>

                <p className="text-orange-500 font-semibold mt-3">

                  Waiting for NGO Review

                </p>

              </div>

              <div className="bg-orange-100 p-5 rounded-3xl">

                <Clock3
                  className="text-orange-500"
                  size={42}
                />

              </div>

            </div>

          </motion.div>

          {/* Last Donation */}

          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500 text-lg">

                  Last Donation

                </p>

                <h2 className="text-3xl font-black mt-4">

                  {stats?.last_donation}

                </h2>

                <p className="text-blue-600 font-semibold mt-3">

                  Latest Activity

                </p>

              </div>

              <div className="bg-purple-100 p-5 rounded-3xl">

                <Clock3
                  className="text-purple-600"
                  size={42}
                />

              </div>

            </div>

          </motion.div>

        </div>

        {/* Recent Donations */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          className="mt-12 bg-white rounded-3xl shadow-xl p-8"
        >

          <div className="flex justify-between items-center">

            <h2 className="text-3xl font-black">

              Recent Donations

            </h2>

            <button
  onClick={() => navigate("/donor/history")}
  className="flex items-center gap-2 text-blue-600 font-semibold"
>
  View All
  <ArrowRight size={18} />
</button>

          </div>

          <div className="mt-8 space-y-5">
                        {stats?.recent_donations &&
            stats.recent_donations.length > 0 ? (

              stats.recent_donations.map((donation) => (

                <motion.div
                  key={donation.id}
                  whileHover={{
                    scale: 1.01,
                  }}
                  className="border rounded-2xl p-6 flex justify-between items-center hover:shadow-lg transition"
                >

                  <div>

                    <h3 className="text-xl font-bold">

                      Donation #{donation.id}

                    </h3>

                    <p className="text-gray-500 mt-2">

                      {donation.date}

                    </p>

                  </div>

                  <div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        donation.status === "Pending"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {donation.status}
                    </span>

                  </div>

                  <div className="text-right">

                    <p className="text-lg font-bold">

                      {donation.items} Items

                    </p>

                    <p className="text-gray-500">

                      AI Detected

                    </p>

                  </div>

                </motion.div>

              ))

            ) : (

              <div className="text-center py-16">

                <Package
                  size={70}
                  className="mx-auto text-gray-300"
                />

                <h3 className="text-2xl font-bold mt-6">

                  No Donations Yet

                </h3>

                <p className="text-gray-500 mt-3">

                  Start your first donation using the AI Camera.

                </p>

                <button
                  onClick={() =>
                    navigate("/donor/camera")
                  }
                  className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition"
                >
                  Start Donation
                </button>

              </div>

            )}

          </div>

        </motion.div>

      </div>

    </div>
  );
}