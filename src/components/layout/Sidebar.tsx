
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, HeartPulse, Calendar, Bell, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ElementType;
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  {
    icon: Home,
    href: '/',
    label: 'Dashboard',
  },
  {
    icon: HeartPulse,
    href: '/health-metrics',
    label: 'Health Metrics',
  },
  {
    icon: Calendar,
    href: '/appointments',
    label: 'Appointments',
  },
  {
    icon: Bell,
    href: '/notifications',
    label: 'Notifications',
  },
  {
    icon: User,
    href: '/profile',
    label: 'Profile',
  },
  {
    icon: Settings,
    href: '/settings',
    label: 'Settings',
  },
];

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar = ({
  className,
  collapsed = false,
  onToggleCollapse,
}: SidebarProps) => {
  return (
    <div
      className={cn(
        'flex flex-col h-screen bg-white border-r border-border transition-all',
        collapsed ? 'w-[80px]' : 'w-[240px]',
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className={cn('flex items-center space-x-2', collapsed && 'justify-center w-full')}>
          <div className="bg-health-primary rounded-lg p-2">
            <HeartPulse className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="font-bold text-xl bg-gradient-to-r from-health-primary to-health-accent bg-clip-text text-transparent">
              HealthWise
            </span>
          )}
        </div>
        {!collapsed && (
          <button 
            onClick={onToggleCollapse}
            className="text-gray-500 hover:text-gray-700"
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
              className="lucide lucide-chevron-left"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        )}
        {collapsed && (
          <button 
            onClick={onToggleCollapse}
            className="absolute -right-3 top-10 bg-white border border-border rounded-full p-1 text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto py-4">
        <nav className="flex-1 px-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center py-3 px-3 rounded-lg text-gray-700 hover:bg-health-soft-purple hover:text-health-primary transition-colors group',
                window.location.pathname === item.href && 'bg-health-soft-purple text-health-primary'
              )}
            >
              <item.icon className={cn('w-5 h-5', collapsed && 'mx-auto')} />
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-border">
        <div className={cn('flex items-center', collapsed ? 'justify-center' : 'space-x-3')}>
          <div className="flex-shrink-0">
            <div className="h-9 w-9 rounded-full bg-gradient-to-r from-health-primary to-health-accent flex items-center justify-center text-white font-medium">
              JD
            </div>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500 truncate">Patient</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
