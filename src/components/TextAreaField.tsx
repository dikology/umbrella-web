import { ReactNode, TextareaHTMLAttributes, useId } from 'react';

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  /** Shown under the field whether or not there's an error, e.g. a running count. */
  meta?: ReactNode;
}

// TextField's multi-line sibling: same label, border and error treatment.
export default function TextAreaField({ label, error, meta, className = '', ...props }: TextAreaFieldProps) {
  const id = useId();
  const describedBy = [error && `${id}-error`, meta && `${id}-meta`].filter(Boolean).join(' ') || undefined;

  return (
    <div>
      <label htmlFor={id} className="font-ui block text-sm font-medium text-ink-700 mb-1.5">
        {label}
      </label>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`
          w-full rounded-xl px-4 py-3 resize-y
          bg-paper-50 text-ink-800 placeholder:text-ink-300
          border ${error ? 'border-coral-500' : 'border-paper-400'}
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 focus:border-coral-500
          ${className}
        `}
        {...props}
      />
      <div className="mt-1.5 flex items-start justify-between gap-4">
        {error ? (
          <p id={`${id}-error`} className="font-ui mb-0 text-sm text-coral-600">
            {error}
          </p>
        ) : (
          <span />
        )}
        {meta && (
          <p id={`${id}-meta`} className="font-ui mb-0 shrink-0 text-sm tabular-nums text-ink-400">
            {meta}
          </p>
        )}
      </div>
    </div>
  );
}
