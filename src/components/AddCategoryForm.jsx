import React, { useState } from "react";
import Input from "./Input";

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

  const handleChange = (key,value)=>{
    setCategory({...category,[key]:value})
  }

  return (
    <div>
      <Input 
      value={category.name}
      onChange={(target)=>handleChange("name",target.value)}
      label="Category Name"
      placeHolder="e.g.,Freelance,Salary,Bonus"
      type="text" />
    </div>
  );
};

export default AddCategoryForm;
