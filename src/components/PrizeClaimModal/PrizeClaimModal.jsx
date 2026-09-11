import { useState } from 'react';
import { ArrowRight, BadgeCheck, X } from 'lucide-react';
import { currentGiveaway, prizeTypes } from '../../data/giveawayData';
import styles from '../../App.module.css';

export default function PrizeClaimModal({ prize, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const isGiftCard = prize.type === 'giftCard';
  return <div className={styles.modalBackdrop} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className={styles.claimModal} role="dialog" aria-modal="true" aria-labelledby="claim-title">
      <button className={styles.closeButton} onClick={onClose} aria-label="Close claim form"><X size={18} /></button>
      {!submitted ? <>
        <span className={styles.modalKicker}><BadgeCheck size={16} /> Winner verification</span>
        <h2 id="claim-title">Claim your {isGiftCard ? 'gift card' : 'prize'}</h2>
        <p className={styles.modalIntro}>You won <strong>{prize.name}</strong> in {currentGiveaway.title}. Submit the details below within 7 days.</p>
        <div className={styles.claimSummary}><span>Status</span><strong>Winner verified</strong><span>Required</span><strong>{prizeTypes[prize.type].claimLabel}</strong></div>
        <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
          {isGiftCard ? <label>Email address<input type="email" required placeholder="you@example.com" /></label> : <div className={styles.formGrid}><label>Full name<input required placeholder="Your full name" /></label><label>Phone number<input required placeholder="+91 00000 00000" /></label><label className={styles.fullField}>Complete address<input required placeholder="House, street and landmark" /></label><label>City<input required placeholder="City" /></label><label>State<input required placeholder="State" /></label><label>PIN code<input required inputMode="numeric" placeholder="000000" /></label></div>}
          <button className={styles.primaryButton} type="submit">Submit claim <ArrowRight size={17} /></button>
        </form>
      </> : <div className={styles.submittedState}><span className={styles.successIcon}><BadgeCheck size={28} /></span><h2>Claim submitted</h2><p>Our rewards team will verify your details and process your {isGiftCard ? 'gift card' : 'prize'} shortly.</p><button className={styles.secondaryButton} onClick={onClose}>Done</button></div>}
    </section>
  </div>;
}
