
import React from 'react';

interface MedicationFormData {
  medName: string;
  dose: string;
  unit: string;
  route: string;
  frequency: string;
}

interface MedicationOrderFormProps {
  formData: MedicationFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const MedicationOrderForm: React.FC<MedicationOrderFormProps> = ({ formData, handleChange }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-slate-900 text-lg font-bold mb-6">2. Enter Order Details</h2>
      <div className="space-y-6">
        <div className="relative">
          <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="medName">Medication Name</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 pointer-events-none">search</span>
            <input 
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400 transition-shadow" 
              id="medName" 
              placeholder="Search for medication (e.g., Atorvastatin)" 
              type="text"
              value={formData.medName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="dose">Dosage</label>
            <input 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              id="dose" 
              placeholder="e.g., 20" 
              type="text"
              value={formData.dose}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="unit">Unit</label>
            <select 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white" 
              id="unit"
              value={formData.unit}
              onChange={handleChange}
            >
              <option>mg</option>
              <option>g</option>
              <option>mcg</option>
              <option>mL</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="route">Route</label>
            <select 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white" 
              id="route"
              value={formData.route}
              onChange={handleChange}
            >
              <option>Oral (PO)</option>
              <option>Intravenous (IV)</option>
              <option>Intramuscular (IM)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="frequency">Frequency</label>
            <select 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white" 
              id="frequency"
              value={formData.frequency}
              onChange={handleChange}
            >
              <option>Once daily</option>
              <option>Twice daily (BID)</option>
              <option>Every 6 hours (Q6H)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="indication">Indication / Reason for Order</label>
          <input className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" id="indication" placeholder="e.g., Hyperlipidemia" type="text"/>
        </div>
      </div>
    </div>
  );
};

export default MedicationOrderForm;
