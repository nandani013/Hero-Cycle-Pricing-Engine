import React from 'react';
import { Layers, AlertCircle } from 'lucide-react';

const CATEGORIES = {
  frame: {
    label: '1. Frame',
    fields: [
      {
        id: 'frameType',
        label: 'Frame Type',
        options: [
          { value: 'steel', label: 'Steel Frame' },
          { value: 'aluminium', label: 'Aluminium Frame' }
        ]
      }
    ]
  },
  handleBarBrakes: {
    label: '2. Handle Bar & Brakes',
    fields: [
      {
        id: 'handleBar',
        label: 'Handle Bar',
        options: [
          { value: 'standard', label: 'Standard Handlebar' }
        ]
      },
      {
        id: 'brakes',
        label: 'Brakes',
        options: [
          { value: 'v_brakes', label: 'V Brakes' },
          { value: 'disc', label: 'Disc Brakes' }
        ]
      }
    ]
  },
  seating: {
    label: '3. Seating',
    fields: [
      {
        id: 'saddle',
        label: 'Saddle',
        options: [
          { value: 'basic', label: 'Basic Saddle' },
          { value: 'ergonomic', label: 'Ergonomic Saddle' }
        ]
      }
    ]
  },
  wheels: {
    label: '4. Wheels',
    fields: [
      {
        id: 'rim',
        label: 'Rim',
        options: [
          { value: 'rim-standard', label: 'Standard Rim' },
          { value: 'tubeless_compatible', label: 'Tubeless Compatible Rim' }
        ]
      },
      {
        id: 'tyreType',
        label: 'Tyre Type',
        options: [
          { value: 'tube', label: 'Tube' },
          { value: 'tyre-standard', label: 'Standard Tyre' },
          { value: 'tubeless_tyre', label: 'Tubeless Tyre' }
        ]
      },
      {
        id: 'spokes',
        label: 'Spokes',
        options: [
          { value: 'spokes-standard', label: 'Standard Spokes' }
        ]
      }
    ]
  },
  chainAssembly: {
    label: '5. Chain Assembly',
    fields: [
      {
        id: 'gears',
        label: 'Gears',
        options: [
          { value: 'single', label: 'Single Speed Chain' },
          { value: '4_gear', label: '4 Gear Assembly' },
          { value: '7_gear', label: '7 Gear Assembly' }
        ]
      }
    ]
  }
};

const Configurator = ({ selectedComponents, onComponentChange, validationErrors }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Layers className="text-primary-500" size={24} />
        Cycle Components Configuration
      </h2>
      
      <div className="space-y-8">
        {Object.entries(CATEGORIES).map(([categoryKey, categoryData]) => (
          <div key={categoryKey} className="border border-slate-100 rounded-lg p-5 bg-slate-50/50">
            <h3 className="text-md font-semibold text-slate-800 tracking-wide mb-4">
              {categoryData.label}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryData.fields.map((field) => {
                const value = selectedComponents[categoryKey]?.[field.id] || '';
                return (
                  <div key={field.id} className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      {field.label}
                    </label>
                    <select
                      value={value}
                      onChange={(e) => onComponentChange(categoryKey, field.id, e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-slate-700 transition-shadow"
                    >
                      {field.options.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )
              })}
            </div>
            {validationErrors && validationErrors[categoryKey] && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2 text-red-700 text-sm">
                <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                <p>{validationErrors[categoryKey]}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Configurator;
