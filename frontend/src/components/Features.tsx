import { motion } from "framer-motion";
import {
  BrainCircuit,
  Camera,
  HeartHandshake,
  Truck,
  Users,
  Building2,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";

const stats = [
  {
    value: "500+",
    label: "Donations",
    icon: PackageCheck,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    value: "150+",
    label: "Donors",
    icon: Users,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    value: "25+",
    label: "NGOs",
    icon: Building2,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    value: "AI",
    label: "Powered",
    icon: ShieldCheck,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
];

const features = [
  {
    title: "AI Item Detection",
    description:
      "Automatically detects donation items using Artificial Intelligence.",
    icon: BrainCircuit,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Camera Capture",
    description:
      "Capture donation items directly from your mobile or desktop camera.",
    icon: Camera,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Smart NGO Matching",
    description:
      "AI helps connect donors with NGOs that actually need those items.",
    icon: HeartHandshake,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Pickup Tracking",
    description:
      "Track donation pickup and delivery from a single dashboard.",
    icon: Truck,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: .7 }}
        viewport={{ once: true }}
      >

        <h2 className="text-5xl font-black text-center text-slate-900">
          Platform Highlights
        </h2>

        <p className="text-center text-gray-500 mt-5 text-lg max-w-3xl mx-auto">
          Our platform combines Artificial Intelligence with a modern donation
          workflow to simplify the donation process for donors and NGOs.
        </p>

      </motion.div>

      {/* Statistics */}

      <div className="grid md:grid-cols-4 gap-6 mt-16">

        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * .15 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              y: -6,
            }}
            className="bg-white rounded-3xl shadow-xl p-8 text-center"
          >

            <div
              className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center ${stat.bg}`}
            >
              <stat.icon className={stat.color} size={32} />
            </div>

            <h3 className="text-4xl font-black mt-6 text-slate-900">
              {stat.value}
            </h3>

            <p className="text-gray-500 mt-2">
              {stat.label}
            </p>

          </motion.div>
        ))}

      </div>

      {/* Features */}

      <div className="grid lg:grid-cols-2 gap-8 mt-20">

        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .6 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.02,
            }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >

            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center ${feature.color}`}
            >
              <feature.icon size={30} />
            </div>

            <h3 className="text-2xl font-bold mt-6">
              {feature.title}
            </h3>

            <p className="text-gray-500 mt-4 leading-8">
              {feature.description}
            </p>

          </motion.div>
        ))}

      </div>

    </section>
  );
}