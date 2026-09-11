import { ChevronLeft, ChevronRight, PartyPopper } from 'lucide-react';
import styles from '../../App.module.css';

export default function WinnerSlider({ messages, activeIndex, onPrevious, onNext }) {
  const message = messages[activeIndex];
  return <section className={styles.announcement} aria-label="Winner announcements"><div className={styles.announcementIcon}><PartyPopper size={18} /></div><div className={styles.announcementText}><span>GOOD NEWS, ON REPEAT</span><strong><b>{message.user}</b> won a {message.prize}</strong></div><div className={styles.sliderControls}><button onClick={onPrevious} aria-label="Previous announcement"><ChevronLeft size={17} /></button><span>{String(activeIndex + 1).padStart(2, '0')} / {String(messages.length).padStart(2, '0')}</span><button onClick={onNext} aria-label="Next announcement"><ChevronRight size={17} /></button></div></section>;
}
