'use client';

import { useEffect, useRef, useState } from 'react';
import { kontaktContent } from '@/lib/content/kontakt';
import styles from './inquiry-form.module.css';

type Option = { value: string; label: string };

type Props = {
  options: Option[];
  value: string;
  onChange: (v: string) => void;
};

export function ServiceDropdown({ options, value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className={styles.selectWrapper} ref={ref}>
      <button
        type='button'
        className={`${styles.selectTrigger}${isOpen ? ` ${styles.selectTriggerOpen}` : ''}${!selected ? ` ${styles.selectPlaceholder}` : ''}`}
        onClick={() => setIsOpen((o) => !o)}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
      >
        {selected ? selected.label : kontaktContent.form.dropdown.placeholder}
        <span
          className={`${styles.selectArrow}${isOpen ? ` ${styles.selectArrowOpen}` : ''}`}
        >
          ▾
        </span>
      </button>
      {isOpen && (
        <ul className={styles.selectDropdown} role='listbox'>
          {options.map((o) => (
            <li
              key={o.value}
              className={`${styles.selectOption}${value === o.value ? ` ${styles.selectOptionSelected}` : ''}`}
              role='option'
              aria-selected={value === o.value}
              data-interactive
              onClick={() => {
                onChange(o.value);
                setIsOpen(false);
              }}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
