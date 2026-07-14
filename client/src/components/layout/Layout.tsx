import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-4 border-b border-gray-200 bg-white p-4 md:hidden">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-700"
            aria-label="Open menu"
          >
            ☰
          </button>
          <h1 className="text-lg font-bold tracking-tight text-gray-900">Team Feedback</h1>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
