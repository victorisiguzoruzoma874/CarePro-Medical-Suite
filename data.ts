
import { Patient, MedOrder, MedAdmin, User } from './types';

export const currentUser: User = {
  user_id: 'u1',
  username: 'ecarter',
  full_name: 'Dr. Emily Carter',
  role: 'doctor',
  department: 'Cardiology',
  active: true,
  last_login: new Date().toISOString()
};

// Mock Database Tables
let patients: Patient[] = [
  {
    patient_id: 'p1',
    mrn: 'MRN-4523523',
    first_name: 'John',
    last_name: 'Doe',
    dob: '1958-10-24',
    gender: 'M',
    room: '304B',
    primary_provider_id: 'u1',
    allergies: ['Penicillin', 'Peanuts'],
    diagnosis: 'Acute Myocardial Infarction',
    status: 'Urgent',
    avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBd0sPmiO0NbIFwfxgNGuZFgu30eseysQdkgd9--RlYsxoXFPFaLcTCeDIwseyy0_z2MUWVlxBGqsQOdbUs37FTYtN_2i6tox5ICisxE2TIsQsSdnSXqK--i71IU_XdpYiRTgj2vCYbZgaEjWfQdX_GcC0Ix7Q1xwn6_nOVOU9fh3GQ6k6tEd7axVSZef9-l9fucsm-vtzWUVOaY727s9CrKwJ6VdBMqes2RpGpqeWL-7ITxhOd9JlhatFbhbAXqI6WtGRxJW1DE-0a',
    outstanding_tasks: [
      { type: 'medication', description: 'Medication Overdue (Warfarin 5mg)', overdue: true },
      { type: 'lab', description: 'Lab Results Ready (Troponin)', overdue: false }
    ],
    code_status: 'Full Code'
  },
  {
    patient_id: 'p2',
    mrn: 'MRN-8821002',
    first_name: 'Jane',
    last_name: 'Smith',
    dob: '1951-03-15',
    gender: 'F',
    room: '212A',
    primary_provider_id: 'u1',
    allergies: [],
    diagnosis: 'Pneumonia',
    status: 'Stable',
    avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgYoVNgZNJKBg2VjxxopStSuAcN5oTaZcHeoS26ICh9HPK2msnSe2LOZDN7VV4wNhNCXScNaR3FFCsvAkN4AqByME3zajPfbzSEos4ozQEX_ZPpVRFqnkhZKkqL7y_reIe-0SQtgT8rtpVJB31Z92OvDh5Hmt_3VNUjZYTwnFMObRx8sAxzBEHYcpFekBCQNReXxMCBZJSSvfkE7blDARlKrnOfk3ug6iBhV1CfFKKMQDTi5M_UT0b4xxsc7-8iLB-iV4yoJx524CJ',
    outstanding_tasks: [{ type: 'none', description: 'No overdue tasks', overdue: false }],
    code_status: 'DNR'
  },
  {
    patient_id: 'p3',
    mrn: 'MRN-1029384',
    first_name: 'Robert',
    last_name: 'Brown',
    dob: '1966-07-20',
    gender: 'M',
    room: '401C',
    primary_provider_id: 'u2',
    allergies: ['Sulfa'],
    diagnosis: 'Knee Replacement Recovery',
    status: 'Discharge Pending',
    avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQoz6K2-GqCZB5LanypsPS95Jvc0knrM696DfRWOwO7Y-yr7FJTKHYF7pLytNNNSb-Zog27N6liExVdmKJljJZssQ3mhCW7uh57AkE5gYdgJJbNJ-AxZmS3NoEeALHwIQwnbWvbCkkSoFIrVPVN-lishqp3c1j0qz8M52mIzHlC3oAZ_MbKNmhkjVYf4voGfB4-1KrCKyiL-Tfmjh8V88vWRxBWUvU0hK-X8lpj6AQrpWGVPBoB8BnF09SHGVt6ZJkywkpcIOZdpz0',
    outstanding_tasks: [{ type: 'paperwork', description: 'Sign discharge papers', overdue: false }],
    code_status: 'Full Code'
  },
  {
    patient_id: 'p4',
    mrn: 'MRN-9988776',
    first_name: 'Maria',
    last_name: 'Garcia',
    dob: '1979-11-02',
    gender: 'F',
    room: '305A',
    primary_provider_id: 'u1',
    allergies: [],
    diagnosis: 'Asthma Exacerbation',
    status: 'Stable',
    avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAY8FxF_K3aJDaSQ4HEBcqnnVrtmkR74peMwU_uguq2sqgeDZfxRpKG0xuFCpUGOqxFZxURRvBNHxXjXyNAPksJSdzGMBdlfhEd0WnpWOTIEOgujgHPoFySA83cQojJmJ8zeXdm3qDR2TIai7BJ23h1nntI0WC6lzKy8xKtGAuVssaGPSrBvad7J4IjF2c6uGmPzEwcSs5f7Y9wOgthXmJ-sSB3TZE0xO9SpfzG6VZNBpBxN91vo3preWhtAsUkJPEf5wtFS41IoWHt',
    outstanding_tasks: [{ type: 'none', description: 'No overdue tasks', overdue: false }],
    code_status: 'Full Code'
  }
];

let medOrders: MedOrder[] = [
  {
    order_id: 'o1',
    patient_id: 'p1',
    med_name: 'Lisinopril',
    dose: '10mg',
    route: 'PO',
    frequency: 'Daily',
    start_time: '2023-10-24T08:00:00Z',
    status: 'active',
    prescriber_id: 'u1',
    created_at: '2023-10-23T10:00:00Z'
  },
  {
    order_id: 'o2',
    patient_id: 'p1',
    med_name: 'Metformin',
    dose: '500mg',
    route: 'PO',
    frequency: 'BID',
    start_time: '2023-10-24T08:00:00Z',
    status: 'active',
    prescriber_id: 'u1',
    created_at: '2023-10-23T10:00:00Z'
  },
  {
    order_id: 'o3',
    patient_id: 'p1',
    med_name: 'Atorvastatin',
    dose: '40mg',
    route: 'PO',
    frequency: 'Daily',
    start_time: '2023-10-24T20:00:00Z',
    status: 'active',
    prescriber_id: 'u1',
    created_at: '2023-10-23T10:00:00Z'
  },
  {
    order_id: 'o4',
    patient_id: 'p1',
    med_name: 'Morphine Sulfate',
    dose: '2mg',
    route: 'IV',
    frequency: 'PRN',
    start_time: '2023-10-24T08:00:00Z',
    status: 'active',
    prescriber_id: 'u1',
    created_at: '2023-10-24T00:00:00Z'
  }
];

let medAdmins: MedAdmin[] = [
  {
    admin_id: 'a1',
    order_id: 'o1',
    patient_id: 'p1',
    status: 'given',
    administered_at: '2023-10-24T08:02:00Z',
    administered_by: 'u1',
    dose_given: '10mg',
    barcode_scanned: true
  },
  {
    admin_id: 'a2',
    order_id: 'o2',
    patient_id: 'p1',
    status: 'declined', // Patient refused
    administered_at: '2023-10-24T08:03:00Z',
    administered_by: 'u1',
    reason: 'Patient Refused'
  },
  {
    admin_id: 'a3',
    order_id: 'o3',
    patient_id: 'p1',
    status: 'scheduled', // Future
  },
  {
    admin_id: 'a4',
    order_id: 'o4',
    patient_id: 'p1',
    status: 'given',
    administered_at: '2023-10-24T13:15:00Z',
    administered_by: 'u1',
    dose_given: '2mg',
    barcode_scanned: true
  }
];

// Data Access Object / Service Layer (Mocking DB Ops)
export const db = {
  getPatients: () => patients,
  getPatientById: (id: string) => patients.find(p => p.patient_id === id),
  
  getMedOrders: () => medOrders,
  getMedOrdersByPatientId: (pid: string) => medOrders.filter(o => o.patient_id === pid),
  
  getMedAdmins: () => medAdmins,
  getMedAdminsByPatientId: (pid: string) => medAdmins.filter(a => a.patient_id === pid),

  addPatient: (patient: Patient) => {
    patients = [patient, ...patients];
    return patient;
  },

  addMedOrder: (order: MedOrder) => {
    medOrders = [...medOrders, order];
    return order;
  },

  addMedAdmin: (admin: MedAdmin) => {
    medAdmins = [...medAdmins, admin];
    return admin;
  },

  removeMedAdmin: (adminId: string) => {
    medAdmins = medAdmins.filter(a => a.admin_id !== adminId);
  },

  updateMedAdmin: (admin: MedAdmin) => {
    medAdmins = medAdmins.map(a => a.admin_id === admin.admin_id ? admin : a);
    return admin;
  }
};
