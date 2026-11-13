import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="font-display text-7xl font-bold text-forest-800 dark:text-amber-500">
        404
      </p>
      <h1 className="mt-4 font-display text-2xl font-bold text-forest-900 dark:text-cream-50">
        This page is not on our shelves
      </h1>
      <p className="mt-2 max-w-sm text-sm text-stone-500 dark:text-stone-400">
        The page you are looking for may have moved, or the link may be
        mistyped. Let&apos;s head back to the library.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full bg-forest-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-forest-700 dark:bg-amber-600 dark:hover:bg-amber-500"
      >
        Back to Home
      </Link>
    </div>
  );
}
