
import React from 'react';

const PatientLabsTab: React.FC = () => {
  // Mock data for lab results
  const labs = [
    { id: 1, date: '2023-11-26', type: 'Complete Blood Count (CBC)', result: 'Normal', status: 'Final' },
    { id: 2, date: '2023-11-25', type: 'Basic Metabolic Panel (BMP)', result: 'Abnormal (High Glucose)', status: 'Final' },
  ];

  return (
    <div className="bg-[#112217] p-5 rounded-xl border border-white/10 shadow-sm">
      <h3 className="text-lg font-bold text-white mb-4">Lab Results</h3>
      {labs.length > 0 ? (
        <div className="space-y-3">
          {labs.map((lab) => (
            <div key={lab.id} className="flex items-center justify-between bg-[#23482f] p-3 rounded-lg border border-[#326744]">
              <div>
                <p className="font-semibold text-white">{lab.type}</p>
                <p className="text-sm text-[#92c9a4]">Result: {lab.result}</p>
                <p className="text-xs text-gray-500">Date: {lab.date} | Status: {lab.status}</p>
              </div>
              <span className="material-symbols-outlined text-white cursor-pointer hover:text-med-green">science</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white/40 italic">No lab results found for this patient.</p>
      )}
    </div>
  );
};

export default PatientLabsTab;
