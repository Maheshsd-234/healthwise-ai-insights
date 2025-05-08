
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, Calendar, MapPin, Shield } from 'lucide-react';

const Profile = () => {
  const { user, login } = useUser();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '(555) 123-4567', // Demo data
    dob: '1985-06-15', // Demo data
    address: '123 Health St, Medical City, MC 12345', // Demo data
    emergencyContact: 'Jane Doe (555) 987-6543', // Demo data
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (user) {
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
      };
      
      // Update in context and localStorage
      login(updatedUser);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully"
      });
      
      setIsEditing(false);
    }
  };

  if (!user) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Please log in</h1>
            <p className="text-gray-500">You need to be logged in to view your profile.</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">My Profile</h1>
        <p className="text-gray-600">Manage your personal information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="health-card col-span-1">
          <div className="flex flex-col items-center">
            <div className="h-32 w-32 rounded-full bg-gradient-to-r from-health-primary to-health-accent flex items-center justify-center text-white text-4xl font-semibold mb-4">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-500">{user.role === 'patient' ? 'Patient' : 'Healthcare Provider'}</p>
            
            <div className="w-full border-t border-gray-200 my-4"></div>
            
            <div className="w-full">
              <div className="flex items-center mb-3">
                <Mail className="w-5 h-5 text-gray-500 mr-2" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-sm text-gray-500">Account created on May 1, 2023</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="health-card col-span-1 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Personal Information</h2>
            {!isEditing && (
              <Button 
                onClick={() => setIsEditing(true)}
                variant="outline"
              >
                Edit Profile
              </Button>
            )}
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center">
                    <User className="w-4 h-4 mr-1" /> Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" /> Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" /> Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dob" className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" /> Date of Birth
                  </Label>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address" className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" /> Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              {isEditing && (
                <div className="flex space-x-3 pt-2">
                  <Button type="submit" className="bg-health-primary hover:bg-health-secondary">
                    Save Changes
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: user.name,
                        email: user.email,
                        phone: '(555) 123-4567',
                        dob: '1985-06-15',
                        address: '123 Health St, Medical City, MC 12345',
                        emergencyContact: 'Jane Doe (555) 987-6543',
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </form>
        </div>

        {user.role === 'patient' && (
          <div className="health-card col-span-1 lg:col-span-3">
            <h2 className="text-xl font-bold mb-4">Health Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-health-soft-purple p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Latest Vital Signs</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Blood Pressure:</span>
                    <span>120/80 mmHg</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Heart Rate:</span>
                    <span>72 bpm</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Blood Glucose:</span>
                    <span>96 mg/dL</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-health-soft-purple p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Upcoming Appointments</h3>
                <p className="text-sm">Next appointment: May 15, 2025</p>
                <p className="text-sm">With: Dr. Jane Smith</p>
                <p className="text-sm">For: Annual Checkup</p>
              </div>
              
              <div className="bg-health-soft-purple p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Active Medications</h3>
                <ul className="space-y-1">
                  <li className="text-sm">Metformin 500mg (Daily)</li>
                  <li className="text-sm">Lisinopril 10mg (Daily)</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Profile;
