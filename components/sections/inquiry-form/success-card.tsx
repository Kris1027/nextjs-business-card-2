import { kontaktContent } from '@/lib/content/kontakt';
import styles from './inquiry-form.module.css';

export function SuccessCard() {
  return (
    <div className={styles.success}>
      <div className={styles.successCode}>
        {kontaktContent.successCard.code}
      </div>
      <div className={styles.successTitle}>
        {kontaktContent.successCard.title}
      </div>
      <div className={styles.successBody}>
        {kontaktContent.successCard.body}
      </div>
    </div>
  );
}
