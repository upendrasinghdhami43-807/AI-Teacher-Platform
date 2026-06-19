import { NavLink, useLocation } from 'react-router-dom';
import { Home, Bot, FileText, BookOpen, BarChart3, User, Settings, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { useAuthStore } from '@/store/authStore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  to: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  comingSoon?: boolean;
}

const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: 'LEARN',
    items: [
      { to: '/dashboard', icon: Home, label: 'Dashboard' },
      { to: '/ai-teacher', icon: Bot, label: 'AI Teacher' },
      { to: '/pdf-learn', icon: FileText, label: 'PDF AI Teacher' },
      { to: '/courses', icon: BookOpen, label: 'Courses' },
    ],
  },
  {
    label: 'TRACK',
    items: [
      { to: '/progress', icon: BarChart3, label: 'My Progress' },
    ],
  },
  {
    label: 'ACCOUNT',
    items: [
      { to: '/profile', icon: User, label: 'Profile' },
      { to: '/settings', icon: Settings, label: 'Settings' },
    ],
  },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const user = useAuthStore(s => s.user);
  const location = useLocation();

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
        <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
          <span className="text-white font-bold text-sm">AT</span>
        </div>
        <span className="text-lg font-display font-bold text-text-primary">AI Teacher</span>
        <button onClick={onClose} className="ml-auto lg:hidden text-text-muted hover:text-text-primary">
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-thin">
        {navGroups.map(group => (
          <div key={group.label}>
            <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-text-muted">{group.label}</p>
            <div className="space-y-0.5">
              {group.items.map(item => {
                const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
                return (
                  <NavLink
                    key={item.to}
                    to={item.comingSoon ? '#' : item.to}
                    onClick={e => { if (item.comingSoon) e.preventDefault(); else onClose(); }}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 group',
                      isActive
                        ? 'bg-primary-500/[0.12] text-white border-l-2 border-primary-500 ml-0'
                        : 'text-text-secondary hover:bg-primary-500/[0.07] hover:text-text-primary border-l-2 border-transparent',
                      item.comingSoon && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    <item.icon size={18} className={cn(isActive ? 'text-primary-400' : 'text-text-muted group-hover:text-text-secondary')} />
                    <span>{item.label}</span>
                    {item.comingSoon && <Badge variant="muted" size="sm" className="ml-auto">Soon</Badge>}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Section */}
      {user && (
        <div className="border-t border-border px-4 py-4">
          <div className="flex items-center gap-3">
            <Avatar name={user.name} size="sm" status="online" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">{user.name}</p>
              <Badge variant={user.plan === 'pro' ? 'violet' : user.plan === 'basic' ? 'cyan' : 'muted'} size="sm">
                {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
              </Badge>
            </div>
          </div>
          {user.plan === 'free' && (
            <button className="mt-3 w-full flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary-400 bg-primary-500/10 rounded-md hover:bg-primary-500/20 transition-colors">
              <Sparkles size={12} /> Upgrade Plan
            </button>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed top-0 left-0 z-50 h-screen w-[260px] bg-bg-surface border-r border-border flex flex-col transition-transform duration-300',
        'lg:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {sidebarContent}
      </aside>
    </>
  );
}
