import Hero from "../components/Hero";
import Features from "../components/Features";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-slate-50 to-blue-50">

      {/* Background */}

      <div className="absolute inset-0 -z-10 overflow-hidden">

        <motion.div
          animate={{
            x: [0, 70, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
          }}
          className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-blue-300/20 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -60, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
          }}
          className="absolute right-0 top-80 h-[420px] w-[420px] rounded-full bg-cyan-300/20 blur-3xl"
        />

      </div>

      {/* Header */}

      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: .7,
            }}
            className="flex items-center gap-4"
          >

            <motion.div
              whileHover={{
                rotate: 8,
                scale: 1.08,
              }}
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-3 text-white shadow-xl"
            >

              <ShieldCheck size={24} />

            </motion.div>

            <div>

              <h1 className="bg-gradient-to-r from-blue-700 via-cyan-600 to-indigo-700 bg-clip-text text-2xl font-black text-transparent lg:text-3xl">

                CareLink AI

              </h1>

              <p className="text-sm font-medium text-slate-500">

                Smart Donations • Real Impact

              </p>

            </div>

          </motion.div>

        </div>

      </header>

      {/* Hero */}

      <section className="mx-auto max-w-7xl px-6 pt-8 lg:px-8">

        <Hero />

      </section>

      {/* Features */}

      <section
        id="features"
        className="border-t border-slate-100 py-16"
      >

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: .7,
            }}
            className="mb-12 text-center"
          >

            <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">

              Why CareLink AI

            </span>

            <h2 className="mt-5 text-4xl font-black text-slate-900">

              Intelligent Donation Experience

            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">

              Built to simplify the complete donation journey
              using Artificial Intelligence, making every
              contribution faster, smarter and more transparent.

            </p>

          </motion.div>

          <Features />

        </div>

      </section>

      {/* Footer */}

      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 text-center lg:flex-row lg:px-8">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 p-3 text-white shadow-lg">

              <ShieldCheck size={20} />

            </div>

            <div className="text-left">

              <h3 className="text-lg font-bold text-slate-900">

                CareLink AI

              </h3>

              <p className="text-sm text-slate-500">

                Smart Donations • Real Impact

              </p>

            </div>

          </div>

          <div className="text-center text-sm text-slate-500">

            © {new Date().getFullYear()} CareLink AI. All Rights Reserved.

          </div>

        </div>

      </footer>

    </main>
  );
}