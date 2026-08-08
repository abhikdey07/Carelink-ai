import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ImpactMetrics from "../../components/ImpactMetrics";
import { ArrowLeft, Edit3, Save, X, User } from "lucide-react";
import {
  getProfile,
  updateProfile,
} from "../../services/profileService";

export default function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [profile, setProfile] = useState<any>(null);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await getProfile(user.id);
      setProfile(data);
    };

    loadProfile();
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
        <h1 className="text-3xl font-bold">
          Loading Profile...
        </h1>
      </div>
    );
  }

const saveProfile = async () => {
  try {

    const response = await updateProfile(user.id, {
      full_name: profile.full_name,
      phone: profile.phone,
      address: profile.address,
    });

    // Update localStorage so Dashboard shows latest data
    const updatedUser = {
      ...user,
      ...response.user,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    setEditMode(false);

    toast.success("Profile updated successfully");

  } catch (error) {

    console.error(error);

    toast.error("Failed to update profile");

  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 py-10 px-6">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <button
            onClick={() => navigate("/donor/dashboard")}
            className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow hover:shadow-lg transition"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2"
            >
              <Edit3 size={18} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">

              <button
                onClick={saveProfile}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2"
              >
                <Save size={18} />
                Save
              </button>

              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2"
              >
                <X size={18} />
                Cancel
              </button>

            </div>
          )}

        </div>

        {/* Profile Card */}

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Top Banner */}

          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 h-36 flex justify-center items-center">

            <div className="bg-white rounded-full p-6 shadow-xl">

              <User size={55} className="text-blue-600" />

            </div>

          </div>

          {/* Body */}

          <div className="p-10">

            <h1 className="text-4xl font-black text-center">
              {profile.full_name}
            </h1>

            <p className="text-center text-gray-500 mt-2">
              Donor Account
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">

              {/* Name */}

              <div>

                <label className="text-gray-500 font-semibold">
                  Full Name
                </label>

                {editMode ? (
                  <input
                    className="w-full mt-2 border rounded-xl p-3"
                    value={profile.full_name}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        full_name: e.target.value,
                      })
                    }
                  />
                ) : (
                  <h2 className="text-xl font-bold mt-2">
                    {profile.full_name}
                  </h2>
                )}

              </div>

              {/* Email */}

              <div>

                <label className="text-gray-500 font-semibold">
                  Email
                </label>

                <h2 className="text-xl font-bold mt-2">
                  {profile.email}
                </h2>

              </div>

              {/* Phone */}

              <div>

                <label className="text-gray-500 font-semibold">
                  Phone
                </label>

                {editMode ? (
                  <input
                    className="w-full mt-2 border rounded-xl p-3"
                    value={profile.phone || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        phone: e.target.value,
                      })
                    }
                  />
                ) : (
                  <h2 className="text-xl font-bold mt-2">
                    {profile.phone || "-"}
                  </h2>
                )}

              </div>

              {/* Role */}

              <div>

                <label className="text-gray-500 font-semibold">
                  Role
                </label>

                <h2 className="text-xl font-bold mt-2 text-blue-600">
                  {profile.role}
                </h2>

              </div>

              {/* Address */}

              <div className="md:col-span-2">

                <label className="text-gray-500 font-semibold">
                  Address
                </label>

                {editMode ? (
                  <textarea
                    className="w-full mt-2 border rounded-xl p-3"
                    rows={4}
                    value={profile.address || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        address: e.target.value,
                      })
                    }
                  />
                ) : (
                  <h2 className="text-xl font-bold mt-2">
                    {profile.address || "-"}
                  </h2>
                )}

              </div>

            </div>

          </div>

             </div>

    </div>

    {/* Impact Metrics */}
    <div className="mt-10">
      <ImpactMetrics />
    </div>

  </div>
);
}