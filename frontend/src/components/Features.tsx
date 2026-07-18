import { motion } from "framer-motion";
import {
  BrainCircuit,
  Camera,
  HeartHandshake,
  Truck,
} from "lucide-react";

const features = [
  {
    title: "AI Item Detection",
    description:
      "Automatically identifies donated items using Artificial Intelligence for faster and more accurate cataloging.",
    icon: BrainCircuit,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Camera Capture",
    description:
      "Capture donation items directly from your mobile or desktop camera with a seamless experience.",
    icon: Camera,
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Smart NGO Matching",
    description:
      "Matches donations with NGOs based on real requirements to reduce waste and improve distribution.",
    icon: HeartHandshake,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Pickup Tracking",
    description:
      "Track every donation from scheduling to successful delivery with complete transparency.",
    icon: Truck,
    color: "from-orange-500 to-amber-500",
  },
];

export default function Features() {
  return (
    <section className="py-20">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: .7 }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl text-center"
      >

        <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">

          Platform Features

        </span>

        <h2 className="mt-6 text-4xl font-black text-slate-900 lg:text-5xl">

          Everything You Need
          <br />
          In One Intelligent Platform

        </h2>

        <p className="mt-6 text-lg leading-8 text-slate-600">

          CareLink AI simplifies the donation journey through
          Artificial Intelligence, helping donors, NGOs and
          volunteers collaborate efficiently from donation to
          successful delivery.

        </p>

      </motion.div>

      <div className="mt-16 grid gap-8 md:grid-cols-2">

              {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.15,
              duration: 0.6,
            }}
            viewport={{
              once: true,
            }}
            whileHover={{
              y: -8,
            }}
            className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-blue-200 hover:shadow-2xl"
          >

            <div
              className={`inline-flex rounded-2xl bg-gradient-to-r ${feature.color} p-4 text-white shadow-lg`}
            >

              <feature.icon size={30} />

            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-900">

              {feature.title}

            </h3>

            <p className="mt-4 leading-8 text-slate-600">

              {feature.description}

            </p>

            <motion.div
              initial={{
                width: 0,
              }}
              whileInView={{
                width: "100%",
              }}
              transition={{
                delay: index * 0.2,
                duration: 0.7,
              }}
              viewport={{
                once: true,
              }}
              className={`mt-8 h-1 rounded-full bg-gradient-to-r ${feature.color}`}
            />

          </motion.div>
        ))}

      </div>

    </section>
  );
}