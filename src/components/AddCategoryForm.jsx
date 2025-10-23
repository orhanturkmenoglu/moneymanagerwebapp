import React, { useState } from "react";
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";

const AddCategoryForm = () => {
  const [category, setCategory] = useState({
    name: "",
    type: "income",
    icon: "",
  });

  const categoryOptions = [
    {
      value: "income",
      label: "Income",
    },
    {
      value: "expense",
      label: "Expense",
    },
  ];

  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value });
    console.log(category);
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={category.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={category.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Category Name"
        placeHolder="e.g.,Freelance,Salary,Bonus"
        type="text"
      />

      <Input
        label="Category Type"
        value={category.type}
        onChange={({ target }) => handleChange("type", target.value)}
        isSelect={true}
        options={categoryOptions}
      />
    </div>
  );
};

export default AddCategoryForm;
