import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import axiosConfig from "../util/axiosConfig";
import IncomeList from "../components/IncomeList";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm";
import toast from "react-hot-toast";

const Income = () => {
  useUser();
  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // Fetch all income
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
      if (response.status === 200) {
        console.log("Income details fetched successfully", response.data);
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Error fetching income details:", error);
      toast.error(
        error?.response?.data?.message || "Failed to fetch income details"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch income categories
  const fetchIncomeCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("income")
      );
      if (response.status === 200) {
        console.log("Income categories fetched successfully", response.data);
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching income categories:", error);
      toast.error(
        error?.response?.data?.message || "Failed to fetch income categories"
      );
    }
  };

  // Add new income
  const handleAddIncome = async (income) => {
    const { name, amount, date, icon, categoryId } = income;

    if(!name.trim()){
      toast.error("Income source name cannot be empty");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Please enter a valid income amount");
      return;
    }
    
    const today = new Date().toISOString().split("T")[0];
    if (date > today) {
      toast.error("Income date cannot be in the future");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
        name,
        amount,
        date,
        icon,
        categoryId,
      });
      console.log("response incomes :",response.data);
      if (response.status === 201) {
        console.log("Income added successfully", response.data);
        toast.success("Income added successfully");
        setOpenAddIncomeModal(false);
        fetchIncomeDetails();
        fetchIncomeCategories();
      }
    } catch (error) {
      console.error("Error adding income:", error);
      toast.error(error?.response?.data?.message || "Failed to add income");
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
  }, []);

  return (
    <Dashboard activeMenu="Income">
      <div className="my-5 mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-6">
          {/* Overview / Add Income */}
          <div className="flex justify-between items-center">
            <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 w-full flex justify-between items-center">
              <span className="text-gray-700 font-medium text-sm">
                Income Overview
              </span>
              <button
                className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl font-medium text-sm hover:bg-green-100 hover:text-green-800 transition-all shadow-sm hover:shadow-md"
                onClick={() => setOpenAddIncomeModal(true)}
              >
                <Plus size={16} />
                Add Income
              </button>
            </div>
          </div>

          {/* Income List */}
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => console.log("Deleting the income with id:", id)}
          />

          {/* Add Income Modal */}
          <Modal
            isOpen={openAddIncomeModal}
            onClose={() => setOpenAddIncomeModal(false)}
            title="Add Income"
          >
            <div className="p-4 text-gray-600 text-sm">
              <AddIncomeForm
                onAddIncome={(income) => handleAddIncome(income)}
                categories={categories}
              />
            </div>
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};

export default Income;
