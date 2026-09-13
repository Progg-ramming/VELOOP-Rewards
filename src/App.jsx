import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, BadgeCheck, ChevronDown, ChevronLeft, ChevronRight, Clock3, Gift, LockKeyhole, Menu, PartyPopper, ShieldCheck, Sparkles, Trophy, UserRound,
} from 'lucide-react';
import { currentGiveaway, currentWinners, faqs, participationSteps, previousWinners, rules, winnerMessages } from './data/giveawayData';
import styles from './App.module.css';
import Countdown, { useCountdown } from './components/Countdown/Countdown';
import PrizeCard from './components/PrizeCard/PrizeCard';
import PrizeClaimModal from './components/PrizeClaimModal/PrizeClaimModal';
import GiveawayStats from './components/GiveawayStats/GiveawayStats';
import HowToParticipate from './components/HowToParticipate/HowToParticipate';
import WinnerSlider from './components/WinnerSlider/WinnerSlider';
import WinnersTabs from './components/WinnersTabs/WinnersTabs';
import GroupedWinnersSection from './components/GroupedWinnersSection/GroupedWinnersSection';

const asset = (name) => `/assets/${name}`;
const currentUserId = 'VE10025';

function App() {
  const [joined, setJoined] = useState(false);
  const [activeTab, setActiveTab] = useState('winners');
  const [activeMessage, setActiveMessage] = useState(0);
  const [faqOpen, setFaqOpen] = useState(0);
  const [claimPrize, setClaimPrize] = useState(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [demoEnded, setDemoEnded] = useState(false);
  const [toast, setToast] = useState('');
  const [activePrize, setActivePrize] = useState(0);
  const prizeScrollerRef = useRef(null);
  const prizeHoverRef = useRef(false);
  const countdown = useCountdown(currentGiveaway.endDate);
  const isEnded = demoEnded || countdown.ended;
  const winnerPrize = useMemo(() => currentGiveaway.prizes.find((prize) => prize.id === 'PRIZE-002'), []);

  useEffect(() => { const timer = window.setInterval(() => setActiveMessage((value) => (value + 1) % winnerMessages.length), 5000); return () => window.clearInterval(timer); }, []);
  useEffect(() => { if (!toast) return undefined; const timer = window.setTimeout(() => setToast(''), 2800); return () => window.clearTimeout(timer); }, [toast]);
  useEffect(() => {
    const timer = window.setInterval(() => {
      const scroller = prizeScrollerRef.current;
      if (!scroller || prizeHoverRef.current || !window.matchMedia('(max-width: 760px)').matches || scroller.scrollWidth <= scroller.clientWidth) return;
      const nextIndex = activePrize >= currentGiveaway.prizes.length - 1 ? 0 : activePrize + 1;
      scroller.scrollTo({ left: nextIndex * (scroller.scrollWidth / currentGiveaway.prizes.length), behavior: 'smooth' });
      setActivePrize(nextIndex);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [activePrize]);

  const join = () => { if (!joined) { setJoined(true); setToast('You are in. 24 entries added to your account.'); } };
  const actionLabel = isEnded ? 'View winners' : 'Explore rewards';
  const primaryAction = isEnded ? '#winners' : `/giveaway/${currentGiveaway.prizes[0].slug}`;

  return <div className={styles.appShell}>
    <div className={styles.ambientGlow} />
    <header className={styles.navbar}>
      <a className={styles.logo} href="#top" aria-label="VELOOP Rewards home"><span className={styles.logoMark}>V</span><span><strong>VELOOP</strong><small>REWARDS</small></span></a>
      <nav className={`${styles.navLinks} ${mobileNav ? styles.navOpen : ''}`}><a href="#giveaway" onClick={() => setMobileNav(false)}>Giveaway</a><a href="#winners" onClick={() => setMobileNav(false)}>Winners</a><a href="#how-it-works" onClick={() => setMobileNav(false)}>How it works</a><a href="#rules" onClick={() => setMobileNav(false)}>Rules</a></nav>
      <div className={styles.navActions}><Link to="/login" className={styles.loginButton} style={{ textDecoration: 'none' }}>Log in</Link><button className={styles.profileButton} aria-label="Open profile" onClick={() => setToast('Current profile: VE10025 (Demo member)')}><UserRound size={17} /></button><button className={styles.menuButton} onClick={() => setMobileNav((value) => !value)} aria-label="Toggle navigation"><Menu size={20} /></button></div>
    </header>

    <main id="top">
      <section className={styles.hero} id="giveaway">
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow}><Sparkles size={15} /> SEPTEMBER REWARD DROP</div>
          <h1>Make room for<br /><em>good news.</em></h1>
          <p className={styles.heroLead}>Complete simple activities, collect entries, and get a chance to bring home something you’ll love.</p>
          <div className={styles.heroActions}>
            {primaryAction.startsWith('/') ? (
              <Link className={styles.primaryButton} to={primaryAction}>{actionLabel} <ArrowRight size={17} /></Link>
            ) : (
              <a className={styles.primaryButton} href={primaryAction}>{actionLabel} <ArrowRight size={17} /></a>
            )}
            <a className={styles.textButton} href="#how-it-works">See how it works <ChevronRight size={15} /></a>
          </div>
          <div className={styles.trustNote}><ShieldCheck size={17} /><span>Transparent rules <i /> Secure claim process</span></div>
        </div>
        <div className={styles.heroVisual}><div className={styles.visualLabel}>THE GOOD NEWS<br /><strong>GIVEAWAY</strong></div><div className={styles.heroOrb} /><img src={asset('gift.png')} alt="A premium purple gift box" /><div className={styles.heroTicket}><span>ENTRY PASS</span><strong>VELOOP</strong><small>September 2026</small></div><span className={`${styles.spark} ${styles.sparkOne}`}>✦</span><span className={`${styles.spark} ${styles.sparkTwo}`}>✦</span></div>
      </section>

      <section className={styles.statusBar} aria-label="Current giveaway status"><div className={styles.liveStatus}><span className={styles.liveDot} /> {isEnded ? 'ENDED' : 'LIVE NOW'} <small>{isEnded ? 'Winner announcement available' : 'Entries close soon'}</small></div><div className={styles.statusCopy}><strong>{currentGiveaway.title}</strong><span>Current giveaway</span></div><div className={styles.statusTimer}><span>{isEnded ? 'Status' : 'Ends in'}</span><Countdown endDate={currentGiveaway.endDate} forceEnded={isEnded} /></div></section>

      <GiveawayStats giveaway={currentGiveaway} />

      <section className={styles.contentGrid}>
        <div className={styles.prizesSection} id="featured-rewards"><div className={styles.sectionHeading}><div><span className={styles.sectionKicker}>A little something for you</span><h2>Featured rewards</h2><p>Every entry is a chance to win something genuinely good.</p></div><a className={styles.outlineButton} href="#featured-rewards">View all rewards <ArrowRight size={15} /></a></div><div className={styles.prizeGrid} ref={prizeScrollerRef} onScroll={(event) => { const index = Math.round(event.currentTarget.scrollLeft / (event.currentTarget.scrollWidth / currentGiveaway.prizes.length)); setActivePrize(index); }} onMouseEnter={() => { prizeHoverRef.current = true; }} onMouseLeave={() => { prizeHoverRef.current = false; }}>{currentGiveaway.prizes.map((prize) => <PrizeCard key={prize.id} prize={prize} endDate={currentGiveaway.endDate} />)}</div><div className={styles.prizeDots} role="tablist" aria-label="Featured rewards"><span className={styles.prizeDotsLabel}>Swipe to explore</span>{currentGiveaway.prizes.map((prize, index) => <button key={prize.id} className={activePrize === index ? styles.activePrizeDot : ''} onClick={() => { setActivePrize(index); prizeScrollerRef.current?.scrollTo({ left: index * (prizeScrollerRef.current.scrollWidth / currentGiveaway.prizes.length), behavior: 'smooth' }); }} role="tab" aria-label={`Show ${prize.name}`} aria-selected={activePrize === index} />)}</div></div>
        <HowToParticipate steps={participationSteps} joined={joined} />
      </section>

      <WinnerSlider messages={winnerMessages} activeIndex={activeMessage} onPrevious={() => setActiveMessage((activeMessage - 1 + winnerMessages.length) % winnerMessages.length)} onNext={() => setActiveMessage((activeMessage + 1) % winnerMessages.length)} />
      <WinnersTabs activeTab={activeTab} onTabChange={setActiveTab} isEnded={isEnded} winners={currentWinners} previousWinners={previousWinners} currentUserId={currentUserId} winnerPrize={winnerPrize} onClaim={setClaimPrize} />
      <GroupedWinnersSection activeTab={activeTab} onTabChange={setActiveTab} isEnded={isEnded} winners={currentWinners} previousWinners={previousWinners} currentUserId={currentUserId} winnerPrize={winnerPrize} onClaim={setClaimPrize} />

      <section className={styles.winnersSection} id="winners"><div className={styles.sectionHeading}><div><span className={styles.sectionKicker}>Real people, real rewards</span><h2>Winners & history</h2><p>We keep every announcement clear, private, and easy to verify.</p></div><div className={styles.tabs} role="tablist"><button className={activeTab === 'winners' ? styles.activeTab : ''} onClick={() => setActiveTab('winners')} role="tab" aria-selected={activeTab === 'winners'}>Current giveaway</button><button className={activeTab === 'previous' ? styles.activeTab : ''} onClick={() => setActiveTab('previous')} role="tab" aria-selected={activeTab === 'previous'}>Previous winners</button></div></div>{activeTab === 'winners' ? <div className={`${styles.currentWinnersPanel} ${isEnded ? styles.winnerRevealPanel : ''}`}>{isEnded ? <><div className={styles.winnerSpotlight}><span className={styles.spotlightIcon}><Trophy size={24} /></span><div><span>WINNER SPOTLIGHT</span><strong>Good news has arrived.</strong><small>Our top prize winner is highlighted below.</small></div><Sparkles size={20} /></div><div className={styles.revealBadge}><Trophy size={18} /> Winner reveal complete</div><h3>Congratulations to our winners.</h3><p>Selected after the giveaway closed. Winners have been notified privately.</p><div className={styles.winnerRows}>{currentWinners.map((winner, index) => <div className={`${styles.winnerRow} ${index === 0 ? styles.featuredWinnerRow : ''}`} key={winner.id}><span className={styles.winnerRank}>0{index + 1}</span><span className={styles.avatar}><Trophy size={17} /></span><div><strong>{winner.displayId}</strong><span>won {winner.prize}</span></div><span className={styles.winnerStatus}>{winner.status}</span>{winner.userId === currentUserId && <button className={styles.claimButton} onClick={() => setClaimPrize(winnerPrize)}>Claim prize <ArrowRight size={14} /></button>}</div>)}</div></> : <div className={styles.currentGiveawayStatus}><div className={styles.currentStatusTop}><span className={styles.livePill}>LIVE NOW</span><span>Demo giveaway data</span></div><div className={styles.currentStatusMain}><div><h3>{currentGiveaway.title}</h3><p>Entries are open. Winners will be selected after the countdown closes.</p></div><div className={styles.currentStatusMetric}><strong>{currentGiveaway.participants.toLocaleString()}+</strong><span>participants</span></div><div className={styles.currentStatusMetric}><strong>{currentGiveaway.entries}</strong><span>your entries</span></div></div><div className={styles.currentPrizeRail}>{currentGiveaway.prizes.slice(0, 4).map((prize, index) => <Link to={`/giveaway/${prize.slug}`} className={styles.currentPrizeChip} key={prize.id}><span>0{index + 1}</span><strong>{prize.name}</strong><small>{prize.winners} winner{prize.winners === 1 ? '' : 's'}</small><ArrowRight size={14} /></Link>)}</div><div className={styles.currentStatusFooter}><Clock3 size={15} /> Winner announcement unlocks when the giveaway ends.</div></div>}</div> : <div className={styles.historyGrid}>{previousWinners.map((winner) => <article className={styles.historyCard} key={winner.id}><div className={styles.historyTop}><span className={styles.avatar}><BadgeCheck size={16} /></span><span>{winner.status}</span></div><strong>{winner.displayId}</strong><p>Won <b>{winner.prize}</b></p><div><span>{winner.giveaway}</span><span>{winner.date}</span></div></article>)}</div>}</section>

      <section className={styles.trustStrip}><div><ShieldCheck size={22} /><span><strong>Clear by default</strong><small>Rules and entry requirements are always visible.</small></span></div><div><LockKeyhole size={22} /><span><strong>Private when it matters</strong><small>Winner details are never shared publicly.</small></span></div><div><BadgeCheck size={22} /><span><strong>Made for real rewards</strong><small>A calm, considered experience from entry to claim.</small></span></div></section>

      <section className={styles.detailsGrid} id="rules"><div><span className={styles.sectionKicker}>The fine print, made human</span><h2>Rules & guidelines</h2><p className={styles.detailsIntro}>A fair giveaway is one where everyone knows how it works.</p><div className={styles.rulesList}>{rules.map(([title, text], index) => <div key={title}><span>{String(index + 1).padStart(2, '0')}</span><p><strong>{title}</strong>{text}</p></div>)}</div></div><div className={styles.faq}><span className={styles.sectionKicker}>Need to know</span><h2>Questions, answered.</h2>{faqs.map(([question, answer], index) => <div className={`${styles.faqItem} ${faqOpen === index ? styles.faqOpen : ''}`} key={question}><button onClick={() => setFaqOpen(faqOpen === index ? -1 : index)} aria-expanded={faqOpen === index}>{question}<ChevronDown size={17} className={faqOpen === index ? styles.chevronOpen : ''} /></button>{faqOpen === index && <p>{answer}</p>}</div>)}</div></section>

      <section className={styles.footerCta}>
        <div><span className={styles.sectionKicker}>Your next good thing</span><h2>Ready to make your entry?</h2><p>Join the September reward drop before entries close.</p></div>
        {primaryAction.startsWith('/') ? (
          <Link className={styles.primaryButton} to={primaryAction}>{actionLabel} <ArrowRight size={17} /></Link>
        ) : (
          <a className={styles.primaryButton} href={primaryAction}>{actionLabel} <ArrowRight size={17} /></a>
        )}
      </section>
    </main>
    <footer className={styles.footer}><span className={styles.logo}><span className={styles.logoMark}>V</span><span><strong>VELOOP</strong><small>REWARDS</small></span></span><span>Demo experience · September 2026</span><button className={styles.demoToggle} onClick={() => setDemoEnded((value) => !value)}>{demoEnded ? 'Preview live state' : 'Preview ended state'}</button><span>Built for better moments.</span></footer>
    {claimPrize && <PrizeClaimModal prize={claimPrize} onClose={() => setClaimPrize(null)} />}
    {toast && <div className={styles.toast}><BadgeCheck size={17} /> {toast}</div>}
  </div>;
}

export default App;
