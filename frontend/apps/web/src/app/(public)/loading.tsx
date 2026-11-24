export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl animate-pulse space-y-10 px-4 py-6 sm:px-6 sm:py-8" aria-busy="true" aria-label="Loading tournaments">
      <div className="h-72 rounded-3xl bg-ink/90" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-20 rounded-2xl bg-line" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-72 rounded-2xl bg-line" />
        ))}
      </div>
    </div>
  );
}
