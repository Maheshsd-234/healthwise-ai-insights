
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { HeartPulse } from 'lucide-react';

interface User {
  email: string;
  password: string;
  name: string;
  role: 'patient' | 'doctor';
  profileImage?: string;
}

// Mock user database for demo purposes
const MOCK_USERS: User[] = [
  {
    email: 'john@example.com',
    password: 'password123',
    name: 'John Doe',
    role: 'patient'
  },
  {
    email: 'jane@example.com',
    password: 'password123',
    name: 'Dr. Jane Smith',
    role: 'doctor'
  }
];

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegistering) {
      // Registration
      if (!name || !email || !password) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive"
        });
        return;
      }

      // Check if email already exists
      if (MOCK_USERS.some(user => user.email === email)) {
        toast({
          title: "Error",
          description: "Email already in use",
          variant: "destructive"
        });
        return;
      }

      // For demo, we'll just add to our mock array
      const newUser: User = { email, password, name, role };
      MOCK_USERS.push(newUser);
      
      // Save user to localStorage
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      toast({
        title: "Success",
        description: "Registration successful!"
      });
      
      navigate('/');
    } else {
      // Login
      const user = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (!user) {
        toast({
          title: "Error",
          description: "Invalid email or password",
          variant: "destructive"
        });
        return;
      }

      // Save user to localStorage but don't store password
      const { password: _, ...safeUser } = user;
      localStorage.setItem('currentUser', JSON.stringify(safeUser));
      
      toast({
        title: "Welcome back",
        description: `Good to see you, ${user.name}!`
      });
      
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-health-light flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-health-primary rounded-lg p-3">
            <HeartPulse className="w-8 h-8 text-white" />
          </div>
          <span className="font-bold text-2xl ml-2 bg-gradient-to-r from-health-primary to-health-accent bg-clip-text text-transparent">
            HealthWise
          </span>
        </div>
        
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isRegistering ? 'Create an Account' : 'Sign In'}
        </h1>
        
        <form onSubmit={handleAuth} className="space-y-4">
          {isRegistering && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="John Doe"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="name@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
            />
          </div>
          
          {isRegistering && (
            <div className="space-y-2">
              <Label>Account Type</Label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={role === 'patient'}
                    onChange={() => setRole('patient')}
                    className="h-4 w-4 text-health-primary"
                  />
                  <span>Patient</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={role === 'doctor'}
                    onChange={() => setRole('doctor')}
                    className="h-4 w-4 text-health-primary"
                  />
                  <span>Healthcare Provider</span>
                </label>
              </div>
            </div>
          )}
          
          <Button type="submit" className="w-full bg-health-primary hover:bg-health-secondary">
            {isRegistering ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          {isRegistering ? (
            <p>
              Already have an account?{' '}
              <button 
                onClick={() => setIsRegistering(false)}
                className="text-health-primary hover:underline"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button 
                onClick={() => setIsRegistering(true)}
                className="text-health-primary hover:underline"
              >
                Sign Up
              </button>
            </p>
          )}
        </div>
      </div>
      
      <div className="mt-6 text-gray-600 text-sm text-center">
        <p>Demo accounts:</p>
        <p>Email: john@example.com | Password: password123</p>
        <p>Email: jane@example.com | Password: password123</p>
      </div>
    </div>
  );
};

export default Login;
