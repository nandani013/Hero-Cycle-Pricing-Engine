import React from 'react';
import { Settings2 } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-primary-600 p-2 rounded-lg text-white">
            <Settings2 size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Hero Cycle</h1>
            <p className="text-sm font-medium text-slate-500">Pricing Engine & Configurator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
