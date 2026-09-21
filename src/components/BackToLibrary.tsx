import Link from 'next/link';
import { ChevronLeftIcon } from './icons';

export default function BackToLibrary() {
  return (
    <Link
      href="/space"
      className="font-ui -ml-1 inline-flex items-center gap-1 rounded-lg px-1 py-0.5 text-sm font-medium text-ink-500 hover:text-ink-700 hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-500"
    >
      <ChevronLeftIcon width={16} height={16} />
      Library
    </Link>
  );
}
