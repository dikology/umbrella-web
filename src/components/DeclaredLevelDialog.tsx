'use client';

import { useEffect, useRef, useState } from 'react';
import { api, type DeclaredLevel, type HskLevel } from '@/lib/api';
import { HSK_LEVELS, hskLevelName, levelChange, wordsCoveredBy } from '@/lib/hsk';
import Button from './Button';
import { LevelFace, levelTileClasses } from './level-tile';

interface DeclaredLevelDialogProps {
  open: boolean;
  /** The Declared Level as it stands; null for none. */
  current: HskLevel | null;
  onCancel: () => void;
  onSaved: (declared: DeclaredLevel) => void;
}

// "none" stands in for null, which a radio's value can't hold.
const CHOICES: readonly (HskLevel | null)[] = [null, ...HSK_LEVELS];
const choiceValue = (level: HskLevel | null) => String(level ?? 'none');

/**
 * Changes the Declared Level. Lowering takes Known Words away, so the dialog
 * says exactly which before anything is saved, and the button names the act.
 * Mount it afresh for each opening, so it starts from the level as it stands.
 */
export default function DeclaredLevelDialog({ open, current, onCancel, onSaved }: DeclaredLevelDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [chosen, setChosen] = useState<HskLevel | null>(current);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const change = levelChange(current, chosen);

  async function onSave() {
    setSaving(true);
    setError(null);
    try {
      const declared = await api.declareLevel(chosen);
      setSaving(false);
      onSaved(declared);
    } catch {
      setError('Couldn’t change your Declared Level. Please try again.');
      setSaving(false);
    }
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby="change-level-title"
      // Escape fires `cancel`; block it mid-request so the outcome isn't hidden.
      onCancel={(event) => {
        event.preventDefault();
        if (!saving) onCancel();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-xl border border-paper-300 bg-paper-50 p-6 text-ink-500 shadow-xl backdrop:bg-ink-800/40 sm:p-8"
    >
      {open && (
        <>
          <h2 id="change-level-title" className="mb-2 text-2xl text-ink-700">
            Change your Declared Level
          </h2>
          <p className="mb-5 text-ink-500">
            The HSK Level you’ve roughly reached. Its Words count as Known.
          </p>

          <fieldset className="m-0 mb-5 border-0 p-0" disabled={saving}>
            <legend className="sr-only">Declared Level</legend>
            <div className="grid grid-cols-4 gap-2">
              {CHOICES.map((level) => (
                <label key={choiceValue(level)} className="relative">
                  <input
                    type="radio"
                    name="declared-level"
                    value={choiceValue(level)}
                    checked={chosen === level}
                    onChange={() => setChosen(level)}
                    // Transparent over the whole tile, so the tile is the radio.
                    className="peer absolute inset-0 m-0 cursor-pointer appearance-none opacity-0 disabled:cursor-not-allowed"
                  />
                  <span
                    className={`${levelTileClasses} py-2.5 peer-[:hover:not(:checked)]:border-paper-500 peer-[:hover:not(:checked)]:bg-paper-300 peer-checked:border-ink-700 peer-checked:bg-ink-700 peer-checked:text-paper-50 peer-focus-visible:ring-2 peer-focus-visible:ring-coral-500 peer-focus-visible:ring-offset-2 peer-disabled:opacity-50`}
                  >
                    <LevelFace level={level} />
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <p aria-live="polite" className="mb-6 min-h-[3.5rem] text-ink-500">
            {change === 'raise' && chosen !== null && (
              <>{wordsCoveredBy(chosen)} become Known, except the ones you’ve Marked.</>
            )}
            {change === 'lower' && (
              <>
                {chosen === null
                  ? 'Only the declared Words stop being Known.'
                  : `Only the declared Words above ${hskLevelName(chosen)} stop being Known.`}{' '}
                Words you’ve read stay Known, and so do Words you’ve unmarked.
              </>
            )}
          </p>

          {error && (
            <p role="alert" className="font-ui mb-4 rounded-xl border border-coral-500 bg-coral-50 px-4 py-3 text-sm text-coral-600">
              {error}
            </p>
          )}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={onCancel} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={onSave} disabled={saving || change === 'same'}>
              {saving ? 'Saving…' : saveLabel(change, chosen)}
            </Button>
          </div>
        </>
      )}
    </dialog>
  );
}

function saveLabel(change: 'raise' | 'lower' | 'same', chosen: HskLevel | null) {
  if (change !== 'lower') return 'Save';
  return chosen === null ? 'Clear Declared Level' : `Lower to ${hskLevelName(chosen)}`;
}
