
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import TrendsCard from '@/components/health/TrendsCard';
import { getMockTrendData } from '@/services/healthPrediction';
import { Button } from '@/components/ui/button';

const HealthMetrics = () => {
  const bloodGlucoseTrend = getMockTrendData('bloodGlucose');
  const bloodPressureTrend = getMockTrendData('bloodPressure');
  const weightTrend = getMockTrendData('weight');
  
  // Mock data for heart rate
  const heartRateTrend = [
    { name: 'Mon', value: 72 },
    { name: 'Tue', value: 75 },
    { name: 'Wed', value: 78 },
    { name: 'Thu', value: 76 },
    { name: 'Fri', value: 74 },
    { name: 'Sat', value: 70 },
    { name: 'Sun', value: 71 },
  ];
  
  // Mock data for activity
  const activityTrend = [
    { name: 'Mon', value: 8500 },
    { name: 'Tue', value: 10200 },
    { name: 'Wed', value: 7800 },
    { name: 'Thu', value: 9100 },
    { name: 'Fri', value: 11500 },
    { name: 'Sat', value: 12000 },
    { name: 'Sun', value: 6500 },
  ];

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">Health Metrics</h1>
            <p className="text-gray-600">View and analyze your detailed health metrics</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <Button variant="outline">Export Data</Button>
            <Button className="bg-health-primary hover:bg-health-secondary text-white">Connect Device</Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-xl font-semibold">Weekly Overview</h2>
          <div className="mt-2 sm:mt-0">
            <select className="border rounded-md py-1 px-3 text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Custom range</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <TrendsCard 
              title="Blood Glucose" 
              data={bloodGlucoseTrend} 
              unit=" mg/dL" 
              color="#9b87f5"
            />
            <TrendsCard 
              title="Blood Pressure (Systolic)" 
              data={bloodPressureTrend} 
              unit=" mmHg" 
              color="#1EAEDB"
            />
            <TrendsCard 
              title="Weight" 
              data={weightTrend} 
              unit=" kg" 
              type="bar"
              color="#7E69AB"
            />
            <TrendsCard 
              title="Heart Rate" 
              data={heartRateTrend} 
              unit=" bpm" 
              color="#ea384c"
            />
            <TrendsCard 
              title="Daily Steps" 
              data={activityTrend} 
              unit=" steps" 
              type="bar"
              color="#33C3F0"
            />
            <div className="health-card flex flex-col">
              <h3 className="text-lg font-semibold mb-4">Connect More Devices</h3>
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="text-health-neutral mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 12H3" />
                    <path d="M16 18H3" />
                    <path d="M10 6H3" />
                    <path d="M21 18V12a2 2 0 0 0-2-2h-3" />
                    <path d="m16 8 3-3 3 3" />
                  </svg>
                </div>
                <p className="text-gray-600 text-center mb-4">
                  Connect more devices to get comprehensive health metrics
                </p>
                <Button className="bg-health-primary hover:bg-health-secondary text-white">
                  Connect Device
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HealthMetrics;
