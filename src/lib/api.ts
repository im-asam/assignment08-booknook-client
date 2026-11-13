import { authClient } from "./auth-client";

/**
 * Client for the BookNook Express API.
 * Public reads need no token; writes and user-scoped reads attach a
 * BetterAuth JWT (verified by the server with the shared secret).
 */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  addedBy: string;
  addedByEmail: string;
  addedAt: string;
}

export interface Borrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userName: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
}

export interface BookInput {
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  totalCopies: number;
}

async function getToken(): Promise<string | null> {
  const { data } = await authClient.token();
  return data?.token ?? null;
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  auth = false,
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (auth) {
    const token = await getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      (json as { message?: string }).message ||
        (json as { error?: string }).error ||
        `Request failed (${res.status})`,
    );
  }
  return json as T;
}

export async function getBooks(params?: {
  limit?: number;
  sort?: string;
  email?: string;
}): Promise<Book[]> {
  const search = new URLSearchParams();
  if (params?.limit) search.set("limit", String(params.limit));
  if (params?.sort) search.set("sort", params.sort);
  if (params?.email) search.set("email", params.email);
  const query = search.toString();
  const data = await request<Book[] | { books: Book[] }>(
    `/books${query ? `?${query}` : ""}`,
  );
  return Array.isArray(data) ? data : (data.books ?? []);
}

export async function getBook(id: string): Promise<Book> {
  const data = await request<Book | { book: Book }>(`/books/${id}`);
  return (data as { book: Book }).book ?? (data as Book);
}

export async function addBook(data: BookInput): Promise<Book> {
  return request<Book>("/books", { method: "POST", body: JSON.stringify(data) }, true);
}

export async function updateBook(
  id: string,
  data: Partial<BookInput>,
): Promise<Book> {
  return request<Book>(
    `/books/${id}`,
    { method: "PATCH", body: JSON.stringify(data) },
    true,
  );
}

export async function deleteBook(id: string): Promise<void> {
  await request(`/books/${id}`, { method: "DELETE" }, true);
}

export async function borrowBook(data: {
  bookId: string;
}): Promise<Borrow> {
  return request<Borrow>(
    "/borrows",
    { method: "POST", body: JSON.stringify(data) },
    true,
  );
}

export async function getBorrows(email: string): Promise<Borrow[]> {
  const data = await request<Borrow[] | { borrows: Borrow[] }>(
    `/borrows?email=${encodeURIComponent(email)}`,
    {},
    true,
  );
  return Array.isArray(data) ? data : (data.borrows ?? []);
}

export async function returnBorrow(id: string): Promise<void> {
  await request(`/borrows/${id}`, { method: "DELETE" }, true);
}
