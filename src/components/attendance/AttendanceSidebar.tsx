import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  Users, 
  Settings, 
  LayoutDashboard, 
  Calendar,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
}

const adminNav: NavItem[] = [
  { icon: Users, label: 'Face Enrollment', path: '/admin/face-enrollment' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

const administratorNav: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/administrator/dashboard' },
  { icon: Calendar, label: 'Attendance', path: '/administrator/attendance' },
];

const userNav: NavItem[] = [
  { icon: Calendar, label: 'My Attendance', path: '/user/my-attendance' },
  { icon: User, label: 'My Profile', path: '/user/my-profile' },
];

export function AttendanceSidebar() {
  const { role } = useAuth();
  const location = useLocation();

  const getNavItems = (): NavItem[] => {
    switch (role) {
      case 'admin': return adminNav;
      case 'administrator': return administratorNav;
      case 'user': return userNav;
      default: return [];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-56 min-h-screen attendance-sidebar flex flex-col">
      <div className="p-4">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Main Menu
        </span>
      </div>

      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium',
                    isActive
                      ? 'nav-active'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
