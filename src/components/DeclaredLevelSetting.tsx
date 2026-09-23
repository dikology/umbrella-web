'use client';

import { useState } from 'react';
import type { DeclaredLevel } from '@/lib/api';
import { hskLevelName } from '@/lib/hsk';
import DeclaredLevelDialog from './DeclaredLevelDialog';

interface DeclaredLevelSettingProps {
  /** The Learner's answer; they have been asked by the time this shows. */
  declared: DeclaredLevel;
  onChanged: (declared: DeclaredLevel) => void;
}

/** The Declared Level as it stands, and the way to change it. */
export default function DeclaredLevelSetting({ declared, onChanged }: DeclaredLevelSettingProps) {
  const [open, setOpen] = useState(false);
  // Each opening mounts the dialog afresh, starting from the level as it stands.
  const [opening, setOpening] = useState(0);

  function openDialog() {
    setOpening((n) => n + 1);
    setOpen(true);
  }

  function saved(next: DeclaredLevel) {
    setOpen(false);
    onChanged(next);
  }

  return (
    <>
      <span>
        {declared.level === null ? 'No Declared Level' : `Declared Level: ${hskLevelName(declared.level)}`}
      </span>
      <button
        type="button"
        onClick={openDialog}
        aria-label="Change Declared Level"
        className="rounded-sm text-ink-500 underline decoration-paper-500 underline-offset-4 transition-colors duration-200 hover:text-ink-800 hover:decoration-ink-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2"
      >
        Change
      </button>
      <DeclaredLevelDialog
        key={opening}
        open={open}
        current={declared.level}
        onCancel={() => setOpen(false)}
        onSaved={saved}
      />
    </>
  );
}
