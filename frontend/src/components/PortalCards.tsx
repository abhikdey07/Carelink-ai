import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HeartHandshake,
  Building2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function PortalCards() {
  const navigate = useNavigate();

  return (
    <section className="py-10">

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: .7,
        }}
        viewport={{
          once: true,
        }}
        className="mx-auto mb-16 max-w-3xl text-center"
      >

        <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">

          Choose Your Portal

        </span>

        <h2 className="mt-6 text-4xl font-black text-slate-900 lg:text-5xl">

          Built For Everyone

        </h2>

        <p className="mt-6 text-lg leading-8 text-slate-600">

          Whether you are donating items or managing an NGO,
          CareLink AI provides a secure and intelligent
          experience from beginning to end.

        </p>

      </motion.div>

      <div className="grid gap-8 lg:grid-cols-2">

        {/* Donor */}

        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: .7,
          }}
          whileHover={{
            y: -10,
          }}
          className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:border-blue-200 hover:shadow-2xl"
        >

          <div className="h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500" />

          <div className="p-10">

            <div className="flex items-center justify-between">

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-100">

                <HeartHandshake
                  size={38}
                  className="text-blue-600"
                />

              </div>

              <ShieldCheck
                className="text-blue-500"
                size={28}
              />

            </div>

            <h3 className="mt-8 text-4xl font-black text-slate-900">

              Donor Portal

            </h3>

            <p className="mt-5 text-lg leading-8 text-slate-600">

              Capture donation items using AI, review
              detected objects, manage your donation
              cart and track every contribution
              effortlessly.

            </p>

            <div className="mt-10 space-y-4">
                            <button
                onClick={() => navigate("/login")}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                Donor Login

                <ArrowRight size={20} />
              </button>

              <button
                onClick={() => navigate("/register")}
                className="w-full rounded-2xl border-2 border-blue-600 py-4 text-lg font-bold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white"
              >
                Create Donor Account
              </button>

            </div>

          </div>

        </motion.div>

        {/* NGO */}

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: .7,
            delay: .15,
          }}
          whileHover={{
            y: -10,
          }}
          className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:border-emerald-200 hover:shadow-2xl"
        >

          <div className="h-1.5 bg-gradient-to-r from-emerald-600 via-green-500 to-lime-500" />

          <div className="p-10">

            <div className="flex items-center justify-between">

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100">

                <Building2
                  size={38}
                  className="text-emerald-600"
                />

              </div>

              <ShieldCheck
                className="text-emerald-500"
                size={28}
              />

            </div>

            <h3 className="mt-8 text-4xl font-black text-slate-900">

              NGO Portal

            </h3>

            <p className="mt-5 text-lg leading-8 text-slate-600">

              Receive AI-matched donations, manage
              requests, schedule pickups and monitor
              every donation from one intelligent
              dashboard.

            </p>

            <div className="mt-10 space-y-4">

              <button
                onClick={() => navigate("/ngo/login")}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                NGO Login

                <ArrowRight size={20} />
              </button>

              <button
                onClick={() => navigate("/ngo/register")}
                className="w-full rounded-2xl border-2 border-emerald-600 py-4 text-lg font-bold text-emerald-600 transition-all duration-300 hover:bg-emerald-600 hover:text-white"
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