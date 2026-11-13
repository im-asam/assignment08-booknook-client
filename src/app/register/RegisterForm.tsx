"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn, signUp } from "@/lib/auth-client";

const inputCls =
  "mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-800 outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:focus:border-forest-400 dark:focus:ring-forest-900";

function validatePassword(password: string): string | null {
  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  return null;
}

export default function RegisterForm({ googleConfigured }: { googleConfigured: boolean }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const error = validatePassword(password);
    setPasswordError(error);
    if (error) return;

    setBusy(true);
    try {
      const { error: signUpError } = await signUp.email({
        name,
        email,
        password,
        image: photoUrl || undefined,
      });
      if (signUpError) {
        toast.error(signUpError.message || "Registration failed. Please try again.");
        return;
      }
      toast.success("Account created! Please log in.");
      router.push("/login");
    } catch {
      toast.error("Registration failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    if (!googleConfigured) {
      toast.error("Google sign-in is not set up yet. Please register with email and password.");
      return;
    }
    await signIn.social({ provider: "google", callbackURL: "/" });
  };

  return (
    <div className="mt-6 rounded-2xl border border-forest-100 bg-white p-6 shadow-sm dark:border-forest-900 dark:bg-forest-950">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <label className="block">
          <span className="text-sm font-medium text-stone-600 dark:text-stone-300">Name</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-stone-600 dark:text-stone-300">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-stone-600 dark:text-stone-300">Photo URL</span>
          <input
            type="url"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="https://… (optional)"
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-stone-600 dark:text-stone-300">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError(validatePassword(e.target.value));
            }}
            placeholder="At least 6 characters, upper + lowercase"
            className={inputCls}
            aria-invalid={!!passwordError}
            aria-describedby={passwordError ? "password-error" : undefined}
          />
          {passwordError && (
            <span id="password-error" role="alert" className="mt-1 block text-xs font-medium text-red-600 dark:text-red-400">
              {passwordError}
            </span>
          )}
        </label>
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-full bg-forest-800 py-3 text-sm font-semibold text-white transition hover:bg-forest-700 disabled:opacity-50 dark:bg-amber-600 dark:hover:bg-amber-500"
        >
          {busy ? "Creating your account…" : "Register"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-stone-400">
        <span className="h-px flex-1 bg-stone-200 dark:bg-stone-700" />
        or continue with
        <span className="h-px flex-1 bg-stone-200 dark:bg-stone-700" />
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-stone-300 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-50 dark:border-stone-600 dark:text-stone-200 dark:hover:bg-stone-800"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z" />
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24Z" />
          <path fill="#FBBC05" d="M5.27 14.29A7.2 7.2 0 0 1 4.89 12c0-.8.14-1.57.38-2.29V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09Z" />
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42A11.98 11.98 0 0 0 12 0 11.99 11.99 0 0 0 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z" />
        </svg>
        Continue with Google
      </button>

      <p className="mt-5 text-center text-sm text-stone-500 dark:text-stone-400">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-forest-700 hover:underline dark:text-amber-400">
          Log in
        </Link>
      </p>
    </div>
  );
}
