import { Users, BookOpen, Clock, Activity, TrendingUp, Cpu } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { mockAnalytics, mockActivityEvents } from '@/data/mockAdminData';
import Card from '@/components/ui/Card';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Students', value: mockAnalytics.total_students.toLocaleString(), icon: Users, color: 'text-blue-400', trend: '+12%' },
    { label: 'Active Today', value: mockAnalytics.active_today.toLocaleString(), icon: Activity, color: 'text-green-400', trend: '+5%' },
    { label: 'AI Sessions Today', value: mockAnalytics.total_sessions_today.toLocaleString(), icon: Cpu, color: 'text-purple-400', trend: '+24%' },
    { label: 'Total Courses', value: mockAnalytics.total_courses, icon: BookOpen, color: 'text-yellow-400', trend: '0%' },
  ];

  return (
    <div className="animate-fade-in space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary">Dashboard Overview</h1>
          <p className="text-text-secondary mt-1">Platform metrics and real-time activity.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 bg-bg-surface border-border">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-bg-elevated ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div className="flex items-center text-sm font-medium text-green-400">
                <TrendingUp size={16} className="mr-1" /> {stat.trend}
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-text-primary">{stat.value}</h3>
              <p className="text-sm text-text-secondary mt-1">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Growth Chart */}
          <Card className="p-6 bg-bg-surface border-border">
            <h2 className="text-lg font-bold text-text-primary mb-6">User Growth (Last 30 Days)</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockAnalytics.user_growth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => val.slice(5)} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }}
                    itemStyle={{ color: '#0ea5e9' }}
                  />
                  <Area type="monotone" dataKey="count" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Activity Chart */}
          <Card className="p-6 bg-bg-surface border-border">
            <h2 className="text-lg font-bold text-text-primary mb-6">Hourly Activity (Today)</h2>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockAnalytics.hourly_activity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="hour" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}:00`} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: '#334155', opacity: 0.4 }}
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }}
                  />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Recent Activity Feed */}
        <div className="space-y-6">
          <Card className="p-6 bg-bg-surface border-border flex flex-col h-full">
            <h2 className="text-lg font-bold text-text-primary mb-6">Real-time Activity</h2>
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
              {mockActivityEvents.map((event, i) => (
                <div key={event.id} className="relative pl-6">
                  {/* Timeline line */}
                  {i !== mockActivityEvents.length - 1 && (
                    <div className="absolute left-[11px] top-6 bottom-[-24px] w-px bg-border" />
                  )}
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-bg-elevated border-2 border-primary-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary-400" />
                  </div>
                  
                  <div>
                    <p className="text-sm text-text-primary font-medium">
                      {event.user_name} <span className="text-text-secondary font-normal">{event.description}</span>
                    </p>
                    <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
                      <Clock size={12} /> {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
