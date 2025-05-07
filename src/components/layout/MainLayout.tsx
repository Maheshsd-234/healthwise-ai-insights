
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Bell } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex">
      <Sidebar collapsed={sidebarCollapsed} onToggleCollapse={handleToggleSidebar} />
      
      <div className="flex flex-col flex-1 min-h-screen overflow-x-hidden">
        <header className="bg-white border-b border-border h-16 flex items-center justify-between px-6">
          <div>
            {sidebarCollapsed && (
              <button 
                onClick={handleToggleSidebar}
                className="text-gray-500 hover:text-gray-700 mr-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 6h16"></path>
                  <path d="M4 12h16"></path>
                  <path d="M4 18h16"></path>
                </svg>
              </button>
            )}
            <span className="text-xl font-semibold">Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-health-danger rounded-full"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-health-primary to-health-accent flex items-center justify-center text-white">
              JD
            </div>
          </div>
        </header>
        
        <main className="flex-1 bg-health-light p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
