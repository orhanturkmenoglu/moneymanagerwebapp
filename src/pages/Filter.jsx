import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import TransactionInfoCard from "../components/TransactionInfoCard";
import moment from "moment";

const Filter = () => {
  useUser();

  const [filters, setFilters] = useState({
    type: "income",
    startDate: "",
    endDate: "",
    sortField: "date",
    sortOrder: "asc",
    search: "",
  });

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS, {
        ...filters,
      });
      setTransactions(response.data);
    } catch (error) {
      console.log("Failed to fetch transactions : ", error);
      toast.error(
        error.message || "Failed to fetch transactions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboard activeMenu="Filter">
      <div className="my-5 mx-auto max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">Filter Transactions</h2>

        {/* Filter Card */}
        <div className="bg-white shadow-lg rounded-2xl p-4 space-y-4 border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Transaction Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transaction Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-400 transition"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Sort Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort Field
              </label>
              <select
                value={filters.sortField}
                onChange={(e) => handleChange("sortField", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-400 transition"
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="category">Category</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort Order
              </label>
              <select
                value={filters.sortOrder}
                onChange={(e) => handleChange("sortOrder", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-400 transition"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleChange("search", e.target.value)}
                placeholder="Search by name, category..."
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-400 transition"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-400 transition"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-400 transition"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-end mt-2">
            <button
              onClick={handleSearch}
              className="bg-green-500 text-white px-5 py-2 rounded-xl font-semibold text-sm hover:bg-green-600 transition"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Transactions List */}
        <div className="card p-4 bg-white shadow-md rounded-2xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold">Transactions</h5>
          </div>

          {loading && (
            <p className="text-gray-500">Loading Transactions...</p>
          )}

          {!loading && transactions.length === 0 && (
            <p className="text-gray-500">
              Select the filters and click "Apply Filters" to see transactions
            </p>
          )}

          {!loading &&
            transactions.map((transaction) => (
              <TransactionInfoCard
                key={transaction.id}
                title={transaction.name}
                icon={transaction.icon}
                date={moment(transaction.date).format("DD-MMM-YYYY")}
                amount={transaction.amount}
                type={transaction.type}
                hideDeleteBtn
              />
            ))}
        </div>
      </div>
    </Dashboard>
  );
};

export default Filter;
