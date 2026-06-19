import { useState } from 'react';
import { Save, Shield, Database, Globe, Key } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Tabs from '@/components/ui/Tabs';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="animate-fade-in-up space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">Platform Settings</h1>
          <p className="text-text-secondary mt-1">Configure global platform behavior, integrations, and keys.</p>
        </div>
        <Button variant="primary" leftIcon={<Save size={18} />} onClick={handleSave}>
          Save All Changes
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card className="p-2 bg-bg-surface border-border flex flex-col gap-1">
            <button 
              onClick={() => setActiveTab('general')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'general' ? 'bg-bg-elevated text-primary-400' : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'}`}
            >
              <Globe size={18} /> General
            </button>
            <button 
              onClick={() => setActiveTab('api_keys')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'api_keys' ? 'bg-bg-elevated text-primary-400' : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'}`}
            >
              <Key size={18} /> API & Integrations
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-bg-elevated text-primary-400' : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'}`}
            >
              <Shield size={18} /> Security
            </button>
            <button 
              onClick={() => setActiveTab('database')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'database' ? 'bg-bg-elevated text-primary-400' : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'}`}
            >
              <Database size={18} /> Database & Storage
            </button>
          </Card>
        </div>

        <div className="md:col-span-3">
          {activeTab === 'general' && (
            <Card className="p-6 bg-bg-surface border-border space-y-6">
              <h2 className="text-xl font-bold text-text-primary mb-4">General Settings</h2>
              
              <div className="space-y-4">
                <Input label="Platform Name" defaultValue="AI Teacher Platform" />
                <Input label="Support Email" defaultValue="support@aiteacher.np" type="email" />
                
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-text-secondary">Default Theme</label>
                  <select className="w-full bg-bg-base border border-border rounded-md px-3 py-2 text-sm text-text-primary outline-none focus:border-primary-500">
                    <option>Dark Mode (Default)</option>
                    <option>Light Mode</option>
                    <option>System Default</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-bg-elevated border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium text-text-primary">Maintenance Mode</h4>
                    <p className="text-sm text-text-secondary">Disable access for non-admin users.</p>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-border focus:outline-none focus:ring-0 checked:right-0 checked:border-primary-500"/>
                    <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-border cursor-pointer"></label>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'api_keys' && (
            <Card className="p-6 bg-bg-surface border-border space-y-6">
              <h2 className="text-xl font-bold text-text-primary mb-4">API Keys & External Services</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-text-primary border-b border-border pb-2">Azure Cognitive Services</h3>
                  <Input label="Speech SDK Key" type="password" defaultValue="************************" />
                  <Input label="Region" defaultValue="eastus" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-text-primary border-b border-border pb-2">Google Gemini API</h3>
                  <Input label="API Key" type="password" defaultValue="************************" />
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-text-secondary">Default Model</label>
                    <select className="w-full bg-bg-base border border-border rounded-md px-3 py-2 text-sm text-text-primary outline-none focus:border-primary-500">
                      <option>gemini-1.5-pro-latest</option>
                      <option>gemini-1.5-flash-latest</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card className="p-6 bg-bg-surface border-border">
              <h2 className="text-xl font-bold text-text-primary mb-4">Security Policies</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-bg-elevated border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium text-text-primary">Two-Factor Authentication</h4>
                    <p className="text-sm text-text-secondary">Require 2FA for all admin accounts.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary-500 rounded" />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-text-secondary">Session Timeout (minutes)</label>
                  <Input type="number" defaultValue="60" />
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'database' && (
            <Card className="p-6 bg-bg-surface border-border">
              <h2 className="text-xl font-bold text-text-primary mb-4">Storage Configuration</h2>
              <div className="space-y-4">
                <Input label="PostgreSQL Connection URI" type="password" defaultValue="postgresql://user:pass@localhost:5432/db" />
                <Input label="Redis Connection URI" type="password" defaultValue="redis://localhost:6379/0" />
                <div className="pt-4 border-t border-border">
                  <Button variant="outline" leftIcon={<Database size={16} />}>Test Connections</Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
