import Image, { type StaticImageData } from 'next/image';

type GlowFrameProps = {
  src: StaticImageData | string;
  alt: string;
  ratio?: string;
  label?: string;
  designation?: string;
  priority?: boolean;
};

export default function GlowFrame({
  src,
  alt,
  ratio = '16/9',
  label,
  designation,
  priority,
}: GlowFrameProps) {
  return (
    <div className='cs-frame' style={{ aspectRatio: ratio }}>
      <div className='cs-frame-corners'>
        <span />
        <span />
        <span />
        <span />
      </div>
      <Image
        src={src}
        alt={alt}
        fill
        sizes='(max-width: 800px) 100vw, 50vw'
        priority={priority}
      />
      <div className='cs-frame-scan' />
      {(label || designation) && (
        <div className='cs-frame-meta'>
          {designation && <span className='cs-frame-desig'>{designation}</span>}
          {label && <span>{label}</span>}
        </div>
      )}
    </div>
  );
}
