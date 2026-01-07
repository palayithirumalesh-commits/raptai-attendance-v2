import { useState, useEffect } from 'react';

export function GPUGauge() {
  const [percentage, setPercentage] = useState(0);
  const targetPercentage = 78;
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setPercentage(targetPercentage), 100);
    return () => clearTimeout(timer);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage(prev => Math.max(65, Math.min(95, prev + Math.floor(Math.random() * 10 - 5))));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card rounded-2xl p-6">
      <div className="flex justify-between items-center mb-5">
        <div>
          <div className="text-lg font-bold">GPU Utilization</div>
          <div className="text-sm text-muted-foreground mt-1">Overall cluster usage</div>
        </div>
      </div>
      
      <div className="flex justify-center items-center py-5">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(234, 89%, 74%)" />
                <stop offset="50%" stopColor="hsl(270, 67%, 58%)" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="hsl(217, 33%, 17%)"
              strokeWidth="12"
            />
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ 
                transformOrigin: '50% 50%', 
                transform: 'rotate(-90deg)',
                transition: 'stroke-dashoffset 0.8s ease-out'
              }}
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-5xl font-bold gradient-text">{percentage}%</div>
            <div className="text-sm text-muted-foreground mt-1">Active</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-5">
        <div className="text-center p-3 rounded-xl border border-border/50">
          <div className="text-xl font-bold text-primary">{percentage}%</div>
          <div className="text-xs text-muted-foreground mt-1">Avg Load</div>
        </div>
        <div className="text-center p-3 rounded-xl border border-border/50">
          <div className="text-xl font-bold text-secondary">92%</div>
          <div className="text-xs text-muted-foreground mt-1">Peak</div>
        </div>
        <div className="text-center p-3 rounded-xl border border-border/50">
          <div className="text-xl font-bold text-success">98%</div>
          <div className="text-xs text-muted-foreground mt-1">Efficiency</div>
        </div>
      </div>
    </div>
  );
}
