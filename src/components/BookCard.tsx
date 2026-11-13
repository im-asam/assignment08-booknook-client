"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Book } from "@/lib/api";

const categoryColors: Record<string, string> = {
  Fiction: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200",
  Science: "bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-200",
  History: "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-200",
  Kids: "bg-lime-100 text-lime-800 dark:bg-lime-900/50 dark:text-lime-200",
  Others: "bg-stone-200 text-stone-700 dark:bg-stone-700 dark:text-stone-200",
};

export default function BookCard({ book }: { book: Book }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-forest-100 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-forest-900 dark:bg-forest-950"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-cream-100 dark:bg-forest-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.image}
          alt={`Cover of ${book.title}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span
          className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${categoryColors[book.category] ?? categoryColors.Others}`}
        >
          {book.category}
        </span>
        <h3 className="font-display text-lg leading-snug font-semibold text-forest-900 dark:text-cream-50">
          {book.title}
        </h3>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          by {book.author}
        </p>
        <p className="text-xs text-stone-400 dark:text-stone-500">
          {book.availableCopies} of {book.totalCopies} copies available
        </p>
        <div className="mt-auto pt-3">
          <Link
            href={`/books/${book._id}`}
            className="block rounded-full bg-forest-800 py-2 text-center text-sm font-semibold text-white transition hover:bg-forest-700 dark:bg-amber-600 dark:hover:bg-amber-500"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
