import React from 'react';
import { Tag, Calendar } from 'lucide-react';

const PricingSummary = ({ pricing, selectedDate, isLoading, hasErrors, onSave, saveStatus }) => {
  return (
    <div className="bg-slate-900 rounded-xl shadow-xl border border-slate-800 text-white overflow-hidden sticky top-24">
      <div className="p-6 bg-slate-800/50 border-b border-slate-700">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Tag className="text-primary-400" size={24} />
          Price Summary
        </h2>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 pb-4 border-b border-slate-700/50">
          <Calendar size={16} />
          <span>Pricing Date: <strong className="text-slate-200">{selectedDate}</strong></span>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8 min-h-[160px]">
              {Object.entries(pricing?.breakdown || {}).map(([category, price], idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">
                    {category}
                  </span>
                  <span className="font-medium flex items-center">
                    ₹{price.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
              {(!pricing?.breakdown || Object.keys(pricing.breakdown).length === 0) && (
                <div className="text-slate-400 text-sm italic text-center mt-8">
                  Select components to see pricing
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-slate-700">
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-sm text-slate-400 mb-1">TOTAL</div>
                  <div className="text-3xl font-bold text-white flex items-center">
                    ₹{(pricing?.total || 0).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>
            
            <button 
               onClick={onSave}
               disabled={hasErrors || isLoading || saveStatus === 'saving'}
               className={`w-full mt-6 font-semibold py-3 px-4 rounded-lg transition-colors shadow-lg
                 ${hasErrors 
                   ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                   : saveStatus === 'saved' 
                     ? 'bg-primary-600 text-white' 
                     : 'bg-primary-600 hover:bg-primary-500 text-white shadow-primary-500/30'
                 }`}
             >
               {hasErrors ? 'Fix Errors to Save' : saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved! ✅' : 'Save Configuration'}
             </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PricingSummary;
