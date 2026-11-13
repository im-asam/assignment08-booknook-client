import type { Metadata } from "next";
import ProtectedRoute from "@/components/ProtectedRoute";
import MyBooksList from "./MyBooksList";

export const metadata: Metadata = {
  title: "BookNook | My Books",
  description: "The books you added to the BookNook shelf.",
};

export default function MyBooksPage() {
  return (
    <ProtectedRoute>
      <div className="pb-4">
        <h1 className="font-display text-3xl font-bold text-forest-900 dark:text-cream-50">
          My Books
        </h1>
        <p className="mt-1 text-stone-500 dark:text-stone-400">
          The books you added — edit their details or take one off the shelf.
        </p>
        <MyBooksList />
      </div>
    </ProtectedRoute>
  );
}
