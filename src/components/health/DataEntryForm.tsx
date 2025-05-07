
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface HealthFormData {
  age: number;
  gender: string;
  weight: number; // kg
  height: number; // cm
  bloodGlucose: number; // mg/dL
  systolicBP: number; // mmHg
  diastolicBP: number; // mmHg
  familyHistory: {
    diabetes: boolean;
    hypertension: boolean;
    heartDisease: boolean;
  };
}

const initialFormData: HealthFormData = {
  age: 35,
  gender: 'male',
  weight: 70,
  height: 170,
  bloodGlucose: 95,
  systolicBP: 120,
  diastolicBP: 80,
  familyHistory: {
    diabetes: false,
    hypertension: false,
    heartDisease: false,
  },
};

interface DataEntryFormProps {
  onSubmit: (data: HealthFormData) => void;
}

const DataEntryForm: React.FC<DataEntryFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<HealthFormData>(initialFormData);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (name.includes('.')) {
      // Handle nested objects like familyHistory.diabetes
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof HealthFormData],
          [child]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        },
      });
    } else {
      // Handle regular inputs
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : type === 'number' ? Number(value) : value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (formData.age < 18 || formData.age > 120) {
      toast({
        title: "Validation Error",
        description: "Age must be between 18 and 120",
        variant: "destructive",
      });
      return;
    }
    
    // Calculate BMI
    const bmi = formData.weight / Math.pow(formData.height / 100, 2);
    
    onSubmit(formData);
    
    toast({
      title: "Data Submitted",
      description: "Your health data has been processed successfully.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-health-primary focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-health-primary focus:border-transparent"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-health-primary focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-health-primary focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blood Glucose (mg/dL)</label>
          <input
            type="number"
            name="bloodGlucose"
            value={formData.bloodGlucose}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-health-primary focus:border-transparent"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Systolic BP</label>
            <input
              type="number"
              name="systolicBP"
              value={formData.systolicBP}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-health-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Diastolic BP</label>
            <input
              type="number"
              name="diastolicBP"
              value={formData.diastolicBP}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-health-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Family History</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="diabetesHistory"
              name="familyHistory.diabetes"
              checked={formData.familyHistory.diabetes}
              onChange={handleChange}
              className="h-4 w-4 text-health-primary focus:ring-health-primary border-gray-300 rounded"
            />
            <label htmlFor="diabetesHistory" className="ml-2 text-sm text-gray-700">
              Diabetes
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hypertensionHistory"
              name="familyHistory.hypertension"
              checked={formData.familyHistory.hypertension}
              onChange={handleChange}
              className="h-4 w-4 text-health-primary focus:ring-health-primary border-gray-300 rounded"
            />
            <label htmlFor="hypertensionHistory" className="ml-2 text-sm text-gray-700">
              Hypertension
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="heartDiseaseHistory"
              name="familyHistory.heartDisease"
              checked={formData.familyHistory.heartDisease}
              onChange={handleChange}
              className="h-4 w-4 text-health-primary focus:ring-health-primary border-gray-300 rounded"
            />
            <label htmlFor="heartDiseaseHistory" className="ml-2 text-sm text-gray-700">
              Heart Disease
            </label>
          </div>
        </div>
      </div>
      
      <div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-health-primary hover:bg-health-secondary text-white rounded-md transition-colors duration-300"
        >
          Calculate Risk Assessment
        </button>
      </div>
    </form>
  );
};

export default DataEntryForm;
