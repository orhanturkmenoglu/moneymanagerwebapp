import React, { useEffect, useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import Input from "./Input";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

const AddIncomeForm = ({ onAddIncome, categories }) => {
  const [income, setIncome] = useState({
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
    setIncome((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    const { name, amount, date, categoryId } = income;

    if (!name.trim()) {
      toast.error("Income source name is required");
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
      toast.error("Income date cannot be in the future");
      return false;
    }

    return true;
  };

  const handleAddIncome = async (income) => {
    if (loading) return;

    if (!validateForm()) return; // ✅ Validation kontrolü eklendi

    setLoading(true);
    try {
      await onAddIncome(income);

      await new Promise((r) => setTimeout(r, 400));
      toast.success("Income added successfully!");

      setIncome({
        name: "",
        amount: "",
        date: "",
        icon: "",
        categoryId: "",
      });
    } catch (error) {
      console.error("❌ Error adding income:", error);
      toast.error(error?.response?.data?.message || "Failed to add income");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if(categories.length > 0 && !income.categoryId) {
      setIncome((prev) => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories, income.categoryId]);

  return (
    <div className="space-y-5">
      {/* Emoji Selector */}
      <div className="flex items-center gap-3">
        <EmojiPickerPopup
          icon={income.icon}
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />
      </div>

      {/* Income Source */}
      <Input
        value={income.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Income Source"
        placeHolder="e.g. Salary, Freelancing, Bonus"
        type="text"
      />

      {/* Category */}
      <Input
        value={income.categoryId}
        onChange={({ target }) => handleChange("categoryId", target.value)}
        label="Category"
        isSelect={true}
        options={categoryOptions}
      />

      {/* Amount */}
      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeHolder="e.g. 5000"
        type="number"
      />

      {/* Date */}
      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        type="date"
      />

      {/* Submit */}
      <div className="flex justify-end pt-4">
        <button
          onClick={() => handleAddIncome(income)}
          disabled={loading}
          className={`flex items-center justify-center min-w-[130px] px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md
            ${
              loading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 hover:shadow-lg"
            }`}
        >
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              <span className="ml-2">Saving...</span>
            </>
          ) : (
            "Add Income"
          )}
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
