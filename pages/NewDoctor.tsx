
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewDoctor: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    specialty: '',
    phone: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.specialty) {
      alert("Please fill in required fields (First Name, Last Name, Specialty)");
      return;
    }

    // In a real application, you would handle the form submission, 
    // e.g., send the data to a server.
    console.log("New Doctor Data:", formData);
    alert("New doctor added successfully! (See console for data)");
    navigate('/dashboard');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap gap-2 mb-4 text-sm">
        <span className="text-gray-500 font-medium hover:underline cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-semibold">Add New Doctor</span>
      </div>

      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-slate-900 text-3xl font-bold mb-1">Add a New Doctor</h1>
        <p className="text-slate-500">Register a new doctor into the CarePro system.</p>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-slate-900 text-lg font-bold mb-6">Doctor Information</h2>
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
              <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="specialty">Specialty *</label>
              <input 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                id="specialty" 
                placeholder="e.g., Cardiology" 
                type="text"
                value={formData.specialty}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="phone">Phone Number</label>
              <input 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                id="phone" 
                placeholder="e.g., (123) 456-7890"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="email">Email Address</label>
            <input 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              id="email" 
              placeholder="e.g., j.doe@hospital.com" 
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-3">
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-white border border-gray-300 text-slate-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 active:scale-95"
          >
            Add Doctor
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewDoctor;
