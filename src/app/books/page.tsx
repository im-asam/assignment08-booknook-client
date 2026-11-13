import type { Metadata } from "next";
import BooksList from "./BooksList";

export const metadata: Metadata = {
  title: "BookNook | All Books",
  description: "Browse every book on the BookNook shelf.",
};

export default function AllBooksPage() {
  return (
    <div className="pb-4">
      <h1 className="font-display text-3xl font-bold text-forest-900 dark:text-cream-50">
        All Books
      </h1>
      <p className="mt-1 text-stone-500 dark:text-stone-400">
        Every book on the shelf — pick one and borrow it for 14 days.
      </p>
      <BooksList />
    </div>
  );
}
