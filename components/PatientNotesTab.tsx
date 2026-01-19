
import React from 'react';

const PatientNotesTab: React.FC = () => {
  // Mock data for notes
  const notes = [
    { id: 1, author: 'Dr. Emily Carter', date: '2023-11-27', time: '10:00', content: 'Patient stable, responding well to treatment. Continue current medication regimen.' },
    { id: 2, author: 'Nurse Sarah', date: '2023-11-27', time: '08:30', content: 'Patient reported mild pain (3/10) this morning. Administered pain medication as ordered.' },
  ];

  return (
    <div className="bg-[#112217] p-5 rounded-xl border border-white/10 shadow-sm">
      <h3 className="text-lg font-bold text-white mb-4">Clinical Notes</h3>
      {notes.length > 0 ? (
        <div className="space-y-4">
          {notes.map((note) => (
            <div key={note.id} className="bg-[#23482f] p-4 rounded-lg border border-[#326744]">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-white">{note.author}</p>
                <p className="text-sm text-gray-500">{note.date} {note.time}</p>
              </div>
              <p className="text-sm text-[#92c9a4]">{note.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white/40 italic">No clinical notes found for this patient.</p>
      )}
    </div>
  );
};

export default PatientNotesTab;
