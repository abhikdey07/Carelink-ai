import toast from "react-hot-toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaArrowLeft,
  FaBoxOpen,
  FaBoxes,
  FaCalendarAlt,
  FaFlag,
} from "react-icons/fa";

import {
  getDemand,
  updateDemand,
} from "../../services/demandService";

interface DemandForm {

  item_name: string;

  quantity_required: number;

  priority: string;

  minimum_condition: string;

  expiry_date: string;

}

export default function EditDemand() {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DemandForm>();

  useEffect(() => {
    loadDemand();
  }, []);

  const loadDemand = async () => {
    try {
      const data = await getDemand(Number(id));

      setValue("item_name", data.item_name);

      setValue(
        "quantity_required",
        data.quantity_required
      );

      setValue("priority", data.priority);
      setValue(
  "minimum_condition",
  data.minimum_condition
);

      setValue(
        "expiry_date",
        data.expiry_date.substring(0, 10)
      );
    } catch {
      toast.error("Unable to load demand");
    }
  };

  const onSubmit = async (
    data: DemandForm
  ) => {
    try {
      await updateDemand(
        Number(id),
        data
      );

      toast.success(
        "Demand Updated Successfully"
      );

      navigate("/ngo/demands");
    } catch {
      toast.error("Update Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex justify-center items-center px-6">

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .7 }}
        className="w-full max-w-xl"
      >

        <div className="bg-white rounded-[35px] shadow-2xl p-10">

          <button
            onClick={() =>
              navigate("/ngo/demands")
            }
            className="flex items-center gap-2 text-blue-600 font-semibold"
          >
            <FaArrowLeft />

            Back
          </button>

          <h1 className="text-4xl font-black text-center mt-6">

            Edit Demand

          </h1>

          <p className="text-center text-gray-500 mt-3 mb-10">

            Modify NGO Requirement

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

placeholder="Quantity"

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

required:"Priority Required",

})}

className="w-full p-4 outline-none rounded-2xl bg-transparent"

>

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

Update Demand

</button>

</form>
<div className="mt-8 text-center">

<button

onClick={()=>navigate("/ngo/demands")}

className="text-blue-600 hover:underline font-semibold"

>

Cancel

</button>

</div>

</div>

</motion.div>

</div>

);

}