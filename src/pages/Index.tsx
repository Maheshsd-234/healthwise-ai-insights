
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import MetricCard from '@/components/health/MetricCard';
import RiskGauge from '@/components/health/RiskGauge';
import DataEntryForm from '@/components/health/DataEntryForm';
import TrendsCard from '@/components/health/TrendsCard';
import { Button } from '@/components/ui/button';
import { HeartPulse, Info, Bell } from 'lucide-react';
import { predictHealthRisks, getMockTrendData } from '@/services/healthPrediction';

interface PredictionResults {
  diabetesRisk: number;
  hypertensionRisk: number;
  recommendations: string[];
  metrics: {
    bmi: number;
    bmiCategory: string;
    bloodGlucoseStatus: 'normal' | 'warning' | 'danger';
    bpCategory: string;
  };
}

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [results, setResults] = useState<PredictionResults | null>(null);

  const bloodGlucoseTrend = getMockTrendData('bloodGlucose');
  const bloodPressureTrend = getMockTrendData('bloodPressure');
  const weightTrend = getMockTrendData('weight');
  
  const handleFormSubmit = (data: any) => {
    const predictionResults = predictHealthRisks(data);
    setResults(predictionResults);
    setShowForm(false);
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">Health Dashboard</h1>
            <p className="text-gray-600">Track your health metrics and risk factors</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button 
              onClick={() => setShowForm(!showForm)} 
              className="bg-health-primary hover:bg-health-secondary text-white"
            >
              {showForm ? 'Back to Dashboard' : 'Update Health Data'}
            </Button>
          </div>
        </div>
      </div>
      
      {showForm ? (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Enter Your Health Information</h2>
          <DataEntryForm onSubmit={handleFormSubmit} />
        </div>
      ) : (
        <>
          {results ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div>
                <RiskGauge 
                  title="Diabetes Risk" 
                  riskScore={results.diabetesRisk}
                  description="Based on your glucose, BMI, and other factors"
                />
              </div>
              <div>
                <RiskGauge 
                  title="Hypertension Risk" 
                  riskScore={results.hypertensionRisk}
                  description="Based on your blood pressure and other factors"
                />
              </div>
              <div className="health-card">
                <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
                <ul className="space-y-2">
                  {results.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <Info className="w-5 h-5 text-health-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-health-soft-purple rounded-xl p-6 mb-6">
              <div className="flex items-center">
                <div className="bg-health-primary rounded-full p-3 mr-4">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Welcome to HealthWise AI</h3>
                  <p className="text-gray-700">
                    Click "Update Health Data" to get your personalized health risk assessment.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <MetricCard 
              title="Blood Glucose" 
              value={results?.metrics?.bloodGlucoseStatus === 'danger' ? '128' : '96'} 
              unit="mg/dL" 
              status={results?.metrics?.bloodGlucoseStatus || 'normal'} 
              trend="stable"
              icon={<div className="pulse-dot" />} 
            />
            <MetricCard 
              title="Blood Pressure" 
              value={results ? `${results.metrics.bpCategory === 'normal' ? '120/80' : '135/85'}` : '120/80'} 
              unit="mmHg" 
              status={results?.metrics?.bpCategory === 'normal' ? 'normal' : 'warning'} 
              trend="up"
              icon={<HeartPulse className="w-5 h-5 text-health-primary" />} 
            />
            <MetricCard 
              title="BMI" 
              value={results ? results.metrics.bmi.toFixed(1) : '24.5'} 
              unit="kg/m²" 
              status={
                results?.metrics?.bmiCategory === 'Overweight' || 
                results?.metrics?.bmiCategory === 'Obese' ? 'warning' : 'normal'
              } 
              trend="down" 
            />
            <MetricCard 
              title="Sleep" 
              value="7.5" 
              unit="hrs" 
              status="normal" 
              trend="stable" 
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TrendsCard 
              title="Blood Glucose Trend" 
              data={bloodGlucoseTrend} 
              unit=" mg/dL" 
              color="#9b87f5"
            />
            <TrendsCard 
              title="Blood Pressure Trend" 
              data={bloodPressureTrend} 
              unit=" mmHg" 
              color="#1EAEDB"
            />
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default Index;
