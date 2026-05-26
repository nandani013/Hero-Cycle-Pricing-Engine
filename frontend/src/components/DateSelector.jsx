import React from 'react';
import { Calendar } from 'lucide-react';

const DateSelector = ({ selectedDate, onDateChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Calendar className="text-primary-500" size={20} />
            Pricing Date
          </h2>
          <p className="text-sm text-slate-500 mt-1">Select a date to fetch historical prices for the components.</p>
        </div>
        <div className="relative">
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-slate-700 bg-slate-50 hover:bg-white transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
