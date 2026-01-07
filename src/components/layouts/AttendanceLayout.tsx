import { ReactNode } from 'react';
import { AttendanceHeader } from '@/components/attendance/AttendanceHeader';
import { AttendanceSidebar } from '@/components/attendance/AttendanceSidebar';

interface AttendanceLayoutProps {
  children: ReactNode;
}

export function AttendanceLayout({ children }: AttendanceLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AttendanceSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <AttendanceHeader />
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
