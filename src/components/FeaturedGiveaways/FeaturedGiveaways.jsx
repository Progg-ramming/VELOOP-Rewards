import { ArrowRight } from 'lucide-react';
import PrizeCard from '../PrizeCard/PrizeCard';
import styles from '../../App.module.css';

export default function FeaturedGiveaways({ prizes, endDate, onViewAll }) {
  return <div className={styles.prizesSection}><div className={styles.sectionHeading}><div><span className={styles.sectionKicker}>A little something for you</span><h2>Featured rewards</h2><p>Every entry is a chance to win something genuinely good.</p></div><button className={styles.outlineButton} onClick={onViewAll}>View all rewards <ArrowRight size={15} /></button></div><div className={styles.prizeGrid}>{prizes.map((prize) => <PrizeCard key={prize.id} prize={prize} endDate={endDate} />)}</div></div>;
}
