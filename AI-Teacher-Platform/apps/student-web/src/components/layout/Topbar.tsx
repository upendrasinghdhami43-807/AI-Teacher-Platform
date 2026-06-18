import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, LogOut, User, Settings } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import Dropdown from '@/components/ui/Dropdown';
import { useAuthStore } from '@/store/authStore';

interface TopbarProps {
  onMenuToggle: () => void;
}

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/ai-teacher': 'AI Teacher',
  '/pdf-learn': 'PDF Learn',
  '/courses': 'Courses',
  '/profile': 'Profile',
  '/settings': 'Settings',
};

export default function Topbar({ onMenuToggle }: TopbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');

  const pageTitle = pageTitles[location.pathname] || 'AI Teacher';

  const handleDropdownSelect = (value: string) => {
    if (value === 'profile') navigate('/profile');
    else if (value === 'settings') navigate('/settings');
    else if (value === 'logout') { logout(); navigate('/'); }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-bg-surface/80 backdrop-blur-xl border-b border-border flex items-center px-4 lg:px-6 gap-4">
      {/* Mobile menu button */}
      <button onClick={onMenuToggle} className="lg:hidden text-text-muted hover:text-text-primary transition-colors p-1">
        <Menu size={22} />
      </button>

      {/* Page title */}
      <h1 className="text-lg font-display font-semibold text-text-primary">{pageTitle}</h1>

      {/* Search (desktop) */}
      <div className="hidden md:flex flex-1 max-w-md mx-auto">
        <div className="relative w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search topics, courses, lessons..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-bg-base border border-border rounded-full text-sm text-text-primary placeholder:text-text-muted focus:border-border-focus focus:ring-2 focus:ring-primary-500/15 focus:outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex-1 md:hidden" />

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button className="relative p-2 text-text-muted hover:text-text-primary transition-colors rounded-md hover:bg-bg-hover">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-4 h-4 bg-accent-rose text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
        </button>

        {/* User dropdown */}
        {user && (
          <Dropdown
            align="right"
            trigger={
              <div className="flex items-center gap-2 cursor-pointer p-1 rounded-md hover:bg-bg-hover transition-colors">
                <Avatar name={user.name} size="sm" />
                <span className="hidden md:block text-sm text-text-primary font-medium">{user.name.split(' ')[0]}</span>
              </div>
            }
            items={[
              { label: 'Profile', value: 'profile', icon: <User size={14} /> },
              { label: 'Settings', value: 'settings', icon: <Settings size={14} /> },
              { label: '', value: '', divider: true },
              { label: 'Sign Out', value: 'logout', icon: <LogOut size={14} />, danger: true },
            ]}
            onSelect={handleDropdownSelect}
          />
        )}
      </div>
    </header>
  );
}
