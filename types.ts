
export type Role = 'doctor' | 'nurse' | 'pharmacist' | 'admin';

export interface User {
  user_id: string; // UUID
  username: string;
  full_name: string;
  role: Role;
  department: string;
  active: boolean;
  last_login: string; // ISO timestamp
}

export interface Patient {
  patient_id: string; // UUID
  mrn: string;
  first_name: string;
  last_name: string;
  dob: string; // YYYY-MM-DD
  gender: 'M' | 'F';
  room: string;
  primary_provider_id: string; // UUID referencing User
  allergies: string[]; // JSONB in SQL, string array in JS
  created_at?: string;
  updated_at?: string;
  
  // UI-specific extensions (derived or joined data)
  avatar_url?: string; 
  status?: 'Urgent' | 'Stable' | 'Discharge Pending' | 'Observation';
  diagnosis?: string;
  outstanding_tasks?: {
    type: 'medication' | 'lab' | 'paperwork' | 'none';
    description: string;
    overdue: boolean;
  }[];
  code_status?: string;
}

export interface MedOrder {
  order_id: string; // UUID
  patient_id: string; // UUID
  med_name: string;
  dose: string;
  route: string;
  frequency: string;
  start_time: string; // ISO timestamp
  end_time?: string; // ISO timestamp
  status: 'active' | 'paused' | 'stopped';
  prescriber_id: string; // UUID
  created_at: string;
}

export interface MedAdmin {
  admin_id: string; // UUID
  order_id: string; // UUID
  patient_id: string; // UUID
  administered_at?: string; // ISO timestamp
  administered_by?: string; // UUID
  dose_given?: string;
  status: 'given' | 'missed' | 'declined' | 'due' | 'scheduled';
  reason?: string;
  barcode_scanned?: boolean;
  created_at?: string;
}

export interface Appointment {
  appt_id: string; // UUID
  patient_id: string; // UUID
  appt_time: string; // ISO timestamp
  department: string;
  provider_id: string; // UUID
  status: 'scheduled' | 'checked-in' | 'completed' | 'cancelled';
}

export interface AuditLog {
  audit_id: string;
  user_id: string;
  patient_id: string;
  action: string;
  details: any;
  timestamp: string;
}
