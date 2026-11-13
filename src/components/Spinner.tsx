export default function Spinner({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-10" role="status" aria-live="polite">
      <span className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-forest-200 border-t-forest-700 dark:border-forest-800 dark:border-t-amber-400" />
      <span className="text-sm text-stone-500 dark:text-stone-400">{label}</span>
    </div>
  );
}
