import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

/**
 * Authoritative auth gate for protected routes.
 * better-auth is configured with session.cookieCache, so getSession
 * validates the signed session cookie WITHOUT touching the database —
 * this works from any serverless isolate.
 * No valid session -> redirect to /login before rendering.
 */
export async function proxy(request: NextRequest) {
  let user = null;
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    user = session?.user ?? null;
  } catch {
    user = null;
  }
  if (!user) {
    const url = request.nextUrl.clone();
    const next = `${url.pathname}${url.search}`;
    url.pathname = "/login";
    url.search = `?next=${encodeURIComponent(next)}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  // /books (list) is PUBLIC — only /books/:id is private, so the matcher
  // uses /books/:id and never bare /books.
  matcher: ["/books/:id", "/add-book", "/my-books", "/my-borrows", "/profile"],
};
