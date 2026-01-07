import { useState } from 'react';
import { AttendanceLayout } from '@/components/layouts/AttendanceLayout';
import { useAttendance } from '@/context/AttendanceContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, Database, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';

export default function FaceEnrollment() {
  const { enrollUser } = useAttendance();
  const [cameraActive, setCameraActive] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    designation: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStartCamera = () => {
    setCameraActive(true);
    toast.info('Camera activated. Ready to capture.');
  };

  const handleEnrollment = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.department || !formData.designation) {
      toast.error('Please fill all required fields');
      return;
    }

    enrollUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      department: formData.department,
      designation: formData.designation,
      employeeId: `EMP-${Date.now().toString().slice(-4)}`,
      status: 'Active',
      joinedOn: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      role: 'user',
    });

    toast.success('Employee enrolled successfully!');
    setFormData({ firstName: '', lastName: '', email: '', department: '', designation: '' });
    setCameraActive(false);
  };

  return (
    <AttendanceLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Face Enrollment</h1>
        <p className="text-muted-foreground">Register new employees for facial recognition</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Face Capture Section */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="w-5 h-5" />
            <h2 className="font-semibold">Face Capture</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            System captures 2 photos with 1.5s interval for optimal recognition
          </p>

          <div className="camera-preview mb-6">
            {cameraActive ? (
              <div className="text-center">
                <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Camera className="w-10 h-10 text-muted-foreground" />
                </div>
                <p className="font-semibold">Camera Active</p>
                <p className="text-sm text-muted-foreground">Position face in frame</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-muted rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="font-semibold">Ready to Start</p>
                <p className="text-sm text-muted-foreground">Click below to activate camera</p>
              </div>
            )}
          </div>

          <div className="flex gap-3 mb-6">
            <Button 
              onClick={handleStartCamera}
              className="flex-1 bg-primary hover:bg-primary/90 gap-2"
            >
              <Camera className="w-4 h-4" />
              Start Camera
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Database className="w-4 h-4" />
              View Data
            </Button>
          </div>

          <div className="tip-box">
            <Lightbulb className="w-5 h-5 flex-shrink-0" />
            <span>
              <strong>Tip:</strong> Ensure good lighting for best results. System auto-captures 2 photos.
            </span>
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-lg">👤</span>
            <h2 className="font-semibold">Personal Details</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label>First Name *</Label>
              <Input
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="form-input mt-1.5"
              />
            </div>

            <div>
              <Label>Last Name *</Label>
              <Input
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="form-input mt-1.5"
              />
            </div>

            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="form-input mt-1.5"
              />
            </div>

            <div>
              <Label>Department *</Label>
              <Input
                placeholder="Enter department"
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="form-input mt-1.5"
              />
            </div>

            <div>
              <Label>Designation *</Label>
              <Input
                placeholder="Enter designation"
                value={formData.designation}
                onChange={(e) => handleInputChange('designation', e.target.value)}
                className="form-input mt-1.5"
              />
            </div>

            <Button 
              onClick={handleEnrollment}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 mt-4"
            >
              ✓ Complete Enrollment
            </Button>
          </div>
        </div>
      </div>
    </AttendanceLayout>
  );
}
