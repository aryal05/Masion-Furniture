import Link from "next/link";

const FOOTER_LINKS = {
  Shop: [
    { label: "All Products", href: "/shop" },
    { label: "Living Room", href: "/shop?category=living-room" },
    { label: "Bedroom", href: "/shop?category=bedroom" },
    { label: "Dining", href: "/shop?category=dining" },
    { label: "Office", href: "/shop?category=office" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/story" },
    { label: "Showroom", href: "/showroom" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
  Support: [
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Shipping & Delivery", href: "/shipping" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Care Guide", href: "/care" },
  ],
  Legal: [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/maison", icon: "IG" },
  { label: "Facebook", href: "https://facebook.com/maison", icon: "FB" },
  { label: "Pinterest", href: "https://pinterest.com/maison", icon: "PI" },
];

export function Footer() {
  return (
    <footer className="border-t border-walnut/10 bg-ivory pb-24 lg:pb-0">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10">
        {/* Main footer grid */}
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-display text-3xl tracking-display">
              Maison
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted leading-relaxed">
              Handcrafted furniture in solid walnut and oak — built to be lived with
              for generations.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-walnut/20 text-xs font-medium transition-colors hover:bg-walnut hover:text-ivory hover:border-walnut"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="eyebrow !text-charcoal mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-charcoal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 rounded-card bg-walnut/5 p-8 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="font-display text-xl">Stay in the loop</h3>
            <p className="mt-1 text-sm text-muted">
              New arrivals, design inspiration, and exclusive offers.
            </p>
          </div>
          <form className="mt-4 flex gap-3 lg:mt-0">
            <input
              type="email"
              placeholder="Enter your email"
              className="input w-full lg:w-64"
              required
            />
            <button
              type="submit"
              className="rounded-btn bg-walnut px-6 py-3 text-sm uppercase tracking-label text-ivory transition-transform hover:-translate-y-0.5"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-walnut/10 pt-8 text-xs text-muted lg:flex-row">
          <p>© {new Date().getFullYear()} Maison Furniture Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Kathmandu, Nepal</span>
            <span>+977 1-4XXXXXX</span>
            <span>hello@maison.com.np</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
