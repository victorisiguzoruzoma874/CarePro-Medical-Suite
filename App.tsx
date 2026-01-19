
import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PatientOverview from './pages/PatientOverview';
import MedicationRecord from './pages/MedicationRecord';
import Handover from './pages/Handover';
import NewOrder from './pages/NewOrder';
import NewPatient from './pages/NewPatient';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import Reports from './pages/Reports';
import NewDoctor from './pages/NewDoctor';
import Sidebar from './components/Sidebar';


// A wrapper to handle layout conditionally based on the route to match the screenshots
const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const isDashboard = location.pathname === '/' || location.pathname === '/dashboard' || location.pathname === '/reports';
  const isLightMode = location.pathname === '/new-order' || location.pathname === '/new-patient' || location.pathname === '/messages' || location.pathname === '/settings' || location.pathname === '/new-doctor';
  const isMedicalDark = location.pathname.includes('/overview') || location.pathname.includes('/mar') || location.pathname.includes('/handover');

  // Dashboard has a top nav structure (Screen 1)
  if (isDashboard) {
    return <div className="min-h-screen bg-bg-dark-blue text-white">{children}</div>;
  }

  // Light Mode Screens (New Order, New Patient, Messages, Settings)
  if (isLightMode) {
    return (
      <div className="flex min-h-screen bg-gray-50 text-slate-900">
        <Sidebar theme="light" />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    );
  }

  // Medical screens are Dark Green Mode (Screens 2, 3, 4)
  if (isMedicalDark) {
    return (
      <div className="flex min-h-screen bg-bg-dark-green text-white font-display">
        <Sidebar theme="dark-green" />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    );
  }

  return <>{children}</>;
};

const AppLayout = () => (
  <LayoutWrapper>
    <Outlet />
  </LayoutWrapper>
);

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/overview/:id" element={<PatientOverview />} />
          <Route path="/mar/:id" element={<MedicationRecord />} />
          <Route path="/handover" element={<Handover />} />
          <Route path="/new-order" element={<NewOrder />} />
          <Route path="/new-patient" element={<NewPatient />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/new-doctor" element={<NewDoctor />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

