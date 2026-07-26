import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import styles from './image-frame.module.css';

type ImageFrameProps = {
  src: StaticImageData;
  alt: string;
  /** Any CSS aspect-ratio value; accepts a custom property from the caller. */
  ratio?: string;
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
      <div className={styles.inner} style={{ aspectRatio: ratio }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
      </div>
    </div>
  );
}
