import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useToast } from '@/hooks/use-toast';
import { Bell, Calendar, HeartPulse, MessageSquare, CheckCheck, Trash2, X, Check, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock notification data
interface Notification {
  id: string;
  type: 'appointment' | 'health' | 'message' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'appointment',
    title: 'Upcoming Appointment',
    message: 'Reminder: You have an appointment with Dr. Jane Smith tomorrow at 10:00 AM.',
    timestamp: new Date(2025, 4, 9, 9, 0),
    read: false
  },
  {
    id: '2',
    type: 'health',
    title: 'Blood Pressure Alert',
    message: 'Your blood pressure reading (135/85) is above your target range. Consider contacting your healthcare provider.',
    timestamp: new Date(2025, 4, 7, 14, 30),
    read: false
  },
  {
    id: '3',
    type: 'message',
    title: 'New Message',
    message: 'You have a new message from Dr. Jane Smith regarding your recent lab results.',
    timestamp: new Date(2025, 4, 6, 11, 15),
    read: true
  },
  {
    id: '4',
    type: 'system',
    title: 'Account Update',
    message: 'Your account information has been successfully updated.',
    timestamp: new Date(2025, 4, 5, 16, 45),
    read: true
  },
  {
    id: '5',
    type: 'health',
    title: 'Medication Reminder',
    message: 'Remember to take your evening medication today.',
    timestamp: new Date(2025, 4, 8, 18, 0),
    read: false
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const { toast } = useToast();

  // Format date to display
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Check if it's today
    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    // Check if it's yesterday
    else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    // Otherwise, show full date
    else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Delete notification
  const deleteNotification = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
    
    toast({
      title: "Notification deleted",
      description: "The notification has been removed"
    });
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
    
    toast({
      title: "All marked as read",
      description: "All notifications have been marked as read"
    });
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
    
    toast({
      title: "All notifications cleared",
      description: "All notifications have been removed"
    });
  };

  // Filter notifications
  const filteredNotifications = activeFilter 
    ? notifications.filter(notification => notification.type === activeFilter)
    : notifications;
    
  // Get the notification icon based on the type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'health':
        return <HeartPulse className="w-5 h-5 text-health-primary" />;
      case 'message':
        return <MessageSquare className="w-5 h-5 text-green-500" />;
      case 'system':
        return <Bell className="w-5 h-5 text-amber-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">Notifications</h1>
            <p className="text-gray-600">Stay updated with your health events and reminders</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <Button 
              variant="outline" 
              className="flex items-center" 
              onClick={markAllAsRead}
              disabled={!notifications.some(n => !n.read)}
            >
              <CheckCheck className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center text-red-500 hover:text-red-600" 
              onClick={clearAllNotifications}
              disabled={notifications.length === 0}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>
      </div>
      
      <div className="health-card">
        <div className="flex flex-wrap gap-2 mb-6">
          <Button 
            variant={activeFilter === null ? "default" : "outline"} 
            size="sm"
            className={activeFilter === null ? "bg-health-primary" : ""} 
            onClick={() => setActiveFilter(null)}
          >
            All
          </Button>
          <Button 
            variant={activeFilter === 'appointment' ? "default" : "outline"} 
            size="sm"
            className={activeFilter === 'appointment' ? "bg-blue-500" : ""} 
            onClick={() => setActiveFilter('appointment')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Appointments
          </Button>
          <Button 
            variant={activeFilter === 'health' ? "default" : "outline"} 
            size="sm"
            className={activeFilter === 'health' ? "bg-health-primary" : ""} 
            onClick={() => setActiveFilter('health')}
          >
            <HeartPulse className="w-4 h-4 mr-2" />
            Health
          </Button>
          <Button 
            variant={activeFilter === 'message' ? "default" : "outline"} 
            size="sm"
            className={activeFilter === 'message' ? "bg-green-500" : ""} 
            onClick={() => setActiveFilter('message')}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Messages
          </Button>
          <Button 
            variant={activeFilter === 'system' ? "default" : "outline"} 
            size="sm"
            className={activeFilter === 'system' ? "bg-amber-500" : ""} 
            onClick={() => setActiveFilter('system')}
          >
            <Bell className="w-4 h-4 mr-2" />
            System
          </Button>
        </div>
        
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No notifications</h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeFilter ? `You don't have any ${activeFilter} notifications` : "You're all caught up!"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`flex border rounded-lg p-4 ${notification.read ? 'bg-white' : 'bg-health-soft-purple'}`}
              >
                <div className="flex-shrink-0 mr-4 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-grow" onClick={() => markAsRead(notification.id)}>
                  <div className="flex justify-between">
                    <h3 className={`text-sm font-medium ${notification.read ? 'text-gray-900' : 'text-health-primary'}`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatDate(notification.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{notification.message}</p>
                </div>
                <div className="flex-shrink-0 ml-4 flex flex-col space-y-2">
                  {!notification.read && (
                    <button 
                      className="text-green-500 hover:text-green-600" 
                      onClick={() => markAsRead(notification.id)}
                      aria-label="Mark as read"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                  )}
                  <button 
                    className="text-red-500 hover:text-red-600" 
                    onClick={() => deleteNotification(notification.id)}
                    aria-label="Delete notification"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Notifications;
