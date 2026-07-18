import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaArrowLeft,
  FaBoxOpen,
  FaBoxes,
  FaCalendarAlt,
  FaFlag,
} from "react-icons/fa";

import { createDemand } from "../../services/demandService";

interface DemandForm {

  item_name: string;

  quantity_required: number;

  priority: string;

  minimum_condition: string;

  expiry_date: string;

}

export default function AddDemand() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DemandForm>();

  const onSubmit = async (
    data: DemandForm
  ) => {

    try {

      await createDemand(
        user.id,
        data
      );

      toast.success(
        "Demand Added Successfully"
      );

      reset();

      navigate("/ngo/demands");

    } catch (error: any) {

      toast.error(
        error?.response?.data?.detail ||
        "Failed to Add Demand"
      );

    }

  };

  return (

<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex justify-center items-center px-6 relative overflow-hidden">

<div className="absolute -top-40 -left-32 w-96 h-96 bg-blue-300/20 blur-3xl rounded-full"></div>

<div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 blur-3xl rounded-full"></div>

<motion.div

initial={{opacity:0,y:60}}

animate={{opacity:1,y:0}}

transition={{duration:.7}}

className="relative w-full max-w-xl"

>

<div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-[35px] border border-white p-10">

<button

onClick={()=>navigate("/ngo/dashboard")}

className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"

>

<FaArrowLeft/>

Back

</button>

<h1 className="text-4xl font-black text-center mt-6">

Create Demand

</h1>

<p className="text-center text-gray-500 mt-3 mb-10">

Add your current donation requirements

</p>

<form

onSubmit={handleSubmit(onSubmit)}

className="space-y-6"

>
    {/* Item Name */}

<div>

<label className="font-semibold">

Item Name

</label>

<div className="mt-2 flex items-center border rounded-2xl bg-white">

<FaBoxOpen className="ml-4 text-gray-400"/>

<input

{...register("item_name",{
required:"Item Name is required",
})}

placeholder="Rice, Clothes, Books..."

className="w-full p-4 outline-none rounded-2xl"

/>

</div>

<p className="text-red-500 text-sm mt-1">

{errors.item_name?.message}

</p>

</div>



{/* Quantity */}

<div>

<label className="font-semibold">

Quantity Required

</label>

<div className="mt-2 flex items-center border rounded-2xl bg-white">

<FaBoxes className="ml-4 text-gray-400"/>

<input

type="number"

{...register("quantity_required",{

required:"Quantity is required",

valueAsNumber:true,

min:1,

})}

placeholder="Enter Quantity"

className="w-full p-4 outline-none rounded-2xl"

/>

</div>

<p className="text-red-500 text-sm mt-1">

{errors.quantity_required?.message}

</p>

</div>
{/* Priority */}

<div>

<label className="font-semibold">

Priority

</label>

<div className="mt-2 flex items-center border rounded-2xl bg-white">

<FaFlag className="ml-4 text-gray-400"/>

<select

{...register("priority",{

required:"Priority is required",

})}

className="w-full p-4 outline-none rounded-2xl bg-transparent"

>

<option value="">

Select Priority

</option>

<option value="High">

High

</option>

<option value="Medium">

Medium

</option>

<option value="Low">

Low

</option>

</select>

</div>

<p className="text-red-500 text-sm mt-1">

{errors.priority?.message}

</p>

</div>

{/* Minimum Condition */}

<div>

<label className="font-semibold">

Minimum Acceptable Condition

</label>

<div className="mt-2 border rounded-2xl bg-white">

<select

{...register("minimum_condition",{

required:"Condition is required",

})}

className="w-full p-4 outline-none rounded-2xl bg-transparent"

>

<option value="">

Select Condition

</option>

<option value="New">

New

</option>

<option value="Excellent">

Excellent

</option>

<option value="Good">

Good

</option>

<option value="Fair">

Fair

</option>

<option value="Poor">

Poor

</option>

<option value="Damaged">

Damaged

</option>

</select>

</div>

<p className="text-red-500 text-sm mt-1">

{errors.minimum_condition?.message}

</p>

</div>

{/* Expiry Date */}

<div>

<label className="font-semibold">

Expiry Date

</label>

<div className="mt-2 flex items-center border rounded-2xl bg-white">

<FaCalendarAlt className="ml-4 text-gray-400"/>

<input

type="date"

{...register("expiry_date",{

required:"Expiry Date is required",

})}

className="w-full p-4 outline-none rounded-2xl"

/>

</div>

<p className="text-red-500 text-sm mt-1">

{errors.expiry_date?.message}

</p>

</div>



<button

type="submit"

className="w-full bg-green-600 hover:bg-green-700 transition-all duration-300 text-white py-4 rounded-2xl text-lg font-bold shadow-lg"

>

Add Demand

</button>
          </form>

          <div className="mt-8 text-center">

            <button
              onClick={() => navigate("/ngo/dashboard")}
              className="text-blue-600 hover:underline font-semibold"
            >
              Back to Dashboard
            </button>

          </div>

        </div>

      </motion.div>
          </div>

  );

}