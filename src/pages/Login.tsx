import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types/attendance';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Scan, User, Shield, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const roles: { value: UserRole; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: 'administrator', label: 'Administrator', icon: Shield },
  { value: 'admin', label: 'Admin', icon: Users },
  { value: 'user', label: 'User', icon: User },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password, selectedRole);
    if (success) {
      switch (selectedRole) {
        case 'admin':
          navigate('/admin/face-enrollment');
          break;
        case 'administrator':
          navigate('/administrator/dashboard');
          break;
        case 'user':
          navigate('/user/my-attendance');
          break;
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 login-gradient flex-col items-center justify-center text-white p-12">
        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur">
          <Scan className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Facial Attendance</h1>
        <p className="text-center text-white/80 max-w-md">
          Next-generation AI-powered workforce management with advanced facial recognition technology
        </p>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
            <p className="text-muted-foreground">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@crimsoninnovative.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="space-y-2">
              <Label>Select Role</Label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={cn(
                      'role-option flex flex-col items-center gap-2 py-4',
                      selectedRole === role.value && 'selected'
                    )}
                  >
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center',
                      selectedRole === role.value ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    )}>
                      <role.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium">{role.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
              <div className="text-right">
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot your password?
                </a>
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12">
              Sign In
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <a href="#" className="text-primary hover:underline font-medium">
                Create Account
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
