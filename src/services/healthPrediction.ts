
// This is a mock service for health risk prediction
// In a real app, this would connect to a backend API

import { toast } from '@/hooks/use-toast';

interface HealthData {
  age: number;
  gender: string;
  weight: number;
  height: number;
  bloodGlucose: number;
  systolicBP: number;
  diastolicBP: number;
  familyHistory: {
    diabetes: boolean;
    hypertension: boolean;
    heartDisease: boolean;
  };
}

interface PredictionResult {
  diabetesRisk: number; // 0-100
  hypertensionRisk: number; // 0-100
  recommendations: string[];
  metrics: {
    bmi: number;
    bmiCategory: string;
    bloodGlucoseStatus: 'normal' | 'warning' | 'danger';
    bpCategory: 'normal' | 'elevated' | 'hypertension-1' | 'hypertension-2' | 'crisis';
  };
}

// Mock prediction function
export const predictHealthRisks = (data: HealthData): PredictionResult => {
  try {
    // Calculate BMI
    const heightInMeters = data.height / 100;
    const bmi = data.weight / (heightInMeters * heightInMeters);
    
    // Determine BMI category
    let bmiCategory = 'Normal';
    if (bmi < 18.5) bmiCategory = 'Underweight';
    else if (bmi >= 25 && bmi < 30) bmiCategory = 'Overweight';
    else if (bmi >= 30) bmiCategory = 'Obese';
    
    // Determine blood glucose status
    let bloodGlucoseStatus: 'normal' | 'warning' | 'danger' = 'normal';
    if (data.bloodGlucose >= 100 && data.bloodGlucose < 126) bloodGlucoseStatus = 'warning';
    else if (data.bloodGlucose >= 126) bloodGlucoseStatus = 'danger';
    
    // Determine blood pressure category
    let bpCategory: 'normal' | 'elevated' | 'hypertension-1' | 'hypertension-2' | 'crisis' = 'normal';
    if (data.systolicBP < 120 && data.diastolicBP < 80) bpCategory = 'normal';
    else if ((data.systolicBP >= 120 && data.systolicBP <= 129) && data.diastolicBP < 80) bpCategory = 'elevated';
    else if ((data.systolicBP >= 130 && data.systolicBP <= 139) || (data.diastolicBP >= 80 && data.diastolicBP <= 89)) bpCategory = 'hypertension-1';
    else if (data.systolicBP >= 140 || data.diastolicBP >= 90) bpCategory = 'hypertension-2';
    else if (data.systolicBP > 180 || data.diastolicBP > 120) bpCategory = 'crisis';
    
    // Mock risk calculation
    let diabetesRisk = 0;
    let hypertensionRisk = 0;
    
    // Age factor
    if (data.age > 40) {
      diabetesRisk += (data.age - 40) * 0.5;
      hypertensionRisk += (data.age - 40) * 0.5;
    }
    
    // BMI factor
    if (bmi >= 25) {
      diabetesRisk += (bmi - 25) * 2;
      hypertensionRisk += (bmi - 25) * 1.5;
    }
    
    // Blood glucose factor
    if (data.bloodGlucose >= 100) {
      diabetesRisk += (data.bloodGlucose - 100) * 1.5;
    }
    
    // Blood pressure factor
    if (data.systolicBP >= 120) {
      hypertensionRisk += (data.systolicBP - 120) * 0.5;
    }
    if (data.diastolicBP >= 80) {
      hypertensionRisk += (data.diastolicBP - 80) * 0.7;
    }
    
    // Family history factor
    if (data.familyHistory.diabetes) diabetesRisk += 15;
    if (data.familyHistory.hypertension) hypertensionRisk += 15;
    if (data.familyHistory.heartDisease) {
      diabetesRisk += 10;
      hypertensionRisk += 10;
    }
    
    // Gender factor (very simplified)
    if (data.gender === 'male') {
      diabetesRisk += 2;
      hypertensionRisk += 3;
    }
    
    // Cap risks at 100
    diabetesRisk = Math.min(Math.round(diabetesRisk), 100);
    hypertensionRisk = Math.min(Math.round(hypertensionRisk), 100);
    
    // Generate recommendations
    const recommendations = [];
    
    if (bmi >= 25) {
      recommendations.push('Consider weight management through diet and exercise.');
    }
    
    if (data.bloodGlucose >= 100) {
      recommendations.push('Monitor blood glucose levels regularly.');
      if (data.bloodGlucose >= 126) {
        recommendations.push('Consult a healthcare provider for diabetes risk.');
      }
    }
    
    if (data.systolicBP >= 130 || data.diastolicBP >= 80) {
      recommendations.push('Monitor blood pressure regularly.');
      recommendations.push('Consider reducing sodium intake.');
    }
    
    if (diabetesRisk > 30 || hypertensionRisk > 30) {
      recommendations.push('Regular health check-ups recommended.');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Continue maintaining your healthy lifestyle.');
    }
    
    return {
      diabetesRisk,
      hypertensionRisk,
      recommendations,
      metrics: {
        bmi,
        bmiCategory,
        bloodGlucoseStatus,
        bpCategory
      }
    };
  } catch (error) {
    console.error('Error in health prediction:', error);
    toast({
      title: "Prediction Error",
      description: "Failed to calculate health risk assessment. Please try again.",
      variant: "destructive",
    });
    
    return {
      diabetesRisk: 0,
      hypertensionRisk: 0,
      recommendations: ['Error calculating health risks.'],
      metrics: {
        bmi: 0,
        bmiCategory: 'Unknown',
        bloodGlucoseStatus: 'normal',
        bpCategory: 'normal'
      }
    };
  }
};

// Mock data for trends
export const getMockTrendData = (type: string) => {
  switch (type) {
    case 'bloodGlucose':
      return [
        { name: 'Mon', value: 95 },
        { name: 'Tue', value: 98 },
        { name: 'Wed', value: 102 },
        { name: 'Thu', value: 99 },
        { name: 'Fri', value: 97 },
        { name: 'Sat', value: 95 },
        { name: 'Sun', value: 96 },
      ];
    case 'bloodPressure':
      return [
        { name: 'Mon', value: 120 },
        { name: 'Tue', value: 122 },
        { name: 'Wed', value: 126 },
        { name: 'Thu', value: 125 },
        { name: 'Fri', value: 121 },
        { name: 'Sat', value: 118 },
        { name: 'Sun', value: 119 },
      ];
    case 'weight':
      return [
        { name: 'Week 1', value: 72 },
        { name: 'Week 2', value: 71.5 },
        { name: 'Week 3', value: 71 },
        { name: 'Week 4', value: 70.5 },
      ];
    default:
      return [];
  }
};
