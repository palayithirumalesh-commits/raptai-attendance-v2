import { AttendanceLayout } from '@/components/layouts/AttendanceLayout';
import { Card } from '@/components/ui/card';
import { CheckCircle, Clock, XCircle, Users } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const stats = [
  { label: 'Present Today', value: 1, icon: CheckCircle, color: 'bg-emerald-500' },
  { label: 'Late Arrivals', value: 0, icon: Clock, color: 'bg-amber-500' },
  { label: 'Absent Today', value: 13, icon: XCircle, color: 'bg-red-500' },
  { label: 'Total Employees', value: 14, icon: Users, color: 'bg-blue-500' },
];

const distributionData = [
  { name: 'Present', value: 1, color: '#22c55e' },
  { name: 'Late', value: 0, color: '#f59e0b' },
  { name: 'Absent', value: 4, color: '#6b7280' },
];

const legendData = [
  { label: 'Total', value: 5, color: '#3b82f6' },
  { label: 'Present', value: 1, color: '#22c55e' },
  { label: 'Late', value: 0, color: '#f59e0b' },
  { label: 'Absent', value: 4, color: '#6b7280' },
];

export default function AdminDashboard() {
  return (
    <AttendanceLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">Real-time attendance monitoring and analytics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Attendance Trend */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Attendance Trend</h3>
            <div className="flex gap-1">
              {['Today', 'Week', 'Month', 'Year'].map((period, index) => (
                <button
                  key={period}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    index === 1 
                      ? 'bg-muted text-foreground font-medium' 
                      : 'text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-border rounded-lg">
            <div className="text-center text-muted-foreground">
              <span className="text-2xl">📊</span>
              <p className="mt-2">Interactive chart visualization</p>
            </div>
          </div>
        </Card>

        {/* Distribution Chart */}
        <Card className="p-6">
          <h3 className="font-semibold mb-6">Distribution</h3>
          <div className="flex items-center">
            <div className="w-1/2 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-4">
              {legendData.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </AttendanceLayout>
  );
}
