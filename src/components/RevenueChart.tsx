'use client';
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "1 Jan", revenue: 4000 },
  { date: "5 Jan", revenue: 3000 },
  { date: "10 Jan", revenue: 5000 },
  { date: "15 Jan", revenue: 4500 },
  { date: "20 Jan", revenue: 6000 },
  { date: "25 Jan", revenue: 5500 },
  { date: "30 Jan", revenue: 7000 },
];

const RevenueChart = () => {
  return (
    <div className="bg-background-primary p-6 rounded-lg border border-border-primary shadow-sm">
      <h1 className="text-xl font-bold mb-6">Revenue Trend (30 days)</h1>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="date" 
              stroke="#6B7280"
              tick={{ fill: '#6B7280' }}
            />
            <YAxis 
              stroke="#6B7280"
              tick={{ fill: '#6B7280' }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              formatter={(value) => [`$${value}`, 'Revenue']}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2A4EC7"
              strokeWidth={2}
              dot={{ fill: '#2A4EC7', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#2A4EC7' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart; 