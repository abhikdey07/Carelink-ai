import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

const monthlyData = {
  January: {
    donations: 0,
    matches: 0,
    pie: [
      { name: "Food", value: 0 },
      { name: "Clothes", value: 0 },
      { name: "Books", value: 0 },
      { name: "Medical", value: 0 },
    ],
  },

  February: {
    donations: 0,
    matches: 0,
    pie: [
      { name: "Food", value: 0 },
      { name: "Clothes", value: 0 },
      { name: "Books", value: 0 },
      { name: "Medical", value: 0 },
    ],
  },

  March: {
    donations: 0,
    matches: 0,
    pie: [
      { name: "Food", value: 0 },
      { name: "Clothes", value: 0 },
      { name: "Books", value: 0 },
      { name: "Medical", value: 0 },
    ],
  },

  April: {
    donations: 0,
    matches: 0,
    pie: [
      { name: "Food", value: 0 },
      { name: "Clothes", value: 0 },
      { name: "Books", value: 0 },
      { name: "Medical", value: 0 },
    ],
  },

  May: {
    donations: 0,
    matches: 0,
    pie: [
      { name: "Food", value: 0 },
      { name: "Clothes", value: 0 },
      { name: "Books", value: 0 },
      { name: "Medical", value: 0 },
    ],
  },

  June: {
    donations: 0,
    matches: 0,
    pie: [
      { name: "Food", value: 0 },
      { name: "Clothes", value: 0 },
      { name: "Books", value: 0 },
      { name: "Medical", value: 0 },
    ],
  },

  July: {
    donations: 10,
    matches: 6,
    pie: [
      { name: "Food", value: 2 },
      { name: "Clothes", value: 3 },
      { name: "Books", value: 6 },
      { name: "Bottle", value: 4 },
    ],
  },

  August: {
    donations: 21,
    matches: 15,
    pie: [
      { name: "Food", value: 5 },
      { name: "Clothes", value: 6 },
      { name: "Books", value: 10 },
      { name: "Bottle", value: 5 },
    ],
  },

  September: {
    donations: 0,
    matches: 0,
    pie: [
      { name: "Food", value: 0 },
      { name: "Clothes", value: 0 },
      { name: "Books", value: 0 },
      { name: "Bottle", value: 0 },
    ],
  },

  October: {
    donations: 0,
    matches: 0,
    pie: [
      { name: "Food", value: 0 },
      { name: "Clothes", value: 0 },
      { name: "Books", value: 0 },
      { name: "Bottle", value: 0 },
    ],
  },

  November: {
    donations: 0,
    matches: 0,
    pie: [
      { name: "Food", value: 0 },
      { name: "Clothes", value: 0 },
      { name: "Books", value: 0 },
      { name: "Medical", value: 0 },
    ],
  },

  December: {
    donations: 0,
    matches: 0,
    pie: [
      { name: "Food", value: 0 },
      { name: "Clothes", value: 0 },
      { name: "Books", value: 0 },
      { name: "Medical", value: 0 },
    ],
  },
};

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
];

export default function NGOImpactMetrics() {
  const navigate = useNavigate();

  const [selectedMonth, setSelectedMonth] = useState("January");

  const data = monthlyData[selectedMonth];

  const barData = [
    { name: "Donations", value: data.donations },
    { name: "Matches", value: data.matches },
  ];

const lineData = [
  {
    week: "W1",
    value: Math.round(data.matches * 0.25),
  },
  {
    week: "W2",
    value: Math.round(data.matches * 0.50),
  },
  {
    week: "W3",
    value: Math.round(data.matches * 0.75),
  },
  {
    week: "W4",
    value: data.matches,
  },
];

  const areaData = [
    { name: "Food", value: data.pie[0].value },
    { name: "Clothes", value: data.pie[1].value },
    { name: "Books", value: data.pie[2].value },
    { name: "Medical", value: data.pie[3].value },
    
  ];

  return (
    <div className="max-w-7xl mx-auto p-8">

      <div className="flex justify-between items-center mb-10">

        <button
          onClick={() => navigate("/ngo/dashboard")}
          className="bg-white px-5 py-3 rounded-xl shadow flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <h1 className="text-4xl font-black">
          NGO Impact Metrics
        </h1>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="bg-white px-4 py-3 rounded-xl shadow border"
        >
          {Object.keys(monthlyData).map((month) => (
            <option key={month}>{month}</option>
          ))}
        </select>

      </div>

      <div className="bg-white rounded-3xl shadow-xl p-10">

        <h2 className="text-3xl font-bold mb-8">
          Visual Analytics
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-gray-50 rounded-2xl p-5 h-80">
            <h3 className="text-xl font-bold text-center mb-4">
              Donation Categories
            </h3>

            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={data.pie}
                  dataKey="value"
                  outerRadius={90}
                  label
                >
                  {data.pie.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 h-80">
            <h3 className="text-xl font-bold text-center mb-4">
              Donations vs Matches
            </h3>

            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 h-80">
            <h3 className="text-xl font-bold text-center mb-4">
              Weekly Matches
            </h3>

            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 h-80">
            <h3 className="text-xl font-bold text-center mb-4">
              Category Distribution
            </h3>

            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={areaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#f59e0b"
                  fill="#fde68a"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>

    </div>
  );
}