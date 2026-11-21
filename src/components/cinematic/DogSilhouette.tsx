export function DogSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 64" className={className} fill="currentColor" aria-hidden>
      <path d="M18 42c2-10 8-16 16-18 4-8 12-12 20-10 3 1 5 4 6 7 8-1 16 2 22 8 4 4 6 9 6 14v3c0 3-2 5-5 5H28c-6 0-11-4-12-9l-2-5z" />
      <path d="M28 44v10M42 44v11M62 44v11M76 44v10" stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M92 28c6-2 12-1 16 3 2 2 3 5 2 8-4 1-8 0-12-2-3-5-5-8-6-9z" />
      <circle cx="102" cy="30" r="1.4" fill="#FFF9F2" />
      <path d="M14 34c-4 1-8 5-9 9 3 1 7 0 10-2 1-3 1-5-1-7z" />
    </svg>
  );
}

export function CatSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 58" className={className} fill="currentColor" aria-hidden>
      <path d="M22 40c1-9 8-16 18-17 3-6 9-9 15-8 4 1 7 5 8 9 7 1 13 6 16 12 1 3 1 6-1 8-2 2-5 3-8 3H30c-5 0-9-3-10-7l-2-5z" />
      <path d="M30 42v9M42 42v10M56 42v10M68 42v8" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d="M52 14l4-10 4 9M66 15l5-9 3 10" />
      <circle cx="78" cy="28" r="1.2" fill="#FFF9F2" />
      <path d="M84 34c4 2 7 5 8 8-3 1-7 1-10-1-1-3-1-5 2-7z" />
    </svg>
  );
}
