import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useDashboard } from '@/context/DashboardContext';
import { Cpu, Network, ListTodo, CheckCircle } from 'lucide-react';
import { GPUGauge } from '@/components/dashboard/GPUGauge';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { time: '00:00', utilization: 45 },
  { time: '04:00', utilization: 62 },
  { time: '08:00', utilization: 75 },
  { time: '12:00', utilization: 92 },
  { time: '16:00', utilization: 88 },
  { time: '20:00', utilization: 70 },
  { time: '24:00', utilization: 55 },
];

function StatCard({ icon: Icon, iconColor, value, label, badge, badgeColor, subtext }: {
  icon: any;
  iconColor: string;
  value: string | number;
  label: string;
  badge?: string;
  badgeColor?: string;
  subtext?: string;
}) {
  return (
    <div className="stat-card rounded-2xl p-6 group">
      <div className="flex items-start justify-between mb-4">
        <div className="metric-icon">
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        {badge && (
          <span className={`badge ${badgeColor}`}>{badge}</span>
        )}
      </div>
      <h3 className="text-3xl font-bold mb-1 gradient-text">{value}</h3>
      <p className="text-sm text-muted-foreground font-medium">{label}</p>
      {subtext && (
        <div className="mt-3 pt-3 border-t border-border/50">
          <p className="text-xs text-muted-foreground">{subtext}</p>
        </div>
      )}
    </div>
  );
}

function ActiveNodeCard({ node }: { node: any }) {
  return (
    <div className="p-4 rounded-xl border border-border/50 hover:border-primary/30 transition cursor-pointer">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-xs font-bold">
            {node.provider}
          </div>
          <div>
            <p className="font-semibold">{node.name}</p>
            <p className="text-xs text-muted-foreground">{node.gpuType} • {node.gpuCount} GPU{node.gpuCount > 1 ? 's' : ''}</p>
          </div>
        </div>
        <span className="badge badge-success">Active</span>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center text-xs">
        <div>
          <p className="text-muted-foreground mb-1">Uptime</p>
          <p className="font-bold text-success">{node.uptime}%</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1">Load</p>
          <p className="font-bold text-primary">{node.load}%</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1">Jobs</p>
          <p className="font-bold text-secondary">{node.jobs}</p>
        </div>
      </div>
    </div>
  );
}

function UserActivityCard({ user }: { user: any }) {
  return (
    <div className="p-4 rounded-xl border border-border/50 hover:border-primary/30 transition cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center font-bold text-sm`}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.jobsCompleted} jobs • {user.gpuHours} GPU hours</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-success">{user.successRate}%</p>
          <p className="text-xs text-muted-foreground">Success rate</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Quota: {user.gpuQuota} GPUs</span>
        <span className="badge badge-info">{user.activeGpus}/{user.gpuQuota} Active</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { users, nodes, stats } = useDashboard();

  return (
    <DashboardLayout title="Dashboard Overview" subtitle="Real-time infrastructure monitoring">
      <div className="space-y-6 animate-fade-in">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Cpu}
            iconColor="text-primary"
            value={stats.totalGpus}
            label="Total GPUs"
            badge="+12%"
            badgeColor="badge-success"
            subtext={`${stats.totalGpus} Active • 0 Idle`}
          />
          <StatCard
            icon={Network}
            iconColor="text-secondary"
            value={stats.totalNodes}
            label="Compute Nodes"
            badge="100%"
            badgeColor="badge-success"
            subtext="All nodes online"
          />
          <StatCard
            icon={ListTodo}
            iconColor="text-pink-400"
            value={stats.activeJobs}
            label="Active Jobs"
            badge="Live"
            badgeColor="badge-info"
            subtext="Processing workloads"
          />
          <StatCard
            icon={CheckCircle}
            iconColor="text-success"
            value={stats.completedJobs}
            label="Completed Jobs"
            badge="+8%"
            badgeColor="badge-success"
            subtext="This week"
          />
        </div>

        {/* GPU Utilization Chart & Gauges */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">GPU Utilization (24h)</h3>
              <button className="text-xs text-primary hover:text-primary/80 font-medium">View Details →</button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorUtil" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(234, 89%, 74%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(234, 89%, 74%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(230, 37%, 16%)', border: '1px solid hsl(234, 89%, 74%, 0.3)', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="utilization" stroke="hsl(234, 89%, 74%)" strokeWidth={3} fill="url(#colorUtil)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <GPUGauge />
        </div>

        {/* Active Nodes & User Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Active Compute Nodes</h3>
              <button className="text-xs text-primary hover:text-primary/80 font-medium">View All →</button>
            </div>
            <div className="space-y-4">
              {nodes.map(node => (
                <ActiveNodeCard key={node.id} node={node} />
              ))}
            </div>
          </div>

          <div className="card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">User Activity</h3>
              <button className="btn-secondary px-4 py-2 rounded-lg text-xs font-medium">
                Add User
              </button>
            </div>
            <div className="space-y-4">
              {users.map(user => (
                <UserActivityCard key={user.id} user={user} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
