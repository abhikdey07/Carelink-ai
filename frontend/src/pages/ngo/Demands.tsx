import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaClipboardList,
  FaEdit,
  FaTrash,
  FaPlusCircle,
} from "react-icons/fa";

import {
  getDemands,
  deleteDemand,
} from "../../services/demandService";

interface Demand {

  id:number;

  item_name:string;

  quantity_required:number;

  priority:string;

  minimum_condition:string;

  expiry_date:string;

  status:string;

}

export default function Demands(){

const navigate=useNavigate();

const user=JSON.parse(
localStorage.getItem("user")||"{}"
);

const [demands,setDemands]=useState<Demand[]>([]);

const loadDemands=async()=>{

try{

const data=await getDemands(user.id);

setDemands(data);

}catch{

toast.error("Failed to load demands");

}

};

useEffect(()=>{

loadDemands();

},[]);
const removeDemand = async (id: number) => {
  try {
    await deleteDemand(id);

    toast.success("Demand deleted successfully");

    loadDemands();
  } catch {
    toast.error("Failed to delete demand");
  }
};

return(

<div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-8">

<div className="max-w-7xl mx-auto">

<motion.div

initial={{opacity:0,y:-20}}

animate={{opacity:1,y:0}}

transition={{duration:.6}}

className="bg-white rounded-3xl shadow-xl p-8 mb-8"

>

<div className="flex justify-between items-center">

<div>

<h1 className="text-4xl font-black">

My Demands

</h1>

<p className="text-gray-500 mt-2">

Manage NGO Requirements

</p>

</div>

<div className="flex gap-4">

<button

onClick={()=>navigate("/ngo/dashboard")}

className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"

>

<FaArrowLeft/>

Dashboard

</button>

<button

onClick={()=>navigate("/ngo/demand/add")}

className="bg-green-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"

>

<FaPlusCircle/>

New Demand

</button>

</div>

</div>

</motion.div>
<motion.div

initial={{opacity:0,y:20}}

animate={{opacity:1,y:0}}

transition={{delay:.2}}

className="bg-white rounded-3xl shadow-xl overflow-hidden"

>

<table className="w-full">

<thead className="bg-slate-100">

<tr>

<th className="p-5 text-left">Item</th>

<th className="p-5 text-left">Quantity</th>

<th className="p-5 text-left">Priority</th>

<th className="p-5 text-left">Condition</th>

<th className="p-5 text-left">Expiry</th>

<th className="p-5 text-left">Status</th>

<th className="p-5 text-center">Action</th>

</tr>

</thead>

<tbody>

{demands.length===0?(
<tr>

<td
colSpan={7}
className="text-center py-12 text-gray-500"
>

No Demands Found

</td>

</tr>

):(

demands.map((demand)=>(

<tr
key={demand.id}
className="border-t hover:bg-slate-50 transition-all"
>

<td className="p-5 font-semibold">

<FaClipboardList className="inline mr-2 text-blue-600"/>

{demand.item_name}

</td>

<td className="p-5">

{demand.quantity_required}

</td>

<td className="p-5">
    <span

className={`px-4 py-2 rounded-full text-sm font-bold text-white

${demand.priority==="High"

?"bg-red-500"

:demand.priority==="Medium"

?"bg-yellow-500"

:"bg-green-500"

}

`}

>

{demand.priority}

</span>

</td>

<td className="p-5">

<span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full">

{demand.minimum_condition}

</span>

</td>

<td className="p-5">

{demand.expiry_date}

</td>

<td className="p-5">

<span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">

{demand.status}

</span>

</td>

<td className="p-5">

<div className="flex justify-center gap-3">

<button

onClick={()=>navigate(`/ngo/demand/edit/${demand.id}`)}

className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl"

>

<FaEdit/>

</button>

<button

onClick={()=>removeDemand(demand.id)}

className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl"

>

<FaTrash/>

</button>

</div>

</td>

</tr>

))

)}
</tbody>

</table>

</motion.div>

<motion.div

initial={{opacity:0}}

animate={{opacity:1}}

transition={{delay:.5}}

className="mt-8"

>

<div className="bg-white rounded-3xl shadow-xl p-6">

<h2 className="text-2xl font-bold mb-3">

Demand Summary

</h2>

<div className="grid md:grid-cols-3 gap-6">

<div className="bg-blue-50 rounded-2xl p-6">

<p className="text-gray-500">

Total Demands

</p>

<h1 className="text-4xl font-black">

{demands.length}

</h1>

</div>

<div className="bg-red-50 rounded-2xl p-6">

<p className="text-gray-500">

High Priority

</p>

<h1 className="text-4xl font-black">

{demands.filter(
d=>d.priority==="High"
).length}

</h1>

</div>

<div className="bg-green-50 rounded-2xl p-6">

<p className="text-gray-500">

Active

</p>

<h1 className="text-4xl font-black">

{demands.filter(
d=>d.status==="Active"
).length}

</h1>

</div>

</div>

</div>

</motion.div>
</div>

</div>

);

}