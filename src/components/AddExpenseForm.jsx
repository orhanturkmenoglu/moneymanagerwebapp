import React, { useEffect, useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import Input from "./Input";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

const AddExpenseForm = ({ onAddExpense, categories }) => {
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: "",
  });

  const [loading, setLoading] = useState(false);

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleChange = (key, value) => {
    setExpense((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    const { name, amount, date, categoryId } = expense;

    if (!name.trim()) {
      toast.error("Expense name is required");
      return false;
    }
    if (!categoryId) {
      toast.error("Please select a category");
      return false;
    }
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return false;
    }
    if (!date) {
      toast.error("Please select a valid date");
      return false;
    }

    const today = new Date().toISOString().split("T")[0];
    if (date > today) {
      toast.error("Expense date cannot be in the future");
      return false;
    }

    return true;
  };

  const handleAddExpense = async (expense) => {
    if (loading) return;

    if (!validateForm()) return;

    setLoading(true);
    try {
      await onAddExpense(expense);

      await new Promise((r) => setTimeout(r, 400));
      toast.success("Expense added successfully!");

      setExpense({
        name: "",
        amount: "",
        date: "",
        icon: "",
        categoryId: "",
      });
    } catch (error) {
      console.error("❌ Error adding expense:", error);
      toast.error(error?.response?.data?.message || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categories.length > 0 && !expense.categoryId) {
      setExpense((prev) => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories, expense.categoryId]);

  return (
    <div className="space-y-5">
      {/* Emoji Selector */}
      <div className="flex items-center gap-3">
        <EmojiPickerPopup
          icon={expense.icon}
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />
      </div>

      {/* Expense Name */}
      <Input
        value={expense.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Expense Name"
        placeHolder="e.g. Rent, Groceries, Utilities"
        type="text"
      />

      {/* Category */}
      <Input
        value={expense.categoryId}
        onChange={({ target }) => handleChange("categoryId", target.value)}
        label="Category"
        isSelect={true}
        options={categoryOptions}
      />

      {/* Amount */}
      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeHolder="e.g. 250"
        type="number"
      />

      {/* Date */}
      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        type="date"
      />

      {/* Submit */}
      <div className="flex justify-end pt-4">
        <button
          onClick={() => handleAddExpense(expense)}
          disabled={loading}
          className={`flex items-center justify-center min-w-[130px] px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md
            ${
              loading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 hover:shadow-lg"
            }`}
        >
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              <span className="ml-2">Saving...</span>
            </>
          ) : (
            "Add Expense"
          )}
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
