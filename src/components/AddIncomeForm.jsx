import React, { useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import Input from "./Input";

const AddIncomeForm = ({ onAddIncome, categories }) => {
  const [income, setIncome] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: "",
  });

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleChange = (key, value) => {
    setIncome((prev) => ({ ...prev, [key]: value }));
  };

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
          onClick={() => onAddIncome(income)}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm 
                     hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all duration-200"
        >
          + Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
