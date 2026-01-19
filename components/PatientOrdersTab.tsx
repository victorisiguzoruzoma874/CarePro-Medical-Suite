
import React from 'react';
import { MedOrder } from '../types';
import { db } from '../data';

interface PatientOrdersTabProps {
  patientId: string;
}

const PatientOrdersTab: React.FC<PatientOrdersTabProps> = ({ patientId }) => {
  const medOrders = db.getMedOrdersByPatientId(patientId);

  return (
    <div className="bg-[#112217] p-5 rounded-xl border border-white/10 shadow-sm">
      <h3 className="text-lg font-bold text-white mb-4">All Medical Orders</h3>
      {medOrders.length > 0 ? (
        <div className="space-y-3">
          {medOrders.map((order: MedOrder) => (
            <div key={order.order_id} className="flex items-center justify-between bg-[#23482f] p-3 rounded-lg border border-[#326744]">
              <div>
                <p className="font-semibold text-white">{order.med_name} {order.dose}</p>
                <p className="text-sm text-[#92c9a4]">Route: {order.route} | Freq: {order.frequency}</p>
                <p className="text-xs text-gray-500">Ordered: {new Date(order.created_at).toLocaleDateString()}</p>
              </div>
              <span className="material-symbols-outlined text-white cursor-pointer hover:text-med-green">more_vert</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white/40 italic">No medical orders found for this patient.</p>
      )}
    </div>
  );
};

export default PatientOrdersTab;
