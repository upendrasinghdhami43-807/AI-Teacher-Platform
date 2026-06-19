import { useState } from 'react';
import { User, Mail, GraduationCap, Settings, LogOut, Camera, Shield, Bell } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Student',
    email: user?.email || 'student@example.com',
    grade: user?.grade || 'Class 11 (Science)'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  return (
    <div className="animate-fade-in-up space-y-8 pb-10 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold text-text-primary">Profile Settings</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left sidebar */}
        <div className="space-y-6">
          <Card className="p-6 bg-bg-surface border-border text-center flex flex-col items-center">
            <div className="relative mb-4 group cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-bg-elevated border-2 border-primary-500/30 flex items-center justify-center overflow-hidden">
                <User size={48} className="text-text-muted" />
              </div>
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={24} className="text-white" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-text-primary">{user?.name || 'Student User'}</h2>
            <p className="text-sm text-text-secondary mt-1">{user?.grade || 'Class 11'}</p>
            <div className="w-full mt-6 pt-6 border-t border-border flex flex-col gap-3">
              <Button variant="ghost" className="justify-start" leftIcon={<User size={18} />}>Personal Info</Button>
              <Button variant="ghost" className="justify-start text-text-muted" leftIcon={<Shield size={18} />}>Security</Button>
              <Button variant="ghost" className="justify-start text-text-muted" leftIcon={<Bell size={18} />}>Notifications</Button>
              <Button variant="danger" className="justify-start mt-4 bg-accent-rose/10 text-accent-rose hover:bg-accent-rose/20 hover:text-accent-rose border border-accent-rose/20 shadow-none" leftIcon={<LogOut size={18} />} onClick={handleLogout}>Log Out</Button>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 bg-bg-surface border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-primary">Personal Information</h2>
              {!isEditing && (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(v) => setFormData(p => ({...p, name: v}))}
                  disabled={!isEditing}
                  leftIcon={<User size={18} />}
                />
                <Input
                  label="Email Address"
                  value={formData.email}
                  onChange={(v) => setFormData(p => ({...p, email: v}))}
                  disabled={!isEditing}
                  leftIcon={<Mail size={18} />}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-secondary">Current Grade</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                    <GraduationCap size={18} />
                  </span>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData(p => ({...p, grade: e.target.value}))}
                    disabled={!isEditing}
                    className="w-full bg-bg-surface border border-border rounded-sm text-text-primary pl-10 pr-3.5 py-2.5 text-sm focus:border-border-focus focus:ring-[3px] focus:ring-primary-500/15 focus:outline-none transition-all duration-150 appearance-none disabled:opacity-50"
                  >
                    <option value="Class 10 (SEE)">Class 10 (SEE)</option>
                    <option value="Class 11 (Science)">Class 11 (Science)</option>
                    <option value="Class 11 (Management)">Class 11 (Management)</option>
                    <option value="Class 12 (Science)">Class 12 (Science)</option>
                    <option value="Class 12 (Management)">Class 12 (Management)</option>
                    <option value="Bachelors Degree">Bachelors Degree</option>
                  </select>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                  <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button type="submit" variant="primary">Save Changes</Button>
                </div>
              )}
            </form>
          </Card>

          <Card className="p-6 bg-bg-surface border-border">
            <h2 className="text-xl font-bold text-text-primary mb-6">Learning Preferences</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-text-primary">AI Voice Speed</p>
                  <p className="text-sm text-text-secondary">Adjust how fast the AI teacher speaks.</p>
                </div>
                <select className="bg-bg-elevated border border-border rounded-md px-3 py-1.5 text-sm text-text-primary outline-none">
                  <option>Normal (1x)</option>
                  <option>Slow (0.8x)</option>
                  <option>Fast (1.25x)</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-text-primary">Default Language</p>
                  <p className="text-sm text-text-secondary">Preferred explanation language.</p>
                </div>
                <select className="bg-bg-elevated border border-border rounded-md px-3 py-1.5 text-sm text-text-primary outline-none">
                  <option>English + Nepali (Mixed)</option>
                  <option>Pure English</option>
                  <option>Pure Nepali</option>
                </select>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
