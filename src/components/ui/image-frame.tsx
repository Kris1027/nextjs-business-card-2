import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import styles from './image-frame.module.css';

/**
 * The frame ratios this design actually uses. `var(--frame-ratio)` defers to
 * the surrounding layout's custom property, which is how a page varies the
 * ratio per breakpoint. Kept as a closed union so a caller cannot quietly
 * introduce a fifth crop shape.
 */
type FrameRatio = '16/9' | '4/3' | '4/5' | 'var(--frame-ratio)';

type ImageFrameProps = {
  src: StaticImageData;
  alt: string;
  ratio?: FrameRatio;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * The design's image treatment: a hard 2px border with a thin inset gutter
 * around the image, so the frame reads as a printed plate rather than a card.
 */
export function ImageFrame({
  src,
  alt,
  ratio = '16/9',
  priority = false,
  sizes = '(max-width: 800px) 100vw, 50vw',
  className,
}: ImageFrameProps) {
  return (
    <div className={`${styles.frame}${className ? ` ${className}` : ''}`}>
      <div className={`${styles.inner} cs-crop`} style={{ aspectRatio: ratio }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
      </div>
    </div>
  );
}
