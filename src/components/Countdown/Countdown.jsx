import { useEffect, useState } from 'react';
import styles from '../../App.module.css';

export function useCountdown(endDate) {
  const getRemaining = () => Math.max(0, new Date(endDate).getTime() - Date.now());
  const [remaining, setRemaining] = useState(getRemaining);
  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemaining()), 1000);
    return () => window.clearInterval(timer);
  }, [endDate]);
  const seconds = Math.floor(remaining / 1000);
  return { ended: remaining === 0, days: Math.floor(seconds / 86400), hours: Math.floor((seconds % 86400) / 3600), minutes: Math.floor((seconds % 3600) / 60), seconds: seconds % 60 };
}

export default function Countdown({ endDate, compact = false, forceEnded = false }) {
  const countdown = useCountdown(endDate);
  if (forceEnded || countdown.ended) return <span className={styles.endedLabel}>Giveaway ended</span>;
  return <div className={`${styles.countdown} ${compact ? styles.compactCountdown : ''}`} aria-label="Time remaining">
    {compact ? `${countdown.days}d ${String(countdown.hours).padStart(2, '0')}h ${String(countdown.minutes).padStart(2, '0')}m` : <>{[['days', countdown.days, 'D'], ['hours', countdown.hours, 'H'], ['minutes', countdown.minutes, 'M'], ['seconds', countdown.seconds, 'S']].map(([label, value, suffix]) => <span key={label}><strong>{String(value).padStart(2, '0')}</strong><small>{suffix}</small></span>)}</>}
  </div>;
}
