import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "./../context/AppContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu, User, X } from "lucide-react";
import { assets } from "../assets/asset";
import Sidebar from "./Sidebar";
import { motion, AnimatePresence } from "framer-motion";

const Menubar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { user, clearUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    setShowDropdown(false);
    navigate("/login");
  };

  // Dış tıklama ile dropdown kapatma
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  return (
    <div
      className="flex items-center justify-between gap-5 bg-white/90 backdrop-blur-lg
      border-b border-gray-200/50 px-4 sm:px-7 py-3 sticky top-0 z-30 shadow-sm"
    >
      {/* 🔹 Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setOpenSideMenu((prev) => !prev)}
          className="block lg:hidden text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition"
        >
          {openSideMenu ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        <div className="flex items-center justify-center bg-gradient-to-tr from-purple-100 to-purple-50 p-2 rounded-2xl shadow-sm ring-1 ring-gray-100">
          <img
            src={assets.logo}
            alt="Money Manager Logo"
            className="h-8 w-8 object-contain"
          />
        </div>
        <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
          <span className="text-purple-600 font-bold">Money</span> Manager
        </h1>
      </div>

      {/* 🔹 Right Section */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          className="flex items-center justify-center w-10 h-10 bg-purple-50
          hover:bg-purple-100 rounded-full transition-colors 
          focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1"
        >
          <User className="text-purple-600" />
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl
              border border-gray-100 overflow-hidden z-50"
            >
              {/* User Info */}
              <div className="px-4 py-3 bg-purple-50/60 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 bg-white rounded-full shadow-sm">
                    <User className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Actions */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2.5 
                text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
              >
                <LogOut className="w-4 h-4 text-gray-500" />
                <span>Logout</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🔹 Mobile Sidebar */}
      <AnimatePresence>
        {openSideMenu && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 right-0 bg-white border-b border-gray-200 lg:hidden
            z-20 top-[64px] shadow-md"
          >
            <Sidebar activeMenu={activeMenu} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menubar;
