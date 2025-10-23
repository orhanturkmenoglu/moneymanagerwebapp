import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { Plus } from "lucide-react";
import CategoryList from "../components/CategoryList";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";

const Category = () => {
  useUser();

  const [loading,setLoading] = useState(null);
  const [categoryData,setCategoryData] = useState([]);
  const [openAddCategoryModal,setOpenAddCategoryModal] = useState(false);
  const [openEditCategoryModal,setOpenEditCategoryModal] = useState(false);
  const [selectedCategory,setSelectedCategory] = useState(null);

  const fetchCategoryDetails = async() =>{

    if(loading) return;
    
    setLoading(true);

    try {
      const response = await axiosConfig(API_ENDPOINTS.GET_ALL_CATEGORIES);
      if (response.status === 200) {
        console.log("categories",response.data);
        setCategoryData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong.Please try again.",error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchCategoryDetails();
  },[])

  return (
    <Dashboard activeMenu="Category">
      <div className="my-6 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Üst Başlık + Ekle Butonu */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            All Categories
          </h2>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-purple-700 text-white 
            rounded-lg shadow-sm hover:bg-purple-800 transition-all duration-200"
          >
            <Plus size={16} />
            <span>Add Category</span>
          </button>
        </div>

        {/* Kategori Listesi Alanı */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
          <p className="text-gray-500 text-sm">
            No categories yet. Click “Add Category” to create one.
          </p>
        </div>
        <CategoryList categories = {categoryData} />
      </div>
    </Dashboard>
  );
};

export default Category;
