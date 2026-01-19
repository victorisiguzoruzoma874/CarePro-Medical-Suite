
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, currentUser } from '../data';
import { MedAdmin, MedOrder } from '../types';

const MedicationRecord: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Local state for UI updates
  const [patientOrders, setPatientOrders] = useState<MedOrder[]>([]);
  const [patientAdmins, setPatientAdmins] = useState<MedAdmin[]>([]);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<MedOrder | null>(null);
  const [editingAdmin, setEditingAdmin] = useState<MedAdmin | null>(null); // For editing existing admins
  const [barcodeInput, setBarcodeInput] = useState('');

  const patient = db.getPatientById(id || '') || db.getPatients()[0];

  // Refresh data function
  const refreshData = () => {
    if (id) {
      setPatientOrders(db.getMedOrdersByPatientId(id));
      setPatientAdmins(db.getMedAdminsByPatientId(id));
    }
  };

  useEffect(() => {
    refreshData();
  }, [id]);

  // Handle "Administer" (New)
  const handleOpenAdminister = (order: MedOrder) => {
    setSelectedOrder(order);
    setEditingAdmin(null);
    setBarcodeInput('');
    setIsModalOpen(true);
  };

  // Handle "Edit" (Existing)
  const handleEditAdmin = (admin: MedAdmin, order: MedOrder) => {
    setSelectedOrder(order);
    setEditingAdmin(admin);
    setBarcodeInput(admin.barcode_scanned ? 'SCANNED-CODE' : '');
    setIsModalOpen(true);
  };

  // Handle "Undo" (Delete)
  const handleUndoAdmin = (adminId: string) => {
    if (confirm("Are you sure you want to undo this administration?")) {
      db.removeMedAdmin(adminId);
      refreshData();
    }
  };

  const handleConfirmAdminister = () => {
    if (selectedOrder) {
      if (editingAdmin) {
        // Update existing
        const updatedAdmin: MedAdmin = {
          ...editingAdmin,
          administered_by: currentUser.user_id, // Update who edited it
          dose_given: selectedOrder.dose, // Assume standard dose for now
          barcode_scanned: barcodeInput.length > 0
        };
        db.updateMedAdmin(updatedAdmin);
      } else {
        // Create new
        const newAdmin: MedAdmin = {
          admin_id: `a-${Date.now()}`,
          order_id: selectedOrder.order_id,
          patient_id: patient.patient_id,
          status: 'given',
          administered_at: new Date().toISOString(),
          administered_by: currentUser.user_id,
          dose_given: selectedOrder.dose,
          barcode_scanned: barcodeInput.length > 0
        };
        db.addMedAdmin(newAdmin);
      }
      
      setIsModalOpen(false);
      refreshData();
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-4 md:p-8 overflow-hidden bg-[#102216]">
      {/* PageHeading */}
      <header className="flex flex-wrap justify-between gap-4 pb-6 border-b border-white/10 mb-6 shrink-0">
        <div className="flex min-w-72 flex-col gap-2">
          <p className="text-white text-2xl md:text-3xl font-black leading-tight tracking-[-0.033em]">
            {patient.first_name} {patient.last_name}, DOB: {patient.dob}, MRN: {patient.mrn}
          </p>
          <p className="text-[#92c9a4] text-base font-normal leading-normal">
            Allergies: {patient.allergies.join(', ') || 'None'}
          </p>
        </div>
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#23482f] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#326744] transition-colors border border-white/5 shadow-sm">
          <span className="truncate">View Full Chart</span>
        </button>
      </header>

      {/* ToolBar and Chips */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-2 shrink-0">
        <div className="flex items-center gap-2">
          <button className="p-2 text-white rounded-md hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-2xl">chevron_left</span>
          </button>
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-med-green text-[#112217] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-4 hover:opacity-90 transition-opacity shadow-lg shadow-green-500/10">
            <span className="material-symbols-outlined text-[#112217] text-xl fill">calendar_today</span>
            <span className="truncate">Today</span>
          </button>
          <button className="p-2 text-white rounded-md hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-2xl">chevron_right</span>
          </button>
        </div>
        <div className="flex gap-2 p-1 overflow-x-auto">
          <div className="flex h-8 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-lg bg-med-green/20 pl-4 pr-4 border border-med-green/30">
            <p className="text-med-green text-sm font-medium leading-normal">All</p>
          </div>
          <div className="flex h-8 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-lg bg-[#23482f] pl-4 pr-4 hover:bg-med-green/20 transition-colors border border-transparent hover:border-white/10">
            <p className="text-white text-sm font-medium leading-normal">Scheduled</p>
          </div>
          <div className="flex h-8 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-lg bg-[#23482f] pl-4 pr-4 hover:bg-med-green/20 transition-colors border border-transparent hover:border-white/10">
            <p className="text-white text-sm font-medium leading-normal">PRN</p>
          </div>
          <div className="flex h-8 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-lg bg-[#23482f] pl-4 pr-4 hover:bg-med-green/20 transition-colors border border-transparent hover:border-white/10">
            <p className="text-white text-sm font-medium leading-normal">STAT</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-hidden rounded-lg border border-[#326744] bg-[#112217] w-full shadow-2xl">
        <div className="h-full overflow-auto">
          <table className="w-full text-left min-w-[1000px]">
            <thead className="bg-[#193322] sticky top-0 z-10 shadow-md">
              <tr>
                <th className="px-6 py-4 text-left text-white text-sm font-bold leading-normal w-[20%] uppercase tracking-wider">Medication</th>
                <th className="px-4 py-4 text-left text-white text-sm font-bold leading-normal w-[10%] uppercase tracking-wider">Dosage</th>
                <th className="px-4 py-4 text-left text-white text-sm font-bold leading-normal w-[10%] uppercase tracking-wider">Route</th>
                <th className="px-4 py-4 text-center text-white text-sm font-bold leading-normal w-[12%] uppercase tracking-wider border-l border-[#326744]/30">08:00</th>
                <th className="px-4 py-4 text-center text-white text-sm font-bold leading-normal w-[12%] uppercase tracking-wider border-l border-[#326744]/30">12:00</th>
                <th className="px-4 py-4 text-center text-white text-sm font-bold leading-normal w-[12%] uppercase tracking-wider border-l border-[#326744]/30">16:00</th>
                <th className="px-4 py-4 text-center text-white text-sm font-bold leading-normal w-[12%] uppercase tracking-wider border-l border-[#326744]/30">20:00</th>
                <th className="px-4 py-4 text-center text-white text-sm font-bold leading-normal w-[10%] uppercase tracking-wider border-l border-[#326744]/30">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patientOrders.map((order) => {
                const adminsForOrder = patientAdmins.filter(a => a.order_id === order.order_id);
                
                const renderTimeSlot = (slotHour: number) => {
                  const adminAtSlot = adminsForOrder.find(a => {
                    if (!a.administered_at) return false;
                    const h = new Date(a.administered_at).getHours();
                    return h === slotHour || (h > slotHour && h < slotHour + 4);
                  });

                  // --- STATUS: GIVEN / DECLINED ---
                  if (adminAtSlot) {
                     if (adminAtSlot.status === 'given') {
                       return (
                        <div className="group relative flex flex-col items-center justify-center h-[52px] w-full rounded-md hover:bg-white/5 transition-all">
                          <div className="flex flex-col items-center justify-center gap-0.5 text-med-green">
                            <span className="material-symbols-outlined text-[20px] fill">check_circle</span>
                            <span className="text-[11px] font-medium">{new Date(adminAtSlot.administered_at!).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                          </div>
                          
                          {/* Hover Actions Menu */}
                          <div className="absolute top-1 right-1 hidden group-hover:flex bg-[#112217] rounded-md shadow-lg border border-[#326744] z-20 overflow-hidden">
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleEditAdmin(adminAtSlot, order); }}
                              title="Edit" 
                              className="p-1.5 hover:bg-[#23482f] text-blue-400"
                            >
                              <span className="material-symbols-outlined text-[16px]">edit</span>
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleUndoAdmin(adminAtSlot.admin_id); }}
                              title="Undo" 
                              className="p-1.5 hover:bg-[#23482f] text-red-400"
                            >
                              <span className="material-symbols-outlined text-[16px]">undo</span>
                            </button>
                          </div>
                        </div>
                       );
                     } else if (adminAtSlot.status === 'declined') {
                        return (
                          <div className="group relative flex flex-col items-center justify-center h-[52px] w-full rounded-md hover:bg-white/5">
                            <div className="flex flex-col items-center justify-center gap-0.5 text-red-400 opacity-80">
                              <span className="material-symbols-outlined text-[20px]">cancel</span>
                              <span className="text-[11px]">Refused</span>
                            </div>
                            {/* Allow Undo for Declined too */}
                             <div className="absolute top-1 right-1 hidden group-hover:flex bg-[#112217] rounded-md shadow-lg border border-[#326744] z-20">
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleUndoAdmin(adminAtSlot.admin_id); }}
                                title="Undo" 
                                className="p-1.5 hover:bg-[#23482f] text-red-400"
                              >
                                <span className="material-symbols-outlined text-[16px]">undo</span>
                              </button>
                            </div>
                          </div>
                        )
                     }
                  }

                  // --- STATUS: DUE / SCHEDULED ---
                  const startHour = new Date(order.start_time).getHours();
                  // Check if this slot matches the frequency pattern (simplified)
                  // For demo: Lisinopril(8am), Metformin(8,20), Atorvastatin(20), Morphine(PRN)
                  
                  let isScheduledSlot = false;
                  if (order.frequency === 'Daily' && (startHour === slotHour || (startHour === 20 && slotHour === 20))) isScheduledSlot = true;
                  if (order.frequency === 'BID' && (slotHour === 8 || slotHour === 20)) isScheduledSlot = true;
                  if (order.frequency === 'PRN') isScheduledSlot = false; // PRN doesn't show scheduled slots
                  
                  // Specific overrides for demo consistency with data.ts
                  if (order.med_name === 'Lisinopril' && slotHour === 8) isScheduledSlot = true; // Was scheduled 8am
                  if (order.med_name === 'Atorvastatin' && slotHour === 20) isScheduledSlot = true;
                  if (order.med_name === 'Metformin' && (slotHour === 8 || slotHour === 20)) isScheduledSlot = true;

                  if (isScheduledSlot) {
                     // Check if Overdue (Mock logic: if slot is 8 or 12, it's past. 16/20 is future)
                     const isPast = slotHour < 14; // Assume current time is ~14:00

                     if (isPast) {
                        return (
                          <div 
                            onClick={() => handleOpenAdminister(order)}
                            className="flex flex-col items-center justify-center gap-0.5 h-[52px] w-full rounded-md bg-urgent/10 border border-urgent/30 cursor-pointer hover:bg-urgent/20 transition-all animate-pulse"
                          >
                            <span className="material-symbols-outlined text-[20px] text-urgent">warning</span>
                            <span className="text-[10px] font-bold text-urgent uppercase tracking-wide">Overdue</span>
                          </div>
                        );
                     } else {
                        return (
                          <div className="flex flex-col items-center justify-center h-[52px]">
                             <div className="text-xs text-gray-500 font-medium tracking-wide">Scheduled</div>
                             <div className="text-[10px] text-gray-600">{slotHour}:00</div>
                          </div>
                        );
                     }
                  }
                  
                  return <div className="h-[52px] w-full"></div>; // Empty slot
                };

                return (
                <tr key={order.order_id} className="border-t border-t-[#326744]/50 hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 text-white text-sm font-semibold leading-normal">{order.med_name}</td>
                  <td className="px-4 py-4 text-[#92c9a4] text-sm font-normal leading-normal">{order.dose}</td>
                  <td className="px-4 py-4 text-[#92c9a4] text-sm font-normal leading-normal">{order.route}</td>
                  
                  <td className="px-2 py-2 text-center text-sm font-normal leading-normal border-l border-[#326744]/30">{renderTimeSlot(8)}</td>
                  <td className="px-2 py-2 text-center text-sm font-normal leading-normal border-l border-[#326744]/30">{renderTimeSlot(12)}</td>
                  <td className="px-2 py-2 text-center text-sm font-normal leading-normal border-l border-[#326744]/30">{renderTimeSlot(16)}</td>
                  <td className="px-2 py-2 text-center text-sm font-normal leading-normal border-l border-[#326744]/30">{renderTimeSlot(20)}</td>

                  <td className="px-4 py-4 text-center text-sm font-bold leading-normal tracking-[0.015em] border-l border-[#326744]/30">
                    <button 
                      onClick={() => handleOpenAdminister(order)} 
                      className="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-9 px-3 bg-[#23482f] border border-med-green/50 text-med-green text-xs font-bold leading-normal hover:bg-med-green hover:text-black transition-all active:scale-95 shadow-lg shadow-black/20"
                    >
                      <span className="truncate uppercase tracking-wide">Administer</span>
                    </button>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>

      {/* Administer Medication Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#112217] rounded-xl p-8 w-full max-w-md flex flex-col gap-6 border border-[#326744] shadow-2xl scale-100 transition-transform">
            <div className="flex flex-col gap-2 text-center">
              <h2 className="text-white text-2xl font-bold">{editingAdmin ? 'Edit Administration' : 'Administer Medication'}</h2>
              <p className="text-[#92c9a4] text-base">
                {editingAdmin ? 'Update record for' : 'Administer'} <span className="font-semibold text-white">{selectedOrder.med_name} {selectedOrder.dose} {selectedOrder.route}</span>?
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white text-sm font-medium" htmlFor="barcode">Scan patient wristband to confirm.</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">barcode_scanner</span>
                <input 
                  autoFocus
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  className="w-full bg-[#193322] border border-[#326744] text-white rounded-lg h-12 pl-10 focus:ring-med-green focus:border-med-green placeholder:text-gray-500 focus:outline-none transition-colors" 
                  id="barcode" 
                  name="barcode" 
                  placeholder="Scan or enter barcode..." 
                  type="text"
                />
              </div>
            </div>
            
            {editingAdmin && (
              <div className="p-3 bg-blue-900/20 border border-blue-800/50 rounded-lg">
                <p className="text-blue-300 text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">info</span>
                  Editing a previously recorded administration.
                </p>
              </div>
            )}

            <div className="flex gap-4 mt-2">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-4 bg-[#23482f] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#326744] transition-colors border border-white/5">
                <span className="truncate">Cancel</span>
              </button>
              <button onClick={handleConfirmAdminister} className="flex-1 flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-4 bg-med-green text-[#112217] text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity shadow-lg shadow-green-500/20">
                <span className="truncate">{editingAdmin ? 'Update Record' : 'Confirm'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicationRecord;
