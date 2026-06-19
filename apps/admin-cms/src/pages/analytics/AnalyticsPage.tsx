import { useState } from 'react';
import { Download, Calendar, Activity, TrendingUp, Users, BookOpen } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const mockEngagementData = [
  { name: 'Mon', activeUsers: 4000, newSignups: 240 },
  { name: 'Tue', activeUsers: 3000, newSignups: 139 },
  { name: 'Wed', activeUsers: 5000, newSignups: 980 },
  { name: 'Thu', activeUsers: 2780, newSignups: 390 },
  { name: 'Fri', activeUsers: 1890, newSignups: 480 },
  { name: 'Sat', activeUsers: 2390, newSignups: 380 },
  { name: 'Sun', activeUsers: 3490, newSignups: 430 },
];

const mockSubjectData = [
  { name: 'Physics', views: 8500 },
  { name: 'Math', views: 7200 },
  { name: 'Chemistry', views: 6100 },
  { name: 'Biology', views: 4300 },
  { name: 'Computer Sc', views: 3200 },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('Last 7 Days');

  return (
    <div className="animate-fade-in-up space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">Platform Analytics</h1>
          <p className="text-text-secondary mt-1">Detailed breakdown of platform usage and user engagement.</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-bg-surface border border-border rounded-md px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary-500"
          >
            <option>Today</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
          </select>
          <Button variant="outline" leftIcon={<Download size={18} />}>
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Active Users', value: '24,592', change: '+12.5%', icon: Users, color: 'text-primary-400' },
          { title: 'Avg Session Duration', value: '34m 12s', change: '+2.1%', icon: Clock, color: 'text-accent-cyan' },
          { title: 'Courses Completed', value: '1,432', change: '+18.2%', icon: BookOpen, color: 'text-accent-emerald' },
          { title: 'Total Revenue (NPR)', value: 'Rs. 4.2M', change: '+5.4%', icon: TrendingUp, color: 'text-accent-rose' },
        ].map((stat, i) => (
          <Card key={i} className="p-5 bg-bg-surface border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-text-secondary text-sm font-medium">{stat.title}</p>
                <h3 className="text-2xl font-bold text-text-primary mt-1">{stat.value}</h3>
              </div>
              <div className={`p-2 rounded-lg bg-bg-elevated ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-success-500 text-xs font-semibold bg-success-500/10 px-1.5 py-0.5 rounded">{stat.change}</span>
              <span className="text-text-muted text-xs">vs last period</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 bg-bg-surface border-border">
          <h3 className="text-lg font-bold text-text-primary mb-6">User Engagement Overview</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockEngagementData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2B3041" vertical={false} />
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1E2334', borderColor: '#2B3041', borderRadius: '8px' }}
                  itemStyle={{ color: '#F1F5F9' }}
                />
                <Area type="monotone" dataKey="activeUsers" stroke="#0EA5E9" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" />
                <Area type="monotone" dataKey="newSignups" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorNew)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 bg-bg-surface border-border">
          <h3 className="text-lg font-bold text-text-primary mb-6">Top Subjects</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockSubjectData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2B3041" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} width={80} />
                <RechartsTooltip 
                  cursor={{ fill: '#2B3041' }}
                  contentStyle={{ backgroundColor: '#1E2334', borderColor: '#2B3041', borderRadius: '8px' }}
                />
                <Bar dataKey="views" fill="#10B981" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

const Clock = ({ size, className }: any) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
