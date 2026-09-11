import { ArrowLeft, ArrowRight, LockKeyhole } from 'lucide-react';
import styles from './GiveawayDetail.module.css';

export default function LoginPage() {
  const params = new URLSearchParams(window.location.search);
  const returnTo = params.get('returnTo') || '/';
  return <div className={styles.loginShell}><section className={styles.loginCard}><a className={styles.backLink} href={returnTo}><ArrowLeft size={17} /> Back to giveaway</a><span className={styles.loginIcon}><LockKeyhole size={22} /></span><span className={styles.detailKicker}>VELOOP Rewards account</span><h1>Login to participate.</h1><p>Please login to your VELOOP Rewards account before joining this giveaway.</p><button className={styles.detailButton} onClick={() => { window.location.href = returnTo; }}>Continue as demo member <ArrowRight size={16} /></button><button className={styles.loginSecondary} onClick={() => { window.location.href = returnTo; }}>Create account</button></section></div>;
}
