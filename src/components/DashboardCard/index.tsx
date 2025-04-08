import React from 'react';
import { LucideIcon } from 'lucide-react';
import './styles.css';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconBgColor: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon: Icon,
  iconBgColor,
  primaryAction,
  secondaryAction
}) => {
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <div className={`icon-container ${iconBgColor}`}>
          <Icon size={24} />
        </div>
        <h3 className="card-title">{title}</h3>
      </div>
      <p className="card-description">{description}</p>
      <div className="card-actions">
        {secondaryAction && (
          <button 
            className="btn-secondary"
            onClick={secondaryAction.onClick}
          >
            {secondaryAction.label}
          </button>
        )}
        {primaryAction && (
          <button 
            className="btn-primary"
            onClick={primaryAction.onClick}
          >
            {primaryAction.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;