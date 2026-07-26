import { siteVersion } from '@/lib/config';
import { systemContent } from '@/lib/content/system';
import { SystemScreen } from '@/components/ui/system-screen';
import styles from './loading.module.css';

const { loading } = systemContent;

export default function Loading() {
  return (
    <SystemScreen
      role='status'
      ariaLabel={loading.ariaLabel}
      channel={loading.channel}
      state={siteVersion}
      status={loading.progressLabel}
      live
    >
      <div aria-hidden='true' className={styles.titleBlock}>
        <div className={styles.lbl}>{loading.label}</div>
        <h1 className={styles.h1}>
          {loading.brand.name}
          <span className={styles.acc}>{loading.brand.accent}</span>
        </h1>
        <div className={styles.cmd}>
          <span className={styles.prompt}>$</span> {loading.command}
          <span className={styles.caret} />
        </div>
      </div>

      {/* The bar is a looping indeterminate indicator - there is no real
          progress figure to report, so it is decorative and the surrounding
          role='status' carries the announcement. */}
      <div aria-hidden='true' className={styles.bar}>
        <div className={styles.fill} />
      </div>

      <div aria-hidden='true' className={styles.log}>
        {loading.log.map((entry) => (
          <div key={entry.time} className={styles.line}>
            <span className={styles.time}>{entry.time}</span>
            <span className={entry.mark === 'ok' ? styles.ok : styles.run}>
              {entry.mark === 'ok' ? '✓' : '»'}
            </span>
            <span>{entry.text}</span>
          </div>
        ))}
      </div>
    </SystemScreen>
  );
}
