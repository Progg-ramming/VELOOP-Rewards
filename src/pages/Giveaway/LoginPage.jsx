import { ArrowLeft, ArrowRight, LockKeyhole } from 'lucide-react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import styles from './GiveawayDetail.module.css';

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const returnTo = searchParams.get('returnTo') || '/';

  return (
    <div className={styles.loginShell}>
      <section className={styles.loginCard}>
        <Link className={styles.backLink} to={returnTo}>
          <ArrowLeft size={17} /> Back to giveaway
        </Link>
        <span className={styles.loginIcon}>
          <LockKeyhole size={22} />
        </span>
        <span className={styles.detailKicker}>VELOOP Rewards account</span>
        <h1>Login to participate.</h1>
        <p>Please login to your VELOOP Rewards account before joining this giveaway.</p>
        <button className={styles.detailButton} onClick={() => navigate(returnTo)}>
          Continue as demo member <ArrowRight size={16} />
        </button>
        <button className={styles.loginSecondary} onClick={() => navigate(returnTo)}>
          Create account
        </button>
      </section>
    </div>
  );
}
