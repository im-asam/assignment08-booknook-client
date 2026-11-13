import type { Metadata } from "next";
import ProtectedRoute from "@/components/ProtectedRoute";
import BookDetails from "./BookDetails";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"}/books/${id}`,
      { cache: "no-store" },
    );
    if (!res.ok) throw new Error("not found");
    const data = await res.json();
    const book = data.book ?? data;
    return {
      title: `BookNook | ${book.title}`,
      description: book.description ?? "Book details on BookNook.",
    };
  } catch {
    // API down at build/render time — fall back to a generic title.
    return { title: "BookNook | Book Details" };
  }
}

export default async function BookDetailsPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <ProtectedRoute>
      <BookDetails id={id} />
    </ProtectedRoute>
  );
}
