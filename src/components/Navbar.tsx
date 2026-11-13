"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
];

const privateLinks = [
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

function BookLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-7 w-7 text-amber-600"
      aria-hidden="true"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;
  const initial = user?.name?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <header className="sticky top-0 z-40 border-b border-forest-100 bg-cream-50/90 backdrop-blur dark:border-forest-900 dark:bg-[#101a15]/90">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2">
          <BookLogo />
          <span className="font-display text-2xl font-bold tracking-tight text-forest-800 dark:text-cream-50">
            BookNook
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                pathname === link.href
                  ? "bg-forest-800 text-white dark:bg-forest-700"
                  : "text-stone-600 hover:bg-forest-50 hover:text-forest-800 dark:text-stone-300 dark:hover:bg-forest-900 dark:hover:text-cream-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((v) => !v)}
                aria-label="Account menu"
                aria-expanded={dropdownOpen}
                className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-forest-800 text-sm font-bold text-white ring-2 ring-amber-500/70 dark:bg-forest-600"
              >
                {user.image ? (
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
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-forest-100 bg-white shadow-lg dark:border-forest-800 dark:bg-forest-950">
                  <p className="truncate border-b border-forest-100 px-4 py-3 text-sm font-semibold text-forest-800 dark:border-forest-800 dark:text-cream-50">
                    {user.name}
                  </p>
                  <Link
                    href="/profile"
                    className="block px-4 py-2.5 text-sm text-stone-600 hover:bg-forest-50 hover:text-forest-800 dark:text-stone-300 dark:hover:bg-forest-900"
                  >
                    My Profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href="/login"
                className="rounded-full border border-forest-800 px-4 py-2 text-sm font-semibold text-forest-800 transition hover:bg-forest-50 dark:border-forest-400 dark:text-cream-50 dark:hover:bg-forest-900"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-forest-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-forest-700 dark:bg-amber-600 dark:hover:bg-amber-500"
              >
                Register
              </Link>
            </div>
          )}

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-forest-200 text-forest-800 md:hidden dark:border-forest-800 dark:text-cream-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
              {menuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-forest-100 bg-cream-50 px-4 py-3 md:hidden dark:border-forest-900 dark:bg-[#101a15]">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium ${
                  pathname === link.href
                    ? "bg-forest-800 text-white"
                    : "text-stone-600 dark:text-stone-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <div className="mt-2 flex gap-2">
                <Link
                  href="/login"
                  className="flex-1 rounded-full border border-forest-800 px-4 py-2 text-center text-sm font-semibold text-forest-800 dark:border-forest-400 dark:text-cream-50"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex-1 rounded-full bg-forest-800 px-4 py-2 text-center text-sm font-semibold text-white dark:bg-amber-600"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
