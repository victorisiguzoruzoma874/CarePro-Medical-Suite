
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../data';
import PatientOrdersTab from '../components/PatientOrdersTab';
import PatientAppointmentsTab from '../components/PatientAppointmentsTab';
import PatientNotesTab from '../components/PatientNotesTab';
import PatientVitalsTab from '../components/PatientVitalsTab';
import PatientLabsTab from '../components/PatientLabsTab';
import AddNoteModal from '../components/AddNoteModal';
import AssignDoctorModal from '../components/AssignDoctorModal';

const PatientOverview: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');

  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [isAssignDoctorModalOpen, setIsAssignDoctorModalOpen] = useState(false);

  // Fetch from mock DB
  const patient = db.getPatientById(id || '') || db.getPatients()[0];
  const medOrders = db.getMedOrdersByPatientId(patient.patient_id);
  const medAdmins = db.getMedAdminsByPatientId(patient.patient_id);

  // Derive simple recent meds from admins
  const recentMeds = medAdmins
    .filter(a => a.status === 'given')
    .sort((a, b) => new Date(b.administered_at!).getTime() - new Date(a.administered_at!).getTime())
    .slice(0, 3)
    .map(admin => {
      const order = medOrders.find(o => o.order_id === admin.order_id);
      return {
        name: order ? `${order.med_name} ${order.dose}` : 'Unknown Med',
        time: new Date(admin.administered_at!).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        id: admin.admin_id
      };
    });

  // Derive next scheduled from orders (mock logic)
  const scheduledMeds = medOrders
    .filter(o => o.status === 'active' && o.frequency !== 'PRN')
    .slice(0, 3)
    .map(order => ({
        name: `${order.med_name} ${order.dose}`,
        // Mocking next time based on start time for demo purposes
        time: new Date(new Date().setHours(new Date(order.start_time).getHours() + 4)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        id: order.order_id
    }));

  return (
    <>
      <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
        {/* Page Heading & Chips */}
        <header className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
              {patient.first_name} {patient.last_name}
            </h1>
            <p className="text-[#92c9a4] text-sm md:text-base font-normal leading-normal">
              MRN: {patient.mrn} | DOB: {patient.dob} | Room: {patient.room} | Primary: Dr. Chen
            </p>
          </div>
          <div className="flex gap-3">
            {patient.allergies.length > 0 && (
            <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-red-800/80 pl-3 pr-4 border border-red-700/50">
              <span className="material-symbols-outlined text-white text-lg">warning</span>
              <p className="text-white text-sm font-medium leading-normal">Allergy Alert</p>
            </div>
            )}
          </div>
        </header>

        {/* Tabs */}
        <nav className="mb-6 pb-3 overflow-x-auto">
          <div className="flex border-b border-[#326744] gap-8 min-w-max">
            {['Overview', 'Medications', 'Orders', 'Appointments', 'Notes', 'Vitals', 'Labs'].map((tab) => (
              <button 
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === 'Medications') navigate(`/mar/${patient.patient_id}`);
                }}
                className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 cursor-pointer transition-colors outline-none focus:outline-none ${
                  activeTab === tab 
                  ? 'border-b-med-green text-white' 
                  : 'border-b-transparent text-[#92c9a4] hover:text-white'
                }`}
              >
                <p className="text-sm font-bold leading-normal tracking-[0.015em] whitespace-nowrap">{tab}</p>
              </button>
            ))}
          </div>
        </nav>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'Overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Quick Actions */}
                <div>
                  <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <button onClick={() => navigate(`/mar/${patient.patient_id}`)} className="flex items-center justify-center gap-2 px-4 py-3 bg-med-green text-black font-bold text-sm rounded-lg hover:bg-med-green/80 transition-colors shadow-lg shadow-green-900/20 active:scale-95">
                      <span className="material-symbols-outlined text-xl">vaccines</span>
                      <span>Administer Med</span>
                    </button>
                    <button onClick={() => setIsAddNoteModalOpen(true)} className="flex items-center justify-center gap-2 px-4 py-3 bg-[#23482f] text-white font-bold text-sm rounded-lg hover:bg-[#326744] transition-colors border border-white/5 active:scale-95">
                      <span className="material-symbols-outlined text-xl">note_add</span>
                      <span>Add Note</span>
                    </button>
                    <button onClick={() => setIsAssignDoctorModalOpen(true)} className="flex items-center justify-center gap-2 px-4 py-3 bg-[#23482f] text-white font-bold text-sm rounded-lg hover:bg-[#326744] transition-colors border border-white/5 active:scale-95">
                      <span className="material-symbols-outlined text-xl">person_add</span>
                      <span>Assign Doctor</span>
                    </button>
                    <button onClick={() => console.log('Calling On-Call Doctor...')} className="flex items-center justify-center gap-2 px-4 py-3 bg-[#23482f] text-white font-bold text-sm rounded-lg hover:bg-[#326744] transition-colors border border-white/5 active:scale-95">
                      <span className="material-symbols-outlined text-xl">call</span>
                      <span>Call On-Call</span>
                    </button>
                  </div>
                </div>

                {/* Recent & Scheduled Medications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recent Medications Card */}
                  <div className="bg-[#112217] p-5 rounded-xl border border-white/10 shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-4">Recent Medications</h3>
                    <div className="space-y-4 flex-1">
                      {recentMeds.length > 0 ? recentMeds.map((med, i) => (
                        <div key={i} className="flex justify-between items-center p-2 rounded hover:bg-white/5 transition-colors">
                          <div>
                            <p className="font-semibold text-white">{med.name}</p>
                            <p className="text-sm text-[#92c9a4]">Administered: {med.time}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => console.log(`Undo action for ${med.name}`)} className="text-sm text-med-green/80 hover:text-med-green font-medium">Undo</button>
                            <button onClick={() => console.log(`Edit action for ${med.name}`)} className="text-[#92c9a4] hover:text-white"><span className="material-symbols-outlined text-xl">edit</span></button>
                          </div>
                        </div>
                      )) : (
                        <p className="text-white/40 text-sm italic">No recent administrations.</p>
                      )}
                    </div>
                    <button onClick={() => navigate(`/mar/${patient.patient_id}`)} className="mt-4 w-full py-2 text-sm text-[#92c9a4] hover:text-white hover:bg-[#23482f] rounded-lg transition-colors">View All History</button>
                  </div>

                  {/* Scheduled Medications Card */}
                  <div className="bg-[#112217] p-5 rounded-xl border border-white/10 shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-4">Next Scheduled Medications</h3>
                    <div className="space-y-4 flex-1">
                      {scheduledMeds.length > 0 ? scheduledMeds.map((med, i) => (
                        <div key={i} className="flex items-center gap-4 p-2 rounded hover:bg-white/5 transition-colors">
                          <div className="bg-[#23482f] p-2 rounded-lg shrink-0"><span className="material-symbols-outlined text-med-green text-2xl">pill</span></div>
                          <div>
                            <p className="font-semibold text-white">{med.name}</p>
                            <p className="text-sm text-[#92c9a4]">Scheduled for {med.time}</p>
                          </div>
                        </div>
                      )) : (
                          <p className="text-white/40 text-sm italic">No active scheduled medications.</p>
                      )}
                    </div>
                    <button onClick={() => navigate(`/mar/${patient.patient_id}`)} className="mt-4 w-full py-2 text-sm text-[#92c9a4] hover:text-white hover:bg-[#23482f] rounded-lg transition-colors">Go to MAR</button>
                  </div>
                </div>
              </div>

              {/* Right Column (Overview Specific) */}
              <div className="lg:col-span-1 flex flex-col gap-6">
                {/* Active Alerts Card */}
                <div className="bg-[#112217] p-5 rounded-xl border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4">Active Alerts</h3>
                  <div className="space-y-3">
                    {patient.allergies.length > 0 && (
                    <div className="flex items-center gap-3 bg-red-900/20 border border-red-900/30 p-3 rounded-lg">
                      <span className="material-symbols-outlined text-red-400 text-2xl">allergy</span>
                      <div>
                        <p className="font-semibold text-red-300">Known Drug Allergies</p>
                        <p className="text-sm text-red-400">{patient.allergies.join(', ')}</p>
                      </div>
                    </div>
                    )}
                    {patient.code_status === 'DNR' && (
                    <div className="flex items-center gap-3 bg-amber-900/20 border border-amber-900/30 p-3 rounded-lg">
                      <span className="material-symbols-outlined text-amber-400 text-2xl">front_hand</span>
                      <div>
                        <p className="font-semibold text-amber-300">Do Not Resuscitate (DNR)</p>
                        <p className="text-sm text-amber-400">Order confirmed</p>
                      </div>
                    </div>
                    )}
                    <div className="flex items-center gap-3 bg-sky-900/20 border border-sky-900/30 p-3 rounded-lg">
                      <span className="material-symbols-outlined text-sky-400 text-2xl">monitor_heart</span>
                      <div>
                        <p className="font-semibold text-sky-300">Fall Risk</p>
                        <p className="text-sm text-sky-400">Assistance required</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Appointment Card */}
                <div className="bg-[#112217] p-5 rounded-xl border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4">Next Appointment / Procedure</h3>
                  <div className="flex items-center gap-4 bg-[#23482f] p-4 rounded-lg border border-[#326744]">
                    <span className="material-symbols-outlined text-med-green text-4xl">cardiology</span>
                    <div>
                      <p className="font-semibold text-white">Cardiology Consult</p>
                      <p className="text-sm text-[#92c9a4]">Today @ 14:00 with Dr. Carter</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Orders' && <PatientOrdersTab patientId={patient.patient_id} />}
          {activeTab === 'Appointments' && <PatientAppointmentsTab />}
          {activeTab === 'Notes' && <PatientNotesTab />}
          {activeTab === 'Vitals' && <PatientVitalsTab />}
          {activeTab === 'Labs' && <PatientLabsTab />}
        </div>
      </div>

      <AddNoteModal isOpen={isAddNoteModalOpen} onClose={() => setIsAddNoteModalOpen(false)} patientName={`${patient.first_name} ${patient.last_name}`} />
      <AssignDoctorModal isOpen={isAssignDoctorModalOpen} onClose={() => setIsAssignDoctorModalOpen(false)} patientName={`${patient.first_name} ${patient.last_name}`} />
    </>
  );
};

export default PatientOverview;
