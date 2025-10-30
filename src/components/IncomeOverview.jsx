import React, { useEffect, useState } from "react";
import CustomLineChart from "./CustomLineChart";
import AdvancedLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";

const IncomeOverview = ({ transactions }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const result = prepareIncomeLineChartData(transactions);
      setChartData(result);
    } else {
      setChartData([]);
    }
  }, [transactions]);

  // 🔹 Grafik için veri hazırlama
  const prepareIncomeLineChartData = (transactions) => {
    // 🔸 1. Tarihe göre sırala
    const sorted = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    // 🔸 2. Aynı tarihli gelirleri grupla
    const grouped = sorted.reduce((acc, txn) => {
      const date = txn.date;
      const existing = acc.find((item) => item.date === date);
      if (existing) {
        existing.amount += Number(txn.amount);
      } else {
        acc.push({ date, amount: Number(txn.amount) });
      }
      return acc;
    }, []);

    // 🔸 3. Recharts için uygun formatta döndür
    return grouped.map((item) => ({
      date: item.date,
      amount: item.amount,
    }));
  };

  return (
    <div className="card bg-white border border-gray-100 rounded-2xl shadow-md p-5 w-full">
      <div>
        <h5 className="text-lg font-semibold text-gray-700">
          Income Overview
        </h5>
        <p className="text-xs text-gray-400 mt-0.5">
          Track your earnings over time and analyze your income trends.
        </p>
      </div>


      <div className="mt-6 h-64">
        {chartData.length > 0 ? (
          <CustomLineChart data={chartData} />
        ) : (
          <div className="flex justify-center items-center h-full text-gray-400 text-sm">
            No income data available
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeOverview;
