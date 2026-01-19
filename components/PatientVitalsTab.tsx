
import React from 'react';

const PatientVitalsTab: React.FC = () => {
  // Mock data for vitals
  const vitals = [
    { id: 1, date: '2023-11-27', time: '12:00', bp: '120/80', hr: '72', temp: '98.6°F', resp: '16', spo2: '98%' },
    { id: 2, date: '2023-11-27', time: '08:00', bp: '122/82', hr: '70', temp: '98.4°F', resp: '18', spo2: '97%' },
  ];

  return (
    <div className="bg-[#112217] p-5 rounded-xl border border-white/10 shadow-sm">
      <h3 className="text-lg font-bold text-white mb-4">Vital Signs</h3>
      {vitals.length > 0 ? (
        <div className="space-y-4">
          {vitals.map((vital) => (
            <div key={vital.id} className="bg-[#23482f] p-4 rounded-lg border border-[#326744]">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-white">{vital.date} {vital.time}</p>
                <span className="material-symbols-outlined text-white cursor-pointer hover:text-med-green">more_vert</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-[#92c9a4]">
                <p>BP: <span className="font-semibold text-white">{vital.bp}</span></p>
                <p>HR: <span className="font-semibold text-white">{vital.hr} bpm</span></p>
                <p>Temp: <span className="font-semibold text-white">{vital.temp}</span></p>
                <p>Resp: <span className="font-semibold text-white">{vital.resp} rpm</span></p>
                <p>SpO2: <span className="font-semibold text-white">{vital.spo2}</span></p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white/40 italic">No vital signs recorded for this patient.</p>
      )}
    </div>
  );
};

export default PatientVitalsTab;
