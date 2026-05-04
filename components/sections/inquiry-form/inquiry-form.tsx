'use client';

import { useActionState, useState } from 'react';
import { submitInquiry } from '@/app/kontakt/actions';
import { ScrollReveal } from '@/components/cosmos/scroll-reveal';
import { CosmicButton } from '@/components/cosmos/cosmic-button';
import { services } from '@/lib/services/data';
import { siteEmail } from '@/lib/config';
import { kontaktContent } from '@/lib/content/kontakt';
import { FormField } from './form-field';
import { ServiceDropdown } from './service-dropdown';
import { SuccessCard } from './success-card';
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
  { value: 'inne', label: kontaktContent.form.dropdown.other },
];

export function InquiryForm({ defaultService = '' }: Props) {
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
          className={styles.hidden}
          autoComplete='off'
        />
        <input type='hidden' name='service' value={selectedService} />

        <FormField
          label={kontaktContent.form.fields.name.label}
          htmlFor='inq-name'
        >
          <input
            id='inq-name'
            name='name'
            type='text'
            className={styles.input}
            placeholder={kontaktContent.form.fields.name.placeholder}
            data-interactive
            required
            minLength={2}
            maxLength={80}
            autoComplete='name'
          />
        </FormField>

        <FormField
          label={kontaktContent.form.fields.email.label}
          htmlFor='inq-email'
        >
          <input
            id='inq-email'
            name='email'
            type='email'
            className={styles.input}
            placeholder={kontaktContent.form.fields.email.placeholder}
            data-interactive
            required
            autoComplete='email'
          />
        </FormField>

        <FormField label={kontaktContent.form.fields.service.label}>
          <ServiceDropdown
            options={serviceOptions}
            value={selectedService}
            onChange={setSelectedService}
          />
        </FormField>

        {selectedService === 'inne' && (
          <FormField
            label={kontaktContent.form.fields.topic.label}
            htmlFor='inq-topic'
          >
            <input
              id='inq-topic'
              name='topic'
              type='text'
              className={styles.input}
              placeholder={kontaktContent.form.fields.topic.placeholder}
              data-interactive
              required
              minLength={2}
              maxLength={200}
            />
          </FormField>
        )}

        <FormField
          label={kontaktContent.form.fields.message.label}
          htmlFor='inq-message'
        >
          <textarea
            id='inq-message'
            name='message'
            className={styles.textarea}
            placeholder={kontaktContent.form.fields.message.placeholder}
            data-interactive
            required
            minLength={10}
            maxLength={2000}
          />
        </FormField>

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

        <CosmicButton
          type='submit'
          variant='primary'
          disabled={isPending || !selectedService}
          arrow={isPending ? false : '→'}
        >
          {isPending
            ? kontaktContent.form.submit.pending
            : kontaktContent.form.submit.idle}
        </CosmicButton>
      </form>
    </ScrollReveal>
  );
}
