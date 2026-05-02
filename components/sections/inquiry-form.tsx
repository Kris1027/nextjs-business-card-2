'use client';

import { useActionState } from 'react';
import { submitInquiry } from '@/app/kontakt/actions';
import ScrollReveal from '@/components/cosmos/scroll-reveal';
import { services } from '@/lib/services';

type Props = {
  defaultService?: string;
};

type FormState = { ok: true } | { ok: false; error: string } | null;

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
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (_prev, formData) => {
      const payload = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        service: formData.get('service') as string,
        message: formData.get('message') as string,
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
            required
            autoComplete='email'
          />
        </div>

        <div className='cs-field'>
          <label htmlFor='inq-service' className='cs-label'>
            Usługa
          </label>
          <select
            id='inq-service'
            name='service'
            className='cs-select'
            defaultValue={defaultService}
            required
          >
            <option value='' disabled>
              — wybierz usługę —
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </div>

        <div className='cs-field'>
          <label htmlFor='inq-message' className='cs-label'>
            Wiadomość
          </label>
          <textarea
            id='inq-message'
            name='message'
            className='cs-textarea'
            placeholder='Opisz swój projekt lub pytanie…'
            required
            minLength={10}
            maxLength={2000}
          />
        </div>

        {state?.ok === false && (
          <p className='cs-form-error' role='alert'>
            {state.error}
          </p>
        )}

        <button
          type='submit'
          className='btn-cosmic primary'
          disabled={isPending}
          aria-disabled={isPending}
        >
          {isPending ? 'Wysyłanie…' : 'Wyślij wiadomość →'}
        </button>
      </form>
    </ScrollReveal>
  );
}
