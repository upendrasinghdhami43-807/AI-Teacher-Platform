import { useState } from 'react';
import { Search, Filter, MoreVertical, Edit, Trash2, Mail, Shield, UserX, UserCheck } from 'lucide-react';
import { mockUsers } from '@/data/mockUsers';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="animate-fade-in space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary">Users</h1>
          <p className="text-text-secondary mt-1">Manage students, teachers, and admins.</p>
        </div>
        <Button variant="primary" leftIcon={<Shield size={18} />}>Invite User</Button>
      </div>

      <Card className="p-4 bg-bg-surface border-border flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <Input 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 bg-bg-base border border-border rounded-md text-sm text-text-primary focus:outline-none focus:border-primary-500 transition-colors"
          >
            <option value="all">All Roles</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
          <Button variant="outline" leftIcon={<Filter size={18} />}>More Filters</Button>
        </div>
      </Card>

      <div className="bg-bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-elevated border-b border-border text-text-secondary font-medium">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role & Plan</th>
                <th className="px-6 py-4">Grade & School</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map(user => (
                <tr key={user.user_id} className="hover:bg-bg-hover transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-500/10 text-primary-400 flex items-center justify-center font-bold text-lg uppercase">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-text-primary">{user.name}</div>
                        <div className="text-text-muted text-xs flex items-center gap-1 mt-0.5">
                          <Mail size={12} /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 items-start">
                      <span className="capitalize font-medium text-text-primary">{user.role}</span>
                      <Badge variant={user.plan === 'pro' ? 'glow' : 'glass'} className="text-[10px] uppercase">
                        {user.plan}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-text-secondary text-xs space-y-1">
                      <div className="font-medium text-text-primary">{user.grade}</div>
                      <div className="text-text-muted line-clamp-1">{user.school}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={user.status === 'active' ? 'success' : 'danger'}>
                      {user.status === 'active' ? 'Active' : 'Suspended'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-text-muted hover:text-accent-cyan transition-colors" title="Edit">
                        <Edit size={18} />
                      </button>
                      {user.status === 'active' ? (
                        <button className="p-2 text-text-muted hover:text-warning-400 transition-colors" title="Suspend">
                          <UserX size={18} />
                        </button>
                      ) : (
                        <button className="p-2 text-text-muted hover:text-success-400 transition-colors" title="Activate">
                          <UserCheck size={18} />
                        </button>
                      )}
                      <button className="p-2 text-text-muted hover:text-accent-rose transition-colors" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-text-secondary">
                    No users found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
