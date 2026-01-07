import { useState } from 'react';
import { AttendanceLayout } from '@/components/layouts/AttendanceLayout';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

export default function MyProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    employeeId: user?.employeeId || '',
    department: user?.department || '',
    designation: user?.designation || '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AttendanceLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">View and manage your personal information</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Profile Card */}
        <Card className="p-8 text-center">
          <div className="profile-avatar mx-auto mb-4">
            {user?.firstName?.charAt(0) || 'T'}
          </div>
          <h2 className="text-xl font-bold mb-2">
            {user?.firstName?.toUpperCase()} {user?.lastName?.toUpperCase()}
          </h2>
          <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground rounded-full text-sm font-medium mb-6">
            {user?.designation}
          </span>

          <div className="text-left space-y-4 mt-8">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Department</p>
              <p className="font-medium">{user?.department}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Employee ID</p>
              <p className="font-medium">{user?.employeeId}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Status</p>
              <p className="font-medium text-emerald-500">{user?.status}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Joined On</p>
              <p className="font-medium">{user?.joinedOn}</p>
            </div>
          </div>
        </Card>

        {/* Profile Information Form */}
        <Card className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg">Profile Information</h3>
            <Button 
              onClick={() => setIsEditing(!isEditing)}
              className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
            >
              <Pencil className="w-4 h-4" />
              Edit Profile
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground">First Name</Label>
              <Input
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                disabled={!isEditing}
                className="form-input mt-1.5"
              />
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Last Name</Label>
              <Input
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                disabled={!isEditing}
                className="form-input mt-1.5"
              />
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Email Address</Label>
              <Input
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
                className="form-input mt-1.5"
              />
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Employee ID</Label>
              <Input
                value={formData.employeeId}
                disabled
                className="form-input mt-1.5 bg-muted"
              />
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Department</Label>
              <Input
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                disabled={!isEditing}
                className="form-input mt-1.5"
              />
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Designation</Label>
              <Input
                value={formData.designation}
                onChange={(e) => handleInputChange('designation', e.target.value)}
                disabled={!isEditing}
                className="form-input mt-1.5"
              />
            </div>
          </div>
        </Card>
      </div>
    </AttendanceLayout>
  );
}
