import styles from '../../App.module.css';

export default function GiveawayRules({ rules }) {
  return <div><span className={styles.sectionKicker}>The fine print, made human</span><h2>Rules & guidelines</h2><p className={styles.detailsIntro}>A fair giveaway is one where everyone knows how it works.</p><div className={styles.rulesList}>{rules.map(([title, text], index) => <div key={title}><span>{String(index + 1).padStart(2, '0')}</span><p><strong>{title}</strong>{text}</p></div>)}</div></div>;
}
