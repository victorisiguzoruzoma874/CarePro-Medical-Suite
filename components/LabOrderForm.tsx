
import React from 'react';

const LabOrderForm: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-slate-900 text-lg font-bold mb-6">2. Enter Lab Order Details</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="labTest">Lab Test Name</label>
          <input 
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            id="labTest" 
            placeholder="e.g., Complete Blood Count (CBC)" 
            type="text"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="diagnosis">Diagnosis/Indication</label>
          <input 
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            id="diagnosis" 
            placeholder="e.g., Anemia" 
            type="text"
          />
        </div>
      </div>
    </div>
  );
};

export default LabOrderForm;
