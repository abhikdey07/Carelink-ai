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
  Handshake,
} from "lucide-react";

import { getDashboardStats } from "../../services/dashboardService";
import {
  getDonorNotifications,
  markDonorNotificationRead,
} from "../../services/donorNotificationService";
import { translateDashboard } from "../../services/translationService";
import { Bell } from "lucide-react";
import type { DashboardStats } from "../../services/dashboardService";

export default function Dashboard() {
  const dashboardTexts = [
  "Welcome",
  "Ready to donate something today?",
  "Logout",
  "Start New Donation",
   "My Profile",
  "Open the AI Camera and detect donation items instantly.",
  "AI Matching Results",
  "View NGOs matched by the Intelligent Matching Engine.",
  "Total Donations",
  "Successfully Submitted",
  "Items Donated",
  "AI Detected",
  "Pending Donations",
  "Waiting for NGO Review",
  "Last Donation",
  "Latest Activity",
  "Recent Donations",
  "Matching Results",
  "View All",
  "No Donations Yet",
  "Start your first donation using the AI Camera.",
  "Start Donation",
  "View Matches"
];

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [stats, setStats] =
  useState<DashboardStats | null>(null);

const [loading, setLoading] =
  useState(true);

const [notifications, setNotifications] =
  useState<any[]>([]);

// NEW
const [language, setLanguage] =
  useState("en-IN");

// NEW
const [translations, setTranslations] =
  useState<any>({});

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
        const notificationData =
  await getDonorNotifications(user.id);

setNotifications(notificationData);

      } catch (err) {

        console.error(err);

      }

      setLoading(false);

    };

    fetchDashboard();

  }, []);

  useEffect(() => {

    window.history.pushState(
      null,
      "",
      window.location.href
    );

    const handlePopState = () => {

      window.history.pushState(
        null,
        "",
        window.location.href
      );

    };

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {

      window.removeEventListener(
        "popstate",
        handlePopState
      );

    };

  }, []);
  useEffect(() => {

  const loadTranslations = async () => {

    if (language === "en-IN") {

      const english: any = {};

      dashboardTexts.forEach((text) => {
        english[text] = text;
      });

      setTranslations(english);
      return;

    }

    try {

      const translated = await translateDashboard(
        dashboardTexts,
        language
      );

      setTranslations(translated);

    } catch (error) {

      console.error("Translation Error:", error);

    }

  };

  loadTranslations();

}, [language]);
const openNotification = async (
  notification: any
) => {

  try {

    if (
      notification.title ===
      "Donation Accepted"
    ) {

      navigate(
        `/donor/checklist/${notification.match_id}`
      );

      return;
    }

    await markDonorNotificationRead(
      notification.id
    );

    setNotifications((prev) =>
      prev.filter(
        (n) => n.id !== notification.id
      )
    );

  } catch (error) {

    console.error(error);

  }

};
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

               {translations["Welcome"] || "Welcome"},

            </h1>

            <h2 className="text-3xl mt-2 font-bold text-blue-600">

              {user.full_name}

            </h2>

            <p className="text-gray-500 mt-4">

              {translations["Ready to donate something today?"] ||
    "Ready to donate something today?"}

            </p>

          </div>
           
          <div className="flex items-center gap-4">

  <select
    value={language}
    onChange={(e) => setLanguage(e.target.value)}
    className="border border-gray-300 rounded-xl px-4 py-3 bg-white"
  >
    <option value="en-IN">English</option>
    <option value="hi-IN">Hindi</option>
    <option value="bn-IN">Bengali</option>
  </select>
  <button
  onClick={() => navigate("/donor/profile")}
  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition"
>
  👤 {translations["My Profile"] || "My Profile"}
</button>

  <button
    onClick={logout}
    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl flex items-center gap-3 transition"
  >
    <LogOut size={20} />
    {translations["Logout"] || "Logout"}
  </button>

</div>

        </motion.div>
{notifications
  .filter((n) => !n.is_read)
  .map((notification) => (

    <motion.div
      key={notification.id}
      whileHover={{ scale: 1.01 }}
      onClick={() =>
        openNotification(notification)
      }
      className="cursor-pointer mt-8 bg-yellow-100 border-l-8 border-yellow-500 rounded-3xl p-6 shadow-lg"
    >

      <div className="flex items-center gap-4">

        <Bell
          size={40}
          className="text-yellow-700"
        />

        <div>

          <h2 className="text-2xl font-bold">

            {notification.title}

          </h2>

          <p className="text-gray-700 mt-1">

            {notification.message}

          </p>

          <p className="text-blue-600 font-semibold mt-3">

  {notification.title === "Donation Accepted"
    ? "Click to continue →"
    : "Mark as Read"}

</p>

        </div>

      </div>

    </motion.div>

))}
        {/* Camera */}

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

                 {translations["Start New Donation"] ||
    "Start New Donation"}

              </h2>

              <p className="mt-4 text-blue-100 text-lg">

                {translations[
    "Open the AI Camera and detect donation items instantly."
  ] ||
    "Open the AI Camera and detect donation items instantly."}

              </p>

            </div>

            <Camera size={65} />

          </div>

        </motion.div>

        {/* AI Matching */}

        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          onClick={() =>
            navigate("/donor/matches")
          }
          className="cursor-pointer mt-8 rounded-3xl bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-2xl p-10"
        >

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-4xl font-black">

                {translations["AI Matching Results"] ||
    "AI Matching Results"}

              </h2>

              <p className="mt-4 text-green-100 text-lg">

                <p className="mt-4 text-green-100 text-lg">

  {translations[
    "View NGOs matched by the Intelligent Matching Engine."
  ] ||
    "View NGOs matched by the Intelligent Matching Engine."}

</p>

              </p>

            </div>

            <Handshake size={65} />

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

                   {translations["Total Donations"] ||
    "Total Donations"}

                </p>

                <h2 className="text-5xl font-black mt-3">

                  {stats?.total_donations}

                </h2>

                <p className="text-green-600 font-semibold mt-3">

                  {translations["Successfully Submitted"] ||
    "Successfully Submitted"}
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

                  {translations["Items Donated"] ||
    "Items Donated"}

                </p>

                <h2 className="text-5xl font-black mt-3">

                  {stats?.total_items}

                </h2>

                <p className="text-green-600 font-semibold mt-3">

                  {translations["AI Detected"] ||
    "AI Detected"}

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

                  {translations["Pending Donations"] ||
    "Pending Donations"}

                </p>

                <h2 className="text-5xl font-black mt-3">

                  {stats?.pending_donations}

                </h2>

                <p className="text-orange-500 font-semibold mt-3">

                 {translations["Waiting for NGO Review"] ||
    "Waiting for NGO Review"}

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

                   {translations["Last Donation"] ||
    "Last Donation"}

                </p>

                <h2 className="text-3xl font-black mt-4">

                  {stats?.last_donation}

                </h2>

                <p className="text-blue-600 font-semibold mt-3">

                  {translations["Latest Activity"] ||
    "Latest Activity"}

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

              {translations["Recent Donations"] ||
    "Recent Donations"}

            </h2>

            <div className="flex gap-4">

              <button
                onClick={() =>
                  navigate("/donor/matches")
                }
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold transition"
              >

                {translations["Matching Results"] ||
"Matching Results"}

              </button>

              <button
                onClick={() =>
                  navigate("/donor/history")
                }
                className="flex items-center gap-2 text-blue-600 font-semibold"
              >

                {translations["View All"] ||
"View All"}

                <ArrowRight size={18} />

              </button>

            </div>

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

                  <div className="text-center">

  <span
    className={`px-4 py-2 rounded-full text-sm font-semibold ${
      donation.status === "Pending"
        ? "bg-orange-100 text-orange-600"
        : "bg-green-100 text-green-600"
    }`}
  >
    {donation.status}
  </span>

  {donation.status === "Out For Pickup" &&
    donation.volunteer_name && (
      <div className="mt-3 text-sm text-gray-700">
        <p>
          <span className="font-semibold">
            Volunteer:
          </span>{" "}
          {donation.volunteer_name}
        </p>

        <p>
          <span className="font-semibold">
            Phone:
          </span>{" "}
          {donation.volunteer_phone}
        </p>
      </div>
  )}

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

                <div className="flex justify-center gap-5 mt-8">

                  <button
                    onClick={() =>
                      navigate("/donor/camera")
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition"
                  >

                    Start Donation

                  </button>

                  <button
                    onClick={() =>
                      navigate("/donor/matches")
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold transition"
                  >

                    View Matches

                  </button>

                </div>

              </div>

            )}

          </div>

        </motion.div>
              </div>

    </div>

  );

}