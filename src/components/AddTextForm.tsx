'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ApiError,
  BODY_MAX_LENGTH,
  addTextRequestSchema,
  api,
  codePointLength,
} from '@/lib/api';
import Button, { buttonClasses } from './Button';
import TextAreaField from './TextAreaField';
import TextField from './TextField';

type Field = 'title' | 'body';
type FieldErrors = Partial<Record<Field, string>>;

// API error codes that belong to one field; any other code is the form's.
const FIELD_BY_CODE: Record<string, Field> = {
  title_required: 'title',
  title_too_long: 'title',
  body_required: 'body',
  body_too_long: 'body',
  body_not_chinese: 'body',
};

export default function AddTextForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const length = codePointLength(body.trim());

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError(null);

    const parsed = addTextRequestSchema.safeParse({ title, body });
    if (!parsed.success) {
      const errors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        errors[issue.path[0] as Field] ??= issue.message;
      }
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    setSubmitting(true);
    try {
      const text = await api.addText(parsed.data);
      router.push(`/space/texts/${text.id}`);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        router.replace('/login');
        return;
      }
      const field = error instanceof ApiError ? FIELD_BY_CODE[error.code] : undefined;
      if (field) {
        setFieldErrors({ [field]: (error as ApiError).message });
      } else {
        setFormError('Couldn’t add this Text. Please try again.');
      }
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {formError && (
        <p role="alert" className="font-ui text-sm text-coral-600 bg-coral-50 border border-coral-500 rounded-xl px-4 py-3">
          {formError}
        </p>
      )}
      <TextField
        label="Title"
        autoComplete="off"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={fieldErrors.title}
      />
      <TextAreaField
        label="Chinese text"
        lang="zh"
        rows={14}
        spellCheck={false}
        placeholder={'春眠不觉晓，处处闻啼鸟。\n夜来风雨声，花落知多少。'}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        error={fieldErrors.body}
        meta={
          <span className={length > BODY_MAX_LENGTH ? 'text-coral-600' : undefined}>
            {length.toLocaleString('en')} / {BODY_MAX_LENGTH.toLocaleString('en')}
          </span>
        }
        className="font-han min-h-64 text-lg leading-[1.9]"
      />
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
        <Link href="/space" className={buttonClasses({ variant: 'ghost' })}>
          Cancel
        </Link>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Adding…' : 'Add to Library'}
        </Button>
      </div>
    </form>
  );
}
