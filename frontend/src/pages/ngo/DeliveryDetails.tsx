import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  assignDeliveryPartner,
  outForPickup,
  markCollected,
  markInTransit,
  markDelivered,
  acknowledgeDelivery,
  getDeliveryStatus,
} from "../../services/deliveryService";

export default function DeliveryDetails() {

  const navigate = useNavigate();

  const { matchId } = useParams();

  const [pickup, setPickup] = useState<any>(null);

  const [volunteerName, setVolunteerName] =
    useState("");

  const [volunteerPhone, setVolunteerPhone] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    loadPickup();

  }, []);

  const loadPickup = async () => {

    try {

      const data =
        await getDeliveryStatus(
          Number(matchId)
        );

      setPickup(data);

      if (data) {

        setVolunteerName(
          data.volunteer_name || ""
        );

        setVolunteerPhone(
          data.volunteer_phone || ""
        );

      }

    }

    catch (err) {

      console.log(err);

    }

  };

  const assignPartner = async () => {

    if (!volunteerName || !volunteerPhone) {

      toast.error(
        "Enter delivery partner details."
      );

      return;

    }

    try {

      setLoading(true);

      await assignDeliveryPartner(

        Number(matchId),

        volunteerName,

        volunteerPhone

      );

      toast.success(
        "Delivery Partner Assigned"
      );

      await loadPickup();

    }

    catch {

      toast.error(
        "Failed to assign delivery partner"
      );

    }

    finally {

      setLoading(false);

    }

  };
  const handleOutForPickup = async () => {

  try {

    setLoading(true);

    await outForPickup(
      Number(matchId)
    );

    toast.success(
      "Volunteer is on the way to collect the donation."
    );

    await loadPickup();

  }

  catch {

    toast.error(
      "Unable to update status"
    );

  }

  finally {

    setLoading(false);

  }

};
const handleCollected = async () => {

  try {

    setLoading(true);

    await markCollected(
      Number(matchId)
    );

    toast.success(
      "Donation Collected Successfully"
    );

    await loadPickup();

  }

  catch {

    toast.error(
      "Unable to update status"
    );

  }

  finally {

    setLoading(false);

  }

};
    const handleTransit = async () => {

    try {

      setLoading(true);

      await markInTransit(
        Number(matchId)
      );

      toast.success(
        "Donation In Transit"
      );

      await loadPickup();

    }

    catch {

      toast.error(
        "Unable to update status"
      );

    }

    finally {

      setLoading(false);

    }

  };

  const handleDelivered = async () => {

    try {

      setLoading(true);

      await markDelivered(
        Number(matchId)
      );

      toast.success(
        "Donation Delivered"
      );

      await loadPickup();

    }

    catch {

      toast.error(
        "Unable to update status"
      );

    }

    finally {

      setLoading(false);

    }

  };

  const handleAcknowledged = async () => {

    try {

      setLoading(true);

      await acknowledgeDelivery(
        Number(matchId)
      );

      toast.success(
        "Donation Acknowledged"
      );

      await loadPickup();

    }

    catch {

      toast.error(
        "Unable to update status"
      );

    }

    finally {

      setLoading(false);

    }

  };

  if (!pickup) {

    return (

      <div className="min-h-screen flex justify-center items-center">

        Loading...

      </div>

    );

  }

  return (

    <motion.div
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.45 }}
  className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-10"
>

      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <div className="flex items-center justify-between">

  <h1 className="text-4xl font-black">
    Delivery Management
  </h1>

  <button
    onClick={() => navigate("/ngo/delivery-management")}
    className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-xl font-semibold transition"
  >
    ← Back
  </button>

</div>

        <p className="mt-3 text-gray-500">

          Current Status :
          <span className="font-bold text-blue-600 ml-2">

            {pickup.status}

          </span>

        </p>
{/* Scheduled */}
{pickup.status === "Scheduled" && (
  <>
    <div className="mt-8">
      <label className="font-semibold">Volunteer Name</label>
      <input
        className="w-full border rounded-xl p-4 mt-2"
        value={volunteerName}
        onChange={(e) => setVolunteerName(e.target.value)}
      />
    </div>

    <div className="mt-6">
      <label className="font-semibold">Volunteer Phone</label>
      <input
        className="w-full border rounded-xl p-4 mt-2"
        value={volunteerPhone}
        onChange={(e) => setVolunteerPhone(e.target.value)}
      />
    </div>

    <motion.button
      whileHover={{ scale: 1.02 }}
      onClick={assignPartner}
      disabled={loading}
      className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold"
    >
      Assign Delivery Partner
    </motion.button>
  </>
)}

{/* Delivery Partner Assigned */}
{pickup.status === "Delivery Partner Assigned" && (
  <motion.button
    whileHover={{ scale: 1.02 }}
    onClick={handleOutForPickup}
    disabled={loading}
    className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold"
  >
    Out For Pickup
  </motion.button>
)}

{/* Out For Pickup */}
{pickup.status === "Out For Pickup" && (
  <motion.button
    whileHover={{ scale: 1.02 }}
    onClick={handleCollected}
    disabled={loading}
    className="w-full mt-8 bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-2xl font-bold"
  >
    Mark Collected
  </motion.button>
)}

{/* Collected */}
{pickup.status === "Collected" && (
  <motion.button
    whileHover={{ scale: 1.02 }}
    onClick={handleTransit}
    disabled={loading}
    className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold"
  >
    Mark In Transit
  </motion.button>
)}

{/* In Transit */}
{pickup.status === "In Transit" && (
  <motion.button
    whileHover={{ scale: 1.02 }}
    onClick={handleDelivered}
    disabled={loading}
    className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold"
  >
    Mark Delivered To NGO
  </motion.button>
)}

{/* Delivered */}
{pickup.status === "Delivered" && (
  <motion.button
    whileHover={{ scale: 1.02 }}
    onClick={handleAcknowledged}
    disabled={loading}
    className="w-full mt-8 bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-bold"
  >
    Acknowledge Delivery
  </motion.button>
)}

       {/* Acknowledged */}
{pickup.status === "Acknowledged" && (

  <div className="mt-8 bg-green-100 border border-green-400 rounded-2xl p-6 text-center">

    <h2 className="text-2xl font-bold text-green-700">

      Donation Completed Successfully

    </h2>

    <button

      onClick={() => navigate("/ngo/dashboard")}

      className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold"

    >

      Back to Dashboard

    </button>

  </div>

)}

      </div>

    
    </motion.div>

  );

}