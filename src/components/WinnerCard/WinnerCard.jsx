import { Trophy } from 'lucide-react';
import styles from '../../App.module.css';

export default function WinnerCard({ winner, isCurrentUser, onClaim }) {
  return <div className={styles.winnerRow}><span className={styles.avatar}><Trophy size={17} /></span><div><strong>{winner.displayId}</strong><span>won {winner.prize}</span></div><span className={styles.winnerStatus}>{winner.status}</span>{isCurrentUser && <button className={styles.claimButton} onClick={onClaim}>Claim prize <span aria-hidden="true">→</span></button>}</div>;
}
