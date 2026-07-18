import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import { schedulePickup } from "../../services/pickupService";
import {
  markDonorNotificationReadByMatch,
} from "../../services/donorNotificationService";

export default function PickupSchedule() {

  const navigate = useNavigate();

  const { matchId } = useParams();

  const [pickupDate, setPickupDate] = useState("");

  const [pickupTime, setPickupTime] = useState("");

  const [loading, setLoading] = useState(false);

  const submitPickup = async () => {

    if (!pickupDate || !pickupTime) {

      toast.error(
  "Please select pickup date and time."
);

      return;

    }

    try {

      setLoading(true);

      let formattedTime = "";

      switch (pickupTime) {

        case "09:00 AM - 11:00 AM":
          formattedTime = "09:00:00";
          break;

        case "11:00 AM - 01:00 PM":
          formattedTime = "11:00:00";
          break;

        case "02:00 PM - 04:00 PM":
          formattedTime = "14:00:00";
          break;

        case "04:00 PM - 06:00 PM":
          formattedTime = "16:00:00";
          break;

        default:
          formattedTime = "09:00:00";

      }

      await schedulePickup(

        Number(matchId),

        pickupDate,

        formattedTime

      );

      await markDonorNotificationReadByMatch(
  Number(matchId)
);

toast.success(
  "Pickup Scheduled Successfully"
);

navigate("/donor/pickup-success");

    }

    catch (error) {

      console.error(error);

      toast.error(
  "Failed to schedule pickup."
);

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-8">
      <div className="max-w-3xl mx-auto mb-6">
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() =>
      navigate(`/donor/checklist/${matchId}`)
    }
    className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl shadow-md hover:bg-gray-100 transition-all"
  >
    <ArrowLeft size={20} />
    <span className="font-semibold">
      Back to Packaging Checklist
    </span>
  </motion.button>
</div>

        <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10"
>

        <h1 className="text-4xl font-black">

          Schedule Pickup

        </h1>

        <p className="text-gray-500 mt-3">

          Select your preferred pickup date and time.

        </p>

        <div className="mt-8">

          <label className="font-semibold">

            Pickup Date

          </label>

          <input

            type="date"

            className="w-full border rounded-xl p-4 mt-2"

            value={pickupDate}

            onChange={(e) =>
              setPickupDate(e.target.value)
            }

          />

        </div>

        <div className="mt-6">

          <label className="font-semibold">

            Pickup Time

          </label>

          <select

            className="w-full border rounded-xl p-4 mt-2"

            value={pickupTime}

            onChange={(e) =>
              setPickupTime(e.target.value)
            }

          >

            <option value="">

              Select Time

            </option>

            <option>

              09:00 AM - 11:00 AM

            </option>

            <option>

              11:00 AM - 01:00 PM

            </option>

            <option>

              02:00 PM - 04:00 PM

            </option>

            <option>

              04:00 PM - 06:00 PM

            </option>

          </select>

        </div>

        <motion.button

          whileHover={{
            scale: 1.02,
          }}

          disabled={loading}

          onClick={submitPickup}

          className="w-full mt-10 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl text-xl font-bold"

        >

          {loading
            ? "Scheduling..."
            : "Schedule Pickup"}

        </motion.button>

           </motion.div>

    </div>

  );

}