
import React from 'react';

const PatientAppointmentsTab: React.FC = () => {
  // Mock data for appointments
  const appointments = [
    { id: 1, type: 'Cardiology Consult', date: '2023-11-28', time: '14:00', provider: 'Dr. Carter', location: 'Clinic 1, Room 302' },
    { id: 2, type: 'Physical Therapy', date: '2023-11-29', time: '10:00', provider: 'PT Sarah', location: 'Rehab Gym' },
  ];

  return (
    <div className="bg-[#112217] p-5 rounded-xl border border-white/10 shadow-sm">
      <h3 className="text-lg font-bold text-white mb-4">Appointments</h3>
      {appointments.length > 0 ? (
        <div className="space-y-3">
          {appointments.map((appt) => (
            <div key={appt.id} className="flex items-center justify-between bg-[#23482f] p-3 rounded-lg border border-[#326744]">
              <div>
                <p className="font-semibold text-white">{appt.type}</p>
                <p className="text-sm text-[#92c9a4]">{appt.date} at {appt.time} with {appt.provider}</p>
                <p className="text-xs text-gray-500">{appt.location}</p>
              </div>
              <span className="material-symbols-outlined text-white cursor-pointer hover:text-med-green">event_note</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white/40 italic">No upcoming appointments for this patient.</p>
      )}
    </div>
  );
};

export default PatientAppointmentsTab;
