
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  theme: 'light' | 'dark-green';
}

const Sidebar: React.FC<SidebarProps> = ({ theme }) => {
  const location = useLocation();

  const isLight = theme === 'light';

  const baseClasses = `flex w-64 flex-col p-4 border-r h-screen sticky top-0 transition-colors duration-200`;
  const themeClasses = isLight
    ? "bg-white border-gray-200"
    : "bg-[#112217] border-white/10";

  const textPrimary = isLight ? "text-slate-900" : "text-white";
  const textSecondary = isLight ? "text-slate-500" : "text-[#92c9a4]";
  const hoverBg = isLight ? "hover:bg-gray-100" : "hover:bg-[#23482f]/60";
  const activeBg = isLight ? "bg-blue-50 text-blue-600" : "bg-[#23482f] text-white";

  const navItems = [
    { icon: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { icon: 'group', label: 'Patients', path: '/overview/p1' }, 
    { icon: 'task_alt', label: 'Tasks', path: '/handover' },
    { icon: 'note_add', label: 'Orders', path: '/new-order' },
    { icon: 'vaccines', label: 'MAR', path: '/mar/p1' },
    { icon: 'mail', label: 'Messages', path: '/messages' },
    { icon: 'settings', label: 'Settings', path: '/settings' },
    { icon: 'person_add', label: 'Add Doctor', path: '/new-doctor' },
  ];

  return (
    <aside className={`${baseClasses} ${themeClasses}`}>
      <div className="flex flex-col gap-6">
        {/* User Profile */}
        <div className="flex items-center gap-3 px-2">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-10 w-10 border border-white/10"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCNQiGEYwLjJo7NeJCllaYEVAYj-HgYI3KmZp8LGS7hPFNl4LnXCQOqwphd7jteBcnCFyeb4NbjULvKn1bfthbzlEvVlOt_gYrgq5nxgW6BAReA_XKDCRsmfEJh2A4fmUUrlguD0HXxNiyJqHGxzFrj_JQPetTnc-g1JytBkk4CjK-90kL_ocgrVxlB63Sf0vVElOb5XCYZ3ltqp6xho6AgqB6ZYMYtQ7vTsyHuwrUgb0KrzGblMXhvBCzhCNC3mNZ4h6RKSZbw6_wB")' }}
          ></div>
          <div className="flex flex-col">
            <h1 className={`${textPrimary} text-sm font-bold`}>Dr. Emily Carter</h1>
            <p className={`${textSecondary} text-xs`}>Cardiology</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
             const isActive = location.pathname === item.path || (item.path !== '#' && location.pathname.startsWith(item.path) && item.path !== '/dashboard');
             return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive ? activeBg : `${isLight ? 'text-slate-600' : 'text-white'} ${hoverBg}`
              }`}
            >
              <span className={`material-symbols-outlined ${isActive ? 'fill' : ''} text-2xl`}>
                {item.icon}
              </span>
              <p className="text-sm font-medium">{item.label}</p>
            </Link>
          )})}
        </nav>
      </div>

      <div className="mt-auto flex flex-col gap-1">
        <Link to="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${hoverBg} ${isLight ? 'text-slate-600' : 'text-white'}`}>
          <span className="material-symbols-outlined text-2xl">help</span>
          <p className="text-sm font-medium">Help</p>
        </Link>

      </div>
    </aside>
  );
};

export default Sidebar;
