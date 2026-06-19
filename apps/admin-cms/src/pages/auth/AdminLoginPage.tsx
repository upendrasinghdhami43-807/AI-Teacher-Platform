import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Mail, Lock } from 'lucide-react';
import { useAdminAuthStore } from '@/store/adminAuthStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAdminAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter credentials');
      return;
    }

    try {
      await login(email, password);
      toast.success('Admin login successful');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-bg-base px-4">
      <div className="absolute top-0 right-0 w-full h-full bg-[url('/grid.svg')] bg-center opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-600/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      
      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-bg-elevated border border-border flex items-center justify-center mb-4 shadow-glow-sm">
            <ShieldAlert size={32} className="text-primary-400" />
          </div>
          <h1 className="text-2xl font-display font-bold text-text-primary text-center tracking-tight">Admin Portal</h1>
          <p className="text-sm text-text-muted mt-2 text-center">Secure access requires valid credentials.</p>
        </div>

        <div className="bg-bg-surface border border-border rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* Top border highlight */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 via-primary-400 to-accent-cyan" />
          
          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              label="Admin Email"
              type="email"
              placeholder="admin@aiteacher.np"
              value={email}
              onChange={setEmail}
              leftIcon={<Mail size={18} />}
              required
            />
            
            <Input
              label="Master Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={setPassword}
              leftIcon={<Lock size={18} />}
              required
            />

            <Button 
              type="submit" 
              variant="primary" 
              fullWidth 
              size="lg" 
              loading={isLoading}
              className="mt-6 font-semibold tracking-wide"
            >
              Authorize Access
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
