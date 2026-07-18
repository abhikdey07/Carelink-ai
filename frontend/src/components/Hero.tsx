import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Camera,
  BrainCircuit,
  HeartHandshake,
  Building2,
  ArrowRight,
} from "lucide-react";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden py-12 lg:py-20">

      {/* Background */}

      <div className="absolute inset-0 -z-10 overflow-hidden">

        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
          }}
          className="absolute -top-16 -left-16 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
          }}
          className="absolute right-0 top-40 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl"
        />

      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">

        {/* Left */}

        <motion.div
          initial={{
            opacity: 0,
            x: -60,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: .8,
          }}
        >

          <motion.div
            whileHover={{
              scale: 1.04,
            }}
            className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-5 py-2 font-semibold text-blue-700 shadow"
          >

            <Sparkles size={18} />

            AI Powered Donation Platform

          </motion.div>

          <h1 className="mt-8 text-5xl font-black leading-tight text-slate-900 lg:text-7xl">

            Smart Donations.

            <br />

            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">

              Real Impact.

            </span>

          </h1>

          <p className="mt-8 max-w-xl text-lg leading-9 text-slate-600">

            CareLink AI transforms the donation journey using
            Artificial Intelligence. Detect donation items,
            connect donors with NGOs and manage every donation
            from one intelligent platform.

          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <motion.div
              whileHover={{ y: -5 }}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-md"
            >

              <Camera
                size={22}
                className="text-blue-600"
              />

              <span className="font-semibold">

                AI Detection

              </span>

            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-md"
            >

              <BrainCircuit
                size={22}
                className="text-emerald-600"
              />

              <span className="font-semibold">

                Smart Matching

              </span>

            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-md"
            >

              <HeartHandshake
                size={22}
                className="text-pink-600"
              />

              <span className="font-semibold">

                NGO Collaboration

              </span>

            </motion.div>

          </div>

        </motion.div>

        {/* Right */}
                <motion.div
          initial={{
            opacity: 0,
            x: 60,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: .9,
          }}
          className="relative flex flex-col items-center space-y-6"
        >
<img
  src="/logo.png"
  alt="CareLink AI Logo"
  className="mb-6 w-48 drop-shadow-[0_0_35px_rgba(59,130,246,0.6)]"
/>
          {/* Donor Portal */}

          <motion.div
            whileHover={{
              y: -6,
            }}
            className="rounded-3xl border border-blue-100 bg-white p-8 shadow-xl"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">

                <HeartHandshake
                  size={32}
                  className="text-blue-600"
                />

              </div>

              <div>

                <h3 className="text-2xl font-bold text-slate-900">

                  Donor Portal

                </h3>

                <p className="text-slate-500">

                  Donate items with AI assistance

                </p>

              </div>

            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">

              <button
                onClick={() => navigate("/login")}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Login

                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => navigate("/register")}
                className="rounded-xl border-2 border-blue-600 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
              >
                Register
              </button>

            </div>

          </motion.div>

          {/* NGO Portal */}

          <motion.div
            whileHover={{
              y: -6,
            }}
            className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-xl"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">

                <Building2
                  size={32}
                  className="text-emerald-600"
                />

              </div>

              <div>

                <h3 className="text-2xl font-bold text-slate-900">

                  NGO Portal

                </h3>

                <p className="text-slate-500">

                  Manage requests and donations

                </p>

              </div>

            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">

              <button
                onClick={() => navigate("/ngo/login")}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                Login

                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => navigate("/ngo/register")}
                className="rounded-xl border-2 border-emerald-600 py-3 font-semibold text-emerald-600 transition hover:bg-emerald-600 hover:text-white"
              >
                Register
              </button>

            </div>

          </motion.div>

        </motion.div>

      </div>

    </section>
  );
}