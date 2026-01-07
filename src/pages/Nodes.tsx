import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useDashboard } from '@/context/DashboardContext';
import { Input } from '@/components/ui/input';
import { Plus, Eye, EyeOff, Edit, Trash2, Server } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function Nodes() {
  const { nodes, addNode, deleteNode } = useDashboard();
  const [showPassword, setShowPassword] = useState(false);
  const [deleteNodeId, setDeleteNodeId] = useState<string | null>(null);
  const [newNode, setNewNode] = useState({
    ipAddress: '',
    name: '',
    username: '',
    password: '',
    provider: '' as 'AWS' | 'Google Cloud' | 'Azure' | 'On-Premise' | '',
    gpuType: '',
  });

  const handleAddNode = () => {
    if (!newNode.ipAddress || !newNode.name || !newNode.provider || !newNode.gpuType) {
      toast.error('Please fill in all required fields');
      return;
    }
    addNode({
      name: newNode.name,
      ipAddress: newNode.ipAddress,
      provider: newNode.provider as any,
      gpuType: newNode.gpuType,
      gpuCount: 1,
      status: 'online',
      username: newNode.username,
      uptime: 99.9,
      load: 0,
      jobs: 0,
    });
    toast.success('Node added successfully!');
    setNewNode({ ipAddress: '', name: '', username: '', password: '', provider: '', gpuType: '' });
  };

  const handleDeleteNode = () => {
    if (deleteNodeId) {
      deleteNode(deleteNodeId);
      toast.success('Node removed successfully');
      setDeleteNodeId(null);
    }
  };

  return (
    <DashboardLayout title="Node Configuration" subtitle="Manage GPU cluster nodes">
      <div className="space-y-6 animate-fade-in">
        {/* Add Node Form */}
        <div className="card rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-6">Add New Compute Node</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground/80">Node Public IP</label>
              <Input
                type="text"
                placeholder="Enter public IP address"
                value={newNode.ipAddress}
                onChange={(e) => setNewNode({ ...newNode, ipAddress: e.target.value })}
                className="input-field w-full rounded-xl px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground/80">Host Name</label>
              <Input
                type="text"
                placeholder="Enter hostname"
                value={newNode.name}
                onChange={(e) => setNewNode({ ...newNode, name: e.target.value })}
                className="input-field w-full rounded-xl px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground/80">Username</label>
              <Input
                type="text"
                placeholder="Enter SSH username"
                value={newNode.username}
                onChange={(e) => setNewNode({ ...newNode, username: e.target.value })}
                className="input-field w-full rounded-xl px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground/80">Authentication</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="SSH key or password"
                  value={newNode.password}
                  onChange={(e) => setNewNode({ ...newNode, password: e.target.value })}
                  className="input-field w-full rounded-xl px-4 py-3 text-sm pr-10"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground/80">Cloud Provider</label>
              <select
                value={newNode.provider}
                onChange={(e) => setNewNode({ ...newNode, provider: e.target.value as any })}
                className="input-field w-full rounded-xl px-4 py-3 text-sm bg-input border border-border"
              >
                <option value="">Select provider</option>
                <option value="AWS">AWS</option>
                <option value="Google Cloud">Google Cloud</option>
                <option value="Azure">Azure</option>
                <option value="On-Premise">On-Premise</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground/80">GPU Type</label>
              <select
                value={newNode.gpuType}
                onChange={(e) => setNewNode({ ...newNode, gpuType: e.target.value })}
                className="input-field w-full rounded-xl px-4 py-3 text-sm bg-input border border-border"
              >
                <option value="">Select GPU type</option>
                <option value="NVIDIA A100">NVIDIA A100</option>
                <option value="NVIDIA H100">NVIDIA H100</option>
                <option value="NVIDIA RTX 4000">NVIDIA RTX 4000</option>
                <option value="NVIDIA V100">NVIDIA V100</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleAddNode}
            className="btn-primary w-full mt-6 py-4 rounded-xl text-white font-semibold text-base flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Node to Cluster
          </button>
        </div>

        {/* Existing Nodes */}
        <div className="card rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-6">Active Cluster Nodes</h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Node</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">IP Address</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Provider</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">GPU Type</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">GPUs</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-right py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {nodes.map((node) => (
                  <tr key={node.id} className="table-row border-b border-border/10 hover:bg-primary/5 transition">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                          <Server className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold">{node.name}</p>
                          <p className="text-xs text-muted-foreground">{node.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm">{node.ipAddress}</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-warning/15 text-warning border border-warning/30">
                        {node.provider}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm font-medium">{node.gpuType}</td>
                    <td className="py-4 px-4 text-sm">{node.gpuCount}</td>
                    <td className="py-4 px-4">
                      <span className="badge badge-success">{node.status === 'online' ? 'Online' : 'Offline'}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 hover:bg-muted/50 rounded-lg transition text-muted-foreground hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteNodeId(node.id)}
                          className="p-2 hover:bg-muted/50 rounded-lg transition text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AlertDialog open={!!deleteNodeId} onOpenChange={() => setDeleteNodeId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Node</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this node? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteNode} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
