export type UserRole = 'admin' | 'administrator' | 'user';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  designation: string;
  employeeId: string;
  status: 'Active' | 'Inactive';
  joinedOn: string;
  role: UserRole;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: 'Present' | 'Late' | 'Absent';
  hoursWorked: string;
}

export interface CameraConfig {
  id: string;
  name: string;
  type: 'USB' | 'IP' | 'RTSP';
  streamUrl: string;
  cameraIndex: number;
  isEntry: boolean;
}

export interface DashboardStats {
  presentToday: number;
  lateArrivals: number;
  absentToday: number;
  totalEmployees: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  role: UserRole | null;
}
