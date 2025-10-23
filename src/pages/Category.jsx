import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { Plus } from "lucide-react";
import CategoryList from "../components/CategoryList";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";

const Category = () => {
  useUser();

  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategoryDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      if (response.status === 200) {
        setCategoryData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong. Please try again.", error);
      toast.error(error?.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  return (
    <Dashboard activeMenu="Category">
      <div className="my-6 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">All Categories</h2>
          <button
            onClick={() => setOpenAddCategoryModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-700 text-white rounded-lg shadow-sm hover:bg-purple-800 transition-all duration-200"
          >
            <Plus size={16} />
            <span>Add Category</span>
          </button>
        </div>

        {/* Kategori Listesi */}
        <CategoryList
          categories={categoryData}
        />

        {/* Modal */}
          <Modal 
          isOpen={openAddCategoryModal}
          onClose={()=>setOpenAddCategoryModal(false)}
          title="Add Category">
            <AddCategoryForm/>
          </Modal>
      
      </div>
    </Dashboard>
  );
};

export default Category;
