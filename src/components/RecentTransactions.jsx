import { ArrowRight } from "lucide-react";
import React from "react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const RecentTransactions = ({ transactions, onMore }) => {
  return (
    <div className="card bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Recent Transactions</h4>
        <button
          className="flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-800 transition"
          onClick={onMore}
        >
          More <ArrowRight size={16} />
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {transactions?.length > 0 ? (
          transactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item.id}
              title={item.name}
              icon={item.icon}
              date={moment(item.date).format("DD-MMM-YYYY")}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn
            />
          ))
        ) : (
          <p className="text-gray-400 text-sm">
            No transactions available. Apply filters to see transactions.
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
