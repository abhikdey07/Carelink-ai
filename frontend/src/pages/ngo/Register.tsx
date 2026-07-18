import toast from "react-hot-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { registerNGO } from "../../services/ngoService";

import {
  FaArrowLeft,
  FaBuilding,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaIdCard,
} from "react-icons/fa";

interface NGORegisterForm {
  organization_name: string;
  registration_number: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
}

export default function NGORegister() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NGORegisterForm>();

  const onSubmit = async (
    data: NGORegisterForm
  ) => {

    if (
      data.password !==
      data.confirmPassword
    ) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {

      await registerNGO({
        organization_name:
          data.organization_name,

        registration_number:
          data.registration_number,

        email: data.email,

        phone: data.phone,

        address: data.address,

        password: data.password,
      });

      toast.success(
        "NGO Registered Successfully"
      );

      reset();

      navigate("/ngo/login");

    } catch (error: any) {

      toast.error(
        error?.response?.data?.detail ||
        "Registration Failed"
      );

    }

    setLoading(false);

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex justify-center items-center px-6 relative overflow-hidden">

      <div className="absolute -top-40 -left-32 w-96 h-96 bg-blue-300/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 blur-3xl rounded-full"></div>

      <motion.div
        initial={{
          opacity: 0,
          y: 60,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: .7,
        }}
        className="relative w-full max-w-xl"
      >

        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-[35px] border border-white p-10">

          <button
            onClick={() =>
              navigate("/")
            }
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            <FaArrowLeft />

            Back to Home

          </button>

          <h1 className="text-4xl font-black text-center mt-6">

            NGO Registration

          </h1>

          <p className="text-center text-gray-500 mt-3 mb-10">

            Register your NGO to receive donations

          </p>

          <form
            onSubmit={handleSubmit(
              onSubmit
            )}
            className="space-y-6"
          >
        
        {/* NGO Name */}

<div>

  <label className="font-semibold">

    NGO Name

  </label>

  <div className="mt-2 flex items-center border rounded-2xl bg-white">

    <FaBuilding className="ml-4 text-gray-400" />

    <input
      {...register("organization_name", {
        required: "NGO Name is required",
      })}
      placeholder="Enter NGO Name"
      className="w-full p-4 outline-none rounded-2xl"
    />

  </div>

  <p className="text-red-500 text-sm mt-1">

    {errors.organization_name?.message}

  </p>

</div>


{/* Registration Number */}

<div>

  <label className="font-semibold">

    Registration Number

  </label>

  <div className="mt-2 flex items-center border rounded-2xl bg-white">

    <FaIdCard className="ml-4 text-gray-400" />

    <input
      {...register("registration_number", {
        required: "Registration Number is required",
      })}
      placeholder="Enter Registration Number"
      className="w-full p-4 outline-none rounded-2xl"
    />

  </div>

  <p className="text-red-500 text-sm mt-1">

    {errors.registration_number?.message}

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
      placeholder="Enter Email Address"
      className="w-full p-4 outline-none rounded-2xl"
    />

  </div>

  <p className="text-red-500 text-sm mt-1">

    {errors.email?.message}

  </p>

</div>


{/* Contact Number */}

<div>

  <label className="font-semibold">

    Contact Number

  </label>

  <div className="mt-2 flex items-center border rounded-2xl bg-white">

    <FaPhone className="ml-4 text-gray-400" />

    <input
      {...register("phone", {
        required: "Contact Number is required",
      })}
      placeholder="Enter Contact Number"
      className="w-full p-4 outline-none rounded-2xl"
    />

  </div>

  <p className="text-red-500 text-sm mt-1">

    {errors.phone?.message}

  </p>

</div>


{/* Address */}

<div>

  <label className="font-semibold">

    Address

  </label>

  <div className="mt-2 flex items-center border rounded-2xl bg-white">

    <FaMapMarkerAlt className="ml-4 text-gray-400" />

    <input
      {...register("address", {
        required: "Address is required",
      })}
      placeholder="Enter NGO Address"
      className="w-full p-4 outline-none rounded-2xl"
    />

  </div>

  <p className="text-red-500 text-sm mt-1">

    {errors.address?.message}

  </p>

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
                  placeholder="Enter Password"
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
                    required: "Confirm Password is required",
                  })}
                  placeholder="Confirm Password"
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
              className="w-full bg-green-600 hover:bg-green-700 transition-all duration-300 text-white py-4 rounded-2xl text-lg font-bold shadow-lg disabled:bg-green-400"
            >
              {loading
                ? "Registering NGO..."
                : "Register NGO"}
            </button>
                      </form>

          <p className="text-center mt-8 text-gray-600">

            Already have an NGO account?{" "}

            <Link
              to="/ngo/login"
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