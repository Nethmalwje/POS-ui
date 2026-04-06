import { Card } from "antd";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  { name: "Laundry Detergent", stock: 150 },
  { name: "Paper Towels (Pack)", stock: 200 },
  { name: "Toilet Paper (Pack)", stock: 180 },
  { name: "Dishwashing Liquid", stock: 130 },
  { name: "Shampoo", stock: 90 },
  { name: "Toothpaste", stock: 160 },
  { name: "Hand Sanitizer", stock: 220 },
  { name: "Trash Bags (Box)", stock: 110 },
  { name: "Bleach", stock: 75 },
  { name: "Fabric Softener", stock: 95 },
];

const InventoryStatus = () => {
  return (
    <Card
      title={
        <span className="text-xl font-poppins text-gray-800">
          Inventory Status
        </span>
      }
      style={{
        borderRadius: "20px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        background: "linear-gradient(135deg, #f0f4ff 0%, #d9e4ff 100%)",
        padding: "20px",
      }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis
            dataKey="name"
            stroke="#555"
            interval={0}
            angle={-30}
            textAnchor="end"
          />
          <YAxis stroke="#3a1e1e" />
          <Tooltip
            contentStyle={{ backgroundColor: "#f0f4ff", borderRadius: "10px" }}
          />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="stock" fill="#4a8cf5" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default InventoryStatus;
