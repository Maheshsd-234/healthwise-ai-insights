
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Bell, Moon, Sun, Globe, Info, LogOut } from 'lucide-react';

const Settings = () => {
  const { user, logout } = useUser();
  const { toast } = useToast();
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    appNotifications: true,
    appointmentReminders: true,
    healthAlerts: true,
  });
  
  const [appearance, setAppearance] = useState('light');
  const [language, setLanguage] = useState('english');

  const handleToggleChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings updated",
      description: "Your preferences have been saved"
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
    
    logout();
  };

  if (!user) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Please log in</h1>
            <p className="text-gray-500">You need to be logged in to access settings.</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="health-card mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-health-primary" />
              Notification Preferences
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={notificationSettings.emailNotifications}
                    onChange={() => handleToggleChange('emailNotifications')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-health-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">App Notifications</h3>
                  <p className="text-sm text-gray-500">Receive in-app notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={notificationSettings.appNotifications}
                    onChange={() => handleToggleChange('appNotifications')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-health-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Appointment Reminders</h3>
                  <p className="text-sm text-gray-500">Receive reminders about upcoming appointments</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={notificationSettings.appointmentReminders}
                    onChange={() => handleToggleChange('appointmentReminders')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-health-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Health Alerts</h3>
                  <p className="text-sm text-gray-500">Get alerts when health metrics are outside normal ranges</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={notificationSettings.healthAlerts}
                    onChange={() => handleToggleChange('healthAlerts')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-health-primary"></div>
                </label>
              </div>
            </div>
          </div>
          
          <div className="health-card">
            <h2 className="text-xl font-bold mb-4">Account Settings</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input type="password" id="current-password" placeholder="••••••••" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input type="password" id="new-password" placeholder="••••••••" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input type="password" id="confirm-password" placeholder="••••••••" />
              </div>
              
              <Button className="bg-health-primary hover:bg-health-secondary">Change Password</Button>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="health-card mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Sun className="w-5 h-5 mr-2 text-health-primary" />
              Appearance
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="light-mode" 
                  name="theme" 
                  value="light" 
                  checked={appearance === 'light'} 
                  onChange={() => setAppearance('light')}
                  className="mr-2"
                />
                <label htmlFor="light-mode" className="flex items-center">
                  <Sun className="w-4 h-4 mr-2" /> Light Mode
                </label>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="dark-mode" 
                  name="theme" 
                  value="dark" 
                  checked={appearance === 'dark'} 
                  onChange={() => setAppearance('dark')}
                  className="mr-2"
                />
                <label htmlFor="dark-mode" className="flex items-center">
                  <Moon className="w-4 h-4 mr-2" /> Dark Mode
                </label>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="system" 
                  name="theme" 
                  value="system" 
                  checked={appearance === 'system'} 
                  onChange={() => setAppearance('system')}
                  className="mr-2"
                />
                <label htmlFor="system">Use System Preference</label>
              </div>
            </div>
          </div>
          
          <div className="health-card mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-health-primary" />
              Language
            </h2>
            
            <div className="space-y-2">
              <select 
                className="w-full border border-gray-300 rounded-md p-2"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="english">English</option>
                <option value="spanish">Español</option>
                <option value="french">Français</option>
                <option value="german">Deutsch</option>
              </select>
            </div>
          </div>
          
          <div className="health-card mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Info className="w-5 h-5 mr-2 text-health-primary" />
              About
            </h2>
            
            <div className="text-sm space-y-2">
              <p>HealthWise App v1.0.0</p>
              <p>© 2025 HealthWise Inc.</p>
              <p className="text-health-primary hover:underline cursor-pointer">Terms of Service</p>
              <p className="text-health-primary hover:underline cursor-pointer">Privacy Policy</p>
            </div>
          </div>
          
          <div className="health-card bg-red-50">
            <h2 className="text-xl font-bold mb-4 text-red-600">Danger Zone</h2>
            
            <div className="space-y-4">
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" /> Log Out
              </Button>
              
              <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-100">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <Button className="bg-health-primary hover:bg-health-secondary" onClick={handleSaveSettings}>
          Save All Settings
        </Button>
      </div>
    </MainLayout>
  );
};

export default Settings;
