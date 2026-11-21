export function BowlIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M4.5 10.5h15c-.2 4.6-3.2 7.5-7.5 7.5s-7.3-2.9-7.5-7.5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M8 10.5c.3-2.2 1.7-3.4 2.6-3.4.8 1.5.4 2.6-.1 3.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12.4 7.4c.8.9.9 2 .4 3.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7.2 18.8h9.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
