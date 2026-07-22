import { useId, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from "react";

function Label({
  children,
  required,
  htmlFor,
}: {
  children: ReactNode;
  required?: boolean;
  htmlFor: string;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-navy">
      {children}
      {required && <span className="text-camel"> *</span>}
    </label>
  );
}

function ErrorText({ error, id }: { error?: string; id: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-1.5 text-xs text-red-700">
      {error}
    </p>
  );
}

const fieldClass =
  "w-full border border-line bg-offwhite px-4 py-3 text-sm text-navy placeholder:text-soft-navy/50 focus:border-camel focus:outline-none focus:ring-1 focus:ring-camel transition-colors";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  error?: string;
}

export function Input({ label, required, error, className = "", id, ...props }: InputProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = `${fieldId}-error`;

  return (
    <div>
      {label && (
        <Label htmlFor={fieldId} required={required}>
          {label}
        </Label>
      )}
      <input
        id={fieldId}
        className={`${fieldClass} ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      <ErrorText error={error} id={errorId} />
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  error?: string;
}

export function Textarea({ label, required, error, className = "", id, ...props }: TextareaProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = `${fieldId}-error`;

  return (
    <div>
      {label && (
        <Label htmlFor={fieldId} required={required}>
          {label}
        </Label>
      )}
      <textarea
        id={fieldId}
        className={`${fieldClass} ${className}`}
        rows={4}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      <ErrorText error={error} id={errorId} />
    </div>
  );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}

export function Select({ label, required, error, className = "", id, children, ...props }: SelectProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = `${fieldId}-error`;

  return (
    <div>
      {label && (
        <Label htmlFor={fieldId} required={required}>
          {label}
        </Label>
      )}
      <select
        id={fieldId}
        className={`${fieldClass} ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...props}
      >
        {children}
      </select>
      <ErrorText error={error} id={errorId} />
    </div>
  );
}
