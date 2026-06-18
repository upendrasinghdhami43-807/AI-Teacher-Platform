import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Courses', href: '#subjects' },
  { label: 'Pricing', href: '#pricing' },
];

export default function PublicNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-bg-surface/80 backdrop-blur-xl border-b border-border shadow-lg' : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
              <span className="text-white font-bold text-sm">AT</span>
            </div>
            <span className="text-lg font-display font-bold text-text-primary">AI Teacher</span>
          </Link>

          {/* Center nav links (desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          {/* Right buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm">Get Started</Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(o => !o)} className="md:hidden text-text-primary p-1">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fade-in">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 text-sm text-text-secondary hover:text-text-primary rounded-md hover:bg-bg-hover transition-colors">
                {link.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2 px-3">
              <Link to="/login" className="flex-1"><Button variant="ghost" size="sm" fullWidth>Sign In</Button></Link>
              <Link to="/register" className="flex-1"><Button variant="primary" size="sm" fullWidth>Get Started</Button></Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
