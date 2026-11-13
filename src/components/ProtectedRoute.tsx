"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Spinner from "./Spinner";

/**
 * Client-side guard for private pages (second layer after proxy.ts).
 * While the session is still loading, show a spinner and DO NOT redirect —
 * this is what keeps a logged-in user from being bounced to /login on
 * a page reload. Only redirect once loading is done and there is no user.
 */
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, session, router, pathname]);

  if (isPending || !session?.user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
}
