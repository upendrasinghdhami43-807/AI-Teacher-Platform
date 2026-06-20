import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-base">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:ml-[80px] flex flex-col min-h-screen transition-all duration-300">
        <Topbar onMenuToggle={() => setSidebarOpen(o => !o)} />
        <main className="flex-1 p-4 lg:p-6">
          <div className="animate-fade-in-up">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
