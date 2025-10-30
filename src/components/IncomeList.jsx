import { Download, LoaderCircle, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { useState } from "react";

const IncomeList = ({ transactions, onDelete, onDownload, onEmail }) => {
  const [loading, setLoading] = useState(false);

  const handleEmail = async () => {
    setLoading(true);
    try {
      await onEmail();
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      await onDownload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 transition-all hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-semibold text-gray-800 tracking-tight flex items-center gap-2">
          💰 Income Sources
          <span className="text-xs text-gray-500 font-normal">
            ({transactions.length})
          </span>
        </h5>

        <div className="flex items-center gap-2">
          <button
            disabled={loading}
            onClick={handleEmail}
            className="flex items-center gap-2 text-sm font-medium text-green-700 bg-green-50 px-3.5 py-2 rounded-xl hover:bg-green-100 hover:text-green-800 transition-all"
          >
            {loading ? (
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

          <button
            disabled={loading}
            onClick={handleDownload}
            className="flex items-center gap-2 text-sm font-medium text-green-700 bg-green-50 px-3.5 py-2 rounded-xl hover:bg-green-100 hover:text-green-800 transition-all"
          >
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download size={15} className="text-base" />
              </>
            )}
            Download
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mb-3"></div>

      {/* Transaction List */}
      <div className="space-y-3">
        {transactions.length > 0 ? (
          transactions.map((income) => (
            <TransactionInfoCard
              key={income.id}
              title={income.name}
              icon={income.icon}
              date={moment(income.date).format("DD MMM, YYYY")}
              amount={income.amount}
              type="income"
              onDelete={() => onDelete(income.id)}
            />
          ))
        ) : (
          <div className="text-center py-6 text-gray-400 text-sm italic">
            No income records found.
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeList;
