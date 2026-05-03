import styles from './inquiry-form.module.css';

export function SuccessCard() {
  return (
    <div className={styles.success}>
      <div className={styles.successCode}>{'// MSG_SENT ✓'}</div>
      <div className={styles.successTitle}>Wiadomość wysłana</div>
      <div className={styles.successBody}>
        Odezwę się tak szybko, jak to możliwe — zazwyczaj w ciągu 24 godzin.
      </div>
    </div>
  );
}
