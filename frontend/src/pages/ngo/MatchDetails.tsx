import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaArrowLeft,
  FaBuilding,
  FaMapMarkerAlt,
} from "react-icons/fa";

import {
  getMatchDetails,
  acceptMatch,
  rejectMatch,
} from "../../services/matchingService";

import toast from "react-hot-toast";

export default function MatchDetails() {

  const navigate = useNavigate();

  const { matchId } = useParams();

  const [match, setMatch] = useState<any>(null);

  useEffect(() => {

    loadMatch();

  }, []);

  const loadMatch = async () => {

    try {

      const data = await getMatchDetails(
        Number(matchId)
      );

      setMatch(data);

    }

    catch (err) {

      console.log(err);

    }

  };

  const handleAccept = async () => {

    try {

      await acceptMatch(
        match.match_id
      );

      toast.success(
        "Donation Accepted"
      );

      setMatch({

        ...match,

        status: "Accepted",

      });

    }

    catch {

      toast.error(
        "Unable to accept donation"
      );

    }

  };

  const handleReject = async () => {

    try {

      await rejectMatch(
        match.match_id
      );

      toast.success(
        "Donation Rejected"
      );

      setMatch({

        ...match,

        status: "Rejected",

      });

    }

    catch {

      toast.error(
        "Unable to reject donation"
      );

    }

  };

  if (!match) {

    return (

      <div className="min-h-screen flex justify-center items-center">

        Loading...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">

      <div className="max-w-6xl mx-auto">

        <button

          onClick={() => navigate("/ngo/matches")}

          className="flex items-center gap-2 text-blue-600 font-semibold"

        >

          <FaArrowLeft />

          Back

        </button>

        <motion.div

          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}

          className="mt-8 bg-white rounded-3xl shadow-xl p-8"

        >

          <div className="flex justify-between items-center">

            <div>

              <h1 className="text-4xl font-black flex items-center gap-3">

                <FaBuilding />

                {match.donor_name}

              </h1>

              <p className="text-gray-500 mt-2">

                Donor Information

              </p>

              <div className="grid md:grid-cols-3 gap-5 mt-6">

                <div className="bg-blue-50 rounded-2xl p-5">

                  <p className="font-bold">

                    Donor Name

                  </p>

                  <p>

                    {match.donor_name}

                  </p>

                </div>

                <div className="bg-green-50 rounded-2xl p-5">

                  <p className="font-bold">

                    Phone

                  </p>

                  <p>

                    {match.donor_phone}

                  </p>

                </div>

                <div className="bg-yellow-50 rounded-2xl p-5">

                  <p className="font-bold">

                    Address

                  </p>

                  <p>

                    {match.donor_address}

                  </p>

                </div>

              </div>

              <p className="text-gray-500 mt-5">

                AI Match Transparency

              </p>

            </div>

            <div className="text-right">

              <p className="text-5xl font-black text-green-600">

                {match.match_score}%

              </p>

              <p className="text-gray-500">

                Overall Score

              </p>

            </div>

          </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">

            <div className="bg-blue-50 rounded-2xl p-5">

              <p className="font-bold">

                Donated Item

              </p>

              <p>

                {match.donated_item}

              </p>

            </div>

            <div className="bg-green-50 rounded-2xl p-5">

              <p className="font-bold">

                Condition

              </p>

              <p>

                {match.condition}

              </p>

            </div>

            <div className="bg-yellow-50 rounded-2xl p-5">

              <p className="font-bold">

                NGO Minimum

              </p>

              <p>

                {match.minimum_condition}

              </p>

            </div>

            <div className="bg-indigo-50 rounded-2xl p-5">

              <p className="font-bold">

                Quantity

              </p>

              <p>

                {match.donated_quantity} / {match.required_quantity}

              </p>

            </div>

            <div className="bg-pink-50 rounded-2xl p-5">

              <p className="font-bold">

                Priority

              </p>

              <p>

                {match.priority}

              </p>

            </div>

            <div className="bg-cyan-50 rounded-2xl p-5">

              <FaMapMarkerAlt />

              <p className="font-bold mt-2">

                Distance

              </p>

              <p>

                {match.distance_km} km

              </p>

            </div>

          </div>

          <div className="mt-10 bg-slate-50 rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-5">

              AI Explanation

            </h2>

            {match.explanation.map(

              (line: string, index: number) => (

                <p

                  key={index}

                  className="mb-3 text-gray-700"

                >

                  ✅ {line}

                </p>

              )

            )}

          </div>

          <div className="mt-10">

            {match.status === "Pending" && (

              <div className="grid md:grid-cols-2 gap-6">

                <button

                  onClick={handleAccept}

                  className="bg-green-600 hover:bg-green-700 text-white rounded-2xl py-4 text-xl font-bold"

                >

                  Accept Donation

                </button>

                <button

                  onClick={handleReject}

                  className="bg-red-600 hover:bg-red-700 text-white rounded-2xl py-4 text-xl font-bold"

                >

                  Reject Donation

                </button>

              </div>

            )}

         {match.status === "Accepted" && (

  <div>

    <div className="bg-green-600 rounded-2xl text-white text-center py-5 text-2xl font-bold">

      Donation Accepted

    </div>

    {!match.pickup_status ? (

      <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 rounded-2xl p-5">

        <h3 className="text-xl font-bold text-yellow-800">

          Waiting for Donor

        </h3>

        <p className="mt-2">

          The donor has not scheduled pickup yet.

        </p>

      </div>

    ) : (

      <div>

        <div className="mt-6 bg-green-100 border-l-4 border-green-600 rounded-2xl p-6">

          <h3 className="text-2xl font-bold text-green-700">

            ✅ Pickup Scheduled

          </h3>

          <p className="mt-3 text-gray-700">

            The donor has successfully scheduled the pickup.

          </p>

          <p className="mt-2 text-gray-700">

            Please go to <b>Delivery Management</b> to assign a delivery
            partner and manage the complete delivery process.

          </p>

        </div>

        <button

          onClick={() => navigate(`/ngo/delivery-management/${match.match_id}`)}

          className="w-full mt-6 bg-cyan-600 hover:bg-cyan-700 text-white rounded-2xl py-4 text-xl font-bold"

        >

          🚚 Go To Delivery Management

        </button>

      </div>

    )}

  </div>

)}
                        {match.status === "Rejected" && (

              <div>

                <div className="bg-red-600 rounded-2xl text-white text-center py-5 text-2xl font-bold">

                  Donation Rejected

                </div>

              </div>

            )}

          </div>

        </motion.div>

      </div>

    </div>

  );

}