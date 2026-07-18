import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Package,
  Plus,
  Minus,
  Trash2,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

import {
  submitDonation,
  type DonationItem,
} from "../../services/donationService";

interface DetectionItem {
  category: string;
  item_name: string;
  quantity: number;
  confidence: number | null;
  condition: string;
}

export default function Cart() {
  const navigate = useNavigate();

  const [items, setItems] = useState<DetectionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const warningShown = useRef(false);

useEffect(() => {
  const stored = localStorage.getItem("detections");

  if (!stored) return;

  const response = JSON.parse(stored);
  const detections = response.detections || [];

  setItems(detections);

  const uniqueTypes = new Set(
    detections
      .map((item: DetectionItem) =>
        item.item_name.trim().toLowerCase()
      )
      .filter(Boolean)
  );

  if (uniqueTypes.size > 1 && !warningShown.current) {
    warningShown.current = true;

    toast(
      "⚠️ Multiple item types detected. For accurate AI detection, NGO matching, pickup scheduling and delivery tracking, please submit only ONE item type per donation request.",
      {
        duration: 7000,
        icon: "📦",
      }
    );
  }
}, []);

  const increase = (index: number) => {
    const updated = [...items];
    updated[index].quantity++;
    setItems(updated);
  };

  const decrease = (index: number) => {
    const updated = [...items];

    if (updated[index].quantity > 1) {
      updated[index].quantity--;
    }

    setItems(updated);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        category: "",
        item_name: "",
        quantity: 1,
        confidence: 100,
        condition: "Good",
      },
    ]);
  };

  const updateName = (
    index: number,
    value: string
  ) => {
    const updated = [...items];
    updated[index].item_name = value;
    setItems(updated);
  };

  const updateCondition = (
    index: number,
    value: string
  ) => {
    const updated = [...items];
    updated[index].condition = value;
    setItems(updated);
  };

  const confidenceColor = (
    confidence: number | null
  ) => {
    if (confidence === null)
      return "bg-blue-100 text-blue-700";

    if (confidence >= 90)
      return "bg-green-100 text-green-700";

    if (confidence >= 70)
      return "bg-yellow-100 text-yellow-700";

    return "bg-red-100 text-red-700";
  };

  const handleSubmit = async () => {
    if (items.length === 0) {
      toast.error("No donation items found.");
      return;
    }

    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    if (!user.id) {
      toast.error(
        "Session expired. Please login again."
      );

      navigate("/login");

      return;
    }

    if (!navigator.geolocation) {
      toast.error(
        "Geolocation is not supported by this browser."
      );

      return;
    }

    setLoading(true);

    const loadingToast = toast.loading(
      "Getting your location..."
    );

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const payload = {
            donor_id: user.id,

            latitude:
              position.coords.latitude,

            longitude:
              position.coords.longitude,

            items: items.map(
              (item): DonationItem => ({
                item_name: item.item_name,

                quantity: item.quantity,

                confidence:
                  item.confidence ?? 100,

                condition:
                  item.condition,
              })
            ),
          };

          toast.loading(
            "Submitting Donation...",
            {
              id: loadingToast,
            }
          );
                    const response =
            await submitDonation(payload);

          localStorage.setItem(
            "lastDonationId",
            response.id.toString()
          );

          localStorage.removeItem(
            "detections"
          );

          toast.success(
            "Donation submitted successfully!",
            {
              id: loadingToast,
            }
          );

          setTimeout(() => {
            navigate("/donor/success");
          }, 1000);

        } catch (error) {

          console.error(error);

          toast.error(
            "Failed to submit donation.",
            {
              id: loadingToast,
            }
          );

        }

        setLoading(false);

      },

      () => {

        toast.error(
          "Please allow location access to continue.",
          {
            id: loadingToast,
          }
        );

        setLoading(false);

      }

    );

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

      <div className="max-w-7xl mx-auto py-10 px-6">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-10"
        >

          <div>

            <button
              onClick={() =>
                navigate("/donor/camera")
              }
              className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
            >

              <ArrowLeft size={18} />

              Back to Camera

            </button>

            <h1 className="text-5xl font-black mt-5">
              Donation Cart
            </h1>

            <p className="text-gray-500 mt-3">
              Review AI detected items before submitting your donation.
            </p>

          </div>

          <div className="hidden lg:flex bg-white rounded-3xl shadow-xl p-6 items-center gap-4">

            <ShoppingBag
              className="text-blue-600"
              size={35}
            />

            <div>

              <h2 className="font-bold">
                Donation Items
              </h2>

              <p className="text-gray-500">
                {items.length} Item(s)
              </p>

            </div>

          </div>

        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-6">

            {items.map((item, index) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                whileHover={{
                  y: -4,
                }}
                className="bg-white rounded-3xl shadow-xl p-6"
              >

                <div className="flex justify-between items-center">

                  <div className="flex items-center gap-4">

                    <div className="bg-blue-100 p-4 rounded-2xl">

                      <Package
                        className="text-blue-600"
                        size={28}
                      />

                    </div>

                    <div>

                      <input
                        value={item.item_name}
                        onChange={(e) =>
                          updateName(
                            index,
                            e.target.value
                          )
                        }
                        placeholder="Item Name"
                        className="text-xl font-bold outline-none"
                      />
                                            {item.category && (
                        <div className="mt-1 text-sm text-blue-600 font-semibold">
                          Category: {item.category}
                        </div>
                      )}

                      <div
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${confidenceColor(
                          item.confidence
                        )}`}
                      >
                        AI Confidence : {item.confidence ?? 100}%
                      </div>

                      <div className="mt-4">

                        <label className="block text-sm font-semibold mb-2">
                          Condition
                        </label>

                        <select
                          value={item.condition}
                          onChange={(e) =>
                            updateCondition(
                              index,
                              e.target.value
                            )
                          }
                          className="border rounded-xl px-3 py-2 w-52"
                        >
                          <option>New</option>
                          <option>Excellent</option>
                          <option>Good</option>
                          <option>Fair</option>
                          <option>Poor</option>
                          <option>Damaged</option>
                        </select>

                      </div>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      removeItem(index)
                    }
                    className="bg-red-100 hover:bg-red-200 text-red-600 p-3 rounded-xl transition"
                  >
                    <Trash2 size={20} />
                  </button>

                </div>

                <div className="flex items-center gap-4 mt-8">

                  <button
                    onClick={() =>
                      decrease(index)
                    }
                    className="bg-gray-200 hover:bg-gray-300 w-12 h-12 rounded-xl flex items-center justify-center"
                  >
                    <Minus size={18} />
                  </button>

                  <div className="text-2xl font-black w-10 text-center">
                    {item.quantity}
                  </div>

                  <button
                    onClick={() =>
                      increase(index)
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-xl flex items-center justify-center"
                  >
                    <Plus size={18} />
                  </button>

                </div>

              </motion.div>

            ))}

          </div>

          <div>

            <motion.div
              initial={{
                opacity: 0,
                x: 40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              className="bg-white rounded-3xl shadow-xl p-8 sticky top-8"
            >

              <h2 className="text-3xl font-black">
                Donation Summary
              </h2>

              <div className="space-y-5 mt-8">

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Total Items
                  </span>
                  <span className="font-bold">
                    {items.length}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    AI Detection
                  </span>
                  <span className="text-green-600 font-bold">
                    Successful
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Pickup Status
                  </span>
                  <span className="text-orange-500 font-bold">
                    Pending
                  </span>
                </div>

              </div>

              <button
                onClick={addItem}
                className="w-full mt-10 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-3 transition"
              >
                <Plus size={20} />
                Add Custom Item
              </button>

              <button
                disabled={loading}
                onClick={handleSubmit}
                className="w-full mt-5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-3 transition"
              >
                <Sparkles size={20} />
                {loading ? "Submitting..." : "Submit Donation"}
              </button>

            </motion.div>

          </div>

        </div>

      </div>

    </div>

  );

}