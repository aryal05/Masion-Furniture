# Maison Furniture 🪑

A modern, high-performance e-commerce platform for luxury furniture, built with Next.js 16, React 19, and Supabase.

## ✨ Features

- 🛍️ **Advanced Shopping Experience**
  - Product filtering & sorting
  - Real-time search
  - Quick view modals
  - Infinite scroll pagination
  - Recently viewed products
  - Wishlist with sharing

- 💳 **Checkout & Payments**
  - Multi-step checkout flow
  - eSewa & Khalti payment integration (Nepal)
  - Real-time order tracking
  - Guest checkout support

- 👤 **User Account Management**
  - Order history & tracking
  - Address management
  - Wishlist management
  - Profile settings

- 🎨 **Admin Dashboard**
  - Product management (CRUD)
  - Order management
  - Customer management
  - Inventory tracking
  - Analytics & reports
  - Content management

- 🚀 **Performance & SEO**
  - ISR & SSG for optimal performance
  - Progressive Web App (PWA)
  - Structured data (JSON-LD)
  - Dynamic sitemap
  - Image optimization

- 🎭 **Animations & UX**
  - Framer Motion animations
  - Custom cursor
  - Smooth page transitions
  - Fly-to-cart animations
  - Skeleton loaders

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** Supabase (PostgreSQL)
- **State Management:** Zustand
- **Data Fetching:** TanStack Query
- **Animations:** Framer Motion
- **Payment Gateways:** eSewa & Khalti

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Supabase account
- eSewa & Khalti merchant accounts (for payment integration)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/maison-furniture.git
cd maison-furniture
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Payment Gateways
NEXT_PUBLIC_ESEWA_MERCHANT_ID=your_esewa_merchant_id
ESEWA_SECRET_KEY=your_esewa_secret_key
NEXT_PUBLIC_KHALTI_PUBLIC_KEY=your_khalti_public_key
KHALTI_SECRET_KEY=your_khalti_secret_key

# Revalidation
REVALIDATION_SECRET=your_random_secret_string
```

### 4. Set up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the migrations in order:

```bash
# Run migrations from supabase/migrations/ in your Supabase SQL editor
# Execute in order: 0001, 0002, 0003, 0004, 0005, 0006, 0007
```

3. Set up Storage buckets:
   - Create a `product-images` bucket (public)
   - Create a `user-uploads` bucket (private)

4. Deploy Edge Functions (optional):
   - `send-order-confirmation`
   - `verify-esewa-payment`
   - `verify-khalti-payment`
   - `generate-invoice-pdf`

See `SUPABASE_SETUP.md` for detailed setup instructions.

### 5. Seed the database (optional)

```bash
npm run db:seed
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚀 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables (copy from `.env.local`)
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

### Important Deployment Settings

- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`
- **Node Version:** 18.x or higher

### Environment Variables on Vercel

Add all environment variables from `.env.local` to your Vercel project settings:
- Navigate to Project Settings → Environment Variables
- Add each variable from `.env.example`
- Deploy or redeploy to apply changes

## 📁 Project Structure

```
maison-furniture/
├── public/                     # Static assets
│   ├── icons/                 # PWA icons
│   └── manifest.json          # PWA manifest
├── supabase/                   # Database & Edge Functions
│   ├── migrations/            # SQL migrations
│   └── functions/             # Edge Functions
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (storefront)/     # Public-facing pages
│   │   ├── admin/            # Admin dashboard
│   │   └── api/              # API routes
│   ├── components/           # React components
│   │   ├── ui/              # Base UI components
│   │   ├── layout/          # Layout components
│   │   ├── home/            # Homepage components
│   │   ├── shop/            # Shop page components
│   │   ├── product/         # Product components
│   │   ├── cart/            # Cart components
│   │   ├── checkout/        # Checkout components
│   │   ├── account/         # Account components
│   │   ├── admin/           # Admin components
│   │   └── motion/          # Animation components
│   ├── hooks/               # Custom React hooks
│   ├── stores/              # Zustand state stores
│   ├── lib/                 # Utilities & configurations
│   │   └── supabase/       # Supabase clients
│   └── types/              # TypeScript type definitions
├── scripts/                # Database seed scripts
└── .env.local             # Environment variables (not committed)
```

## 🔑 Key Features Explained

### State Management

- **Cart:** Zustand store with localStorage persistence
- **Wishlist:** Zustand store with database sync (authenticated users)
- **Checkout:** Multi-step form state management
- **UI:** Global UI state (modals, drawers, etc.)

### Performance Optimizations

- **ISR:** Incremental Static Regeneration for product pages (60s)
- **SSG:** Static generation for collection pages (1h revalidation)
- **Image Optimization:** Next.js Image component with blur placeholders
- **Code Splitting:** Automatic route-based code splitting
- **Prefetching:** Automatic link prefetching

### Security

- **RLS Policies:** Row-level security on all Supabase tables
- **Auth Guards:** Middleware-based route protection
- **Role-Based Access:** Admin role verification
- **Input Validation:** Server-side validation for all forms
- **CSRF Protection:** Honeypot fields for public forms

## 🧪 Testing

```bash
npm run lint
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:seed` - Seed database with sample data

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database & Auth by [Supabase](https://supabase.com/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Payment integration with eSewa & Khalti

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Made with ❤️ for modern furniture shopping experience
