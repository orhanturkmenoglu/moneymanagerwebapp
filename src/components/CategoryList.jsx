import { Layers2, Pencil } from "lucide-react";
import React from "react";

const CategoryList = ({ categories, onEditCategory, onDeleteCategory }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm py-4 px-5">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-800">Category Sources</h4>
      </div>

      {/* Category list */}
      {categories.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No categories added yet. Add some to get started!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="w-12 h-12 flex items-center justify-center text-gray-800 bg-gray-100 rounded-full">
                {category.icon ? (
                  <img
                    className="h-5 w-5"
                    src={category.icon}
                    alt={category.name}
                  />
                ) : (
                  <Layers2 className="text-purple-800" size={24} />
                )}
              </div>

              {/* category details */}
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700 font-medium">
                    {category.name}
                  </p>
                  <p className="text-sm text-gray-400 mt-1 capitalize">
                    {category.type}
                  </p>
                </div>

                {/* action buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEditCategory && onEditCategory(category)}
                    className="text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                  >
                    <Pencil size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
