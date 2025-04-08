import React, { useState, useEffect } from 'react';
import './styles.css';

interface StatCounterProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatCounter: React.FC<StatCounterProps> = ({ title, value, icon, color }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (value <= 0) return;
    
    let start = 0;
    const increment = value / 30; // Divide the animation into 30 steps
    const timer = setInterval(() => {
      start += increment;
      if (start > value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return (
    <div className="stat-counter" style={{ borderColor: color }}>
      <div className="stat-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="stat-content">
        <h3 className="stat-value">{count}</h3>
        <p className="stat-title">{title}</p>
      </div>
    </div>
  );
};

export default StatCounter;