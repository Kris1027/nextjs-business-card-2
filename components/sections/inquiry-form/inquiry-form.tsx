'use client';

import { useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { submitInquiry } from '@/lib/inquiry/actions';
import { inquirySchema, type InquiryPayload } from '@/lib/inquiry/schema';
import { useInView } from '@/hooks/use-in-view';
import { CosmicButton } from '@/components/cosmos/cosmic-button';
import { services } from '@/lib/services/data';
import { siteEmail } from '@/lib/config';
import { contactContent } from '@/lib/content/contact';
import { FormField } from './form-field';
import { ServiceDropdown } from './service-dropdown';
import { SuccessCard } from './success-card';
import styles from './inquiry-form.module.css';

type Props = {
  defaultService?: string;
};

type FormValues = {
  name: string;
  email: string;
  service: string;
  topic?: string;
  message: string;
};

const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: 'inne', label: contactContent.form.dropdown.other },
];

export function InquiryForm({ defaultService = '' }: Props) {
  const { ref, inView } = useInView<HTMLFormElement>(0.1);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: '',
      email: '',
      service: defaultService,
      topic: '',
      message: '',
    },
    mode: 'onTouched',
  });

  const selectedService = useWatch({ control, name: 'service' });

  const onSubmit = async (data: FormValues) => {
    setIsPending(true);
    setShowContact(false);
    clearErrors('root');
    try {
      const result = await submitInquiry({
        name: data.name,
        email: data.email,
        service: data.service as InquiryPayload['service'],
        topic: data.topic || undefined,
        message: data.message,
        _hp: '',
      });
      if (result.ok) {
        setIsSuccess(true);
      } else {
        setError('root', { message: result.error });
        if ('showContact' in result && result.showContact) setShowContact(true);
      }
    } finally {
      setIsPending(false);
    }
  };

  if (isSuccess) return <SuccessCard />;

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit(onSubmit)}
      className={`${styles.form}${inView ? ` ${styles.formInView}` : ''}`}
    >
      <input
        type='text'
        name='_hp'
        tabIndex={-1}
        aria-hidden='true'
        className={styles.hidden}
        autoComplete='off'
      />

      <FormField
        label={contactContent.form.fields.name.label}
        htmlFor='inq-name'
        error={errors.name?.message}
      >
        <input
          id='inq-name'
          type='text'
          className={`${styles.input}${errors.name ? ` ${styles.inputError}` : ''}`}
          placeholder={contactContent.form.fields.name.placeholder}
          data-interactive
          autoComplete='name'
          {...register('name')}
        />
      </FormField>

      <FormField
        label={contactContent.form.fields.email.label}
        htmlFor='inq-email'
        error={errors.email?.message}
      >
        <input
          id='inq-email'
          type='email'
          className={`${styles.input}${errors.email ? ` ${styles.inputError}` : ''}`}
          placeholder={contactContent.form.fields.email.placeholder}
          data-interactive
          autoComplete='email'
          {...register('email')}
        />
      </FormField>

      <FormField
        label={contactContent.form.fields.service.label}
        className={styles.selectField}
        error={errors.service?.message}
      >
        <Controller
          name='service'
          control={control}
          render={({ field }) => (
            <ServiceDropdown
              options={serviceOptions}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
      </FormField>

      {selectedService === 'inne' && (
        <FormField
          label={contactContent.form.fields.topic.label}
          htmlFor='inq-topic'
          error={errors.topic?.message}
        >
          <input
            id='inq-topic'
            type='text'
            className={`${styles.input}${errors.topic ? ` ${styles.inputError}` : ''}`}
            placeholder={contactContent.form.fields.topic.placeholder}
            data-interactive
            {...register('topic')}
          />
        </FormField>
      )}

      <FormField
        label={contactContent.form.fields.message.label}
        htmlFor='inq-message'
        error={errors.message?.message}
      >
        <textarea
          id='inq-message'
          className={`${styles.textarea}${errors.message ? ` ${styles.inputError}` : ''}`}
          placeholder={contactContent.form.fields.message.placeholder}
          data-interactive
          {...register('message')}
        />
      </FormField>

      {errors.root && (
        <p className={styles.error} role='alert'>
          {errors.root.message}
          {showContact && (
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
        disabled={isPending}
        arrow={isPending ? false : '→'}
      >
        {isPending
          ? contactContent.form.submit.pending
          : contactContent.form.submit.idle}
      </CosmicButton>
    </form>
  );
}
