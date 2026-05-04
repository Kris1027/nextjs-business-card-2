import styles from './inquiry-form.module.css';

type FormFieldProps = {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
};

export function FormField({ label, htmlFor, children }: FormFieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={htmlFor} className={styles.label}>
        {label}
      </label>
      {children}
    </div>
  );
}
