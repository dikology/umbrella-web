'use client';

import { useState } from 'react';
import { api, type DeclaredLevel, type HskLevel } from '@/lib/api';
import { HSK_LEVELS, hskLevelName } from '@/lib/hsk';
import Button from './Button';
import { LevelFace, levelTileClasses } from './level-tile';

interface DeclaredLevelPromptProps {
  onDeclared: (declared: DeclaredLevel) => void;
}

// The answer on its way to the API; a null level is a skip.
type Saving = { level: HskLevel | null } | null;

/**
 * The one question a new Learner is asked in their Library: roughly which HSK
 * Level they've reached. It sits above the Library rather than in front of it,
 * and a tap is the answer: there is nothing to confirm.
 */
export default function DeclaredLevelPrompt({ onDeclared }: DeclaredLevelPromptProps) {
  const [saving, setSaving] = useState<Saving>(null);
  const [failed, setFailed] = useState(false);

  async function declare(level: HskLevel | null) {
    setSaving({ level });
    setFailed(false);
    try {
      onDeclared(await api.declareLevel(level));
    } catch {
      setFailed(true);
      setSaving(null);
    }
  }

  return (
    <section
      aria-labelledby="declared-level-question"
      aria-describedby="declared-level-consequence"
      aria-busy={saving !== null}
      className="mb-8 rounded-xl border border-paper-300 bg-paper-50 px-5 py-6 sm:px-8 sm:py-8"
    >
      <h2 id="declared-level-question" className="mb-2 text-2xl text-ink-700 sm:text-3xl">
        Roughly which HSK Level have you reached?
      </h2>
      <p id="declared-level-consequence" className="mb-6 max-w-prose text-ink-500">
        Your answer makes those Words Known. Marking any of them later still works, and you can
        change your answer any time.
      </p>

      <ul className="m-0 mb-5 grid list-none grid-cols-4 gap-2 p-0 sm:grid-cols-7">
        {HSK_LEVELS.map((level) => (
          <li key={level} className={level === 'advanced' ? 'col-span-2 sm:col-span-1' : undefined}>
            <button
              type="button"
              onClick={() => declare(level)}
              disabled={saving !== null}
              className={`${levelTileClasses} py-3 shadow-sm hover:border-paper-500 hover:bg-paper-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50`}
            >
              <LevelFace level={level} />
            </button>
          </li>
        ))}
      </ul>

      <Button variant="ghost" size="sm" onClick={() => declare(null)} disabled={saving !== null} className="-ml-4">
        Just starting / skip
      </Button>

      {saving && (
        <p className="font-ui mb-0 mt-4 text-sm text-ink-400">
          {saving.level === null ? 'Skipping…' : `Declaring ${hskLevelName(saving.level)}…`}
        </p>
      )}
      {failed && (
        <p role="alert" className="font-ui mb-0 mt-4 rounded-xl border border-coral-500 bg-coral-50 px-4 py-3 text-sm text-coral-600">
          Your Declared Level wasn’t saved. Please choose again.
        </p>
      )}
    </section>
  );
}
