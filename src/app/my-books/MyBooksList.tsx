"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/ConfirmModal";
import EditBookModal from "@/components/EditBookModal";
import Spinner from "@/components/Spinner";
import { deleteBook, getBooks, type Book } from "@/lib/api";
import { useSession } from "@/lib/auth-client";

export default function MyBooksList() {
  const { data: session } = useSession();
  const email = session?.user?.email ?? "";
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [editing, setEditing] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState<Book | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const load = useCallback(() => {
    if (!email) return;
    setLoading(true);
    getBooks({ email })
      .then(setBooks)
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, [email]);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async () => {
    if (!deleting) return;
    setDeleteBusy(true);
    try {
      await deleteBook(deleting._id);
      setBooks((prev) => prev.filter((b) => b._id !== deleting._id));
      toast.success(`"${deleting.title}" was removed from the shelf.`);
      setDeleting(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed. Try again.");
    } finally {
      setDeleteBusy(false);
    }
  };

  if (loading) return <Spinner label="Loading your books…" />;

  if (failed) {
    return (
      <p className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-6 text-center text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
        Your books could not be reached right now. Please try again in a moment.
      </p>
    );
  }

  if (books.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-forest-100 bg-white px-4 py-10 text-center dark:border-forest-900 dark:bg-forest-950">
        <p className="text-sm text-stone-500 dark:text-stone-400">
          You have not added any books yet.
        </p>
        <Link
          href="/add-book"
          className="mt-4 inline-block rounded-full bg-forest-800 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-forest-700 dark:bg-amber-600 dark:hover:bg-amber-500"
        >
          Add Your First Book
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 overflow-x-auto rounded-2xl border border-forest-100 bg-white shadow-sm dark:border-forest-900 dark:bg-forest-950">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-forest-100 text-xs tracking-wide text-stone-500 uppercase dark:border-forest-900 dark:text-stone-400">
              <th className="px-4 py-3 font-semibold">Book</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Copies</th>
              <th className="px-4 py-3 font-semibold">Added</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr
                key={book._id}
                className="border-b border-forest-50 last:border-0 dark:border-forest-900"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={book.image}
                      alt=""
                      className="h-14 w-11 shrink-0 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-semibold text-forest-900 dark:text-cream-50">
                        {book.title}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        by {book.author}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-stone-600 dark:text-stone-300">
                  {book.category}
                </td>
                <td className="px-4 py-3 text-stone-600 dark:text-stone-300">
                  {book.availableCopies}/{book.totalCopies} available
                </td>
                <td className="px-4 py-3 text-stone-600 dark:text-stone-300">
                  {new Date(book.addedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditing(book)}
                      className="rounded-full bg-forest-800 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-forest-700 dark:bg-amber-600 dark:hover:bg-amber-500"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleting(book)}
                      className="rounded-full bg-red-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <EditBookModal
          open={!!editing}
          book={editing}
          onClose={() => setEditing(null)}
          onSaved={(updated) => {
            setBooks((prev) =>
              prev.map((b) => (b._id === updated._id ? updated : b)),
            );
            setEditing(null);
          }}
        />
      )}

      <ConfirmModal
        open={!!deleting}
        title="Delete this book?"
        message={`"${deleting?.title ?? ""}" will be removed from the shelf for everyone. This cannot be undone.`}
        confirmLabel="Delete"
        busy={deleteBusy}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </>
  );
}
