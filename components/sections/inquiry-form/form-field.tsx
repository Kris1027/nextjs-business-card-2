import styles from './inquiry-form.module.css';

type FormFieldProps = {
  label: string;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
};

export function FormField({
  label,
  htmlFor,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={`${styles.field}${className ? ` ${className}` : ''}`}>
      <label htmlFor={htmlFor} className={styles.label}>
        {label}
      </label>
      {children}
    </div>
  );
}
