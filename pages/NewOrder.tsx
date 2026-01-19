
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, currentUser } from '../data';
import { MedOrder } from '../types';

import MedicationOrderForm from '../components/MedicationOrderForm';
import LabOrderForm from '../components/LabOrderForm';
import ImagingOrderForm from '../components/ImagingOrderForm';
import ProcedureOrderForm from '../components/ProcedureOrderForm';

const NewOrder: React.FC = () => {
  const navigate = useNavigate();
  // Mock current patient selection - typically would come from URL or context
  const patient = db.getPatients()[0];

  const [orderType, setOrderType] = useState('Medication');

  const [formData, setFormData] = useState({
    medName: '',
    dose: '',
    unit: 'mg',
    route: 'Oral (PO)',
    frequency: 'Once daily'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    if (orderType === 'Medication' && (!formData.medName || !formData.dose)) {
      alert("Please fill in Medication Name and Dosage");
      return;
    }

    // Logic to handle submission for different order types would go here
    console.log("Order Submitted:", { orderType, formData });
    alert(`${orderType} order submitted successfully!`);
    navigate('/dashboard');
  };

  const handleSaveDraft = () => {
    console.log("Order Saved as Draft:", { orderType, formData });
    alert(`${orderType} order saved as a draft!`);
    navigate('/dashboard');
  };

  const renderForm = () => {
    switch (orderType) {
      case 'Medication':
        return <MedicationOrderForm formData={formData} handleChange={handleChange} />;
      case 'Lab':
        return <LabOrderForm />;
      case 'Imaging':
        return <ImagingOrderForm />;
      case 'Procedure':
        return <ProcedureOrderForm />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-8">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap gap-2 mb-4 text-sm">
        <span className="text-gray-500 font-medium hover:underline cursor-pointer" onClick={() => navigate('/dashboard')}>Patients</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-500 font-medium hover:text-blue-600 cursor-pointer" onClick={() => navigate(`/overview/${patient.patient_id}`)}>{patient.first_name} {patient.last_name}</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-semibold">New Order</span>
      </div>

      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-slate-900 text-3xl font-bold mb-1">Create New Order</h1>
        <p className="text-slate-500">Fill in the details below to create a new order for the patient.</p>
      </div>

      {/* Patient Header Bar */}
      <div className="bg-white border border-gray-200 rounded-lg mb-8 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
          <div className="p-4">
            <p className="text-gray-500 text-xs uppercase font-semibold tracking-wider mb-1">Patient Name</p>
            <p className="text-slate-900 font-bold">{patient.first_name} {patient.last_name}</p>
          </div>
          <div className="p-4">
            <p className="text-gray-500 text-xs uppercase font-semibold tracking-wider mb-1">DOB</p>
            <p className="text-slate-900 font-medium">{patient.dob}</p>
          </div>
          <div className="p-4">
            <p className="text-gray-500 text-xs uppercase font-semibold tracking-wider mb-1">MRN</p>
            <p className="text-slate-900 font-medium">{patient.mrn}</p>
          </div>
          <div className="p-4 bg-red-50 rounded-r-lg">
            <p className="text-red-600 text-xs uppercase font-semibold tracking-wider mb-1">Allergies</p>
            <p className="text-red-700 font-bold">{patient.allergies.join(', ') || 'None'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Order Type Selector */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-slate-900 text-lg font-bold mb-4">1. Select Order Type</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['Medication', 'Lab', 'Imaging', 'Procedure'].map((type) => (
                <button 
                  key={type}
                  onClick={() => setOrderType(type)}
                  className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all shadow-sm ${
                    orderType === type
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-500 hover:border-blue-500 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="material-symbols-outlined text-3xl">
                    {type === 'Medication' ? 'medication' : type === 'Lab' ? 'biotech' : type === 'Imaging' ? 'radiology' : 'medical_services'}
                  </span>
                  <span className="font-semibold text-sm">{type}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Order Details Form */}
          {renderForm()}
        </div>

        {/* Right Column: Summary & Actions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-6">
            <h3 className="text-slate-900 text-lg font-bold mb-4">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-gray-500">Order Type</span>
                <span className="text-sm font-semibold text-slate-900">{orderType}</span>
              </div>
              {orderType === 'Medication' && (
                <>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm text-gray-500">Medication</span>
                    <span className="text-sm font-semibold text-slate-900">{formData.medName || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm text-gray-500">Dosage</span>
                    <span className="text-sm font-semibold text-slate-900">{formData.dose} {formData.unit}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm text-gray-500">Route</span>
                    <span className="text-sm font-semibold text-slate-900">{formData.route}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm text-gray-500">Frequency</span>
                    <span className="text-sm font-semibold text-slate-900">{formData.frequency}</span>
                  </div>
                </>
              )}
              
              <div className="border-t border-gray-100 my-4"></div>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 active:scale-95"
                >
                  Sign & Submit for Review
                </button>
                <button 
                  onClick={handleSaveDraft}
                  className="w-full bg-white border border-gray-300 text-slate-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors">Save as Draft</button>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="w-full text-gray-500 font-semibold py-2 px-4 rounded-lg hover:text-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl flex items-start gap-3">
            <span className="material-symbols-outlined text-yellow-600 mt-0.5">warning</span>
            <div>
              <h4 className="font-bold text-yellow-800 text-sm">Clinical Decision Support</h4>
              <p className="text-sm text-yellow-700 mt-1">Duplicate order check: A similar medication order for Rosuvastatin was placed 2 days ago.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
