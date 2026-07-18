import toast from "react-hot-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { registerUser } from "../../services/authService";

import {
  FaArrowLeft,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
} from "react-icons/fa";

interface RegisterForm {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

const isNGO = location.pathname.includes("/ngo");
console.log("PATH =", location.pathname);
console.log("isNGO =", isNGO);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        full_name: data.full_name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: data.address,
        role: isNGO ? "ngo" : "donor",
      });

     toast.success(
  isNGO
    ? "NGO Account created successfully!"
    : "Account created successfully!"
);

reset();

navigate(isNGO ? "/ngo/login" : "/login");
    } catch (error: any) {
     toast.error(
  error?.response?.data?.detail ||
  "Registration failed. Please try again."
);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex justify-center items-center px-6 relative overflow-hidden">

      <div className="absolute -top-40 -left-32 w-96 h-96 bg-blue-300/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 blur-3xl rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .7 }}
        className="relative w-full max-w-xl"
      >

        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-[35px] border border-white p-10">

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            <FaArrowLeft />

            Back to Home
          </button>

          <h1 className="text-4xl font-black text-center mt-6">
            {isNGO ? "NGO Registration" : "Create Account"}
          </h1>

          <p className="text-center text-gray-500 mt-3 mb-10">
            {isNGO
  ? "Register your NGO to receive donations"
  : "Join the AI Donation Management System"}
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >

            {/* Full Name */}

            <div>

              <label className="font-semibold">
                Full Name
              </label>

              <div className="mt-2 flex items-center border rounded-2xl bg-white">

                <FaUser className="ml-4 text-gray-400" />

                <input
                  {...register("full_name", {
                    required: "Full name is required",
                  })}
                  placeholder="Enter your full name"
                  className="w-full p-4 outline-none rounded-2xl"
                />

              </div>

              <p className="text-red-500 text-sm mt-1">
                {errors.full_name?.message}
              </p>

            </div>

            {/* Email */}

            <div>

              <label className="font-semibold">
                Email Address
              </label>

              <div className="mt-2 flex items-center border rounded-2xl bg-white">

                <FaEnvelope className="ml-4 text-gray-400" />

                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  placeholder="Enter your email"
                  className="w-full p-4 outline-none rounded-2xl"
                />

              </div>

              <p className="text-red-500 text-sm mt-1">
                {errors.email?.message}
              </p>

            </div>

            {/* Phone */}

            <div>

              <label className="font-semibold">
                Phone Number
              </label>

              <div className="mt-2 flex items-center border rounded-2xl bg-white">

                <FaPhone className="ml-4 text-gray-400" />

                <input
                  {...register("phone")}
                  placeholder="Enter phone number"
                  className="w-full p-4 outline-none rounded-2xl"
                />

              </div>

            </div>

            {/* Address */}

            <div>

              <label className="font-semibold">
                Address
              </label>

              <div className="mt-2 flex items-center border rounded-2xl bg-white">

                <FaMapMarkerAlt className="ml-4 text-gray-400" />

                <input
                  {...register("address")}
                  placeholder="Enter your address"
                  className="w-full p-4 outline-none rounded-2xl"
                />

              </div>

            </div>
                        {/* Password */}

            <div>

              <label className="font-semibold">
                Password
              </label>

              <div className="mt-2 flex items-center border rounded-2xl bg-white">

                <FaLock className="ml-4 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Enter your password"
                  className="w-full p-4 outline-none rounded-2xl"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="mr-4 text-gray-500 hover:text-blue-600"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

              <p className="text-red-500 text-sm mt-1">
                {errors.password?.message}
              </p>

            </div>

            {/* Confirm Password */}

            <div>

              <label className="font-semibold">
                Confirm Password
              </label>

              <div className="mt-2 flex items-center border rounded-2xl bg-white">

                <FaLock className="ml-4 text-gray-400" />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  {...register("confirmPassword", {
                    required: "Confirm your password",
                  })}
                  placeholder="Confirm password"
                  className="w-full p-4 outline-none rounded-2xl"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="mr-4 text-gray-500 hover:text-blue-600"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword?.message}
              </p>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-4 rounded-2xl text-lg font-bold shadow-lg disabled:bg-blue-400"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          <p className="text-center mt-8 text-gray-600">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-blue-600 font-bold hover:underline"
            >
              Login
            </Link>

          </p>

        </div>

      </motion.div>

    </div>
  );
}