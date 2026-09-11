import { BadgeCheck } from 'lucide-react';
import styles from '../../App.module.css';

export default function PreviousWinnerCard({ winner }) {
  return <article className={styles.historyCard}><div className={styles.historyTop}><span className={styles.avatar}><BadgeCheck size={16} /></span><span>{winner.status}</span></div><strong>{winner.displayId}</strong><p>Won <b>{winner.prize}</b></p><div><span>{winner.giveaway}</span><span>{winner.date}</span></div></article>;
}
