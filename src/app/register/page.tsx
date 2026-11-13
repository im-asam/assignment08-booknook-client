import type { Metadata } from "next";
import { configuredProviders } from "@/lib/auth";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "BookNook | Register",
  description: "Create your BookNook account.",
};

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md pb-4">
      <h1 className="text-center font-display text-3xl font-bold text-forest-900 dark:text-cream-50">
        Join BookNook
      </h1>
      <p className="mt-1 text-center text-stone-500 dark:text-stone-400">
        Create an account to borrow books and share your own.
      </p>
      <RegisterForm googleConfigured={configuredProviders.google} />
    </div>
  );
}
