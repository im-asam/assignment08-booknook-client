"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import BorrowModal from "@/components/BorrowModal";
import Spinner from "@/components/Spinner";
import { getBook, type Book } from "@/lib/api";
import { useSession } from "@/lib/auth-client";

export default function BookDetails({ id }: { id: string }) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [borrowOpen, setBorrowOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    getBook(id)
      .then(setBook)
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner label="Opening the book…" />;

  if (failed || !book) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-display text-2xl font-bold text-forest-900 dark:text-cream-50">
          We could not open this book
        </h1>
        <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
          It may have been removed, or the bookshelf is briefly unreachable.
        </p>
        <Link
          href="/books"
          className="mt-6 inline-block rounded-full bg-forest-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-forest-700 dark:bg-amber-600 dark:hover:bg-amber-500"
        >
          Back to All Books
        </Link>
      </div>
    );
  }

  const available = book.availableCopies > 0;
  const user = session?.user;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid gap-8 pb-4 md:grid-cols-2"
    >
      <div className="overflow-hidden rounded-2xl border border-forest-100 bg-cream-100 shadow-sm dark:border-forest-900 dark:bg-forest-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.image}
          alt={`Cover of ${book.title}`}
          className="aspect-[4/3] w-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-4">
        <span className="w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
          {book.category}
        </span>
        <h1 className="font-display text-3xl font-bold text-forest-900 sm:text-4xl dark:text-cream-50">
          {book.title}
        </h1>
        <p className="text-lg text-stone-600 dark:text-stone-300">
          by <span className="font-medium">{book.author}</span>
        </p>
        <p className="leading-relaxed text-stone-600 dark:text-stone-300">
          {book.description}
        </p>

        <dl className="space-y-2 rounded-2xl border border-forest-100 bg-white p-4 text-sm dark:border-forest-900 dark:bg-forest-950">
          <div className="flex justify-between gap-4">
            <dt className="text-stone-500 dark:text-stone-400">Added by</dt>
            <dd className="text-right font-medium text-forest-900 dark:text-cream-50">
              {book.addedBy} ({book.addedByEmail})
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-stone-500 dark:text-stone-400">Copies left</dt>
            <dd className="font-medium text-forest-900 dark:text-cream-50">
              {book.availableCopies} of {book.totalCopies}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-stone-500 dark:text-stone-400">Added on</dt>
            <dd className="font-medium text-forest-900 dark:text-cream-50">
              {new Date(book.addedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </dd>
          </div>
        </dl>

        {available ? (
          <button
            type="button"
            onClick={() => setBorrowOpen(true)}
            className="mt-2 rounded-full bg-forest-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-forest-700 dark:bg-amber-600 dark:hover:bg-amber-500"
          >
            Borrow This Book
          </button>
        ) : (
          <div className="mt-2">
            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed rounded-full bg-stone-300 px-6 py-3 text-sm font-semibold text-stone-500 dark:bg-stone-700 dark:text-stone-400"
            >
              Not Available
            </button>
            <p className="mt-2 text-center text-xs text-stone-500 dark:text-stone-400">
              All copies are out on loan right now. Check back soon.
            </p>
          </div>
        )}
      </div>

      {user && (
        <BorrowModal
          open={borrowOpen}
          book={book}
          userName={user.name ?? ""}
          userEmail={user.email ?? ""}
          onClose={() => setBorrowOpen(false)}
          onSuccess={() => {
            setBorrowOpen(false);
            router.push("/my-borrows");
          }}
        />
      )}
    </motion.div>
  );
}
