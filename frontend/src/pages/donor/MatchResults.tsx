import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaArrowLeft,
  FaBuilding,
  FaCheckCircle,
  FaChartLine,
} from "react-icons/fa";

import { getMatches } from "../../services/matchingService";

export default function MatchResults() {

  const navigate = useNavigate();

  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {

    loadMatches();

  }, []);

  const loadMatches = async () => {

    const donationId = Number(
  localStorage.getItem("lastDonationId")
);

    try {

      const data = await getMatches(
        donationId
      );

      setMatches(data);

    } catch (err) {
      console.log(err);
    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-10">

      <button

        onClick={() => navigate("/donor/dashboard")}

        className="flex items-center gap-2 text-blue-600 font-semibold"

      >

        <FaArrowLeft />

        Back

      </button>

      <motion.div

        initial={{ opacity: 0, y: 40 }}

        animate={{ opacity: 1, y: 0 }}

        className="max-w-5xl mx-auto mt-8"

      >

        <h1 className="text-4xl font-black">

          Matching Results

        </h1>

        <p className="text-gray-500 mt-2">

          NGOs matched for your donation

        </p>

        <div className="grid gap-6 mt-8">

          {matches.map((match, index) => (

            <div

              key={index}

              className="bg-white rounded-3xl shadow-lg p-6"

            >

              <div className="flex justify-between">

                <div>

                  <h2 className="text-2xl font-bold flex items-center gap-3">

                    <FaBuilding />

                    {match.ngo_name}

                  </h2>

                  <div className="mt-3">

  <p className="text-gray-600 font-semibold">

    {match.reason}

  </p>

  <div className="mt-4 bg-slate-50 rounded-2xl p-4">

    <h3 className="font-bold text-blue-700 mb-3">

      AI Explanation

    </h3>

    {match.explanation.map(
      (
        line: string,
        index: number
      ) => (

        <p
          key={index}
          className="text-gray-600 mb-2"
        >

          ✅ {line}

        </p>

      )
    )}

  </div>

</div>

                </div>

                <div className="text-right">

                  <p className="text-4xl font-black text-green-600">

                    {match.match_score}%

                  </p>

                </div>

              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

                <div className="bg-blue-50 rounded-xl p-4">

                  <FaCheckCircle />

                  <p className="mt-2 font-semibold">

                    Item

                  </p>

                  <p>

                    {match.item_score}

                  </p>

                </div>

                <div className="bg-blue-50 rounded-xl p-4">

                  <FaChartLine />

                  <p className="mt-2 font-semibold">

                    Quantity

                  </p>

                  <p>

                    {match.quantity_score}

                  </p>

                </div>

                <div className="bg-blue-50 rounded-xl p-4">

                  <p className="font-semibold">

                    Priority

                  </p>

                  <p>

                    {match.priority_score}

                  </p>

                </div>

                <div className="bg-blue-50 rounded-xl p-4">

  <p className="font-semibold">

    Distance

  </p>

  <p className="text-xl font-bold text-blue-700">

    {match.distance_km ?? "N/A"} km

  </p>

  <p className="text-sm text-gray-500 mt-2">

    Score : {match.distance_score}/10

  </p>

</div>

<div className="bg-indigo-50 rounded-xl p-4">

  <p className="font-semibold">

    Donated Item

  </p>

  <p>

    {match.donated_item}

  </p>

</div>

<div className="bg-green-50 rounded-xl p-4">

  <p className="font-semibold">

    NGO Requirement

  </p>

  <p>

    {match.required_item}

  </p>

</div>

<div className="bg-yellow-50 rounded-xl p-4">

  <p className="font-semibold">

    Quantity

  </p>

  <p>

    {match.donated_quantity} / {match.required_quantity}

  </p>

</div>

<div className="bg-pink-50 rounded-xl p-4">

  <p className="font-semibold">

    Priority

  </p>

  <p>

    {match.priority}

  </p>

</div>

</div>

            </div>

          ))}

        </div>

      </motion.div>

    </div>

  );
  

}
