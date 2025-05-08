
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Bell, LogOut, User, Settings } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const { toast } = useToast();
  
  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name.split(' ').map(n => n[0]).join('');
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
            <Link to="/notifications" className="relative p-2 rounded-full hover:bg-gray-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-health-danger rounded-full"></span>
            </Link>
            
            <div className="relative">
              <button 
                className="h-8 w-8 rounded-full bg-gradient-to-r from-health-primary to-health-accent flex items-center justify-center text-white"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                {getUserInitials()}
              </button>
              
              {userMenuOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <User className="w-4 h-4 mr-2" /> Profile
                  </Link>
                  
                  <Link 
                    to="/settings" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4 mr-2" /> Settings
                  </Link>
                  
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    onClick={() => {
                      setUserMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </button>
                </div>
              )}
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
