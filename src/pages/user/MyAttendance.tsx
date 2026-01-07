import { useState } from 'react';
import { AttendanceLayout } from '@/components/layouts/AttendanceLayout';
import { useAttendance } from '@/context/AttendanceContext';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CheckCircle, Clock, XCircle, Search, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const summaryStats = [
  { label: 'Days Present', value: 12, icon: CheckCircle, bgColor: 'bg-emerald-500' },
  { label: 'Days Late', value: 2, icon: Clock, bgColor: 'bg-amber-500' },
  { label: 'Days Absent', value: 1, icon: XCircle, bgColor: 'bg-red-500' },
];

export default function MyAttendance() {
  const { attendanceRecords } = useAttendance();
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filteredRecords = attendanceRecords.filter(record => 
    record.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AttendanceLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Attendance</h1>
        <p className="text-muted-foreground">View and manage attendance history</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {summaryStats.map((stat) => (
          <Card key={stat.label} className="p-6 flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold italic" style={{ color: stat.bgColor.replace('bg-', '').includes('emerald') ? '#22c55e' : stat.bgColor.includes('amber') ? '#f59e0b' : '#ef4444' }}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
            <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </Card>
        ))}
      </div>

      {/* Attendance History */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg">Attendance History</h3>
          <div className="flex gap-3">
            <div className="relative">
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="form-input pl-10 w-40"
              />
              <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
            <div className="relative">
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input pl-10 w-48"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>

        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
              <th>Hours Worked</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id}>
                <td className="font-medium">{record.date}</td>
                <td className={record.checkIn ? 'time-green' : 'text-muted-foreground'}>
                  {record.checkIn || '-'}
                </td>
                <td className={record.checkOut ? 'time-red' : 'text-muted-foreground'}>
                  {record.checkOut || '-'}
                </td>
                <td>
                  <span className={cn(
                    'status-badge',
                    record.status === 'Present' && 'status-present',
                    record.status === 'Late' && 'status-late',
                    record.status === 'Absent' && 'status-absent'
                  )}>
                    {record.status}
                  </span>
                </td>
                <td className="text-muted-foreground">{record.hoursWorked}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AttendanceLayout>
  );
}
