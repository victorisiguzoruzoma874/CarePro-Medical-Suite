
import React from 'react';
import { currentUser } from '../data';

const Settings: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-8">
       <h1 className="text-3xl font-bold text-slate-900 mb-8">Settings</h1>

       <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
             <h2 className="text-lg font-bold text-slate-900">Profile Information</h2>
             <p className="text-sm text-gray-500">Update your account details and profile.</p>
          </div>
          <div className="p-6 space-y-6">
             <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-gray-200 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCNQiGEYwLjJo7NeJCllaYEVAYj-HgYI3KmZp8LGS7hPFNl4LnXCQOqwphd7jteBcnCFyeb4NbjULvKn1bfthbzlEvVlOt_gYrgq5nxgW6BAReA_XKDCRsmfEJh2A4fmUUrlguD0HXxNiyJqHGxzFrj_JQPetTnc-g1JytBkk4CjK-90kL_ocgrVxlB63Sf0vVElOb5XCYZ3ltqp6xho6AgqB6ZYMYtQ7vTsyHuwrUgb0KrzGblMXhvBCzhCNC3mNZ4h6RKSZbw6_wB")' }}></div>
                <div>
                    <button className="bg-white border border-gray-300 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">Change Photo</button>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                   <input className="w-full px-4 py-2 border border-gray-300 rounded-lg" type="text" defaultValue={currentUser.full_name} />
                </div>
                <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-1">Department</label>
                   <input className="w-full px-4 py-2 border border-gray-300 rounded-lg" type="text" defaultValue={currentUser.department} />
                </div>
                 <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-1">Username</label>
                   <input className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50" type="text" defaultValue={currentUser.username} disabled />
                </div>
             </div>
          </div>
       </div>

       <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
             <h2 className="text-lg font-bold text-slate-900">Notifications</h2>
             <p className="text-sm text-gray-500">Manage how you receive alerts.</p>
          </div>
          <div className="p-6 space-y-4">
             <div className="flex items-center justify-between">
                <div>
                   <p className="font-medium text-slate-900">Critical Lab Alerts</p>
                   <p className="text-sm text-gray-500">Receive immediate notifications for critical lab values.</p>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-blue-600 cursor-pointer">
                    <span className="absolute left-6 top-1 bg-white w-4 h-4 rounded-full shadow transition-transform duration-200 ease-in-out"></span>
                </div>
             </div>
             <div className="border-t border-gray-100"></div>
             <div className="flex items-center justify-between">
                <div>
                   <p className="font-medium text-slate-900">New Messages</p>
                   <p className="text-sm text-gray-500">Notify when I receive a new secure message.</p>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-blue-600 cursor-pointer">
                    <span className="absolute left-6 top-1 bg-white w-4 h-4 rounded-full shadow transition-transform duration-200 ease-in-out"></span>
                </div>
             </div>
          </div>
       </div>

       <div className="flex justify-end gap-3">
          <button className="text-slate-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">Cancel</button>
          <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">Save Changes</button>
       </div>
    </div>
  );
};

export default Settings;
