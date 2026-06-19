import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrainCircuit, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    try {
      await login(email, password);
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-bg-base px-4">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 blur-[120px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-cyan/10 blur-[120px] rounded-full mix-blend-screen" />
      
      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center mb-4 shadow-glow-md">
            <BrainCircuit size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-text-primary text-center">Welcome Back</h1>
          <p className="text-text-secondary mt-2 text-center">Log in to continue your learning journey.</p>
        </div>

        <div className="bg-bg-surface border border-border rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={setEmail}
              leftIcon={<Mail size={18} />}
              required
            />
            
            <div className="space-y-1">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={setPassword}
                leftIcon={<Lock size={18} />}
                required
              />
              <div className="flex justify-end">
                <Link to="#" className="text-xs text-primary-400 hover:text-primary-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              fullWidth 
              size="lg" 
              loading={isLoading}
              className="mt-6"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-text-secondary">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-primary-400 hover:text-primary-300 transition-colors">
                Create Free Account
              </Link>
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-text-muted">
          <p>Test credentials available in Testai.md</p>
        </div>
      </div>
    </div>
  );
}
