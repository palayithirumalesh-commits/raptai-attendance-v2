import { ReactNode } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <Header title={title} subtitle={subtitle} />
        <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-background via-background to-indigo-950/20">
          {children}
        </div>
      </main>
    </div>
  );
}
