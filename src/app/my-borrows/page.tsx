import type { Metadata } from "next";
import ProtectedRoute from "@/components/ProtectedRoute";
import MyBorrowsList from "./MyBorrowsList";

export const metadata: Metadata = {
  title: "BookNook | My Borrows",
  description: "The books you currently have on loan from BookNook.",
};

export default function MyBorrowsPage() {
  return (
    <ProtectedRoute>
      <div className="pb-4">
        <h1 className="font-display text-3xl font-bold text-forest-900 dark:text-cream-50">
          My Borrows
        </h1>
        <p className="mt-1 text-stone-500 dark:text-stone-400">
          Books you have on loan — return one when you finish it so the next
          reader can enjoy it.
        </p>
        <MyBorrowsList />
      </div>
    </ProtectedRoute>
  );
}
