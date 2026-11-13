"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { addBook } from "@/lib/api";
import { uploadImageToImgbb } from "@/lib/imgbb";
import { useSession } from "@/lib/auth-client";

const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

const inputCls =
  "mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-800 outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:focus:border-forest-400 dark:focus:ring-forest-900";

export default function AddBookForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [totalCopies, setTotalCopies] = useState(1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const user = session?.user;

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      toast.error("Please choose a cover image for the book.");
      return;
    }
    if (!user) {
      toast.error("You must be logged in to add a book.");
      return;
    }
    setBusy(true);
    try {
      const image = await uploadImageToImgbb(imageFile);
      await addBook({
        title,
        author,
        category,
        description,
        totalCopies,
        image,
        addedBy: user.name ?? "",
        addedByEmail: user.email ?? "",
      });
      toast.success(`"${title}" is now on the shelf!`);
      router.push("/my-books");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add the book. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-4 rounded-2xl border border-forest-100 bg-white p-6 shadow-sm dark:border-forest-900 dark:bg-forest-950"
    >
      <label className="block">
        <span className="text-sm font-medium text-stone-600 dark:text-stone-300">Book Title</span>
        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. The Hobbit" className={inputCls} />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-stone-600 dark:text-stone-300">Author Name</span>
        <input type="text" required value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="e.g. J.R.R. Tolkien" className={inputCls} />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
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
        <textarea rows={4} required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What is this book about? Why would someone enjoy it?" className={inputCls} />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-stone-600 dark:text-stone-300">Book Image</span>
        <input
          type="file"
          accept="image/*"
          required
          onChange={(e) => handleFile(e.target.files?.[0])}
          className="mt-1 w-full text-sm text-stone-600 file:mr-3 file:rounded-full file:border-0 file:bg-forest-800 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-forest-700 dark:text-stone-300"
        />
      </label>
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt="Cover preview" className="h-40 w-28 rounded-lg border border-stone-200 object-cover dark:border-stone-700" />
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-stone-600 dark:text-stone-300">Your Name</span>
          <input type="text" value={user?.name ?? ""} readOnly className={`${inputCls} bg-stone-50 text-stone-500 dark:bg-stone-800 dark:text-stone-400`} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-stone-600 dark:text-stone-300">Your Email</span>
          <input type="email" value={user?.email ?? ""} readOnly className={`${inputCls} bg-stone-50 text-stone-500 dark:bg-stone-800 dark:text-stone-400`} />
        </label>
      </div>

      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-full bg-forest-800 py-3 text-sm font-semibold text-white transition hover:bg-forest-700 disabled:opacity-50 dark:bg-amber-600 dark:hover:bg-amber-500"
      >
        {busy ? "Adding your book…" : "Add Book"}
      </button>
    </form>
  );
}
