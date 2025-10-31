import { Download, LoaderCircle, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { useState } from "react";

const ExpenseList = ({ transactions, onDelete, onDownload, onEmail }) => {
  const [emailLoading, setEmailLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const handleEmail = async () => {
    if (emailLoading) return;
    setEmailLoading(true);
    try {
      await onEmail();
    } finally {
      setEmailLoading(false);
    }
  };

  const handleDownload = async () => {
    if (downloadLoading) return;
    setDownloadLoading(true);
    try {
      await onDownload();
    } finally {
      setDownloadLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 transition-all hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-semibold text-gray-800 tracking-tight flex items-center gap-2">
          💸 Expenses
          <span className="text-xs text-gray-500 font-normal">
            ({transactions.length})
          </span>
        </h5>

        <div className="flex items-center gap-2">
          {/* Email Button */}
          <button
            disabled={emailLoading}
            onClick={handleEmail}
            className={`flex items-center gap-2 text-sm font-medium px-3.5 py-2 rounded-xl transition-all ${
              emailLoading
                ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                : "text-red-700 bg-red-50 hover:bg-red-100 hover:text-red-800"
            }`}
          >
            {emailLoading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Emailing...
              </>
            ) : (
              <>
                <Mail size={16} className="text-base" />
                Email
              </>
            )}
          </button>

          {/* Download Button */}
          <button
            disabled={downloadLoading}
            onClick={handleDownload}
            className={`flex items-center gap-2 text-sm font-medium px-3.5 py-2 rounded-xl transition-all ${
              downloadLoading
                ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                : "text-red-700 bg-red-50 hover:bg-red-100 hover:text-red-800"
            }`}
          >
            {downloadLoading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download size={15} className="text-base" />
                Download
              </>
            )}
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mb-3"></div>

      {/* Transaction List */}
      <div className="space-y-3">
        {transactions.length > 0 ? (
          transactions.map((expense) => (
            <TransactionInfoCard
              key={expense.id}
              title={expense.name}
              icon={expense.icon}
              date={moment(expense.date).format("DD MMM, YYYY")}
              amount={expense.amount}
              type="expense"
              onDelete={() => onDelete(expense.id)}
            />
          ))
        ) : (
          <div className="text-center py-6 text-gray-400 text-sm italic">
            No expense records found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
