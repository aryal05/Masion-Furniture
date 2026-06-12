"use client";

export default function OfflinePage() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="text-6xl mb-4">📡</p>
        <h1 className="font-display text-3xl md:text-4xl">You're Offline</h1>
        <p className="mt-4 max-w-md text-muted">
          Please check your internet connection and try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-8 rounded-btn bg-walnut px-8 py-4 text-sm uppercase tracking-label text-ivory"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
