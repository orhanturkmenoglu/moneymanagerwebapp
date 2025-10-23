import React from "react";
import Dashboard from '../components/Dashboard'
import { useUser } from "../hooks/useUser";

const Category = () => {
  useUser();
  return <Dashboard activeMenu="Category">This Category page</Dashboard>;
};

export default Category;
