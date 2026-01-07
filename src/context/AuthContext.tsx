import { createContext, useContext, useState, ReactNode } from 'react';
import { AuthState, User, UserRole } from '@/types/attendance';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: Record<UserRole, User> = {
  admin: {
    id: '1',
    firstName: 'Thiru',
    lastName: 'Admin',
    email: 'thiru@crimsoninnovative.com',
    department: 'IT',
    designation: 'System Admin',
    employeeId: 'ADM-001',
    status: 'Active',
    joinedOn: 'December 8, 2025',
    role: 'admin',
  },
  administrator: {
    id: '2',
    firstName: 'Thiru',
    lastName: 'Administrator',
    email: 'admin@crimsoninnovative.com',
    department: 'HR',
    designation: 'HR Manager',
    employeeId: 'HR-001',
    status: 'Active',
    joinedOn: 'December 8, 2025',
    role: 'administrator',
  },
  user: {
    id: '3',
    firstName: 'Thirumalesu',
    lastName: 'Palayi',
    email: 'thirumalesu@crimsoninnovative.com',
    department: 'Software',
    designation: 'Software Engineer',
    employeeId: 'EMP-001',
    status: 'Active',
    joinedOn: 'December 8, 2025',
    role: 'user',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    role: null,
  });

  const login = (email: string, password: string, role: UserRole): boolean => {
    // Mock authentication - in real app, call API
    if (email && password) {
      const user = mockUsers[role];
      setAuthState({
        isAuthenticated: true,
        user,
        role,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      role: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
