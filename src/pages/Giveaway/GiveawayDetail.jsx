import { useMemo, useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BadgeCheck, Check, ChevronDown, Clock3, Gift, Info, LockKeyhole, ShieldCheck, Sparkles, UserRound, X } from 'lucide-react';
import Countdown from '../../components/Countdown/Countdown';
import { currentGiveaway } from '../../data/giveawayData';
import styles from './GiveawayDetail.module.css';

const flow = ['Review the giveaway', 'Check eligibility', 'Confirm the entry amount', 'Participation is recorded', 'Wait until it ends', 'Winner is selected', 'Winner claims the prize'];

function ConfirmationModal({ prize, onCancel, onConfirm }) {
  const [confirmed, setConfirmed] = useState(false);
  const fee = prize.entry;
  if (confirmed) return <div className={styles.modalBackdrop}><section className={styles.confirmModal} role="dialog" aria-modal="true"><span className={styles.successMark}><Check size={28} /></span><h2>You’re in.</h2><p>Your participation for <strong>{prize.name}</strong> has been successfully recorded.</p><div className={styles.successFee}>Entry fee <strong>{fee.amount.toLocaleString()} {fee.currency}</strong></div><button className={styles.detailButton} onClick={onConfirm}>View giveaway <ArrowRight size={16} /></button></section></div>;
  const after = fee.balance - fee.amount;
  return <div className={styles.modalBackdrop} onMouseDown={(event) => event.target === event.currentTarget && onCancel()}><section className={styles.confirmModal} role="dialog" aria-modal="true" aria-labelledby="confirm-title"><button className={styles.modalClose} onClick={onCancel} aria-label="Close confirmation"><X size={18} /></button><span className={styles.modalKicker}><ShieldCheck size={16} /> Confirm participation</span><h2 id="confirm-title">Join {prize.name}?</h2><p>Review the entry amount before continuing. This demo does not process real currency.</p><div className={styles.balanceGrid}><span>Entry fee</span><strong>{fee.amount.toLocaleString()} {fee.currency}</strong><span>Your balance</span><strong>{fee.balance.toLocaleString()} {fee.currency}</strong><span>Balance after joining</span><strong>{after.toLocaleString()} {fee.currency}</strong></div><label className={styles.confirmCheck}><input type="checkbox" onChange={(event) => setConfirmed(event.target.checked)} /> I have reviewed the giveaway rules and terms.</label><button className={styles.detailButton} disabled={!confirmed} onClick={onConfirm}>Confirm & join <ArrowRight size={16} /></button></section></div>;
}

export default function GiveawayDetail({ slug: propSlug }) {
  const { slug: paramSlug } = useParams();
  const slug = propSlug || paramSlug;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const prize = useMemo(() => currentGiveaway.prizes.find((item) => item.slug === slug), [slug]);
  const [joined, setJoined] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const visitorMode = searchParams.get('visitor') === '1';

  if (!prize) return <div className={styles.notFound}><h1>Giveaway not found</h1><p>This reward may have moved to the previous winners vault.</p><Link to="/">Return to giveaway home</Link></div>;
  const fee = prize.entry;
  const hasBalance = fee.balance >= fee.amount;
  const joinLabel = joined ? 'You’re already participating' : visitorMode ? 'Login to participate' : hasBalance ? `Join for ${fee.amount.toLocaleString()} ${fee.currency}` : `Earn more ${fee.currency}`;

  return <div className={styles.detailShell}>
    <header className={styles.detailNav}><Link to="/" className={styles.backLink}><ArrowLeft size={17} /> <span className={styles.desktopBack}>Giveaway home</span><span className={styles.mobileBack}>Giveaway</span></Link><Link className={styles.detailLogo} to="/"><span>V</span> VELOOP <small>REWARDS</small></Link><a className={styles.supportLink} href="#support">Need help?</a></header>
    <main>
      <section className={styles.detailHero}>
        <div className={styles.detailHeroCopy}><span className={styles.detailKicker}><Sparkles size={14} /> Exclusive giveaway</span><h1>Win an<br /><em>{prize.name}</em></h1><p>{prize.description} Join this reward drop after reviewing the entry amount, eligibility, and rules.</p><div className={styles.liveBadge}><span /> GIVEAWAY LIVE</div><div className={styles.detailCountdown}><span>Ends in</span><Countdown endDate={currentGiveaway.endDate} /></div></div>
        <div className={`${styles.detailVisual} ${styles[prize.accent]}`}><div className={styles.visualHalo} /><img src={encodeURI(`/assets/${prize.image}`)} alt={prize.name} /><span className={styles.visualTag}>{prize.position === 'Lucky draw' ? 'LUCKY DRAW' : `${prize.position} PRIZE`}</span></div>
      </section>

      <section className={styles.prizePanel}><div className={styles.prizePanelTitle}><span className={styles.detailKicker}>Before you join</span><h2>Everything you need to know.</h2><p>No surprises at the final step. The entry currency and amount are shown clearly below.</p></div><div className={styles.prizeFacts}><div><Gift size={17} /><span>Prize<br /><strong>{prize.name}</strong></span></div><div><TrophyIcon /><span>Winners<br /><strong>{prize.winners} {prize.winners === 1 ? 'winner' : 'winners'}</strong></span></div><div><UserRound size={17} /><span>Participants<br /><strong>{prize.participants}</strong></span></div><div><Clock3 size={17} /><span>Duration<br /><strong>{prize.duration}</strong></span></div></div><div className={styles.feeBox}><div><span>Entry fee</span><strong>{fee.amount.toLocaleString()} {fee.currency}</strong><small>Required balance: {fee.amount.toLocaleString()} {fee.currency}</small></div><div className={hasBalance ? styles.balanceGood : styles.balanceBad}><span>Your balance</span><strong>{fee.balance.toLocaleString()} {fee.currency}</strong><small>{hasBalance ? <><Check size={13} /> You have enough {fee.currency}</> : <>You need {(fee.amount - fee.balance).toLocaleString()} more {fee.currency}</>}</small></div><button className={styles.joinButton} disabled={joined || (!hasBalance && !visitorMode)} onClick={() => { if (visitorMode) navigate(`/login?returnTo=/giveaway/${prize.slug}`); else if (hasBalance && !joined) setShowModal(true); }}>{joinLabel} {!joined && !visitorMode && hasBalance && <ArrowRight size={17} />}</button></div>{joined && <div className={styles.joinedNotice}><BadgeCheck size={17} /> Your entry has already been recorded. One participation per user applies in this demo.</div>}{visitorMode && !joined && <div className={styles.earnNotice}><Info size={16} /> Login is required before participating. No entry amount will be charged from this page.</div>}{!hasBalance && !joined && !visitorMode && <div className={styles.earnNotice}><Info size={16} /> Your balance is short by {(fee.amount - fee.balance).toLocaleString()} {fee.currency}. Complete eligible activities to earn more before joining.</div>}</section>

      <section className={styles.contentTwoCol}><div><div className={styles.sectionHeading}><span className={styles.detailKicker}>A clear path to the prize</span><h2>How this giveaway works</h2></div><div className={styles.timeline}>{flow.map((step, index) => <div className={styles.timelineStep} key={step}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{step}</strong>{index === 1 && <small>{prize.eligibility}</small>}{index === 2 && <small>{fee.amount.toLocaleString()} {fee.currency} is required to participate.</small>}</div>{index < flow.length - 1 && <i />}</div>)}</div></div><aside className={styles.sideCard}><span className={styles.detailKicker}>About the prize</span><h2>{prize.name}</h2><img src={encodeURI(`/assets/${prize.image}`)} alt="" /><p>{prize.description}</p><strong>{prize.prizeValue}</strong><span className={styles.sideMeta}>{prize.winners} winner slots · {prizeTypesLabel(prize.type)}</span></aside></section>

      <section className={styles.expandable}><button onClick={() => setInfoOpen((value) => !value)} aria-expanded={infoOpen}><span><Info size={17} /> Important information</span><ChevronDown className={infoOpen ? styles.rotate : ''} size={18} /></button>{infoOpen && <div className={styles.expandGrid}><p><strong>Entry currency</strong>{fee.currency}</p><p><strong>Entry amount</strong>{fee.amount.toLocaleString()} {fee.currency}</p><p><strong>Account eligibility</strong>{prize.eligibility}</p><p><strong>Winner selection</strong>Winners are selected after the countdown closes and notified privately.</p><p><strong>Claim requirements</strong>Winners submit delivery details within 7 days.</p><p><strong>Fraud prevention</strong>Suspicious or abusive participation may be removed under platform rules.</p></div>}</section>
      <section className={styles.termsSection}><button onClick={() => setTermsOpen((value) => !value)} aria-expanded={termsOpen}><span><LockKeyhole size={17} /> Terms & conditions</span><ChevronDown className={termsOpen ? styles.rotate : ''} size={18} /></button>{termsOpen && <div className={styles.termsCopy}><p><strong>Eligibility:</strong> {prize.eligibility}</p><p><strong>Duration:</strong> {prize.duration}. The live countdown is the source of truth for this demo.</p><p><strong>Participation:</strong> One recorded participation per user. Entry amounts are represented as virtual demo balances and are not real currency.</p><p><strong>Refund/entry policy:</strong> Placeholder pending confirmation of the final VELOOP Rewards policy. No refund promise is made in this frontend demo.</p><p><strong>Disqualification:</strong> Duplicate, automated, fraudulent, abusive, or rule-breaking activity may result in disqualification.</p></div>}</section>
    </main>
    <footer className={styles.detailFooter} id="support"><Link to="/">Giveaway home</Link><Link to="/#rules">Rules</Link><a href="#terms">Terms</a><a href="#support">Privacy</a><span>Questions? Contact VELOOP Rewards support.</span></footer>
    {showModal && <ConfirmationModal prize={prize} onCancel={() => setShowModal(false)} onConfirm={() => { setJoined(true); setShowModal(false); }} />}
  </div>;
}

function TrophyIcon() { return <span className={styles.trophyIcon}>✦</span>; }
function prizeTypesLabel(type) { return type === 'giftCard' ? 'Digital delivery' : 'Physical delivery'; }
