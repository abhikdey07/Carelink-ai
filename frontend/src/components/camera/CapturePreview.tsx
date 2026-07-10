import { motion } from "framer-motion";
import { Camera, Sparkles } from "lucide-react";

interface Props {
  image: string | null;
  onRetake: () => void;
  onDetect: () => void;
}

export default function CapturePreview({
  image,
  onRetake,
  onDetect,
}: Props) {
  if (!image) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-8"
    >
      <div className="bg-white rounded-[32px] shadow-2xl p-6">

        {/* Header */}

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-3xl font-black text-slate-900">
              Image Preview
            </h2>

            <p className="text-gray-500 mt-1">
              Review the captured image before AI detection.
            </p>

          </div>

          <div className="bg-blue-100 p-4 rounded-2xl">

            <Camera
              size={28}
              className="text-blue-600"
            />

          </div>

        </div>

        {/* Image */}

        <motion.img
          whileHover={{ scale: 1.01 }}
          src={image}
          alt="Captured"
          className="rounded-3xl border-[6px] border-slate-100 shadow-lg w-full"
        />

        {/* AI Ready */}

        <div className="mt-6 flex items-center justify-center gap-3">

          <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>

          <span className="font-semibold text-green-600">
            AI Ready for Detection
          </span>

        </div>

        {/* Buttons */}

        <div className="grid md:grid-cols-2 gap-5 mt-8">

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: .98 }}
            onClick={onRetake}
            className="bg-slate-600 hover:bg-slate-700 text-white py-4 rounded-2xl font-bold text-lg transition"
          >
            Retake Photo
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: .98 }}
            onClick={onDetect}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition"
          >
            <Sparkles size={22} />

            Detect Donation Items
          </motion.button>

        </div>

      </div>
    </motion.div>
  );
}