import styles from './inquiry-form.module.css';

type FormFieldProps = {
  label: string;
  htmlFor?: string;
  className?: string;
  error?: string;
  children: React.ReactNode;
};

export function FormField({
  label,
  htmlFor,
  className,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className={`${styles.field}${className ? ` ${className}` : ''}`}>
      <label htmlFor={htmlFor} className={styles.label}>
        {label}
      </label>
      {children}
      {error && (
        <span className={styles.fieldError} role='alert'>
          {error}
        </span>
      )}
    </div>
  );
}
