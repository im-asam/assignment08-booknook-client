"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { updateBook, type Book } from "@/lib/api";
import { uploadImageToImgbb } from "@/lib/imgbb";

const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

interface EditBookModalProps {
  open: boolean;
  book: Book;
  onClose: () => void;
  onSaved: (book: Book) => void;
}

export default function EditBookModal({
  open,
  book,
  onClose,
  onSaved,
}: EditBookModalProps) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [category, setCategory] = useState(book.category);
  const [description, setDescription] = useState(book.description);
  const [totalCopies, setTotalCopies] = useState(book.totalCopies);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Reset the form whenever a different book is opened.
  useEffect(() => {
    if (!open) return;
    setTitle(book.title);
    setAuthor(book.author);
    setCategory(book.category);
    setDescription(book.description);
    setTotalCopies(book.totalCopies);
    setImageFile(null);
    setPreview(null);
  }, [open, book]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      let image = book.image;
      if (imageFile) {
        image = await uploadImageToImgbb(imageFile);
      }
      const updated = await updateBook(book._id, {
        title,
        author,
        category,
        description,
        totalCopies,
        image,
      });
      toast.success("Book updated.");
      onSaved(updated);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const inputCls =
    "mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:focus:border-forest-400 dark:focus:ring-forest-900";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Edit ${book.title}`}
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-forest-950"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-xl font-bold text-forest-900 dark:text-cream-50">
              Edit book
            </h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <label className="block">
                <span className="text-sm font-medium text-stone-600 dark:text-stone-300">Book Title</span>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-stone-600 dark:text-stone-300">Author Name</span>
                <input type="text" required value={author} onChange={(e) => setAuthor(e.target.value)} className={inputCls} />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-sm font-medium text-stone-600 dark:text-stone-300">Category</span>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-stone-600 dark:text-stone-300">Total Copies</span>
                  <input type="number" min={1} required value={totalCopies} onChange={(e) => setTotalCopies(Number(e.target.value))} className={inputCls} />
                </label>
              </div>
              <label className="block">
                <span className="text-sm font-medium text-stone-600 dark:text-stone-300">Short Description</span>
                <textarea rows={3} required value={description} onChange={(e) => setDescription(e.target.value)} className={inputCls} />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-stone-600 dark:text-stone-300">
                  Book Image <span className="font-normal text-stone-400">(leave empty to keep the current cover)</span>
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                  className="mt-1 w-full text-sm text-stone-600 file:mr-3 file:rounded-full file:border-0 file:bg-forest-800 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-forest-700 dark:text-stone-300"
                />
              </label>
              {(preview ?? book.image) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview ?? book.image}
                  alt="Book cover preview"
                  className="h-32 w-24 rounded-lg border border-stone-200 object-cover dark:border-stone-700"
                />
              )}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={busy}
                  className="flex-1 rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 disabled:opacity-50 dark:border-stone-600 dark:text-stone-200 dark:hover:bg-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={busy}
                  className="flex-1 rounded-full bg-forest-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-forest-700 disabled:opacity-50 dark:bg-amber-600 dark:hover:bg-amber-500"
                >
                  {busy ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
