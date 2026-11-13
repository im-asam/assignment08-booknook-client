"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import HeroSlider from "@/components/HeroSlider";
import BookCard from "@/components/BookCard";
import Spinner from "@/components/Spinner";
import { getBooks, type Book } from "@/lib/api";

const steps = [
  {
    number: "1",
    title: "Find a book",
    text: "Browse the shelves or search by title, author or category. Every card shows how many copies are free right now.",
  },
  {
    number: "2",
    title: "Borrow in one click",
    text: "Open the book, hit Borrow This Book and confirm. The book is reserved for you for 14 days — no waiting in line.",
  },
  {
    number: "3",
    title: "Return it when done",
    text: "Finished reading? Return the book from My Borrows and the copy goes straight back on the shelf for the next reader.",
  },
];

const reviews = [
  {
    quote:
      "I borrowed three novels in my first week. Returning them from the app takes seconds — this is how a library should feel.",
    name: "Rahim Uddin",
    role: "Fiction reader, Cox's Bazar",
  },
  {
    quote:
      "My kids pick their own books now. The Kids shelf is the first thing they check every morning before school.",
    name: "Nasrin Akter",
    role: "Mother of two young readers",
  },
  {
    quote:
      "I added my old history books to the shelf and they were borrowed within days. Knowing they are being read again feels great.",
    name: "Karim Hossain",
    role: "History lover and book donor",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5 },
};

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    getBooks({ sort: "newest", limit: 6 })
      .then(setBooks)
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-16 pb-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSlider />
      </motion.div>

      {/* New Arrivals */}
      <motion.section {...fadeUp} aria-labelledby="new-arrivals">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2
              id="new-arrivals"
              className="font-display text-3xl font-bold text-forest-900 dark:text-cream-50"
            >
              New Arrivals
            </h2>
            <p className="mt-1 text-stone-500 dark:text-stone-400">
              The freshest books on the shelf, newest first.
            </p>
          </div>
        </div>

        {loading ? (
          <Spinner label="Fetching the newest books…" />
        ) : failed ? (
          <p className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-6 text-center text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
            The bookshelf could not be reached right now. Please check your
            connection and try again in a moment.
          </p>
        ) : books.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-forest-100 bg-white px-4 py-10 text-center text-sm text-stone-500 dark:border-forest-900 dark:bg-forest-950 dark:text-stone-400">
            No books on the shelf yet — be the first to add one!
          </p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/books"
            className="inline-block rounded-full bg-forest-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-forest-700 dark:bg-amber-600 dark:hover:bg-amber-500"
          >
            See All Books
          </Link>
        </div>
      </motion.section>

      {/* How Borrowing Works */}
      <motion.section {...fadeUp} aria-labelledby="how-it-works">
        <h2
          id="how-it-works"
          className="text-center font-display text-3xl font-bold text-forest-900 dark:text-cream-50"
        >
          How Borrowing Works
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-stone-500 dark:text-stone-400">
          Three steps between you and your next book. No membership card, no
          paperwork.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-forest-100 bg-white p-6 text-center shadow-sm dark:border-forest-900 dark:bg-forest-950"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 font-display text-xl font-bold text-forest-950">
                {step.number}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-forest-900 dark:text-cream-50">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Reader Reviews */}
      <motion.section {...fadeUp} aria-labelledby="reader-reviews">
        <h2
          id="reader-reviews"
          className="text-center font-display text-3xl font-bold text-forest-900 dark:text-cream-50"
        >
          What Readers Say
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-stone-500 dark:text-stone-400">
          Neighbors sharing books — and a few kind words about the nook.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="flex flex-col rounded-2xl border border-forest-100 bg-white p-6 shadow-sm dark:border-forest-900 dark:bg-forest-950"
            >
              <span className="font-display text-4xl leading-none text-amber-500" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="mt-1 flex-1 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                {review.quote}
              </blockquote>
              <figcaption className="mt-4 border-t border-forest-50 pt-3 dark:border-forest-900">
                <p className="text-sm font-semibold text-forest-900 dark:text-cream-50">
                  {review.name}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {review.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
