export function MapBlock() {
  return (
    <div className="bg-card rounded-2xl border border-line overflow-hidden">
      {/* Map placeholder — using a styled div since we don't embed Google Maps without an API key */}
      <div className="aspect-[4/3] bg-surface relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-ink">Our Showroom</p>
            <p className="text-xs text-muted mt-1">Kathmandu, Nepal</p>
          </div>
        </div>
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, #2D4A2D 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
      </div>

      {/* Contact Info */}
      <div className="p-6 space-y-3">
        <div className="flex items-start gap-3">
          <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-ink">Address</p>
            <p className="text-sm text-muted">Thamel, Kathmandu 44600, Nepal</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-ink">Phone</p>
            <a href="tel:+9771400000" className="text-sm text-muted hover:text-primary transition-colors">
              +977 1-4XXXXXX
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-ink">Email</p>
            <a href="mailto:hello@furniture.com.np" className="text-sm text-muted hover:text-primary transition-colors">
              hello@furniture.com.np
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
