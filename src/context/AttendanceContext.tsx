import { createContext, useContext, useState, ReactNode } from 'react';
import { AttendanceRecord, CameraConfig, User } from '@/types/attendance';

interface AttendanceContextType {
  attendanceRecords: AttendanceRecord[];
  cameras: CameraConfig[];
  enrolledUsers: User[];
  addAttendanceRecord: (record: Omit<AttendanceRecord, 'id'>) => void;
  updateCamera: (id: string, config: Partial<CameraConfig>) => void;
  enrollUser: (user: Omit<User, 'id'>) => void;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

const mockAttendanceRecords: AttendanceRecord[] = [
  { id: '1', userId: '3', date: 'Mon, 23 Dec 2025', checkIn: '9:30:41', checkOut: null, status: 'Present', hoursWorked: '0h 0m' },
  { id: '2', userId: '3', date: 'Fri, 20 Dec 2025', checkIn: '9:15:23', checkOut: '17:45:12', status: 'Present', hoursWorked: '8h 30m' },
  { id: '3', userId: '3', date: 'Thu, 19 Dec 2025', checkIn: '9:02:15', checkOut: '18:10:45', status: 'Present', hoursWorked: '9h 8m' },
  { id: '4', userId: '3', date: 'Wed, 18 Dec 2025', checkIn: null, checkOut: null, status: 'Absent', hoursWorked: '0h 0m' },
  { id: '5', userId: '3', date: 'Tue, 17 Dec 2025', checkIn: '9:45:30', checkOut: '17:30:22', status: 'Late', hoursWorked: '7h 45m' },
];

const mockCameras: CameraConfig[] = [
  { id: '1', name: 'entry', type: 'USB', streamUrl: '', cameraIndex: 0, isEntry: true },
  { id: '2', name: 'exit', type: 'USB', streamUrl: '', cameraIndex: 1, isEntry: false },
];

export function AttendanceProvider({ children }: { children: ReactNode }) {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(mockAttendanceRecords);
  const [cameras, setCameras] = useState<CameraConfig[]>(mockCameras);
  const [enrolledUsers, setEnrolledUsers] = useState<User[]>([]);

  const addAttendanceRecord = (record: Omit<AttendanceRecord, 'id'>) => {
    const newRecord = { ...record, id: Date.now().toString() };
    setAttendanceRecords(prev => [newRecord, ...prev]);
  };

  const updateCamera = (id: string, config: Partial<CameraConfig>) => {
    setCameras(prev => prev.map(cam => cam.id === id ? { ...cam, ...config } : cam));
  };

  const enrollUser = (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: Date.now().toString() } as User;
    setEnrolledUsers(prev => [...prev, newUser]);
  };

  return (
    <AttendanceContext.Provider value={{
      attendanceRecords,
      cameras,
      enrolledUsers,
      addAttendanceRecord,
      updateCamera,
      enrollUser,
    }}>
      {children}
    </AttendanceContext.Provider>
  );
}

export function useAttendance() {
  const context = useContext(AttendanceContext);
  if (context === undefined) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
}
