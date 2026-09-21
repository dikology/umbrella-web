'use client';

import { useEffect, useRef, useState } from 'react';
import { ApiError, api, type TextSummary } from '@/lib/api';
import Button from './Button';

interface DeleteTextDialogProps {
  /** The Text being confirmed; null keeps the dialog closed. */
  text: TextSummary | null;
  onCancel: () => void;
  onDeleted: (id: string) => void;
}

/**
 * Asks before a Text leaves the Library. A native modal <dialog> holds focus,
 * closes on Escape, and hands focus back to whatever opened it.
 */
export default function DeleteTextDialog({ text, onCancel, onDeleted }: DeleteTextDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (text && !dialog.open) {
      dialog.showModal();
    } else if (!text && dialog.open) {
      dialog.close();
    }
  }, [text]);

  // Leave nothing behind for the next Text this dialog asks about.
  function reset() {
    setDeleting(false);
    setError(null);
  }

  function cancel() {
    reset();
    onCancel();
  }

  function deleted(id: string) {
    reset();
    onDeleted(id);
  }

  async function onConfirm() {
    if (!text) return;
    setDeleting(true);
    setError(null);
    try {
      await api.deleteText(text.id);
      deleted(text.id);
    } catch (err) {
      // Already gone is as good as deleted.
      if (err instanceof ApiError && err.status === 404) {
        deleted(text.id);
        return;
      }
      setError('Couldn’t delete this Text. Please try again.');
      setDeleting(false);
    }
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby="delete-text-title"
      aria-describedby="delete-text-body"
      // Escape fires `cancel`; block it mid-request so the outcome isn't hidden.
      onCancel={(event) => {
        event.preventDefault();
        if (!deleting) cancel();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-xl border border-paper-300 bg-paper-50 p-6 text-ink-500 shadow-xl backdrop:bg-ink-800/40 sm:p-8"
    >
      {text && (
        <>
          <h2 id="delete-text-title" className="mb-3 text-2xl text-ink-700 break-words">
            Delete <span className="font-han">“{text.title}”</span>?
          </h2>
          <p id="delete-text-body" className="mb-6 text-ink-500">
            The Text leaves your Library. Your Marked Words stay, with the sentences you marked
            them in.
          </p>
          {error && (
            <p role="alert" className="font-ui mb-4 rounded-xl border border-coral-500 bg-coral-50 px-4 py-3 text-sm text-coral-600">
              {error}
            </p>
          )}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={cancel} disabled={deleting} autoFocus>
              Cancel
            </Button>
            <Button onClick={onConfirm} disabled={deleting}>
              {deleting ? 'Deleting…' : 'Delete Text'}
            </Button>
          </div>
        </>
      )}
    </dialog>
  );
}
