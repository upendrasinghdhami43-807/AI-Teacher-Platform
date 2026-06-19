import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, LogOut, User } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import Dropdown from '@/components/ui/Dropdown';
import { useAdminAuthStore } from '@/store/adminAuthStore';

interface AdminTopbarProps {
  onMenuToggle: () => void;
}

export default function AdminTopbar({ onMenuToggle }: AdminTopbarProps) {
  const navigate = useNavigate();
  const { admin, logout } = useAdminAuthStore();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelect = (value: string) => {
    if (value === 'logout') { logout(); navigate('/'); }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-bg-surface/80 backdrop-blur-xl border-b border-border flex items-center px-4 lg:px-6 gap-4">
      <button onClick={onMenuToggle} className="lg:hidden text-text-muted hover:text-text-primary p-1"><Menu size={22} /></button>
      <h1 className="text-sm font-medium text-text-muted">Home</h1>

      <div className="hidden md:flex flex-1 max-w-md mx-auto">
        <div className="relative w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input type="text" placeholder="Search students, courses, content..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-bg-base border border-border rounded-full text-sm text-text-primary placeholder:text-text-muted focus:border-border-focus focus:ring-2 focus:ring-primary-500/15 focus:outline-none transition-all" />
        </div>
      </div>

      <div className="flex-1 md:hidden" />

      <div className="flex items-center gap-3">
        <button className="relative p-2 text-text-muted hover:text-text-primary transition-colors rounded-md hover:bg-bg-hover">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-4 h-4 bg-accent-rose text-white text-[10px] font-bold rounded-full flex items-center justify-center">5</span>
        </button>

        {admin && (
          <Dropdown align="right"
            trigger={<div className="flex items-center gap-2 cursor-pointer p-1 rounded-md hover:bg-bg-hover transition-colors">
              <Avatar name={admin.name} size="sm" />
              <span className="hidden md:block text-sm text-text-primary font-medium">{admin.name}</span>
            </div>}
            items={[
              { label: 'Profile', value: 'profile', icon: <User size={14} /> },
              { label: '', value: '', divider: true },
              { label: 'Sign Out', value: 'logout', icon: <LogOut size={14} />, danger: true },
            ]}
            onSelect={handleSelect}
          />
        )}
      </div>
    </header>
  );
}
