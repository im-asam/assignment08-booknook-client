"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
import { getBorrows, returnBorrow, type Borrow } from "@/lib/api";
import { useSession } from "@/lib/auth-client";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function MyBorrowsList() {
  const { data: session } = useSession();
  const email = session?.user?.email ?? "";
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [returningId, setReturningId] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!email) return;
    setLoading(true);
    getBorrows(email)
      .then(setBorrows)
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, [email]);

  useEffect(() => {
    load();
  }, [load]);

  const handleReturn = async (borrow: Borrow) => {
    setReturningId(borrow._id);
    try {
      await returnBorrow(borrow._id);
      setBorrows((prev) => prev.filter((b) => b._id !== borrow._id));
      toast.success(`"${borrow.bookTitle}" is back on the shelf. Thank you!`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Return failed. Try again.");
    } finally {
      setReturningId(null);
    }
  };

  if (loading) return <Spinner label="Loading your borrows…" />;

  if (failed) {
    return (
      <p className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-6 text-center text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
        Your borrows could not be reached right now. Please try again in a moment.
      </p>
    );
  }

  if (borrows.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-forest-100 bg-white px-4 py-10 text-center dark:border-forest-900 dark:bg-forest-950">
        <p className="text-sm text-stone-500 dark:text-stone-400">
          You have no books on loan right now.
        </p>
        <Link
          href="/books"
          className="mt-4 inline-block rounded-full bg-forest-800 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-forest-700 dark:bg-amber-600 dark:hover:bg-amber-500"
        >
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto rounded-2xl border border-forest-100 bg-white shadow-sm dark:border-forest-900 dark:bg-forest-950">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-forest-100 text-xs tracking-wide text-stone-500 uppercase dark:border-forest-900 dark:text-stone-400">
            <th className="px-4 py-3 font-semibold">Book</th>
            <th className="px-4 py-3 font-semibold">Borrow Date</th>
            <th className="px-4 py-3 font-semibold">Return Date</th>
            <th className="px-4 py-3 text-right font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {borrows.map((borrow) => (
            <tr
              key={borrow._id}
              className="border-b border-forest-50 last:border-0 dark:border-forest-900"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={borrow.bookImage}
                    alt=""
                    className="h-14 w-11 shrink-0 rounded-md object-cover"
                  />
                  <p className="font-semibold text-forest-900 dark:text-cream-50">
                    {borrow.bookTitle}
                  </p>
                </div>
              </td>
              <td className="px-4 py-3 text-stone-600 dark:text-stone-300">
                {formatDate(borrow.borrowDate)}
              </td>
              <td className="px-4 py-3 text-stone-600 dark:text-stone-300">
                {formatDate(borrow.returnDate)}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => handleReturn(borrow)}
                  disabled={returningId === borrow._id}
                  className="rounded-full bg-forest-800 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-forest-700 disabled:opacity-50 dark:bg-amber-600 dark:hover:bg-amber-500"
                >
                  {returningId === borrow._id ? "Returning…" : "Return Book"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
