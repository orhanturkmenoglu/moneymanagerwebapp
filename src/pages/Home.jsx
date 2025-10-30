import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import InfoCard from "../components/InfoCard";
import { WalletCards, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { addThousandSeparators } from "../util/util";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import RecentTransactions from "../components/RecentTransactions";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Home = () => {
  useUser();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
      if (response.status === 200) setDashboardData(response.data);
    } catch (error) {
      console.log("Dashboard fetch error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const pieData = [
    { name: "Balance", value: dashboardData?.totalBalance || 0 },
    { name: "Income", value: dashboardData?.totalIncome || 0 },
    { name: "Expense", value: dashboardData?.totalExpense || 0 },
  ];
  const COLORS = ["#6B21A8", "#16A34A", "#DC2626"];

  return (
    <Dashboard activeMenu="Dashboard">
      <div className="my-6 mx-auto max-w-6xl space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoCard
            icon={<WalletCards className="w-6 h-6" />}
            label="Total Balance"
            value={addThousandSeparators(dashboardData?.totalBalance || 0)}
            color="bg-gradient-to-r from-purple-600 to-purple-800"
          />
          <InfoCard
            icon={<ArrowUpCircle className="w-6 h-6" />}
            label="Total Income"
            value={addThousandSeparators(dashboardData?.totalIncome || 0)}
            color="bg-gradient-to-r from-green-500 to-green-700"
          />
          <InfoCard
            icon={<ArrowDownCircle className="w-6 h-6" />}
            label="Total Expense"
            value={addThousandSeparators(dashboardData?.totalExpense || 0)}
            color="bg-gradient-to-r from-red-500 to-red-700"
          />
        </div>

        {/* Lower Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onMore={() => navigate("/expense")}
          />

          {/* Financial Overview + Pie Chart + Income/Expense */}
          <div className="card bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 space-y-6">
            <h3 className="text-lg font-semibold">Financial Overview</h3>

            {loading ? (
              <p className="text-gray-400 text-sm">Loading chart...</p>
            ) : (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => `₹${addThousandSeparators(value)}`}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Income & Expense Transactions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Recent Incomes */}
              <div className="card bg-green-50 p-4 rounded-xl shadow-sm border border-green-100 flex flex-col">
                <h4 className="text-md font-semibold mb-2 text-green-700">
                  Recent Incomes
                </h4>
                {dashboardData?.recent5Incomes?.length > 0 ? (
                  <div className="space-y-2 overflow-y-auto max-h-48">
                    {dashboardData.recent5Incomes.map((income) => (
                      <div
                        key={income.id}
                        className="flex justify-between items-center p-2 rounded-md hover:bg-green-100 transition-colors duration-200"
                      >
                        <span>{income.name}</span>
                        <span className="font-medium text-green-700">
                          ₹{addThousandSeparators(income.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No recent incomes.</p>
                )}
                <button
                  onClick={() => navigate("/income")}
                  className="mt-2 text-sm font-medium text-green-700 hover:underline self-start"
                >
                  See all incomes
                </button>
              </div>

              {/* Recent Expenses */}
              <div className="card bg-red-50 p-4 rounded-xl shadow-sm border border-red-100 flex flex-col">
                <h4 className="text-md font-semibold mb-2 text-red-700">
                  Recent Expenses
                </h4>
                {dashboardData?.recent5Expenses?.length > 0 ? (
                  <div className="space-y-2 overflow-y-auto max-h-48">
                    {dashboardData.recent5Expenses.map((expense) => (
                      <div
                        key={expense.id}
                        className="flex justify-between items-center p-2 rounded-md hover:bg-red-100 transition-colors duration-200"
                      >
                        <span>{expense.name}</span>
                        <span className="font-medium text-red-700">
                          ₹{addThousandSeparators(expense.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No recent expenses.</p>
                )}
                <button
                  onClick={() => navigate("/expense")}
                  className="mt-2 text-sm font-medium text-red-700 hover:underline self-start"
                >
                  See all expenses
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Home;
