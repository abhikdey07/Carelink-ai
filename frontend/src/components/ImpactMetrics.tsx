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
} from "recharts";

const monthlyData = {
  January: {
    pie: [
      { name: "Clothes", value: 0 },
      { name: "Books", value: 0 },
      { name: "Food", value: 0 },
      { name: "Electronics", value: 0 },
    ],
    bar: [
      { week: "W1", donations: 0 },
      { week: "W2", donations: 0 },
      { week: "W3", donations: 0 },
      { week: "W4", donations: 0 },
    ],
  },

  February: {
    pie: [
      { name: "Clothes", value: 0 },
      { name: "Books", value: 0 },
      { name: "Food", value: 0 },
      { name: "Electronics", value: 0 },
    ],
    bar: [
      { week: "W1", donations: 0 },
      { week: "W2", donations: 0 },
      { week: "W3", donations: 0 },
      { week: "W4", donations: 0 },
    ],
  },

  March: {
    pie: [
      { name: "Clothes", value: 0 },
      { name: "Books", value: 0 },
      { name: "Food", value: 0 },
      { name: "Electronics", value: 0 },
    ],
    bar: [
      { week: "W1", donations: 0 },
      { week: "W2", donations: 0 },
      { week: "W3", donations: 0 },
      { week: "W4", donations: 0 },
    ],
  },

  April: {
    pie: [
      { name: "Clothes", value: 0 },
      { name: "Books", value: 0 },
      { name: "Food", value: 0 },
      { name: "Electronics", value: 0 },
    ],
    bar: [
      { week: "W1", donations: 0 },
      { week: "W2", donations: 0 },
      { week: "W3", donations: 0 },
      { week: "W4", donations: 0 },
    ],
  },

  May: {
    pie: [
      { name: "Clothes", value: 0 },
      { name: "Books", value: 0 },
      { name: "Food", value: 0 },
      { name: "Electronics", value: 0 },
    ],
    bar: [
      { week: "W1", donations: 0 },
      { week: "W2", donations: 0 },
      { week: "W3", donations: 0 },
      { week: "W4", donations: 7 },
    ],
  },

  June: {
    pie: [
      { name: "Clothes", value: 0 },
      { name: "Books", value: 0 },
      { name: "Food", value: 0 },
      { name: "Electronics", value: 0 },
    ],
    bar: [
      { week: "W1", donations: 0 },
      { week: "W2", donations: 0 },
      { week: "W3", donations: 0 },
      { week: "W4", donations: 0 },
    ],
  },

  July: {
    pie: [
      { name: "Clothes", value: 6 },
      { name: "Books", value: 5 },
      { name: "Food", value: 2 },
      { name: "Electronics", value: 2 },
      { name: "Bottles", value: 5 },
    ],
    bar: [
      { week: "W1", donations: 4 },
      { week: "W2", donations: 1 },
      { week: "W3", donations: 7 },
      { week: "W4", donations: 8 },
    ],
  },

  August: {
    pie: [
      { name: "Clothes", value: 2 },
      { name: "Books", value: 3 },
      { name: "Food", value: 1 },
      { name: "Electronics", value: 3 },
      { name: "Bottles", value: 5 },
    ],
    bar: [
      { week: "W1", donations: 6 },
      { week: "W2", donations: 4 },
      { week: "W3", donations: 0 },
      { week: "W4", donations: 0 },
    ],
  },

  September: {
    pie: [
      { name: "Clothes", value: 0 },
      { name: "Books", value: 0 },
      { name: "Food", value: 0 },
      { name: "Electronics", value: 0 },
    ],
    bar: [
      { week: "W1", donations: 0 },
      { week: "W2", donations: 0 },
      { week: "W3", donations: 0 },
      { week: "W4", donations: 0 },
    ],
  },

  October: {
    pie: [
      { name: "Clothes", value: 0 },
      { name: "Books", value: 0 },
      { name: "Food", value: 0 },
      { name: "Electronics", value: 0 },
    ],
    bar: [
      { week: "W1", donations: 0 },
      { week: "W2", donations: 0 },
      { week: "W3", donations: 0 },
      { week: "W4", donations: 0 },
    ],
  },

  November: {
    pie: [
      { name: "Clothes", value: 0 },
      { name: "Books", value: 0 },
      { name: "Food", value: 0 },
      { name: "Electronics", value: 0 },
    ],
    bar: [
      { week: "W1", donations: 0 },
      { week: "W2", donations: 0 },
      { week: "W3", donations: 0 },
      { week: "W4", donations: 0 },
    ],
  },

  December: {
    pie: [
      { name: "Clothes", value: 0 },
      { name: "Books", value: 0 },
      { name: "Food", value: 0 },
      { name: "Electronics", value: 0 },
    ],
    bar: [
      { week: "W1", donations: 0 },
      { week: "W2", donations: 0 },
      { week: "W3", donations: 0 },
      { week: "W4", donations: 0 },
    ],
  },
};

const COLORS = ["#2563eb", "#0ea5e9", "#22c55e", "#f59e0b"];

export default function ImpactMetrics() {
  const [month, setMonth] =
    useState<keyof typeof monthlyData>("January");

  const data = monthlyData[month];

  return (
    <div className="mt-12 bg-white rounded-3xl shadow-xl p-8">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold">
          Impact Metrics
        </h2>

        <select
          value={month}
          onChange={(e) =>
            setMonth(e.target.value as keyof typeof monthlyData)
          }
          className="border rounded-xl px-4 py-2"
        >
          {Object.keys(monthlyData).map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

      </div>

      <div className="grid md:grid-cols-2 gap-10">

        <div className="h-80">

          <h3 className="text-center font-bold mb-4">
            Donation Categories
          </h3>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.pie}
                dataKey="value"
                outerRadius={100}
                label
              >
                {data.pie.map((_, index) => (
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

        <div className="h-80">

          <h3 className="text-center font-bold mb-4">
            Weekly Donations
          </h3>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.bar}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="week" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="donations"
                fill="#2563eb"
                radius={[8,8,0,0]}
              />

            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}