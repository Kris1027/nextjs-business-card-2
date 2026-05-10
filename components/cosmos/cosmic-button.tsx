import Link from 'next/link';

type BaseProps = {
  variant?: 'primary' | 'default';
  arrow?: '→' | '↗' | false;
  className?: string;
  children: React.ReactNode;
};

/** Links cannot be disabled — to render a disabled CTA, pass `href` undefined
 *  and use the button branch (with `disabled`/`aria-disabled`) instead. */
type LinkProps = BaseProps & { href: string; disabled?: never; type?: never };
type ButtonProps = BaseProps & {
  href?: never;
  disabled?: boolean;
  type?: 'submit' | 'button';
};

type CosmicButtonProps = LinkProps | ButtonProps;

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
        {children}
        {arrow && (
          <>
            {' '}
            <span className='arrow'>{arrow}</span>
          </>
        )}
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
      {children}
      {arrow && (
        <>
          {' '}
          <span className='arrow'>{arrow}</span>
        </>
      )}
    </button>
  );
}
