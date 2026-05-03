import styles from './section-label.module.css';

type SectionLabelProps = {
  code: string;
  title: string;
  kicker?: string;
};

export default function SectionLabel({
  code,
  title,
  kicker,
}: SectionLabelProps) {
  return (
    <div className={styles.label}>
      <div className={styles.code}>{code}</div>
      <div className={styles.titleBlock}>
        <h2>{title}</h2>
        {kicker && <div className={styles.kicker}>{kicker}</div>}
      </div>
    </div>
  );
}
