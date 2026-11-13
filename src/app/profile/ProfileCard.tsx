"use client";

import { useSession } from "@/lib/auth-client";

export default function ProfileCard() {
  const { data: session } = useSession();
  const user = session?.user;
  const initial = user?.name?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <div className="mt-6 flex flex-col items-center rounded-2xl border border-forest-100 bg-white p-8 text-center shadow-sm dark:border-forest-900 dark:bg-forest-950">
      <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-forest-800 text-3xl font-bold text-white ring-4 ring-amber-500/70 dark:bg-forest-600">
        {user?.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name ?? "User"}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          initial
        )}
      </div>
      <h2 className="mt-4 font-display text-2xl font-bold text-forest-900 dark:text-cream-50">
        {user?.name ?? "Reader"}
      </h2>
      <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
        {user?.email}
      </p>
      <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-500 dark:text-stone-400">
        Happy reading! Your borrowed books live on the My Borrows page, and
        the books you share live on My Books.
      </p>
    </div>
  );
}
