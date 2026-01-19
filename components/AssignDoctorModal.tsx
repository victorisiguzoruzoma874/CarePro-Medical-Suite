
import React, { useState } from 'react';

interface AssignDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
}

const AssignDoctorModal: React.FC<AssignDoctorModalProps> = ({ isOpen, onClose, patientName }) => {
  const [selectedDoctor, setSelectedDoctor] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (selectedDoctor) {
      console.log(`Assign ${selectedDoctor} to ${patientName}`);
      alert(`${selectedDoctor} assigned to ${patientName}!`);
      setSelectedDoctor('');
      onClose();
    } else {
      alert('Please select a doctor.');
    }
  };

  // Mock list of doctors
  const doctors = ['Dr. Emily Carter (Cardiology)', 'Dr. John Smith (Pediatrics)', 'Dr. Sarah Lee (Neurology)'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-xl transform transition-all">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Assign Doctor to {patientName}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <span className="material-symbols-outlined text-gray-600">close</span>
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="doctorSelect" className="block text-sm font-medium text-gray-700">Select Doctor</label>
            <select
              id="doctorSelect"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 bg-white"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              <option value="">-- Select a Doctor --</option>
              {doctors.map((doctor, index) => (
                <option key={index} value={doctor}>{doctor}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Assign Doctor
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignDoctorModal;
