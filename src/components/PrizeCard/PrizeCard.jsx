import { ArrowRight, Clock3, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import Countdown from '../Countdown/Countdown';
import styles from '../../App.module.css';

export default function PrizeCard({ prize, endDate }) {
  return <article className={`${styles.prizeCard} ${styles[prize.accent]}`}>
    <div className={styles.prizeTop}><span>{prize.position === 'Lucky draw' ? 'Lucky draw' : `${prize.position} prize`}</span><span>{prize.winners} {prize.winners === 1 ? 'winner' : 'winners'}</span></div>
    <div className={styles.prizeImageWrap}><img src={encodeURI(`/assets/${prize.image}`)} alt={prize.name} loading="lazy" /></div>
    <div className={styles.prizeCopy}><h3>{prize.name}</h3><p>{prize.description}</p></div>
    <div className={styles.prizeMeta}><span><UserRound size={14} /> {prize.participants}</span><span><Clock3 size={14} /> <Countdown endDate={endDate} compact /></span></div>
    <Link className={styles.cardAction} to={`/giveaway/${prize.slug}`}>View giveaway <ArrowRight size={15} /></Link>
  </article>;
}
