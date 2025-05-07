
import React from 'react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  status?: 'normal' | 'warning' | 'danger';
  trend?: 'up' | 'down' | 'stable';
  icon?: React.ReactNode;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  status = 'normal',
  trend,
  icon,
  className,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'danger':
        return 'text-health-danger';
      case 'warning':
        return 'text-amber-500';
      default:
        return 'text-green-500';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={cn('w-5 h-5', status === 'danger' ? 'text-health-danger' : 'text-green-500')}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'down':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={cn('w-5 h-5', status === 'normal' ? 'text-green-500' : 'text-health-danger')}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'stable':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn('health-card', className)}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon}
      </div>
      <div className="flex items-end">
        <div className="health-metric-value">{value}</div>
        {unit && <span className="text-gray-500 ml-1 mb-0.5">{unit}</span>}
        {trend && <div className="ml-auto">{getTrendIcon()}</div>}
      </div>
      <div className="mt-2">
        <span className={cn('text-xs font-medium', getStatusColor())}>
          {status === 'normal' ? 'Normal' : status === 'warning' ? 'Elevated' : 'High Risk'}
        </span>
      </div>
    </div>
  );
};

export default MetricCard;
