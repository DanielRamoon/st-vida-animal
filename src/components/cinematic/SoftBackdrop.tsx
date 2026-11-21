export function SoftBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(255,196,0,0.16),transparent_42%),radial-gradient(circle_at_20%_70%,rgba(169,0,8,0.12),transparent_40%)]"
      aria-hidden
    />
  );
}
