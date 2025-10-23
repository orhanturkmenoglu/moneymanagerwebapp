import React, { useContext, useRef, useState } from "react";
import { AppContext } from "./../context/AppContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu, User, X } from "lucide-react";
import { assets } from "../assets/asset";

const Menubar = () => {
  const [openSideMenu, setOpenSideMenu] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const { user, clearUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    setShowDropdown(false);
    navigate("/login");
  };
  return (
    <div
      className="flex items-center justify-between
    gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px]
    py-4 px-4 sm:px-7 sticky top-0 z-30"
    >
      {/**left side menu */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => {
            setOpenSideMenu(!openSideMenu);
          }}
          className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors"
        >
          {openSideMenu ? (
            <X className="text-2xl" />
          ) : (
            <Menu className="text-2xl" />
          )}
        </button>
        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="logo" className="h-10 w-10" />
          <span className="text-lg font-medium text-black truncate">
            Money Manager
          </span>
        </div>
      </div>
      {/**right side menu */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center justify-center w-10 h-10 bg-gray-100
        hover:bg-gray-200 rounded-full transition-colors 
        duration-200 focus:outline-none 
        focus:ring-2 focus:ring-purple-800 focus:ring-offset-2"
        >
          <User className="text-purple-500" />
        </button>
        {/** Dropdown menu */}
        {showDropdown && (
          <div
            className=" absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg
                border border-gray py-1 z-50"
          >
            {/** User info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-8 h-8 bg-gray-100
                    rounded-full"
                >
                  <User className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {user.fullName}
                  </p>
                  <p className="text-xs  text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="py-1">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2 
                text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
              >
                <LogOut className="w-4 h-4 text-gray-500" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/**mobile side menu */}
      <span>mobile</span>
    </div>
  );
};

export default Menubar;
