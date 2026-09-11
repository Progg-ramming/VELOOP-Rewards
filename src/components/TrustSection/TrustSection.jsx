import { BadgeCheck, LockKeyhole, ShieldCheck } from 'lucide-react';
import styles from '../../App.module.css';

export default function TrustSection() {
  return <section className={styles.trustStrip}><div><ShieldCheck size={22} /><span><strong>Clear by default</strong><small>Rules and entry requirements are always visible.</small></span></div><div><LockKeyhole size={22} /><span><strong>Private when it matters</strong><small>Winner details are never shared publicly.</small></span></div><div><BadgeCheck size={22} /><span><strong>Made for real rewards</strong><small>A calm, considered experience from entry to claim.</small></span></div></section>;
}
