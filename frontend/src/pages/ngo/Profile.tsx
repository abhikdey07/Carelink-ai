import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
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
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        Loading Profile...
      </div>
    );
  }

  const saveProfile = async () => {
    try {
      const response = await updateProfile(user.id, {
  full_name: profile.full_name,
  organization_name: profile.organization_name,
  registration_number: profile.registration_number,
  phone: profile.phone,
  address: profile.address,
});

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <button
            onClick={() => navigate("/ngo/dashboard")}
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

          {/* Banner */}

          <div className="bg-gradient-to-r from-green-600 to-emerald-500 h-36 flex justify-center items-center">

            <div className="bg-white rounded-full p-6 shadow-xl">
              <User size={55} className="text-green-600" />
            </div>

          </div>

          {/* Body */}

          <div className="p-10">

            <h1 className="text-4xl font-black text-center">
              {profile.organization_name || profile.full_name}
            </h1>

            <p className="text-center text-gray-500 mt-2">
              NGO Account
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">

              {/* Organization Name */}

              <div>

                <label className="text-gray-500 font-semibold">
                  Organization Name
                </label>

                {editMode ? (
                  <input
                    className="w-full mt-2 border rounded-xl p-3"
                    value={profile.organization_name || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        organization_name: e.target.value,
                      })
                    }
                  />
                ) : (
                  <h2 className="text-xl font-bold mt-2">
                    {profile.organization_name || "-"}
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

              {/* Contact */}

              <div>

                <label className="text-gray-500 font-semibold">
                  Contact Number
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

              {/* Registration */}

<div>
  <label className="text-gray-500 font-semibold">
    Registration Number
  </label>

  <h2 className="text-xl font-bold mt-2 text-green-600">
    {profile.registration_number ||
      profile.registration_no ||
      profile.reg_no ||
      "-"}
  </h2>
</div>

              {/* Address */}

              <div className="md:col-span-2">

                <label className="text-gray-500 font-semibold">
                  Address
                </label>

                {editMode ? (
                  <textarea
                    rows={4}
                    className="w-full mt-2 border rounded-xl p-3"
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
    </div>
  );
}