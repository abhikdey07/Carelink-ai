import { motion } from "framer-motion";
import { BrainCircuit, Camera, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 px-6">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
        >

          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold shadow">

            <Sparkles size={18} />

            AI Powered Platform

          </div>

          <h1 className="mt-8 text-6xl lg:text-7xl font-black leading-tight text-slate-900">

            AI Donation

            <br />

            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">

              Management System

            </span>

          </h1>

          <p className="mt-8 text-xl leading-9 text-slate-600 max-w-2xl">

            Empowering smarter donations through Artificial Intelligence.

            Detect donation items instantly, connect with NGOs,

            schedule pickups and monitor every donation from a

            single intelligent platform.

          </p>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .9 }}
          className="relative"
        >

          <div className="bg-white/70 backdrop-blur-xl rounded-[35px] shadow-2xl border border-white p-10">

            <div className="grid gap-6">

              <motion.div
                whileHover={{ scale: 1.04 }}
                className="flex items-center gap-5 bg-slate-50 rounded-2xl p-5"
              >

                <div className="bg-blue-600 p-4 rounded-2xl text-white">

                  <Camera size={30} />

                </div>

                <div>

                  <h3 className="font-bold text-xl">

                    AI Detection

                  </h3>

                  <p className="text-gray-500">

                    Detect donation items instantly using AI.

                  </p>

                </div>

              </motion.div>

              <motion.div
                whileHover={{ scale: 1.04 }}
                className="flex items-center gap-5 bg-slate-50 rounded-2xl p-5"
              >

                <div className="bg-green-600 p-4 rounded-2xl text-white">

                  <BrainCircuit size={30} />

                </div>

                <div>

                  <h3 className="font-bold text-xl">

                    Smart Matching

                  </h3>

                  <p className="text-gray-500">

                    Automatically match donations with NGO needs.

                  </p>

                </div>

              </motion.div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}