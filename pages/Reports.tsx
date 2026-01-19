
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { currentUser } from '../data';

const Reports: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-bg-dark-blue min-h-screen font-display">
      {/* Top Navbar (Consistent with Dashboard) */}
      <header className="sticky top-0 z-10 w-full border-b border-white/10 bg-bg-dark-blue/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-[#005A9C] text-3xl">medical_services</span>
            <h2 className="text-xl font-bold text-white">CarePro</h2>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <a onClick={() => navigate('/dashboard')} className="text-sm font-medium text-white/70 hover:text-[#005A9C] transition-colors cursor-pointer">Dashboard</a>
            <a onClick={() => navigate('/dashboard')} className="text-sm font-medium text-white/70 hover:text-[#005A9C] transition-colors cursor-pointer">All Patients</a>
            <a onClick={() => navigate('/handover')} className="text-sm font-medium text-white/70 hover:text-[#005A9C] transition-colors cursor-pointer">Tasks</a>
            <a className="text-sm font-medium text-[#005A9C] cursor-pointer">Reports</a>
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

      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
         <h1 className="text-3xl font-bold text-white mb-6">Clinical Reports</h1>
         
         {/* Summary Cards */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl shadow-lg">
               <div className="flex justify-between items-start mb-2">
                 <h3 className="text-white/70 text-sm font-medium">Total Admissions (Month)</h3>
                 <span className="material-symbols-outlined text-blue-500">ward</span>
               </div>
               <p className="text-4xl font-bold text-white">128</p>
               <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[70%]"></div>
               </div>
               <p className="text-xs text-white/40 mt-2">+12% from last month</p>
            </div>
             <div className="bg-white/5 border border-white/10 p-6 rounded-xl shadow-lg">
               <div className="flex justify-between items-start mb-2">
                 <h3 className="text-white/70 text-sm font-medium">Average LOS</h3>
                 <span className="material-symbols-outlined text-green-500">timer</span>
               </div>
               <p className="text-4xl font-bold text-white">4.2 <span className="text-xl font-normal text-white/60">Days</span></p>
               <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[45%]"></div>
               </div>
                <p className="text-xs text-white/40 mt-2">-0.5 days from average</p>
            </div>
             <div className="bg-white/5 border border-white/10 p-6 rounded-xl shadow-lg">
               <div className="flex justify-between items-start mb-2">
                 <h3 className="text-white/70 text-sm font-medium">Readmission Rate</h3>
                 <span className="material-symbols-outlined text-orange-500">repeat</span>
               </div>
               <p className="text-4xl font-bold text-white">8.5%</p>
               <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 w-[15%]"></div>
               </div>
               <p className="text-xs text-white/40 mt-2">Within target range (&lt;10%)</p>
            </div>
         </div>
         
         {/* Activity Chart */}
         <div className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-white text-lg font-bold">Department Census Activity</h3>
                <select className="bg-black/20 border border-white/10 text-white text-sm rounded-lg px-3 py-1 focus:outline-none">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
             </div>
             
             <div className="h-64 flex items-end gap-4 px-2">
                {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer">
                      <div className="bg-blue-500/50 group-hover:bg-blue-500/80 transition-all rounded-t-sm relative" style={{ height: `${h}%` }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {h}
                        </div>
                      </div>
                    </div>
                ))}
             </div>
             <div className="flex justify-between mt-4 text-white/50 text-sm px-2">
                <span className="flex-1 text-center">Mon</span>
                <span className="flex-1 text-center">Tue</span>
                <span className="flex-1 text-center">Wed</span>
                <span className="flex-1 text-center">Thu</span>
                <span className="flex-1 text-center">Fri</span>
                <span className="flex-1 text-center">Sat</span>
                <span className="flex-1 text-center">Sun</span>
             </div>
         </div>
      </main>
    </div>
  );
};
export default Reports;
