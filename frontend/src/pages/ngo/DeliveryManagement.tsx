import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getDeliveryList } from "../../services/deliveryService";

export default function DeliveryManagement() {
  const navigate = useNavigate();

  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const formatPickupTime = (time: string) => {
  switch (time) {
    case "09:00:00":
      return "09:00 AM - 11:00 AM";

    case "11:00:00":
      return "11:00 AM - 01:00 PM";

    case "14:00:00":
      return "02:00 PM - 04:00 PM";

    case "16:00:00":
      return "04:00 PM - 06:00 PM";

    default:
      return time;
  }
};

  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = async () => {
    try {
      const data = await getDeliveryList();
      setDeliveries(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading Deliveries...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-black">
            Delivery Management
          </h1>

          <button
            onClick={() => navigate("/ngo/dashboard")}
            className="bg-gray-200 hover:bg-gray-300 px-5 py-3 rounded-xl font-semibold transition"
          >
            ← Back
          </button>
        </div>

        {deliveries.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl p-10 text-center shadow"
          >
            No Active Deliveries
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {deliveries.map((delivery, index) => (
            <motion.div
              key={delivery.match_id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
              whileHover={{
                scale: 1.02,
                y: -5,
              }}
              className="bg-white rounded-3xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold">
                Donation #{delivery.donation_id}
              </h2>

              <div className="mt-5 space-y-3">
                <p>
                  <b>Donor:</b> {delivery.donor_name}
                </p>

                <p>
                  <b>Item:</b> {delivery.item_name}
                </p>

                <p>
                  <b>Quantity:</b> {delivery.quantity}
                </p>

                <p>
                  <b>Pickup Date:</b> {delivery.pickup_date}
                </p>

                <p>
                  <b>Pickup Time:</b> {formatPickupTime(delivery.pickup_time)}
                </p>

                <p>
                  <b>Status:</b>
                  <span className="text-blue-600 font-bold ml-2">
                    {delivery.status}
                  </span>
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.02 }}
                onClick={() =>
                  navigate(
                    `/ngo/delivery-management/${delivery.match_id}`
                  )
                }
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold"
              >
                Manage Delivery
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}