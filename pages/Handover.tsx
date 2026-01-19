
import React, { useState } from 'react';
import { db } from '../data';
import { Patient } from '../types';

const Handover: React.FC = () => {
  const allPatients = db.getPatients();
  const [selectedPatientId, setSelectedPatientId] = useState<string>(allPatients[0]?.patient_id);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedPatient = allPatients.find(p => p.patient_id === selectedPatientId) || allPatients[0];

  const filteredPatients = allPatients.filter(p => 
    p.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-full max-h-screen overflow-hidden bg-[#112217]">
      {/* SideNavBar / Patient List Panel */}
      <aside className="w-80 flex-shrink-0 border-r border-[#23482f] bg-[#112217] flex flex-col z-20 shadow-xl">
        <div className="p-4 border-b border-[#23482f]">
          <h2 className="text-white text-lg font-bold mb-4">Patient Handover</h2>
          <label className="flex flex-col h-10 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-[#23482f] bg-[#193322] focus-within:border-med-green/50 transition-colors">
              <div className="text-[#92c9a4] flex items-center justify-center pl-3">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input 
                className="flex w-full min-w-0 flex-1 bg-transparent text-white focus:outline-none placeholder:text-[#92c9a4]/50 px-3 text-sm" 
                placeholder="Search by name or room..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </label>
        </div>
        <div className="flex-grow overflow-y-auto p-2 space-y-1">
          {filteredPatients.map((p) => (
            <div 
              key={p.patient_id}
              onClick={() => setSelectedPatientId(p.patient_id)}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer border transition-all ${
                selectedPatientId === p.patient_id 
                  ? 'bg-[#1e3a29] border-med-green/50 shadow-md' 
                  : 'border-transparent hover:bg-[#193322]'
              }`}
            >
              <span className={`material-symbols-outlined text-[10px] ${
                p.status === 'Urgent' ? 'text-urgent fill' : 
                p.status === 'Stable' ? 'text-stable fill' : 
                p.status === 'Discharge Pending' ? 'text-warning fill' : 'text-gray-400 fill'
              }`}>circle</span>
              <div className="flex flex-col w-full">
                <p className="text-white text-sm font-medium leading-normal">{p.first_name} {p.last_name}, Rm {p.room}</p>
                <p className="text-[#92c9a4] text-xs">{p.diagnosis}</p>
              </div>
            </div>
          ))}
          {filteredPatients.length === 0 && (
            <div className="p-4 text-center text-[#92c9a4] text-sm">No patients found.</div>
          )}
        </div>
        <div className="p-4 border-t border-[#23482f]">
           <button className="w-full bg-[#005A9C] text-white font-bold py-2 rounded-lg hover:bg-[#004a80] transition-colors shadow-lg shadow-blue-900/20 active:scale-95">Create Signout</button>
        </div>
      </aside>

      {/* Main Content / Patient Detail View */}
      <section className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
        <div className="max-w-5xl mx-auto pb-10">
          {selectedPatient ? (
            <>
              {/* Patient Banner */}
              <div className="flex flex-wrap justify-between gap-3 p-6 mb-8 rounded-xl bg-[#193322] border border-[#23482f] shadow-sm">
                <div className="flex flex-col gap-2">
                  <p className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                    {selectedPatient.first_name} {selectedPatient.last_name}, 45F
                  </p>
                  <p className="text-[#92c9a4] text-base font-normal">
                    Allergies: {selectedPatient.allergies.join(', ') || 'None'}. Code Status: {selectedPatient.code_status || 'Full Code'}.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Problem List */}
                <div className="bg-[#193322] rounded-xl border border-[#23482f] overflow-hidden">
                  <h2 className="text-white text-lg font-bold px-5 py-4 border-b border-[#23482f]">Problem List</h2>
                  <div className="p-5 flex flex-col gap-5">
                    {/* Mocked Clinical Data for Demo Look & Feel */}
                    <div className="flex items-start gap-3">
                      <span className="text-sm font-bold text-urgent mt-0.5">1.</span>
                      <div className="flex-1">
                        <p className="text-gray-200 font-medium">Acute Coronary Syndrome</p>
                        <p className="text-xs text-gray-400">Ongoing chest pain, awaiting troponin results.</p>
                      </div>
                      <div className="text-xs font-semibold text-urgent bg-urgent/10 px-2 py-0.5 rounded-full border border-urgent/20">High</div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-sm font-bold text-warning mt-0.5">2.</span>
                      <div className="flex-1">
                        <p className="text-gray-200 font-medium">Hypertension</p>
                        <p className="text-xs text-gray-400">BP elevated, on IV labetalol.</p>
                      </div>
                      <div className="text-xs font-semibold text-warning bg-warning/10 px-2 py-0.5 rounded-full border border-warning/20">Medium</div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-sm font-bold text-stable mt-0.5">3.</span>
                      <div className="flex-1">
                        <p className="text-gray-200 font-medium">Type 2 Diabetes</p>
                        <p className="text-xs text-gray-400">BG stable on current insulin regimen.</p>
                      </div>
                      <div className="text-xs font-semibold text-stable bg-stable/10 px-2 py-0.5 rounded-full border border-stable/20">Stable</div>
                    </div>
                  </div>
                </div>

                {/* Recent Interventions */}
                <div className="bg-[#193322] rounded-xl border border-[#23482f] overflow-hidden">
                  <h2 className="text-white text-lg font-bold px-5 py-4 border-b border-[#23482f]">Recent Interventions</h2>
                  <div className="p-5 flex flex-col gap-5">
                    <div className="flex items-start gap-4">
                      <p className="text-xs font-mono text-[#92c9a4] whitespace-nowrap pt-1">08:15</p>
                      <div className="flex-1 pb-4 border-l border-[#23482f] pl-4 relative">
                        <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-med-green"></div>
                        <p className="text-gray-200 font-medium">Administered Morphine 2mg IV</p>
                        <p className="text-xs text-gray-400">For chest pain, rating 8/10.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <p className="text-xs font-mono text-[#92c9a4] whitespace-nowrap pt-1">07:45</p>
                      <div className="flex-1 pb-4 border-l border-[#23482f] pl-4 relative">
                         <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-gray-500"></div>
                        <p className="text-gray-200 font-medium">EKG performed</p>
                        <p className="text-xs text-gray-400">Shows ST elevation in leads V2-V4.</p>
                      </div>
                    </div>
                     <div className="flex items-start gap-4">
                      <p className="text-xs font-mono text-[#92c9a4] whitespace-nowrap pt-1">07:30</p>
                      <div className="flex-1 border-l border-[#23482f] pl-4 relative">
                         <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-gray-500"></div>
                        <p className="text-gray-200 font-medium">Labs drawn</p>
                        <p className="text-xs text-gray-400">CBC, CMP, Troponin sent.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Priorities & Contingency */}
                <div className="col-span-1 lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-[#193322] rounded-xl border border-[#23482f] overflow-hidden">
                    <h2 className="text-white text-lg font-bold px-5 py-4 border-b border-[#23482f]">Priorities for Next Shift</h2>
                    <div className="p-5 flex flex-col gap-4">
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-urgent mt-0.5">priority_high</span>
                        <p className="text-gray-200 font-medium">Follow up on troponin results (due ~10:00).</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-warning mt-0.5">science</span>
                        <p className="text-gray-200 font-medium">Check potassium at 12:00.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-[#005A9C] mt-0.5">groups</span>
                        <p className="text-gray-200 font-medium">Consult cardiology regarding EKG findings.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#193322] rounded-xl border border-[#23482f] overflow-hidden">
                    <h2 className="text-white text-lg font-bold px-5 py-4 border-b border-[#23482f]">Contingency Plan</h2>
                    <div className="p-5 flex flex-col gap-4">
                      <div className="flex items-start gap-3 bg-[#112217] p-3 rounded-lg border border-[#23482f]">
                        <span className="material-symbols-outlined text-[#92c9a4] mt-0.5">call_split</span>
                        <p className="text-gray-200 text-sm"><span className="font-bold text-white">If</span> BP drops below 90/50, <span className="font-bold text-white">then</span> start vasopressor drip as per protocol.</p>
                      </div>
                      <div className="flex items-start gap-3 bg-[#112217] p-3 rounded-lg border border-[#23482f]">
                        <span className="material-symbols-outlined text--[#92c9a4] mt-0.5">call_split</span>
                        <p className="text-gray-200 text-sm"><span className="font-bold text-white">If</span> chest pain worsens or does not resolve, <span className="font-bold text-white">then</span> repeat EKG and notify cardiology.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-[#92c9a4]">
              Select a patient from the list to view handover details.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Handover;
