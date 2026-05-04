import Link from 'next/link';

type CosmicButtonProps = {
  href?: string;
  variant?: 'primary' | 'default';
  arrow?: '→' | '↗';
  className?: string;
  disabled?: boolean;
  type?: 'submit' | 'button';
  children: React.ReactNode;
};

export function CosmicButton({
  href,
  variant = 'default',
  arrow = '→',
  className,
  disabled,
  type = 'button',
  children,
}: CosmicButtonProps) {
  const cls = `btn-cosmic${variant === 'primary' ? ' primary' : ''}${className ? ` ${className}` : ''}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children} <span className='arrow'>{arrow}</span>
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={cls}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children} <span className='arrow'>{arrow}</span>
    </button>
  );
}
