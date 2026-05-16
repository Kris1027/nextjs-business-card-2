import Link from 'next/link';

type BaseProps = {
  variant?: 'primary' | 'ghost' | 'card';
  size?: 'sm' | 'md' | 'lg';
  arrow?: '→' | '↗' | false;
  className?: string;
  children: React.ReactNode;
};

type LinkProps = BaseProps &
  Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof BaseProps | 'href'
  > & {
    href: string;
  };

type ButtonProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: never;
  };

type CosmicButtonProps = LinkProps | ButtonProps;

function buildClass(variant: string, size: string, className?: string): string {
  return ['btn', `btn--${variant}`, size !== 'md' && `btn--${size}`, className]
    .filter(Boolean)
    .join(' ');
}

function ArrowSlot({
  variant,
  arrow,
}: {
  variant: string;
  arrow: '→' | '↗' | false;
}) {
  if (!arrow) return null;
  if (variant === 'card') {
    return (
      <span className='arr-track'>
        <span className='arr real'>→</span>
        <span className='arr ghost'>→</span>
      </span>
    );
  }
  return (
    <span className={arrow === '↗' ? 'arr arr--ne' : 'arr arr--right'}>
      {arrow}
    </span>
  );
}

export function CosmicButton(props: CosmicButtonProps) {
  const {
    variant = 'ghost',
    size = 'md',
    arrow = '→',
    className,
    children,
  } = props;
  const cls = buildClass(variant, size, className);

  if ('href' in props && props.href) {
    const {
      href,
      variant: _v,
      size: _s,
      arrow: _a,
      className: _c,
      children: _ch,
      ...linkRest
    } = props as LinkProps;

    const isExternal =
      href.startsWith('http://') || href.startsWith('https://');
    const isProtocol = href.startsWith('mailto:') || href.startsWith('tel:');

    if (isExternal || isProtocol) {
      return (
        <a
          href={href}
          className={cls}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          {...linkRest}
        >
          {children}
          <ArrowSlot variant={variant} arrow={arrow} />
        </a>
      );
    }

    return (
      <Link href={href} className={cls} {...linkRest}>
        {children}
        <ArrowSlot variant={variant} arrow={arrow} />
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    arrow: _a,
    className: _c,
    children: _ch,
    href: _h,
    ...buttonRest
  } = props as Required<ButtonProps>;

  return (
    <button className={cls} {...buttonRest}>
      {children}
      <ArrowSlot variant={variant} arrow={arrow} />
    </button>
  );
}
