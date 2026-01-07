import { useState } from 'react';
import { AttendanceLayout } from '@/components/layouts/AttendanceLayout';
import { useAttendance } from '@/context/AttendanceContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Database, Camera } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettings() {
  const { cameras, updateCamera } = useAttendance();
  const [localCameras, setLocalCameras] = useState(cameras);

  const handleCameraChange = (id: string, field: string, value: string | number) => {
    setLocalCameras(prev => prev.map(cam => 
      cam.id === id ? { ...cam, [field]: value } : cam
    ));
  };

  const handleSave = () => {
    localCameras.forEach(cam => updateCamera(cam.id, cam));
    toast.success('Configuration saved successfully!');
  };

  return (
    <AttendanceLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">System Configuration</h1>
        <p className="text-muted-foreground">Manage camera, model, and system settings</p>
      </div>

      <div className="flex gap-4 mb-8">
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 gap-2">
          <Save className="w-4 h-4" />
          Save Config
        </Button>
        <Button variant="outline" className="gap-2 flex-1 max-w-xs justify-center">
          <Database className="w-4 h-4" />
          View Previous Data
        </Button>
      </div>

      {/* Camera Configuration */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Camera className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-semibold text-lg">Camera Configuration</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {localCameras.map((camera) => (
            <div key={camera.id} className="camera-config">
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-2 h-2 rounded-full ${camera.isEntry ? 'bg-primary' : 'bg-destructive'}`} />
                <span className={`font-medium ${camera.isEntry ? 'text-primary' : 'text-destructive'}`}>
                  Camera {camera.id} ({camera.isEntry ? 'Entry' : 'Exit'})
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Camera Name</Label>
                  <Input
                    value={camera.name}
                    onChange={(e) => handleCameraChange(camera.id, 'name', e.target.value)}
                    className="form-input mt-1.5"
                  />
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">Camera Type</Label>
                  <Select
                    value={camera.type}
                    onValueChange={(value) => handleCameraChange(camera.id, 'type', value)}
                  >
                    <SelectTrigger className="form-input mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USB">USB</SelectItem>
                      <SelectItem value="IP">IP</SelectItem>
                      <SelectItem value="RTSP">RTSP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">Stream URL</Label>
                  <Input
                    value={camera.streamUrl}
                    onChange={(e) => handleCameraChange(camera.id, 'streamUrl', e.target.value)}
                    placeholder="rtsp://... or leave empty"
                    className="form-input mt-1.5"
                  />
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">Camera Index</Label>
                  <Input
                    type="number"
                    value={camera.cameraIndex}
                    onChange={(e) => handleCameraChange(camera.id, 'cameraIndex', parseInt(e.target.value) || 0)}
                    className="form-input mt-1.5"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AttendanceLayout>
  );
}
