import type { Metadata } from "next";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import { configuredProviders } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "BookNook | Login",
  description: "Log in to your BookNook account.",
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md pb-4">
      <h1 className="text-center font-display text-3xl font-bold text-forest-900 dark:text-cream-50">
        Welcome Back
      </h1>
      <p className="mt-1 text-center text-stone-500 dark:text-stone-400">
        Log in to borrow books and manage your shelf.
      </p>
      <Suspense fallback={<Spinner label="Loading…" />}>
        <LoginForm googleConfigured={configuredProviders.google} />
      </Suspense>
    </div>
  );
}
