import Webcam from "react-webcam";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

interface Props {
  webcamRef: React.RefObject<Webcam | null>;
}

export default function CameraView({ webcamRef }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Camera Card */}

      <div className="bg-white rounded-[32px] shadow-2xl p-6">

        <div className="flex items-center justify-between mb-5">

          <div>

            <h2 className="text-2xl font-black text-slate-900">
              Live Camera
            </h2>

            <p className="text-gray-500">
              Capture your donation items for AI detection
            </p>

          </div>

          <div className="bg-blue-100 p-4 rounded-2xl">

            <Camera
              className="text-blue-600"
              size={30}
            />

          </div>

        </div>

        {/* Camera */}

        <div className="rounded-3xl overflow-hidden border-[6px] border-slate-100 shadow-lg">

          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            className="w-full"
            videoConstraints={{
              facingMode: "environment",
            }}
          />

        </div>

        {/* AI Indicator */}

        <div className="flex items-center justify-center gap-3 mt-6">

          <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>

          <p className="font-semibold text-green-600">
            AI Camera Ready
          </p>

        </div>

      </div>
    </motion.div>
  );
}