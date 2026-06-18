import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrainCircuit, Mail, Lock, User, GraduationCap } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    grade: 'class_11_science',
  });

  const handleChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.full_name) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      await register(formData);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-bg-base px-4 py-12">
      {/* Background blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-600/10 blur-[120px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent-violet/10 blur-[120px] rounded-full mix-blend-screen" />
      
      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center mb-4 shadow-glow-md">
            <BrainCircuit size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-text-primary text-center">Create Account</h1>
          <p className="text-text-secondary mt-2 text-center">Start your AI-powered learning journey.</p>
        </div>

        <div className="bg-bg-surface border border-border rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleRegister} className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={formData.full_name}
              onChange={handleChange('full_name')}
              leftIcon={<User size={18} />}
              required
            />
            
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange('email')}
              leftIcon={<Mail size={18} />}
              required
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange('password')}
              leftIcon={<Lock size={18} />}
              required
              hint="Must be at least 8 characters"
            />
            
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-secondary">
                Current Grade <span className="text-accent-rose">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                  <GraduationCap size={18} />
                </span>
                <select
                  value={formData.grade}
                  onChange={(e) => handleChange('grade')(e.target.value)}
                  className="w-full bg-bg-surface border border-border rounded-sm text-text-primary pl-10 pr-3.5 py-2.5 text-sm focus:border-border-focus focus:ring-[3px] focus:ring-primary-500/15 focus:outline-none transition-all duration-150 appearance-none"
                  required
                >
                  <option value="class_10">Class 10 (SEE)</option>
                  <option value="class_11_science">Class 11 (Science)</option>
                  <option value="class_11_management">Class 11 (Management)</option>
                  <option value="class_12_science">Class 12 (Science)</option>
                  <option value="class_12_management">Class 12 (Management)</option>
                  <option value="bachelors">Bachelors Degree</option>
                  <option value="other">Other / Lifelong Learner</option>
                </select>
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
              Create Free Account
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-text-secondary">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-primary-400 hover:text-primary-300 transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
