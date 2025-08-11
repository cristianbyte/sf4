import { useState, useEffect } from 'react';
import './countdown.css';

const Countdown = ({ 
  targetDate, 
  className = '',
  onComplete,
  showLabels = true,
  format = 'full' // 'full', 'compact', 'minimal'
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isComplete: true
        });
        
        if (onComplete && !timeLeft.isComplete) {
          onComplete();
        }
        
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isComplete: false
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete, timeLeft.isComplete]);

  const formatNumber = (num) => {
    return num.toString().padStart(2, '0');
  };

  const renderTimeUnit = (value, label, isLast = false) => {
    if (format === 'minimal' && value === 0 && label !== 'seconds') return null;
    
    return (
      <>
        <div className="countdown__unit">
          {showLabels && <div className="countdown__label">{label}</div>}
          <div className="countdown__number">{formatNumber(value)}</div>
        </div>
        {!isLast && <div className="countdown__separator">:</div>}
      </>
    );
  };

  const baseClass = `countdown ${className}`;
  const containerClass = timeLeft.isComplete ? 
    `${baseClass} countdown--complete` : 
    `${baseClass} countdown--active`;

  if (timeLeft.isComplete) {
    return (
      <div className={containerClass}>
        <div className="countdown__complete">
          <div className="countdown__complete-text">Event Started!</div>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <div className="countdown__container">
        {format === 'full' && renderTimeUnit(timeLeft.days, 'días')}
        {renderTimeUnit(timeLeft.hours, 'horas')}
        {renderTimeUnit(timeLeft.minutes, 'minutos')}
        {renderTimeUnit(timeLeft.seconds, 'segundos', true)}
      </div>
    </div>
  );
};

export default Countdown;