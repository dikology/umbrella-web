'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// A Text opened from the Library is still in the Library.
const PLACES = [
  { href: '/space', label: 'Library', current: (path: string) => path === '/space' || path.startsWith('/space/texts') },
  { href: '/space/words', label: 'Marked Words', current: (path: string) => path.startsWith('/space/words') },
];

/** Where a Learner can go in their Learner Space. */
export default function SpaceNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Learner Space" className="order-last -mx-2 w-full pb-2 sm:order-none sm:mx-0 sm:mr-auto sm:w-auto sm:pb-0">
      <ul className="m-0 flex list-none items-center gap-1 p-0 sm:gap-2">
        {PLACES.map(({ href, label, current }) => {
          const isCurrent = current(pathname);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isCurrent ? 'page' : undefined}
                className={`font-ui block whitespace-nowrap rounded-lg px-2 py-1.5 text-sm font-medium underline-offset-[6px] decoration-2 hover:text-ink-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 sm:px-3 ${
                  isCurrent
                    ? 'text-ink-800 underline decoration-coral-500 hover:underline'
                    : 'text-ink-500 hover:no-underline'
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
