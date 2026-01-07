import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useDashboard } from '@/context/DashboardContext';
import { Clock, CheckCircle, TrendingUp, Timer } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const chartData = [
  { day: 'Mon', usage: 65 },
  { day: 'Tue', usage: 72 },
  { day: 'Wed', usage: 81 },
  { day: 'Thu', usage: 89 },
  { day: 'Fri', usage: 75 },
  { day: 'Sat', usage: 68 },
  { day: 'Sun', usage: 62 },
];

function AnalyticsStatCard({ icon: Icon, iconColor, value, label, badge, badgeColor }: {
  icon: any;
  iconColor: string;
  value: string | number;
  label: string;
  badge?: string;
  badgeColor?: string;
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
    </div>
  );
}

export default function Analytics() {
  const { users } = useDashboard();
  const [timeRange, setTimeRange] = useState('7days');
  const [activeTab, setActiveTab] = useState('usage');

  const totalGpuHours = users.reduce((sum, u) => sum + u.gpuHours, 0);
  const totalJobs = users.reduce((sum, u) => sum + u.jobsCompleted, 0);
  const avgSuccessRate = users.reduce((sum, u) => sum + u.successRate, 0) / users.length;

  return (
    <DashboardLayout title="Analytics & Insights" subtitle="Historical performance data">
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Analytics & Insights</h2>
            <p className="text-sm text-muted-foreground">Historical performance data</p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field rounded-xl px-4 py-2 text-sm bg-input border border-border"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="year">Last Year</option>
          </select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnalyticsStatCard
            icon={Clock}
            iconColor="text-info"
            value={totalGpuHours.toLocaleString()}
            label="Total GPU Hours"
            badge="+12%"
            badgeColor="badge-success"
          />
          <AnalyticsStatCard
            icon={CheckCircle}
            iconColor="text-success"
            value={totalJobs}
            label="Jobs Completed"
            badge="+8%"
            badgeColor="badge-success"
          />
          <AnalyticsStatCard
            icon={TrendingUp}
            iconColor="text-secondary"
            value={`${avgSuccessRate.toFixed(1)}%`}
            label="Success Rate"
            badge="99.2%"
            badgeColor="badge-info"
          />
          <AnalyticsStatCard
            icon={Timer}
            iconColor="text-warning"
            value="2.8h"
            label="Avg Job Duration"
            badge="Avg"
            badgeColor="badge-info"
          />
        </div>

        {/* Chart */}
        <div className="card rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">GPU Utilization Over Time</h3>
            <div className="flex space-x-2">
              {['usage', 'memory', 'temperature'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition ${
                    activeTab === tab
                      ? 'bg-primary text-white'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="chart-container rounded-xl p-6 bg-card/40 border border-border/50">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="day" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(230, 37%, 16%)', border: '1px solid hsl(234, 89%, 74%, 0.3)', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="usage" radius={[8, 8, 0, 0]}>
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill="url(#barGradient)" />
                  ))}
                </Bar>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(234, 89%, 74%)" />
                    <stop offset="100%" stopColor="hsl(270, 67%, 58%)" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Statistics */}
        <div className="card rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-6">User Performance Statistics</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">User</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Jobs Completed</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">GPU Hours</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Success Rate</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="table-row border-b border-border/10 hover:bg-primary/5 transition">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center font-bold`}>
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm">{user.jobsCompleted}</td>
                    <td className="py-4 px-4 text-sm">{user.gpuHours}</td>
                    <td className="py-4 px-4">
                      <span className="text-success font-semibold">{user.successRate}%</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="badge badge-success capitalize">{user.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
