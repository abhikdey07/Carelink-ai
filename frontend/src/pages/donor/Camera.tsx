import toast from "react-hot-toast";
import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Camera as CameraIcon,
  Sparkles,
} from "lucide-react";

import API from "../../api/axios";
import CameraView from "../../components/camera/CameraView";
import CapturePreview from "../../components/camera/CapturePreview";

export default function Camera() {
  const webcamRef = useRef<Webcam>(null);

  const navigate = useNavigate();

  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();

    if (imageSrc) {
      setImage(imageSrc);
    }
  };

  const retake = () => {
    setImage(null);
  };

  const detectItems = async () => {
    if (!image) return;
    const loadingToast = toast.loading("Detecting donation items...");

    setLoading(true);

    try {
      const blob = await (await fetch(image)).blob();

      const formData = new FormData();

      formData.append("file", blob, "capture.jpg");

      const response = await API.post(
        "/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem(
        "detections",
        JSON.stringify(response.data)
      );
toast.dismiss(loadingToast);

toast.success("Items detected successfully!");
      navigate("/donor/cart");

    } catch (error) {

  console.error(error);

  toast.dismiss(loadingToast);

  toast.error(
    "AI Detection failed. Please try again."
  );

}

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

      <div className="max-w-7xl mx-auto py-10 px-6">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-10"
        >

          <div>

            <button
              onClick={() => navigate("/donor/dashboard")}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4"
            >
              <ArrowLeft size={18} />

              Back to Dashboard

            </button>

            <h1 className="text-5xl font-black text-slate-900">

              AI Camera Detection

            </h1>

            <p className="text-gray-500 mt-3 text-lg">

              Capture donation items and let Artificial Intelligence
              detect them automatically.

            </p>

          </div>

          <div className="hidden lg:flex bg-white rounded-3xl shadow-lg px-8 py-5 items-center gap-4">

            <CameraIcon
              className="text-blue-600"
              size={35}
            />

            <div>

              <h3 className="font-bold text-lg">

                Smart Detection

              </h3>

              <p className="text-gray-500">

                YOLO AI Model

              </p>

            </div>

          </div>

        </motion.div>

        {!image ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >

            <CameraView webcamRef={webcamRef} />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: .98 }}
              onClick={capture}
              className="mt-8 w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-5 rounded-2xl text-xl font-bold shadow-xl"
            >
              📸 Capture Donation Image
            </motion.button>

          </motion.div>

        ) : (

          <CapturePreview
            image={image}
            onRetake={retake}
            onDetect={detectItems}
          />

        )}

        {/* Loading */}

        {loading && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10"
          >

            <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "linear",
                }}
                className="inline-flex bg-blue-100 p-6 rounded-full"
              >

                <Sparkles
                  className="text-blue-600"
                  size={40}
                />

              </motion.div>

              <h2 className="text-3xl font-black mt-6">

                AI Processing...

              </h2>

              <p className="text-gray-500 mt-3">

                Detecting donation items using the YOLO model.

              </p>

              <div className="w-full bg-gray-200 rounded-full h-3 mt-8">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2 }}
                  className="bg-blue-600 h-3 rounded-full"
                />

              </div>

            </div>

          </motion.div>

        )}

      </div>

    </div>
  );
}