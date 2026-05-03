'use client';

import { useActionState, useState, useRef, useEffect } from 'react';
import { submitInquiry } from '@/app/kontakt/actions';
import ScrollReveal from '@/components/cosmos/scroll-reveal';
import { services } from '@/lib/services/data';
import { siteEmail } from '@/lib/config';
import styles from './inquiry-form.module.css';

type Props = {
  defaultService?: string;
};

type FormState =
  | { ok: true }
  | { ok: false; error: string; showContact?: boolean }
  | null;

const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: 'inne', label: 'Inne' },
];

function ServiceDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
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

  const selected = serviceOptions.find((o) => o.value === value);

  return (
    <div className={styles.selectWrapper} ref={ref}>
      <button
        type='button'
        className={`${styles.selectTrigger}${isOpen ? ` ${styles.selectTriggerOpen}` : ''}${!selected ? ` ${styles.selectPlaceholder}` : ''}`}
        onClick={() => setIsOpen((o) => !o)}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
      >
        {selected ? selected.label : '— wybierz usługę —'}
        <span
          className={`${styles.selectArrow}${isOpen ? ` ${styles.selectArrowOpen}` : ''}`}
        >
          ▾
        </span>
      </button>
      {isOpen && (
        <ul className={styles.selectDropdown} role='listbox'>
          {serviceOptions.map((o) => (
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

function SuccessCard() {
  return (
    <div className={styles.success}>
      <div className={styles.successCode}>{'// MSG_SENT ✓'}</div>
      <div className={styles.successTitle}>Wiadomość wysłana</div>
      <div className={styles.successBody}>
        Odezwę się tak szybko, jak to możliwe — zazwyczaj w ciągu 24 godzin.
      </div>
    </div>
  );
}

export default function InquiryForm({ defaultService = '' }: Props) {
  const [selectedService, setSelectedService] = useState(defaultService);
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (_prev, formData) => {
      const payload = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        service: formData.get('service') as string,
        topic: (formData.get('topic') as string) || undefined,
        message: formData.get('message') as string,
        _hp: (formData.get('_hp') as string) ?? '',
      };
      return submitInquiry(payload);
    },
    null
  );

  if (state?.ok === true) return <SuccessCard />;

  return (
    <ScrollReveal>
      <form action={formAction} className={styles.form}>
        <input
          type='text'
          name='_hp'
          tabIndex={-1}
          aria-hidden='true'
          style={{ display: 'none' }}
          autoComplete='off'
        />
        <input type='hidden' name='service' value={selectedService} />

        <div className={styles.field}>
          <label htmlFor='inq-name' className={styles.label}>
            Imię i nazwisko
          </label>
          <input
            id='inq-name'
            name='name'
            type='text'
            className={styles.input}
            placeholder='Jan Kowalski'
            data-interactive
            required
            minLength={2}
            maxLength={80}
            autoComplete='name'
          />
        </div>

        <div className={styles.field}>
          <label htmlFor='inq-email' className={styles.label}>
            Adres e-mail
          </label>
          <input
            id='inq-email'
            name='email'
            type='email'
            className={styles.input}
            placeholder='jan@example.com'
            data-interactive
            required
            autoComplete='email'
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Usługa</label>
          <ServiceDropdown
            value={selectedService}
            onChange={setSelectedService}
          />
        </div>

        {selectedService === 'inne' && (
          <div className={styles.field}>
            <label htmlFor='inq-topic' className={styles.label}>
              Temat
            </label>
            <input
              id='inq-topic'
              name='topic'
              type='text'
              className={styles.input}
              placeholder='Opisz czego dotyczy zapytanie…'
              data-interactive
              required
              minLength={2}
              maxLength={200}
            />
          </div>
        )}

        <div className={styles.field}>
          <label htmlFor='inq-message' className={styles.label}>
            Wiadomość
          </label>
          <textarea
            id='inq-message'
            name='message'
            className={styles.textarea}
            placeholder='Opisz swój projekt lub pytanie…'
            data-interactive
            required
            minLength={10}
            maxLength={2000}
          />
        </div>

        {state?.ok === false && (
          <p className={styles.error} role='alert'>
            {state.error}
            {state.showContact && (
              <>
                {' '}
                <a href={`mailto:${siteEmail}`} className={styles.errorLink}>
                  {siteEmail}
                </a>
              </>
            )}
          </p>
        )}

        <button
          type='submit'
          className='btn-cosmic primary'
          disabled={isPending || !selectedService}
          aria-disabled={isPending || !selectedService}
        >
          {isPending ? 'Wysyłanie…' : 'Wyślij wiadomość →'}
        </button>
      </form>
    </ScrollReveal>
  );
}
