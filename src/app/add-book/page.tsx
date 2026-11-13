import type { Metadata } from "next";
import ProtectedRoute from "@/components/ProtectedRoute";
import AddBookForm from "./AddBookForm";

export const metadata: Metadata = {
  title: "BookNook | Add Book",
  description: "Add a book to the BookNook shelf.",
};

export default function AddBookPage() {
  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-2xl pb-4">
        <h1 className="font-display text-3xl font-bold text-forest-900 dark:text-cream-50">
          Add a Book
        </h1>
        <p className="mt-1 text-stone-500 dark:text-stone-400">
          Share a book from your own shelf so a neighbor can borrow it.
        </p>
        <AddBookForm />
      </div>
    </ProtectedRoute>
  );
}
