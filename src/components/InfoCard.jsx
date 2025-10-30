import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-5 bg-gradient-to-br from-white to-gray-50 p-5 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      <div
        className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-2xl shadow-md`}
      >
        {icon}
      </div>

      <div className="flex flex-col">
        <h6 className="text-sm font-medium text-gray-500 tracking-wide uppercase">
          {label}
        </h6>
        <span className="text-[22px] font-semibold text-gray-800 mt-1">
          &#8377;{value?.toLocaleString("tr-TR")}
        </span>
      </div>
    </div>
  );
};

export default InfoCard;
