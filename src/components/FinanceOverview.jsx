import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { addThousandSeparators } from "../util/util";

const FinanceOverview = ({
  totalBalance = 0,
  totalIncome = 0,
  totalExpense = 0,
}) => {
  const COLORS = ["#59168B", "#a0090e", "#016630"];

  // 🔹 Eğer tüm değerler 0 ise default placeholder veri kullan
  const balanceData =
    totalBalance === 0 && totalIncome === 0 && totalExpense === 0
      ? [
          { name: "Total Balance", amount: 1 },
          { name: "Total Expenses", amount: 1 },
          { name: "Total Income", amount: 1 },
        ]
      : [
          { name: "Total Balance", amount: totalBalance },
          { name: "Total Expenses", amount: totalExpense },
          { name: "Total Income", amount: totalIncome },
        ];

  return (
    <div className="card bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold">Financial Overview</h5>
      </div>

      <div className="w-full h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={balanceData}
              dataKey="amount"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={({ name, percent }) =>
                totalBalance + totalIncome + totalExpense === 0
                  ? name
                  : `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {balanceData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) =>
                totalBalance + totalIncome + totalExpense === 0
                  ? `${value}`
                  : `$${addThousandSeparators(value)}`
              }
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <p className="text-gray-500 text-sm mt-4">
        Total Balance: ${addThousandSeparators(totalBalance)}
      </p>
    </div>
  );
};

export default FinanceOverview;
