import { Clock3, Gift, Trophy, UserRound } from 'lucide-react';
import Countdown, { useCountdown } from '../Countdown/Countdown';
import styles from '../../App.module.css';

export default function GiveawayStats({ giveaway }) {
  const countdown = useCountdown(giveaway.endDate);
  return <section className={styles.statsGrid} aria-label="Giveaway statistics"><div><span className={styles.statIcon}><Gift size={19} /></span><small>Total giveaways</small><strong>24 <i>active</i></strong></div><div><span className={`${styles.statIcon} ${styles.blueIcon}`}><UserRound size={19} /></span><small>Total participants</small><strong>8.5K<sup>+</sup> <i>users</i></strong></div><div><span className={`${styles.statIcon} ${styles.greenIcon}`}><Trophy size={19} /></span><small>Prizes won</small><strong>1.2K<sup>+</sup> <i>rewards</i></strong></div><div><span className={`${styles.statIcon} ${styles.amberIcon}`}><Clock3 size={19} /></span><small>Time remaining</small><strong>{countdown.ended ? 'Ended' : `${countdown.days}d ${String(countdown.hours).padStart(2, '0')}h`} <i>to go</i></strong></div><span className="visually-hidden"><Countdown endDate={giveaway.endDate} /></span></section>;
}
