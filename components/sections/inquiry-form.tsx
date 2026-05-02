'use client';

import { useActionState, useState, useRef, useEffect } from 'react';
import { submitInquiry } from '@/app/kontakt/actions';
import ScrollReveal from '@/components/cosmos/scroll-reveal';
import { services } from '@/lib/services';
import { siteEmail } from '@/lib/config';

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
    <div className='cs-select-custom' ref={ref}>
      <button
        type='button'
        className={`cs-select-trigger${!selected ? ' cs-select-placeholder' : ''}`}
        onClick={() => setIsOpen((o) => !o)}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
      >
        {selected ? selected.label : '— wybierz usługę —'}
        <span className={`cs-select-arrow${isOpen ? ' open' : ''}`}>▾</span>
      </button>
      {isOpen && (
        <ul className='cs-select-dropdown' role='listbox'>
          {serviceOptions.map((o) => (
            <li
              key={o.value}
              className={`cs-select-option${value === o.value ? ' selected' : ''}`}
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
    <div className='cs-form-success'>
      <div className='cs-form-success-code'>{'// MSG_SENT ✓'}</div>
      <div className='cs-form-success-title'>Wiadomość wysłana</div>
      <div className='cs-form-success-body'>
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
      <form action={formAction} className='cs-inquiry-form'>
        <input
          type='text'
          name='_hp'
          tabIndex={-1}
          aria-hidden='true'
          style={{ display: 'none' }}
          autoComplete='off'
        />
        <input type='hidden' name='service' value={selectedService} />

        <div className='cs-field'>
          <label htmlFor='inq-name' className='cs-label'>
            Imię i nazwisko
          </label>
          <input
            id='inq-name'
            name='name'
            type='text'
            className='cs-input'
            placeholder='Jan Kowalski'
            data-interactive
            required
            minLength={2}
            maxLength={80}
            autoComplete='name'
          />
        </div>

        <div className='cs-field'>
          <label htmlFor='inq-email' className='cs-label'>
            Adres e-mail
          </label>
          <input
            id='inq-email'
            name='email'
            type='email'
            className='cs-input'
            placeholder='jan@example.com'
            data-interactive
            required
            autoComplete='email'
          />
        </div>

        <div className='cs-field'>
          <label className='cs-label'>Usługa</label>
          <ServiceDropdown
            value={selectedService}
            onChange={setSelectedService}
          />
        </div>

        {selectedService === 'inne' && (
          <div className='cs-field'>
            <label htmlFor='inq-topic' className='cs-label'>
              Temat
            </label>
            <input
              id='inq-topic'
              name='topic'
              type='text'
              className='cs-input'
              placeholder='Opisz czego dotyczy zapytanie…'
              data-interactive
              required
              minLength={2}
              maxLength={200}
            />
          </div>
        )}

        <div className='cs-field'>
          <label htmlFor='inq-message' className='cs-label'>
            Wiadomość
          </label>
          <textarea
            id='inq-message'
            name='message'
            className='cs-textarea'
            placeholder='Opisz swój projekt lub pytanie…'
            data-interactive
            required
            minLength={10}
            maxLength={2000}
          />
        </div>

        {state?.ok === false && (
          <p className='cs-form-error' role='alert'>
            {state.error}
            {state.showContact && (
              <>
                {' '}
                <a href={`mailto:${siteEmail}`} className='cs-form-error-link'>
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
