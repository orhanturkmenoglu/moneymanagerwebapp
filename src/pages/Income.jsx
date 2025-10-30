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
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverview from "../components/IncomeOverview";

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

  // 🔹 Fetch all income
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
      if (response.status === 200) {
        setIncomeData(response.data);
        console.log("✅ Income details fetched successfully");
      }
    } catch (error) {
      console.error("❌ Error fetching income details:", error);
      toast.error(
        error?.response?.data?.message || "Failed to fetch income details"
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch income categories
  const fetchIncomeCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("income")
      );
      if (response.status === 200) {
        setCategories(response.data);
        console.log("✅ Income categories fetched successfully");
      }
    } catch (error) {
      console.error("❌ Error fetching income categories:", error);
      toast.error(
        error?.response?.data?.message || "Failed to fetch income categories"
      );
    }
  };

  // 🔹 Add new income
  const handleAddIncome = async (income) => {
    const { name, amount, date, icon, categoryId } = income;

    if (!name.trim()) {
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

      if (response.status === 201) {
        toast.success("Income added successfully");
        setOpenAddIncomeModal(false);
        await fetchIncomeDetails();
        await fetchIncomeCategories();
      }
    } catch (error) {
      console.error("❌ Error adding income:", error);
      toast.error(error?.response?.data?.message || "Failed to add income");
    }
  };

  // 🔹 Delete income details
  const deleteIncome = async (incomeId) => {
    setLoading(true);
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(incomeId));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
      await fetchIncomeDetails();
    } catch (error) {
      console.error("❌ Error deleting income:", error);
      toast.error(error?.response?.data?.message || "Failed to delete income");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD,
        {
          responseType: "blob",
        }
      );

      let filename = "income_details.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Income details downloaded successfully");
    } catch (error) {
      console.error("❌ Error downloading income details:", error);
      toast.error(
        error?.response?.data?.message || "Failed to download income details"
      );
    }
  };
  const handleEmailIncomeDetails = async () => {
    try {
       const response =  await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME_DETAILS);
      if (response.status ==200){
         toast.success("Income details emailed successfully");
      }
    } catch (error) {
      console.error("❌ Error emailing income details:", error);
      toast.error(
        error?.response?.data?.message || "Failed to email income details"
      );
    }
  };

  // 🔹 Initial data fetch
  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
  }, []);

  return (
    <Dashboard activeMenu="Income">
      <div className="my-5 mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-6">
          {/* Header & Add Income Button */}

          <div className="flex justify-between items-center">
            <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 w-full flex justify-between items-center">
              <span className="text-gray-700 font-medium text-sm">
                <IncomeOverview transactions={incomeData} />
              </span>
              <button
                onClick={() => setOpenAddIncomeModal(true)}
                className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl font-medium text-sm 
                           hover:bg-green-100 hover:text-green-800 transition-all shadow-sm hover:shadow-md"
              >
                <Plus size={16} />
                Add Income
              </button>
            </div>
          </div>

          {/* Income List */}
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadIncomeDetails}
            onEmail={handleEmailIncomeDetails}
          />

          {/* Add Income Modal */}
          <Modal
            isOpen={openAddIncomeModal}
            onClose={() => setOpenAddIncomeModal(false)}
            title="Add Income"
          >
            <div className="p-4 text-gray-600 text-sm">
              <AddIncomeForm
                onAddIncome={handleAddIncome}
                categories={categories}
              />
            </div>
          </Modal>

          {/* Delete Income Modal */}
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Income"
          >
            <DeleteAlert
              content="Are you sure want to delete this income details"
              onDelete={() => deleteIncome(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};

export default Income;
