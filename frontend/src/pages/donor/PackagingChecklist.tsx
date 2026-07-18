import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function PackagingChecklist() {
  const navigate = useNavigate();
  const { matchId } = useParams();

  const [checked, setChecked] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-8">
      {/* Back Button */}
      <div className="max-w-3xl mx-auto mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/donor/dashboard")}
          className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl shadow-md hover:bg-gray-100 transition-all"
        >
          <ArrowLeft size={20} />
          <span className="font-semibold">Back to Dashboard</span>
        </motion.button>
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10"
      >
        <h1 className="text-4xl font-black text-gray-900">
          Packaging Checklist
        </h1>

        <p className="text-gray-500 mt-3 text-lg">
          Please complete the following checklist before scheduling your pickup.
        </p>

        <div className="mt-8 space-y-5 text-lg">
          <p>✅ Pack all donated items securely.</p>

          <p>✅ Ensure items are clean and dry.</p>

          <p>✅ Use a strong bag or box.</p>

          <p>✅ Fragile items are wrapped properly.</p>

          <p>✅ Keep all donated items together.</p>

          <p>✅ Verify your pickup address.</p>

          <p>✅ Be available during the selected pickup slot.</p>
        </div>

        <div className="mt-10 flex items-center gap-3">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="w-5 h-5 cursor-pointer"
          />

          <span className="text-lg">
            I have completed the packaging checklist.
          </span>
        </div>

        <motion.button
          whileHover={checked ? { scale: 1.02 } : {}}
          whileTap={checked ? { scale: 0.98 } : {}}
          disabled={!checked}
          onClick={() => navigate(`/donor/pickup/${matchId}`)}
          className={`mt-10 w-full py-4 rounded-2xl text-xl font-bold transition-all duration-300 ${
            checked
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue to Pickup Scheduling
        </motion.button>
      </motion.div>
    </div>
  );
}