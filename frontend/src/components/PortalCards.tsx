import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HeartHandshake,
  Building2,
  ArrowRight,
} from "lucide-react";

export default function PortalCards() {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <div className="grid lg:grid-cols-2 gap-10">

        {/* ---------------- DONOR ---------------- */}

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{
            y: -8,
            scale: 1.02,
          }}
          viewport={{ once: true }}
          className="group bg-white/70 backdrop-blur-xl rounded-[32px] border border-white shadow-2xl overflow-hidden"
        >

          <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500"></div>

          <div className="p-10">

            <div className="w-20 h-20 rounded-3xl bg-blue-100 flex items-center justify-center">

              <HeartHandshake
                size={40}
                className="text-blue-600"
              />

            </div>

            <h2 className="mt-8 text-4xl font-black text-slate-900">
              Donor Portal
            </h2>

            <p className="mt-5 text-gray-600 leading-8 text-lg">

              Capture donation items using AI,
              review detected objects,
              manage your donation cart,
              and track every contribution effortlessly.

            </p>

            <div className="mt-10 space-y-4">

              <button
                onClick={() => navigate("/login")}
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-3"
              >
                Donor Login

                <ArrowRight size={20} />
              </button>

              <button
                onClick={() => navigate("/register")}
                className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 py-4 rounded-2xl text-lg font-bold"
              >
                Create Donor Account
              </button>

            </div>

          </div>

        </motion.div>

        {/* ---------------- NGO ---------------- */}

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          whileHover={{
            y: -8,
            scale: 1.02,
          }}
          viewport={{ once: true }}
          className="group bg-white/70 backdrop-blur-xl rounded-[32px] border border-white shadow-2xl overflow-hidden"
        >

          <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500"></div>

          <div className="p-10">

            <div className="w-20 h-20 rounded-3xl bg-green-100 flex items-center justify-center">

              <Building2
                size={40}
                className="text-green-600"
              />

            </div>

            <h2 className="mt-8 text-4xl font-black text-slate-900">
              NGO Portal
            </h2>

            <p className="mt-5 text-gray-600 leading-8 text-lg">

              Register your NGO,
              receive AI-matched donations,
              manage requests,
              schedule pickups,
              and monitor every donation efficiently.

            </p>

            <div className="mt-10 space-y-4">

              <button
                disabled
                className="w-full bg-gray-300 cursor-not-allowed text-gray-600 py-4 rounded-2xl text-lg font-bold"
              >
                Coming Soon
              </button>

              <button
                disabled
                className="w-full border-2 border-gray-300 cursor-not-allowed text-gray-500 py-4 rounded-2xl text-lg font-bold"
              >
                NGO Registration
              </button>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}