import { Gift } from 'lucide-react';
import styles from '../../App.module.css';

export default function HowToParticipate({ steps, joined }) {
  return <aside className={styles.howCard} id="how-it-works"><div className={styles.sectionKicker}>Simple by design</div><h2>How to participate</h2><p>Four small steps stand between you and a very good surprise.</p><div className={styles.steps}>{steps.map((step, index) => <div className={styles.step} key={step.number}><span className={styles.stepNumber}>{step.number}</span><div><strong>{step.title}</strong><p>{step.text}</p></div>{index < steps.length - 1 && <span className={styles.stepLine} />}</div>)}</div><div className={styles.entryCallout}><span><Gift size={17} /> Your entries</span><strong>{joined ? '24 entries' : 'Not joined yet'}</strong><small>{joined ? 'Complete more tasks to earn more.' : 'Join the giveaway to start.'}</small></div></aside>;
}
