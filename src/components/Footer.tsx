import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-forest-100 bg-forest-950 text-cream-100 dark:border-forest-900">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-bold text-white">BookNook</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream-200/80">
            A small neighborhood library on the web. Add a book, borrow a
            book, return a book — and keep the shelves full for the next
            reader.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide text-amber-400 uppercase">
            Contact
          </p>
          <ul className="mt-3 space-y-2 text-sm text-cream-200/80">
            <li>
              Email:{" "}
              <a
                href="mailto:hello@booknook.example"
                className="underline-offset-2 hover:underline"
              >
                hello@booknook.example
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:+8801000000000" className="underline-offset-2 hover:underline">
                +880 1000-000000
              </a>
            </li>
            <li>Cox&apos;s Bazar, Bangladesh</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide text-amber-400 uppercase">
            Follow us
          </p>
          <div className="mt-3 flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="BookNook on Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-800 text-cream-100 transition hover:bg-amber-600"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.77l-.44 2.9h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="BookNook on Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-800 text-cream-100 transition hover:bg-amber-600"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="BookNook on X"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-800 text-cream-100 transition hover:bg-amber-600"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
          <div className="mt-5 flex gap-4 text-sm text-cream-200/80">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/books" className="hover:text-white">All Books</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-forest-900 py-4 text-center text-xs text-cream-200/60">
        © 2026 BookNook. All rights reserved.
      </div>
    </footer>
  );
}
