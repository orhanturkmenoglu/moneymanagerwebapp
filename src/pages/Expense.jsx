import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import axiosConfig from "../util/axiosConfig";
import ExpenseList from "../components/ExpenseList";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";
import AddExpenseForm from "../components/AddExpenseForm";
import toast from "react-hot-toast";
import DeleteAlert from "../components/DeleteAlert";
import ExpenseOverview from "../components/ExpenseOverview";

const Expense = () => {
  useUser();

  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // 🔹 Fetch all expenses
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
      if (response.status === 200) {
        setExpenseData(response.data);
        console.log("✅ Expense details fetched successfully");
      }
    } catch (error) {
      console.error("❌ Error fetching expense details:", error);
      toast.error(
        error?.response?.data?.message || "Failed to fetch expense details"
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch expense categories
  const fetchExpenseCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("expense")
      );
      if (response.status === 200) {
        setCategories(response.data);
        console.log("✅ Expense categories fetched successfully");
      }
    } catch (error) {
      console.error("❌ Error fetching expense categories:", error);
      toast.error(
        error?.response?.data?.message || "Failed to fetch expense categories"
      );
    }
  };

  // 🔹 Add new expense
  const handleAddExpense = async (expense) => {
    const { name, amount, date, icon, categoryId } = expense;

    if (!name.trim()) {
      toast.error("Expense name cannot be empty");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Please enter a valid expense amount");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (date > today) {
      toast.error("Expense date cannot be in the future");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name,
        amount,
        date,
        icon,
        categoryId,
      });

      if (response.status === 201) {
        toast.success("Expense added successfully");
        setOpenAddExpenseModal(false);
        await fetchExpenseDetails();
        await fetchExpenseCategories();
      }
    } catch (error) {
      console.error("❌ Error adding expense:", error);
      toast.error(error?.response?.data?.message || "Failed to add expense");
    }
  };

  // 🔹 Delete expense
  const deleteExpense = async (expenseId) => {
    setLoading(true);
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(expenseId));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      await fetchExpenseDetails();
    } catch (error) {
      console.error("❌ Error deleting expense:", error);
      toast.error(error?.response?.data?.message || "Failed to delete expense");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Download expense details as Excel
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,
        {
          responseType: "blob",
        }
      );

      let filename = "expense_details.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Expense details downloaded successfully");
    } catch (error) {
      console.error("❌ Error downloading expense details:", error);
      toast.error(
        error?.response?.data?.message || "Failed to download expense details"
      );
    }
  };

  // 🔹 Send expense details via email
  const handleEmailExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.EMAIL_EXPENSE_DETAILS
      );
      if (response.status === 200) {
        toast.success("Expense details emailed successfully");
      }
    } catch (error) {
      console.error("❌ Error emailing expense details:", error);
      toast.error(
        error?.response?.data?.message || "Failed to email expense details"
      );
    }
  };

  // 🔹 Initial data fetch
  useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  }, []);

  return (
    <Dashboard activeMenu="Expense">
      <div className="my-5 mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-6">
          {/* Header & Add Expense Button */}
          <div className="flex justify-between items-center">
            <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 w-full flex justify-between items-center">
              <span className="text-gray-700 font-medium text-sm">
                <ExpenseOverview transactions={expenseData} />
              </span>
              <button
                onClick={() => setOpenAddExpenseModal(true)}
                className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-xl font-medium text-sm 
                           hover:bg-red-100 hover:text-red-800 transition-all shadow-sm hover:shadow-md"
              >
                <Plus size={16} />
                Add Expense
              </button>
            </div>
          </div>

          {/* Expense List */}
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseDetails}
            onEmail={handleEmailExpenseDetails}
          />

          {/* Add Expense Modal */}
          <Modal
            isOpen={openAddExpenseModal}
            onClose={() => setOpenAddExpenseModal(false)}
            title="Add Expense"
          >
            <div className="p-4 text-gray-600 text-sm">
              <AddExpenseForm
                onAddExpense={handleAddExpense}
                categories={categories}
              />
            </div>
          </Modal>

          {/* Delete Expense Modal */}
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Expense"
          >
            <DeleteAlert
              content="Are you sure want to delete this expense details?"
              onDelete={() => deleteExpense(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};

export default Expense;
