import { Link } from 'react-router-dom';
import { ExternalLink, MessageCircle, Play, Mail } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'AI Teacher', href: '#features' },
    { label: 'PDF Learning', href: '#features' },
    { label: 'Courses', href: '#subjects' },
    { label: 'Pricing', href: '#pricing' },
  ],
  Subjects: [
    { label: 'Physics', href: '/courses' },
    { label: 'Chemistry', href: '/courses' },
    { label: 'Mathematics', href: '/courses' },
    { label: 'Biology', href: '/courses' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Refund Policy', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
                <span className="text-white font-bold text-sm">AT</span>
              </div>
              <span className="text-lg font-display font-bold text-text-primary">AI Teacher</span>
            </Link>
            <p className="text-sm text-text-secondary mb-4">AI-powered education for every Nepali student.</p>
            <div className="flex items-center gap-3">
              {[MessageCircle, Play, ExternalLink, Mail].map((Icon, i) => (
                <a key={i} href="#" className="text-text-muted hover:text-primary-400 transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-text-primary mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-text-muted hover:text-text-secondary transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">&copy; 2026 AI Teacher Platform. All rights reserved.</p>
          <p className="text-xs text-text-muted">Made for Nepal 🇳🇵 with ❤️</p>
        </div>
      </div>
    </footer>
  );
}
