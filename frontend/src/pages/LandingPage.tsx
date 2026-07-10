import Hero from "../components/Hero";
import PortalCards from "../components/PortalCards";
import Features from "../components/Features";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      {/* Background Blur */}

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-300/20 blur-3xl rounded-full"></div>

      <div className="absolute top-96 -right-32 w-96 h-96 bg-cyan-300/20 blur-3xl rounded-full"></div>

      {/* Header */}

      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/40">

        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .7 }}
            className="flex items-center gap-3"
          >

            <div className="bg-blue-600 text-white p-3 rounded-2xl">

              <ShieldCheck size={24} />

            </div>

            <div>

              <h1 className="font-black text-2xl text-slate-900">
                AI Donation Management System
              </h1>

              <p className="text-sm text-gray-500">
                Powered by Artificial Intelligence
              </p>

            </div>

          </motion.div>

        </div>

      </header>

      <Hero />

      <PortalCards />

      <Features />

    </main>
  );
}