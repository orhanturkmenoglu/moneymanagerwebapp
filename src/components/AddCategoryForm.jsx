import React, { useEffect, useState } from "react";
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { LoaderCircle } from "lucide-react";

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }) => {
  const [category, setCategory] = useState({
    name: "",
    type: "income",
    icon: "",
  });

  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onAddCategory(category);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEditing && initialCategoryData) {
      setCategory(initialCategoryData);
    } else {
      setCategory({
        name: "",
        type: "income",
        icon: "",
      });
    }
  }, [isEditing, initialCategoryData]);

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

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`
      flex items-center gap-2 px-5 py-2
      bg-purple-600 text-white font-medium rounded-lg shadow-md
      hover:bg-purple-700 hover:scale-105
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `}
        >
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              {isEditing ? "Updating..." : "Adding..."}
            </>
          ) : (
            <>{isEditing ? "Update Category" : "Add Category"}</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddCategoryForm;
