import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useDashboard } from '@/context/DashboardContext';
import { Cpu, Zap, Thermometer, Gauge } from 'lucide-react';

function ResourceBar({ label, value, colorClass }: { label: string; value: number; colorClass: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-foreground/80">{label}</span>
        <span className={`text-sm font-bold ${colorClass}`}>{value}%</span>
      </div>
      <div className="w-full bg-muted/50 rounded-full h-3">
        <div
          className={`h-3 rounded-full ${colorClass.includes('indigo') ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 
            colorClass.includes('purple') ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
            colorClass.includes('blue') ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
            'bg-gradient-to-r from-green-500 to-emerald-500'}`}
          style={{ width: `${value}%`, transition: 'width 0.5s ease' }}
        />
      </div>
    </div>
  );
}

function GPUMetricCard({ gpu }: { gpu: any }) {
  return (
    <div className="p-5 rounded-xl border border-border/50 hover:border-primary/30 transition">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <p className="font-semibold">{gpu.name}</p>
            <p className="text-xs text-muted-foreground">Node: {gpu.node}</p>
          </div>
        </div>
        <span className="badge badge-success">Active</span>
      </div>
      <div className="grid grid-cols-4 gap-3 text-center">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Load</p>
          <p className="text-lg font-bold text-primary">{gpu.load}%</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Memory</p>
          <p className="text-lg font-bold text-secondary">{gpu.memory}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Temp</p>
          <p className="text-lg font-bold text-warning">{gpu.temperature}°C</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Power</p>
          <p className="text-lg font-bold text-success">{gpu.power}W</p>
        </div>
      </div>
    </div>
  );
}

function UserAllocationCard({ user }: { user: any }) {
  const allocationPercent = (user.activeGpus / user.gpuQuota) * 100;
  
  return (
    <div className="p-5 rounded-xl border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center font-bold text-sm`}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-xs text-muted-foreground">Quota: {user.gpuQuota} GPUs</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-muted-foreground">{Math.round(allocationPercent)}%</p>
          <p className="text-xs text-muted-foreground">{user.activeGpus}/{user.gpuQuota} allocated</p>
        </div>
      </div>
      <div className="w-full bg-muted/50 rounded-full h-2">
        <div
          className={`h-2 rounded-full bg-gradient-to-r ${user.color}`}
          style={{ width: `${allocationPercent}%` }}
        />
      </div>
    </div>
  );
}

export default function Monitoring() {
  const { users } = useDashboard();
  const [resources, setResources] = useState({
    gpuCompute: 78,
    gpuMemory: 65,
    cpuUsage: 42,
    networkIO: 34,
  });

  const gpus = [
    { id: '1', name: 'GPU 0 - RTX 4000', node: 'nvidia-pod', load: 85, memory: '7.2GB', temperature: 72, power: 180 },
    { id: '2', name: 'GPU 1-4 - A100', node: 'nvidia-pod2', load: 72, memory: '28GB', temperature: 68, power: 1200 },
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setResources(prev => ({
        gpuCompute: Math.max(60, Math.min(95, prev.gpuCompute + Math.floor(Math.random() * 10 - 5))),
        gpuMemory: Math.max(50, Math.min(90, prev.gpuMemory + Math.floor(Math.random() * 10 - 5))),
        cpuUsage: Math.max(30, Math.min(70, prev.cpuUsage + Math.floor(Math.random() * 10 - 5))),
        networkIO: Math.max(20, Math.min(60, prev.networkIO + Math.floor(Math.random() * 10 - 5))),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout title="Live Monitoring" subtitle="Real-time resource tracking">
      <div className="space-y-6 animate-fade-in">
        {/* Live Status */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-xs text-muted-foreground">Live Updates</span>
        </div>

        {/* Resource Distribution */}
        <div className="card rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-6">Resource Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ResourceBar label="GPU Compute" value={resources.gpuCompute} colorClass="text-primary" />
            <ResourceBar label="GPU Memory" value={resources.gpuMemory} colorClass="text-secondary" />
            <ResourceBar label="CPU Usage" value={resources.cpuUsage} colorClass="text-info" />
            <ResourceBar label="Network I/O" value={resources.networkIO} colorClass="text-success" />
          </div>
        </div>

        {/* GPU Monitoring Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-6">GPU Performance Metrics</h3>
            <div className="space-y-4">
              {gpus.map(gpu => (
                <GPUMetricCard key={gpu.id} gpu={gpu} />
              ))}
            </div>
          </div>

          <div className="card rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-6">User Allocation</h3>
            <div className="space-y-4">
              {users.map(user => (
                <UserAllocationCard key={user.id} user={user} />
              ))}
            </div>
          </div>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card rounded-2xl p-6 text-center">
            <div className="metric-icon mx-auto mb-4">
              <Zap className="w-8 h-8 text-yellow-400" />
            </div>
            <p className="text-sm text-muted-foreground mb-2 font-medium">Total Power Draw</p>
            <p className="text-4xl font-bold gradient-text mb-1">1,380W</p>
            <p className="text-xs text-muted-foreground">Across all GPUs</p>
          </div>

          <div className="card rounded-2xl p-6 text-center">
            <div className="metric-icon mx-auto mb-4">
              <Thermometer className="w-8 h-8 text-warning" />
            </div>
            <p className="text-sm text-muted-foreground mb-2 font-medium">Avg Temperature</p>
            <p className="text-4xl font-bold gradient-text mb-1">69°C</p>
            <p className="text-xs text-muted-foreground">Within safe limits</p>
          </div>

          <div className="card rounded-2xl p-6 text-center">
            <div className="metric-icon mx-auto mb-4">
              <Gauge className="w-8 h-8 text-success" />
            </div>
            <p className="text-sm text-muted-foreground mb-2 font-medium">Avg Clock Speed</p>
            <p className="text-4xl font-bold gradient-text mb-1">1.78GHz</p>
            <p className="text-xs text-muted-foreground">Boost active</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
