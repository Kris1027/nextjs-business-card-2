import styles from './section-label.module.css';

type SectionLabelProps = {
  code: string;
  title: string;
  kicker?: string;
  as?: 'h1' | 'h2';
};

export function SectionLabel({
  code,
  title,
  kicker,
  as: Heading = 'h2',
}: SectionLabelProps) {
  return (
    // Code, heading and kicker are siblings so the kicker can sit flush right
    // on the shared baseline rule.
    <div className={styles.label}>
      <span className={styles.code}>{code}</span>
      <Heading className={styles.title}>{title}</Heading>
      {kicker && <span className={styles.kicker}>{kicker}</span>}
    </div>
  );
}
