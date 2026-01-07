import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Scan } from 'lucide-react';

export function AttendanceHeader() {
  const { user, role, logout } = useAuth();

  const getRoleLabel = () => {
    switch (role) {
      case 'admin': return 'Admin';
      case 'administrator': return 'Administrator';
      case 'user': return 'User';
      default: return '';
    }
  };

  return (
    <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Scan className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="font-semibold text-lg">Attendance Pro</span>
        <div className="flex items-center gap-1.5 ml-4">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">System Online</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
            {user?.firstName?.charAt(0) || 'U'}
          </div>
          <div className="text-right">
            <div className="font-medium text-sm">{user?.firstName}</div>
            <div className="text-xs text-muted-foreground">{getRoleLabel()}</div>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={logout} className="gap-2">
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
