import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  Bell,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

import {
  getNotifications,
  markAsRead,
} from "../../services/notificationService";

export default function Notifications() {

  const navigate = useNavigate();

  const [notifications, setNotifications] =
    useState<any[]>([]);

  const ngo = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  useEffect(() => {

    loadNotifications();

  }, []);

  const loadNotifications = async () => {

    try {

      const data =
        await getNotifications(ngo.ngo_id);

      setNotifications(data);

    } catch (err) {

      console.log(err);

    }

  };

  const openNotification = async (
    notification: any
  ) => {

    await markAsRead(notification.id);

    if (
      notification.title === "Pickup Scheduled"
    ) {

      navigate(
  `/ngo/delivery-management/${notification.match_id}`
);

    }

    loadNotifications();

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

      <div className="max-w-6xl mx-auto py-10 px-6">

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

            <button

              onClick={() =>
                navigate("/ngo/dashboard")
              }

              className="flex items-center gap-2 text-blue-600 font-semibold"

            >

              <ArrowLeft size={18} />

              Back

            </button>

            <h1 className="text-5xl font-black mt-6">

              Notifications

            </h1>

            <p className="text-gray-500 mt-3">

              Donation Match Notifications

            </p>

          </div>

          <Bell
            size={70}
            className="text-blue-600"
          />

        </motion.div>

        <div className="mt-10 space-y-6">

          {notifications.length === 0 ? (

            <motion.div

              initial={{
                opacity: 0,
                y: 20,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              className="bg-white rounded-3xl shadow-xl p-10 text-center"

            >

              <Bell
                size={70}
                className="mx-auto text-gray-300"
              />

              <h2 className="text-3xl font-bold mt-6">

                No Notifications

              </h2>

              <p className="text-gray-500 mt-4">

                Matching notifications will appear here.

              </p>

            </motion.div>

          ) : (

            notifications.map((notification) => (

              <motion.div

                key={notification.id}

                initial={{
                  opacity: 0,
                  y: 20,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                whileHover={{
                  scale: 1.01,
                }}

                className="bg-white rounded-3xl shadow-xl p-8"

              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-2xl font-bold">

                      {notification.title}

                    </h2>

                    <p className="text-gray-600 mt-3">

                      {notification.message}

                    </p>

                    <p className="text-sm text-gray-400 mt-4">

                      {new Date(
                        notification.created_at + "Z"
                      ).toLocaleString(
                        "en-IN",
                        {
                          timeZone: "Asia/Kolkata",
                          dateStyle: "medium",
                          timeStyle: "short",
                        }
                      )}

                    </p>

                  </div>

                  {!notification.is_read && (

                    <button

                      onClick={() =>
                        openNotification(notification)
                      }

                      className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"

                    >

                      <CheckCircle size={18} />

                      {notification.title === "Pickup Scheduled"
                        ? "Open"
                        : "Mark Read"}

                    </button>

                  )}

                </div>

              </motion.div>

            ))

          )}

        </div>

      </div>

    </div>

  );

}