'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { ApiError, api, registerRequestSchema } from '@/lib/api';
import Button from './Button';
import TextField from './TextField';

const PASSWORD_MIN_LENGTH = 12;

const signupFormSchema = registerRequestSchema.extend({
  password: z.string().min(PASSWORD_MIN_LENGTH),
  consent: z.literal(true),
});

type Field = 'email' | 'password' | 'date_of_birth' | 'consent';
type FieldErrors = Partial<Record<Field, string>>;

const FIELD_MESSAGES: Record<Field, string> = {
  email: 'Enter a valid email address.',
  password: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
  date_of_birth: 'Enter your date of birth.',
  consent: 'You must accept the consent agreement to sign up.',
};

// API error codes that belong to a specific field rather than the whole form.
const FIELD_BY_CODE: Record<string, Field> = {
  underage: 'date_of_birth',
  invalid_password: 'password',
  consent_required: 'consent',
};

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [consent, setConsent] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError(null);

    const parsed = signupFormSchema.safeParse({
      email: email.trim(),
      password,
      date_of_birth: dateOfBirth,
      consent,
    });
    if (!parsed.success) {
      const errors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as Field;
        errors[field] ??= FIELD_MESSAGES[field];
      }
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    setSubmitting(true);
    try {
      await api.register(parsed.data);
      router.push('/space');
    } catch (error) {
      if (error instanceof ApiError) {
        const field = FIELD_BY_CODE[error.code];
        if (field) {
          setFieldErrors({ [field]: error.message });
        } else if (error.code === 'email_taken') {
          // Don't confirm that an address already has an account.
          setFormError('We couldn’t create an account with those details. Try logging in instead.');
        } else {
          setFormError(error.message);
        }
      } else {
        setFormError('Something went wrong. Please try again.');
      }
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {formError && (
        <p role="alert" className="font-ui text-sm text-coral-600 bg-coral-50 border border-coral-500 rounded-xl px-4 py-3">
          {formError}
        </p>
      )}
      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={fieldErrors.email}
      />
      <TextField
        label="Password"
        type="password"
        autoComplete="new-password"
        hint={`At least ${PASSWORD_MIN_LENGTH} characters.`}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={fieldErrors.password}
      />
      <TextField
        label="Date of birth"
        type="date"
        autoComplete="bday"
        hint="You must be at least 16 to sign up."
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        error={fieldErrors.date_of_birth}
      />
      <div>
        <label className="font-ui flex items-start gap-3 text-sm text-ink-600">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            aria-invalid={fieldErrors.consent ? true : undefined}
            aria-describedby={fieldErrors.consent ? 'consent-error' : undefined}
            className="mt-0.5 h-5 w-5 rounded border-paper-400 accent-coral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
          />
          <span>
            I agree to the{' '}
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-coral-600 hover:text-coral-700 underline">
              Privacy Policy
            </a>{' '}
            and to Umbrella processing my data as described there.
          </span>
        </label>
        {fieldErrors.consent && (
          <p id="consent-error" className="font-ui mt-1.5 text-sm text-coral-600">
            {fieldErrors.consent}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? 'Creating account…' : 'Sign up'}
      </Button>
    </form>
  );
}
