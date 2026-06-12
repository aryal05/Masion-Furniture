import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="text-6xl mb-4">🚫</p>
        <h1 className="font-display text-3xl md:text-4xl">Access Denied</h1>
        <p className="mt-4 max-w-md text-muted">
          You don't have permission to access this page. If you believe this is
          an error, please contact support.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-btn bg-walnut px-8 py-4 text-sm uppercase tracking-label text-ivory"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
