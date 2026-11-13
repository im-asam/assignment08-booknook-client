"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { borrowBook, type Book } from "@/lib/api";

interface BorrowModalProps {
  open: boolean;
  book: Book;
  userName: string;
  userEmail: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BorrowModal({
  open,
  book,
  userName,
  userEmail,
  onClose,
  onSuccess,
}: BorrowModalProps) {
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleConfirm = async () => {
    setBusy(true);
    try {
      await borrowBook({
        bookId: book._id,
        bookTitle: book.title,
        bookImage: book.image,
        userName,
        userEmail,
      });
      toast.success(`You borrowed "${book.title}". Enjoy the read!`);
      onSuccess();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Borrow failed. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Borrow ${book.title}`}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-forest-950"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-xl font-bold text-forest-900 dark:text-cream-50">
              Borrow this book
            </h2>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              &ldquo;{book.title}&rdquo; by {book.author}
            </p>

            <div className="mt-5 space-y-3">
              <label className="block">
                <span className="text-sm font-medium text-stone-600 dark:text-stone-300">
                  Your name
                </span>
                <input
                  type="text"
                  value={userName}
                  readOnly
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-400"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-stone-600 dark:text-stone-300">
                  Your email
                </span>
                <input
                  type="email"
                  value={userEmail}
                  readOnly
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-400"
                />
              </label>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                The book is yours for 14 days. Return it from the My Borrows
                page when you finish — or sooner, so the next reader can enjoy
                it too.
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={busy}
                className="flex-1 rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 disabled:opacity-50 dark:border-stone-600 dark:text-stone-200 dark:hover:bg-stone-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={busy}
                className="flex-1 rounded-full bg-forest-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-forest-700 disabled:opacity-50 dark:bg-amber-600 dark:hover:bg-amber-500"
              >
                {busy ? "Borrowing…" : "Confirm Borrow"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
