import { X } from "lucide-react";
import React from "react";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl mx-4 transform transition-transform duration-300 scale-95 animate-scaleUp">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Modal body */}
          <div className="p-6 bg-white">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
