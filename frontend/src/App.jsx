import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DateSelector from './components/DateSelector';
import Configurator from './components/Configurator';
import PricingSummary from './components/PricingSummary';
import { AlertCircle } from 'lucide-react';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedComponents, setSelectedComponents] = useState({
    frame: { frameType: 'steel' },
    handleBarBrakes: { handleBar: 'standard', brakes: 'v_brakes' },
    seating: { saddle: 'basic' },
    wheels: { rim: 'rim-standard', tyreType: 'tyre-standard', spokes: 'spokes-standard' },
    chainAssembly: { gears: 'single' }
  });
  
  const [pricing, setPricing] = useState({ breakdown: {}, total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [saveStatus, setSaveStatus] = useState('idle');
  const [apiError, setApiError] = useState('');

  // API error alert above main content
  const apiErrorAlert = apiError && (
    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2 text-red-700 text-sm">
      <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
      <p>{apiError}</p>
    </div>
  );

  const handleComponentChange = (category, fieldId, value) => {
    setSelectedComponents(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [fieldId]: value
      }
    }));
  };

  // Validation Logic
  useEffect(() => {
    const errors = {};
    const wheels = selectedComponents.wheels;
    
    // Rule: Tubeless tyre requires compatible rim
    if (wheels.tyreType === 'tubeless_tyre' && wheels.rim !== 'tubeless_compatible') {
      errors.wheels = "Invalid combination: Tubeless tyre requires a Tubeless Compatible Rim.";
    }
    
    setValidationErrors(errors);
  }, [selectedComponents]);

  const hasErrors = Object.keys(validationErrors).length > 0;

  // Save configuration handler
  const handleSave = () => {
    setSaveStatus('saving');
    const config = {
      date: selectedDate,
      components: selectedComponents
    };
    try {
      localStorage.setItem('heroCycleConfig', JSON.stringify(config));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (e) {
      console.error('Failed to save config', e);
      setSaveStatus('idle');
    }
  };

  useEffect(() => {
    // Prevent fetching if there are validation errors
    if (hasErrors) {
      return;
    }
    
    const fetchPricing = async () => {
      setIsLoading(true);
      try {
        // Flatten selected component options into an array of part IDs
        const partIds = Object.values(selectedComponents)
          .flatMap(category => Object.values(category))
          .filter(Boolean);

        const response = await fetch('http://localhost:5001/api/calculate-price', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            date: selectedDate,
            parts: partIds
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          setPricing(data);
          setApiError(''); // clear previous errors
        } else {
          const err = await response.json();
          console.error('Failed to fetch pricing', err);
          setApiError(err.error || 'Failed to fetch pricing');
        }
      } catch (error) {
        console.error('Error connecting to server:', error);
        setApiError(error.message || 'Connection error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPricing();
  }, [selectedDate, selectedComponents, hasErrors]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header />
      {apiErrorAlert}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Form controls */}
          <div className="lg:col-span-8">
            <DateSelector 
              selectedDate={selectedDate} 
              onDateChange={setSelectedDate} 
            />
            <Configurator 
              selectedComponents={selectedComponents} 
              onComponentChange={handleComponentChange} 
              validationErrors={validationErrors}
            />
          </div>
          
          {/* Right Column - Summary */}
          <div className="lg:col-span-4">
            <PricingSummary 
              pricing={pricing}
              selectedDate={selectedDate}
              isLoading={isLoading} 
              hasErrors={hasErrors}
              onSave={handleSave}
              saveStatus={saveStatus}
            />
          </div>
          
        </div>
      </main>
    </div>
  );
}

export default App;
