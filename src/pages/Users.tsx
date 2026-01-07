import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useDashboard } from '@/context/DashboardContext';
import { UserPlus, Edit, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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

const USER_COLORS = ['#6366f1', '#3b82f6', '#ec4899', '#6b7280'];

export default function Users() {
  const { users, addUser, updateUser, deleteUser, stats } = useDashboard();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', gpuQuota: 2 });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast.error('Please fill in all fields');
      return;
    }
    addUser({
      name: newUser.name,
      email: newUser.email,
      gpuQuota: newUser.gpuQuota,
      jobsCompleted: 0,
      gpuHours: 0,
      successRate: 100,
      status: 'active',
      activeGpus: 0,
      color: 'from-emerald-500 to-teal-500',
    });
    toast.success(`User "${newUser.name}" added successfully!`);
    setNewUser({ name: '', email: '', gpuQuota: 2 });
    setAddDialogOpen(false);
  };

  const handleEditQuota = () => {
    if (editingUser) {
      updateUser(editingUser.id, { gpuQuota: editingUser.gpuQuota });
      toast.success(`GPU quota updated for ${editingUser.name}`);
      setEditDialogOpen(false);
      setEditingUser(null);
    }
  };

  const handleDeleteUser = () => {
    if (deleteUserId) {
      const user = users.find(u => u.id === deleteUserId);
      deleteUser(deleteUserId);
      toast.success(`User "${user?.name}" removed`);
      setDeleteUserId(null);
    }
  };

  const chartData = users.map((user, i) => ({
    name: user.name,
    value: user.gpuQuota,
    color: USER_COLORS[i % USER_COLORS.length],
  }));

  const totalQuota = users.reduce((sum, u) => sum + u.gpuQuota, 0);
  const allocatedGpus = users.reduce((sum, u) => sum + u.activeGpus, 0);

  return (
    <DashboardLayout title="User Management" subtitle="Manage user access and quotas">
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">User Management</h2>
            <p className="text-sm text-muted-foreground">Manage user access and quotas</p>
          </div>
          <button
            onClick={() => setAddDialogOpen(true)}
            className="btn-primary px-5 py-2.5 rounded-xl text-white font-medium text-sm flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Add New User
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Users */}
          <div className="card rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6">Active Users</h3>
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="p-5 rounded-xl border border-border/50 hover:border-primary/30 transition">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center font-bold`}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <span className="badge badge-success capitalize">{user.status}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">GPU Quota</p>
                      <p className="text-lg font-bold text-primary">{user.gpuQuota}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">Jobs Run</p>
                      <p className="text-lg font-bold text-secondary">{user.jobsCompleted}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">Success</p>
                      <p className="text-lg font-bold text-success">{user.successRate}%</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingUser({ ...user });
                        setEditDialogOpen(true);
                      }}
                      className="btn-secondary flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1"
                    >
                      <Edit className="w-3 h-3" />
                      Edit Quota
                    </button>
                    <button
                      onClick={() => setDeleteUserId(user.id)}
                      className="btn-secondary px-4 py-2 rounded-lg text-xs font-medium text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GPU Quota Distribution */}
          <div className="card rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6">GPU Quota Distribution</h3>
            <div className="chart-container rounded-xl p-6 bg-card/40 border border-border/50 mb-6">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(230, 37%, 16%)', border: '1px solid hsl(234, 89%, 74%, 0.3)', borderRadius: '8px' }}
                    formatter={(value) => [`${value} GPUs`, '']}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(value) => <span className="text-muted-foreground text-sm">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                <span className="text-sm font-medium">Total GPU Quota</span>
                <span className="text-lg font-bold gradient-text">{totalQuota} GPUs</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-border/50">
                <span className="text-sm font-medium">Allocated</span>
                <span className="text-lg font-bold text-secondary">{allocatedGpus} GPUs</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-border/50">
                <span className="text-sm font-medium">Available</span>
                <span className="text-lg font-bold text-success">{totalQuota - allocatedGpus} GPUs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add User Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new user with GPU quota allocation.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Name</label>
              <Input
                placeholder="Enter user name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <Input
                placeholder="Enter email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">GPU Quota</label>
              <Input
                type="number"
                min={1}
                max={5}
                value={newUser.gpuQuota}
                onChange={(e) => setNewUser({ ...newUser, gpuQuota: parseInt(e.target.value) || 1 })}
              />
            </div>
          </div>
          <DialogFooter>
            <button onClick={() => setAddDialogOpen(false)} className="btn-secondary px-4 py-2 rounded-lg">
              Cancel
            </button>
            <button onClick={handleAddUser} className="btn-primary px-4 py-2 rounded-lg text-white">
              Add User
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Quota Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit GPU Quota</DialogTitle>
            <DialogDescription>Update GPU quota for {editingUser?.name}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label className="text-sm font-medium mb-2 block">GPU Quota</label>
            <Input
              type="number"
              min={1}
              max={5}
              value={editingUser?.gpuQuota || 2}
              onChange={(e) => setEditingUser({ ...editingUser, gpuQuota: parseInt(e.target.value) || 1 })}
            />
          </div>
          <DialogFooter>
            <button onClick={() => setEditDialogOpen(false)} className="btn-secondary px-4 py-2 rounded-lg">
              Cancel
            </button>
            <button onClick={handleEditQuota} className="btn-primary px-4 py-2 rounded-lg text-white">
              Save
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteUserId} onOpenChange={() => setDeleteUserId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this user? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
