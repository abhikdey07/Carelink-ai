import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";
import API from "../../api/axios";

interface Donation {
  id: number;
  date: string;
  status: string;
  items: number;
}

export default function History() {
  const navigate = useNavigate();

  const [history, setHistory] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      const response = await API.get(
        `/dashboard/history/${user.id}`
      );

      setHistory(response.data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

      <div className="max-w-6xl mx-auto py-10 px-6">

        <button
          onClick={() => navigate("/donor/dashboard")}
          className="flex items-center gap-2 text-blue-600 font-semibold mb-8"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <h1 className="text-5xl font-black mb-8">
          Donation History
        </h1>

        {loading ? (
          <h2 className="text-xl">Loading...</h2>
        ) : history.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 shadow-xl text-center">
            <h2 className="text-2xl font-bold">
              No Donations Found
            </h2>
          </div>
        ) : (
          <div className="space-y-6">
            {history.map((donation) => (
              <div
                key={donation.id}
                className="bg-white rounded-3xl shadow-xl p-6 flex justify-between items-center"
              >
                <div className="flex gap-5 items-center">
                  <div className="bg-blue-100 p-4 rounded-2xl">
                    <Package
                      className="text-blue-600"
                      size={28}
                    />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">
                      Donation #{donation.id}
                    </h2>

                    <p className="text-gray-500">
                      {donation.date}
                    </p>

                    <p className="mt-2">
                      Items Donated:{" "}
                      <b>{donation.items}</b>
                    </p>
                  </div>
                </div>

                <div
                  className={`px-5 py-2 rounded-full font-bold ${
                    donation.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {donation.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}