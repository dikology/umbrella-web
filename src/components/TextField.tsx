import { InputHTMLAttributes, useId } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export default function TextField({ label, error, hint, className = '', ...props }: TextFieldProps) {
  const id = useId();
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined;

  return (
    <div>
      <label htmlFor={id} className="font-ui block text-sm font-medium text-ink-700 mb-1.5">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`
          font-ui w-full rounded-xl px-4 py-3
          bg-paper-50 text-ink-800 placeholder:text-ink-400
          border ${error ? 'border-coral-500' : 'border-paper-400'}
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 focus:border-teal-500
          ${className}
        `}
        {...props}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="font-ui mt-1.5 text-sm text-ink-400">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="font-ui mt-1.5 text-sm text-coral-600">
          {error}
        </p>
      )}
    </div>
  );
}
