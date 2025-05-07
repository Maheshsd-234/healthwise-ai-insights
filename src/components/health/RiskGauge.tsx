
import React from 'react';
import { cn } from '@/lib/utils';

interface RiskGaugeProps {
  title: string;
  riskScore: number; // 0-100
  description?: string;
  className?: string;
}

const RiskGauge: React.FC<RiskGaugeProps> = ({
  title,
  riskScore,
  description,
  className,
}) => {
  // Calculate the position of the gauge needle
  const needleRotation = (riskScore / 100) * 180 - 90; // -90 to 90 degrees
  
  // Determine risk level based on score
  const getRiskLevel = () => {
    if (riskScore < 30) return { label: 'Low Risk', color: 'text-green-500' };
    if (riskScore < 70) return { label: 'Moderate Risk', color: 'text-amber-500' };
    return { label: 'High Risk', color: 'text-health-danger' };
  };
  
  const riskLevel = getRiskLevel();
  
  // Function to get background gradient color based on risk score
  const getGradientColor = () => {
    if (riskScore < 30) return 'from-green-500 to-green-300';
    if (riskScore < 70) return 'from-amber-500 to-amber-300';
    return 'from-health-danger to-red-400';
  };

  return (
    <div className={cn('health-card flex flex-col', className)}>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      
      <div className="relative w-full h-36 mb-4">
        {/* Gauge background */}
        <div className="absolute w-full h-36 overflow-hidden">
          <div className="w-full h-72 rounded-tl-full rounded-tr-full bg-gradient-to-b from-gray-200 to-gray-100">
          </div>
        </div>
        
        {/* Colored arc based on risk level */}
        <div 
          className="absolute w-full h-36 overflow-hidden"
          style={{
            clipPath: `polygon(0% 100%, 100% 100%, 100% ${100 - riskScore}%, 0% ${100 - riskScore}%)`
          }}
        >
          <div className={`w-full h-72 rounded-tl-full rounded-tr-full bg-gradient-to-b ${getGradientColor()}`}>
          </div>
        </div>
        
        {/* Needle */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 origin-bottom">
          <div 
            className="w-1 h-32 bg-health-dark rounded-full transform"
            style={{ transform: `rotate(${needleRotation}deg)` }}
          />
          <div className="w-4 h-4 rounded-full bg-health-dark mx-auto -mt-1" />
        </div>
        
        {/* Score value */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-1 shadow-md border border-gray-200">
          <span className="font-bold text-lg">{riskScore}%</span>
        </div>
      </div>
      
      <div className="text-center">
        <span className={cn('font-semibold', riskLevel.color)}>
          {riskLevel.label}
        </span>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
    </div>
  );
};

export default RiskGauge;
