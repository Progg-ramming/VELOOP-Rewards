import { ChevronDown } from 'lucide-react';
import styles from '../../App.module.css';

export default function FAQ({ faqs, openIndex, onToggle }) {
  return <div className={styles.faq}><span className={styles.sectionKicker}>Need to know</span><h2>Questions, answered.</h2>{faqs.map(([question, answer], index) => <div className={styles.faqItem} key={question}><button onClick={() => onToggle(openIndex === index ? -1 : index)} aria-expanded={openIndex === index}>{question}<ChevronDown size={17} className={openIndex === index ? styles.chevronOpen : ''} /></button>{openIndex === index && <p>{answer}</p>}</div>)}</div>;
}
