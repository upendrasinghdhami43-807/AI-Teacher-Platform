import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, Wrench, FolderOpen, FileText, Mic, MessageSquare, TrendingUp, Sparkles, Settings, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navGroups = [
  { label: 'OVERVIEW', items: [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  ]},
  { label: 'USERS', items: [
    { to: '/users', icon: Users, label: 'All Students' },
  ]},
  { label: 'CONTENT', items: [
    { to: '/courses', icon: BookOpen, label: 'Courses' },
    { to: '/courses/new', icon: Wrench, label: 'Course Builder' },
    { to: '/content', icon: FolderOpen, label: 'Content Library' },
    { to: '/pdfs', icon: FileText, label: 'AI PDF Teacher' },
    { to: '/lectures', icon: Mic, label: 'Lecture Library' },
  ]},
  { label: 'AI & INSIGHTS', items: [
    { to: '/chat-history', icon: MessageSquare, label: 'Chat History' },
    { to: '/analytics', icon: TrendingUp, label: 'Analytics' },
  ]},
  { label: 'PLATFORM', items: [
    { to: '/personas', icon: Sparkles, label: 'Personas' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ]},
];

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const location = useLocation();

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />}
      <aside className={cn(
        'fixed top-0 left-0 z-50 h-screen w-[240px] bg-[#0A0A14] border-r border-border flex flex-col transition-transform duration-300',
        'lg:translate-x-0', isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
          <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
            <span className="text-white font-bold text-sm">AT</span>
          </div>
          <span className="text-base font-display font-bold text-text-primary">Admin Panel</span>
          <button onClick={onClose} className="ml-auto lg:hidden text-text-muted hover:text-text-primary"><X size={20} /></button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5 scrollbar-thin">
          {navGroups.map(group => (
            <div key={group.label}>
              <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-text-muted">{group.label}</p>
              <div className="space-y-0.5">
                {group.items.map(item => {
                  const isActive = location.pathname === item.to || (item.to !== '/courses/new' && item.to !== '/courses' && location.pathname.startsWith(item.to));
                  const isExactActive = location.pathname === item.to;
                  const active = item.to === '/courses' ? isExactActive : (item.to === '/courses/new' ? isExactActive : isActive);
                  return (
                    <NavLink key={item.to} to={item.to} onClick={onClose}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150',
                        active ? 'bg-primary-500/[0.12] text-white border-l-2 border-primary-500' : 'text-text-secondary hover:bg-primary-500/[0.07] hover:text-text-primary border-l-2 border-transparent'
                      )}>
                      <item.icon size={18} className={cn(active ? 'text-primary-400' : 'text-text-muted')} />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-border px-4 py-4">
          <div className="flex items-center gap-3">
            <Avatar name="Super Admin" size="sm" />
            <div className="min-w-0">
              <p className="text-xs text-text-muted truncate">superadmin@aiteacher.np</p>
              <Badge variant="violet" size="sm">Super Admin</Badge>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
