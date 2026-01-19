
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, currentUser } from '../data';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  
  const allPatients = db.getPatients();

  // Filter Logic
  const filteredPatients = allPatients.filter(patient => {
    const matchesFilter = filter === 'All' || patient.status === filter;
    
    const searchLower = search.toLowerCase();
    const fullName = `${patient.first_name} ${patient.last_name}`.toLowerCase();
    const matchesSearch = 
      patient.mrn.toLowerCase().includes(searchLower) ||
      fullName.includes(searchLower) ||
      patient.room.toLowerCase().includes(searchLower);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-bg-dark-blue min-h-screen">
      {/* Top Navbar */}
      <header className="sticky top-0 z-10 w-full border-b border-white/10 bg-bg-dark-blue/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-[#005A9C] text-3xl">medical_services</span>
            <h2 className="text-xl font-bold text-white">CarePro</h2>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <button onClick={() => { setFilter('All'); navigate('/dashboard'); }} className={`text-sm font-medium transition-colors cursor-pointer ${filter !== 'All' ? 'text-white/70 hover:text-[#005A9C]' : 'text-[#005A9C]'}`}>Dashboard</button>
            <button onClick={() => setFilter('All')} className="text-sm font-medium text-white/70 hover:text-[#005A9C] transition-colors cursor-pointer">All Patients</button>
            <button onClick={() => navigate('/handover')} className="text-sm font-medium text-white/70 hover:text-[#005A9C] transition-colors cursor-pointer">Tasks</button>
            <button onClick={() => navigate('/reports')} className="text-sm font-medium text-white/70 hover:text-[#005A9C] transition-colors cursor-pointer">Reports</button>
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/messages')} className="text-white/70 hover:text-[#005A9C] transition-colors"><span className="material-symbols-outlined">notifications</span></button>
            <button onClick={() => navigate('/settings')} className="text-white/70 hover:text-[#005A9C] transition-colors"><span className="material-symbols-outlined">settings</span></button>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCTBUYOWdgpdUMtsXP49VZRFpPS9fKkF9uRoBFXZaPoTFS5FF95PbeL-apxnRbDKYZ-2fEmtMGIE4r0dTzQcAo_7j6BGAUefN6SImxSoLH2EFqSJjo6E3QVYMabrbOCjWnOGHayg92byRmaG-KzH8IIxwEQUWlZBDzP9LPejgPyLm0ZvNKgHPX867YVnK0t2TM96kGTCsYZ0u3aBLOh_vGuV6BoqsfAEaOSA559mJJEcDp_A3xd3EwxedQBegjpAqvTejDKJ-8BgIKL")' }}></div>
              <div className="hidden lg:flex flex-col">
                <p className="text-sm font-bold text-white">{currentUser.full_name}</p>
                <p className="text-xs text-white/60">{currentUser.department}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto flex w-full flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-6xl flex-col gap-6 self-center">
          
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-4xl font-black text-white">My Patients</p>
              <p className="text-base text-white/60">A prioritized view of your assigned patients.</p>
            </div>
            <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#005A9C] px-4 text-sm font-bold text-white shadow-lg shadow-blue-900/20 hover:bg-[#004a80] transition-colors" onClick={() => navigate('/new-patient')}>
              <span className="material-symbols-outlined text-base">add</span>
              Add Patient
            </button>
          </div>

          {/* Search */}
          <div className="w-full">
            <div className="flex h-14 w-full items-center rounded-lg bg-black/20 px-4 gap-3 border border-white/5 focus-within:border-blue-500/50 transition-colors">
              <span className="material-symbols-outlined text-white/50">search</span>
              <input 
                className="h-full w-full bg-transparent text-base text-white placeholder:text-white/50 focus:outline-none" 
                placeholder="Search by MRN, Name, Room..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-medium text-white">Filter by:</p>
            <div 
              onClick={() => setFilter('All')}
              className={`flex h-9 cursor-pointer items-center justify-center rounded-full px-4 text-sm font-semibold transition-colors border ${filter === 'All' ? 'bg-[#005A9C]/20 text-[#005A9C] border-[#005A9C]/30' : 'bg-transparent text-white/60 border-transparent hover:bg-white/5'}`}
            >
              All ({allPatients.length})
            </div>
            <div 
              onClick={() => setFilter('Urgent')}
              className={`flex h-9 cursor-pointer items-center justify-center rounded-full px-4 text-sm font-medium transition-colors border ${filter === 'Urgent' ? 'bg-urgent/20 text-urgent border-urgent/30' : 'bg-urgent/10 text-urgent/80 border-transparent hover:bg-urgent/20'}`}
            >
              Urgent
            </div>
            <div 
              onClick={() => setFilter('Stable')}
              className={`flex h-9 cursor-pointer items-center justify-center rounded-full px-4 text-sm font-medium transition-colors border ${filter === 'Stable' ? 'bg-stable/20 text-stable border-stable/30' : 'bg-stable/10 text-stable/80 border-transparent hover:bg-stable/20'}`}
            >
              Stable
            </div>
            <div 
              onClick={() => setFilter('Discharge Pending')}
              className={`flex h-9 cursor-pointer items-center justify-center rounded-full px-4 text-sm font-medium transition-colors border ${filter === 'Discharge Pending' ? 'bg-warning/20 text-warning border-warning/30' : 'bg-warning/10 text-warning/80 border-transparent hover:bg-warning/20'}`}
            >
              Discharge Pending
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredPatients.length === 0 ? (
              <div className="col-span-full text-center py-10 text-white/40">
                No patients found matching your criteria.
              </div>
            ) : (filteredPatients.map((patient) => {
              // Calculate age from DOB
              const birthDate = new Date(patient.dob);
              const age = new Date().getFullYear() - birthDate.getFullYear();

              return (
              <div 
                key={patient.patient_id} 
                onClick={() => navigate(`/overview/${patient.patient_id}`)}
                className={`flex flex-col gap-4 rounded-xl border p-5 shadow-lg transition-all hover:scale-[1.01] hover:shadow-xl cursor-pointer ${
                  patient.status === 'Urgent' 
                    ? 'border-urgent/50 bg-[#151c2f] shadow-urgent/10' 
                    : 'border-white/10 bg-black/20 hover:border-blue-500/30'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 shrink-0 rounded-full bg-cover bg-center" style={{ backgroundImage: `url("${patient.avatar_url}")` }}></div>
                    <div className="flex flex-col">
                      <p className="text-lg font-bold leading-tight text-white">{patient.first_name} {patient.last_name}, {age}{patient.gender}</p>
                      <p className="text-sm text-white/60">Room {patient.room}</p>
                    </div>
                  </div>
                  <div className={`flex h-7 shrink-0 items-center justify-center rounded-full px-3 ${
                    patient.status === 'Urgent' ? 'bg-urgent' :
                    patient.status === 'Stable' ? 'bg-stable' :
                    patient.status === 'Discharge Pending' ? 'bg-warning' : 'bg-gray-500'
                  }`}>
                    <p className="text-xs font-bold text-white">{patient.status}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-white">Primary Diagnosis:</p>
                  <p className="text-sm text-white/80">{patient.diagnosis}</p>
                </div>

                <div className="h-px w-full bg-white/10"></div>

                <div className="flex flex-col gap-2">
                  <p className="text-sm font-bold text-white">Outstanding Tasks</p>
                  {patient.outstanding_tasks?.map((task, idx) => (
                    <div key={idx} className={`flex items-center gap-2 text-sm ${
                      task.overdue ? 'text-urgent' : 
                      task.type === 'none' ? 'text-stable' : 
                      task.type === 'paperwork' ? 'text-warning' : 'text-warning'
                    }`}>
                      <span className="material-symbols-outlined text-base">
                        {task.type === 'medication' ? 'pill' : 
                         task.type === 'lab' ? 'science' : 
                         task.type === 'none' ? 'task_alt' : 'description'}
                      </span>
                      <span>{task.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
