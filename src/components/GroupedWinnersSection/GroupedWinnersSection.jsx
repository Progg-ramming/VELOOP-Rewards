import { useEffect, useRef, useState } from 'react';
import { ArrowRight, BadgeCheck, Clock3, Trophy } from 'lucide-react';
import { currentGiveaway } from '../../data/giveawayData';
import styles from '../../App.module.css';

export default function GroupedWinnersSection({ activeTab, onTabChange, isEnded, winners, previousWinners, currentUserId, winnerPrize, onClaim }) {
  const [group, setGroup] = useState(0);
  const [previousGroup, setPreviousGroup] = useState(0);
  const currentRail = useRef(null);
  const previousRail = useRef(null);
  const currentGroups = Math.ceil(currentGiveaway.prizes.length / 3);
  const previousGroups = Math.ceil(previousWinners.length / 3);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (activeTab === 'winners') setGroup((value) => (value + 1) % currentGroups);
      else setPreviousGroup((value) => (value + 1) % previousGroups);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [activeTab, currentGroups, previousGroups]);

  useEffect(() => {
    if (currentRail.current && activeTab === 'winners') currentRail.current.scrollTo({ left: group * currentRail.current.clientWidth, behavior: 'smooth' });
    if (previousRail.current && activeTab === 'previous') previousRail.current.scrollTo({ left: previousGroup * previousRail.current.clientWidth, behavior: 'smooth' });
  }, [activeTab, group, previousGroup]);

  return <section className={`${styles.winnersSection} ${styles.groupedWinners}`} id="winners-grouped"><div className={styles.sectionHeading}><div><span className={styles.sectionKicker}>Real people, real rewards</span><h2>Winners & history</h2><p>We keep every announcement clear, private, and easy to verify.</p></div><div className={styles.tabs} role="tablist"><button className={activeTab === 'winners' ? styles.activeTab : ''} onClick={() => onTabChange('winners')} role="tab" aria-selected={activeTab === 'winners'}>Current giveaway</button><button className={activeTab === 'previous' ? styles.activeTab : ''} onClick={() => onTabChange('previous')} role="tab" aria-selected={activeTab === 'previous'}>Previous winners</button></div></div>{activeTab === 'winners' ? <div className={`${styles.currentWinnersPanel} ${isEnded ? styles.winnerRevealPanel : ''}`}>{isEnded ? <><div className={styles.winnerSpotlight}><span className={styles.spotlightIcon}><Trophy size={24} /></span><div><span>WINNER SPOTLIGHT</span><strong>Good news has arrived.</strong><small>Our top prize winner is highlighted below.</small></div></div><div className={styles.revealBadge}><Trophy size={18} /> Winner reveal complete</div><h3>Congratulations to our winners.</h3><p>Selected after the giveaway closed. Winners have been notified privately.</p><div className={styles.groupedWinnerRows}>{winners.map((winner, index) => <div className={`${styles.winnerRow} ${index === 0 ? styles.featuredWinnerRow : ''}`} key={winner.id}><span className={styles.winnerRank}>0{index + 1}</span><span className={styles.avatar}><Trophy size={17} /></span><div><strong>{winner.displayId}</strong><span>won {winner.prize}</span></div><span className={styles.winnerStatus}>{winner.status}</span>{winner.userId === currentUserId && <button className={styles.claimButton} onClick={() => onClaim(winnerPrize)}>Claim prize <ArrowRight size={14} /></button>}</div>)}</div></> : <div className={styles.currentGiveawayStatus}><div className={styles.currentStatusTop}><span className={styles.livePill}>LIVE NOW</span><span>Demo giveaway data</span></div><div className={styles.currentStatusMain}><div><h3>{currentGiveaway.title}</h3><p>Entries are open. Winners will be selected after the countdown closes.</p></div><div className={styles.currentStatusMetric}><strong>{currentGiveaway.participants.toLocaleString()}+</strong><span>participants</span></div><div className={styles.currentStatusMetric}><strong>{currentGiveaway.entries}</strong><span>your entries</span></div></div><div className={styles.groupedRail} ref={currentRail}>{currentGiveaway.prizes.map((prize, index) => <a className={styles.groupedCard} href={`/giveaway/${prize.slug}`} key={prize.id}><span>0{index + 1}</span><strong>{prize.name}</strong><small>{prize.winners} winner{prize.winners === 1 ? '' : 's'} · View details</small><ArrowRight size={14} /></a>)}</div><CarouselDots count={currentGroups} active={group} label="Current giveaway groups" onChange={setGroup} /><div className={styles.currentStatusFooter}><Clock3 size={15} /> Winner announcement unlocks when the giveaway ends.</div></div>}</div> : <div className={styles.historyCarousel}><div className={styles.groupedRail} ref={previousRail}>{previousWinners.map((winner) => <article className={`${styles.historyCard} ${styles.groupedCard}`} key={winner.id}><div className={styles.historyTop}><span className={styles.avatar}><BadgeCheck size={16} /></span><span>{winner.status}</span></div><strong>{winner.displayId}</strong><p>Won <b>{winner.prize}</b></p><div><span>{winner.giveaway}</span><span>{winner.date}</span></div></article>)}</div><CarouselDots count={previousGroups} active={previousGroup} label="Previous winner groups" onChange={setPreviousGroup} /></div>}</section>;
}

function CarouselDots({ count, active, label, onChange }) {
  return <div className={styles.carouselDots} role="tablist" aria-label={label}><span>Swipe to explore</span>{Array.from({ length: count }, (_, index) => <button key={index} className={active === index ? styles.activeCarouselDot : ''} onClick={() => onChange(index)} role="tab" aria-label={`Show group ${index + 1}`} aria-selected={active === index} />)}</div>;
}
