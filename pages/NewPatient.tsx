
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, currentUser } from '../data';
import { Patient } from '../types';

const NewPatient: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    mrn: '',
    gender: 'M',
    room: '',
    diagnosis: '',
    status: 'Stable',
    allergies: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.mrn) {
      alert("Please fill in required fields (Name, MRN)");
      return;
    }

    const newPatient: Patient = {
      patient_id: `p-${Date.now()}`,
      mrn: formData.mrn,
      first_name: formData.firstName,
      last_name: formData.lastName,
      dob: formData.dob || '1980-01-01',
      gender: formData.gender as 'M' | 'F',
      room: formData.room,
      primary_provider_id: currentUser.user_id,
      allergies: formData.allergies ? formData.allergies.split(',').map(s => s.trim()) : [],
      diagnosis: formData.diagnosis,
      status: formData.status as any,
      created_at: new Date().toISOString(),
      // Use a placeholder avatar
      avatar_url: 'https://ui-avatars.com/api/?name=' + formData.firstName + '+' + formData.lastName + '&background=random',
      outstanding_tasks: [{ type: 'none', description: 'No outstanding tasks', overdue: false }],
      code_status: 'Full Code'
    };

    db.addPatient(newPatient);
    navigate('/dashboard');
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-8">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap gap-2 mb-4 text-sm">
        <span className="text-gray-500 font-medium hover:underline cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-semibold">New Patient</span>
      </div>

      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-slate-900 text-3xl font-bold mb-1">Admit New Patient</h1>
        <p className="text-slate-500">Register a new patient into the CarePro system.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-slate-900 text-lg font-bold mb-6">Patient Demographics</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="firstName">First Name *</label>
                  <input 
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    id="firstName" 
                    placeholder="e.g., John" 
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="lastName">Last Name *</label>
                  <input 
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    id="lastName" 
                    placeholder="e.g., Doe" 
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="mrn">MRN *</label>
                  <input 
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    id="mrn" 
                    placeholder="e.g., MRN-123456" 
                    type="text"
                    value={formData.mrn}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="dob">Date of Birth</label>
                  <input 
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    id="dob" 
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="gender">Gender</label>
                  <select 
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white" 
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                </div>
                <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="allergies">Allergies</label>
                   <input 
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    id="allergies" 
                    placeholder="e.g. Penicillin, Peanuts (comma separated)" 
                    type="text"
                    value={formData.allergies}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-slate-900 text-lg font-bold mb-6">Admission Details</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="room">Room Number</label>
                  <input 
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    id="room" 
                    placeholder="e.g., 301A" 
                    type="text"
                    value={formData.room}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="status">Triage Status</label>
                  <select 
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white" 
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Stable">Stable</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Discharge Pending">Discharge Pending</option>
                    <option value="Observation">Observation</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="diagnosis">Admitting Diagnosis</label>
                <input 
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    id="diagnosis" 
                    placeholder="e.g., Pneumonia" 
                    type="text"
                    value={formData.diagnosis}
                    onChange={handleChange}
                  />
              </div>
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-6">
            <h3 className="text-slate-900 text-lg font-bold mb-4">Actions</h3>
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 active:scale-95"
              >
                Admit Patient
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="w-full bg-white border border-gray-300 text-slate-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
            <div className="mt-6 text-xs text-gray-500">
                <p>By clicking "Admit Patient", a new patient record will be created and added to the active dashboard list.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPatient;
