import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-display text-4xl md:text-5xl">Page Not Found</h1>
        <p className="mt-4 max-w-md text-muted">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-btn bg-walnut px-8 py-4 text-sm uppercase tracking-label text-ivory"
          >
            Back to Home
          </Link>
          <Link
            href="/shop"
            className="rounded-btn border border-walnut px-8 py-4 text-sm uppercase tracking-label"
          >
            Browse Shop
          </Link>
        </div>
      </div>
    </main>
  );
}
