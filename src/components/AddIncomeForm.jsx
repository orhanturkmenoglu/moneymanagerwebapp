import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";

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
    setIncome({ ...income, [key]: value });
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={income.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Income Source"
        placeHolder="e.g. Salary, Freelancing,Bonus"
        type="text"
      />

      <Input
        value={income.categoryId}
        onChange={({ target }) => handleChange("categoryId", target.value)}
        label="Category"
        isSelect={true}
        options={categoryOptions}
      />
      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeHolder="e.g. 5000"
        type="number"
      />
        <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeHolder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button onClick={()=>onAddIncome(income)} 
        className="add-btn add-btn-fill" >
            Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
