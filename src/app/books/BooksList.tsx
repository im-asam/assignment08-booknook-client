"use client";

import { useEffect, useState } from "react";
import BookCard from "@/components/BookCard";
import Spinner from "@/components/Spinner";
import { getBooks, type Book } from "@/lib/api";

export default function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    getBooks()
      .then(setBooks)
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner label="Loading all books…" />;

  if (failed) {
    return (
      <p className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-6 text-center text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
        The bookshelf could not be reached right now. Please check your
        connection and try again in a moment.
      </p>
    );
  }

  if (books.length === 0) {
    return (
      <p className="mt-8 rounded-2xl border border-forest-100 bg-white px-4 py-10 text-center text-sm text-stone-500 dark:border-forest-900 dark:bg-forest-950 dark:text-stone-400">
        No books on the shelf yet — be the first to add one!
      </p>
    );
  }

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}
