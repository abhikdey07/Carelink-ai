import toast from "react-hot-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { loginNGO } from "../../services/ngoService";

import {
  FaArrowLeft,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

interface LoginForm {
  email: string;
  password: string;
}

export default function NGOLogin() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (
    data: LoginForm
  ) => {

    setLoading(true);

    try {

      const user =
        await loginNGO(data);

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      toast.success(
        "Login Successful"
      );

      navigate("/ngo/dashboard");

    } catch (error: any) {

      toast.error(
        error?.response?.data?.detail ||
        "Invalid Email or Password"
      );

    }

    setLoading(false);

  };

  return (

<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-6 relative overflow-hidden">

<div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-blue-300/20 blur-3xl"></div>

<div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-cyan-300/20 blur-3xl"></div>

<motion.div
initial={{opacity:0,y:60}}
animate={{opacity:1,y:0}}
transition={{duration:.7}}
className="relative w-full max-w-md"
>

<div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-[35px] border border-white p-10">

<button
onClick={()=>navigate("/")}
className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
>

<FaArrowLeft/>

Back to Home

</button>

<h1 className="text-4xl font-black text-center mt-6">

NGO Login

</h1>

<p className="text-center text-gray-500 mt-3 mb-10">

Login to manage your NGO donations

</p>

<form
onSubmit={handleSubmit(onSubmit)}
className="space-y-6"
>
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
      placeholder="Enter NGO Email"
      className="w-full p-4 outline-none rounded-2xl"
    />

  </div>

  <p className="text-red-500 text-sm mt-1">
    {errors.email?.message}
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

<button
  type="submit"
  disabled={loading}
  className="w-full bg-green-600 hover:bg-green-700 transition-all duration-300 text-white py-4 rounded-2xl text-lg font-bold shadow-lg disabled:bg-green-400"
>
  {loading
    ? "Signing In..."
    : "Login"}
</button>
          </form>

          <p className="text-center mt-8 text-gray-600">

            Don't have an NGO account?{" "}

            <Link
              to="/ngo/register"
              className="text-blue-600 font-bold hover:underline"
            >
              Register Here
            </Link>

          </p>

        </div>

      </motion.div>
          </div>

  );
}