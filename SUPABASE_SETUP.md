# Supabase Setup Guide for Maison Furniture

This guide will help you set up Supabase for the dynamic CMS functionality.

## Prerequisites

1. A Supabase account (free tier works)
2. Node.js 18+ installed

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in:
   - **Name**: `maison-furniture`
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to your users
4. Click "Create new project" and wait for setup

## Step 2: Get Your API Keys

1. In your Supabase dashboard, go to **Settings > API**
2. Copy these values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

## Step 3: Configure Environment Variables

Create or update `.env.local` in your project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Step 4: Run Database Migrations

### Option A: Using Supabase CLI (Recommended)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-id

# Run migrations
supabase db push
```

### Option B: Manual SQL Execution

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Run each migration file in order:
   - `supabase/migrations/0001_core_tables.sql`
   - `supabase/migrations/0002_rls_policies.sql`
   - `supabase/migrations/0003_triggers.sql`
   - `supabase/migrations/0004_search_and_storage.sql`
   - `supabase/migrations/0005_site_content.sql`
   - `supabase/migrations/0006_product_enhancements.sql`

## Step 5: Seed the Database

After migrations are complete, seed the database with initial data:

```bash
# Install dependencies first
npm install

# Run the seed script
npm run db:seed
```

This will populate:
- ✅ Categories (9 categories)
- ✅ Products (15+ products with images and colors)
- ✅ Team Members (6 members)
- ✅ Milestones (7 company milestones)
- ✅ FAQs (8 questions)
- ✅ Hero Banners (3 banners)
- ✅ Testimonials (3 testimonials)
- ✅ Navigation Items (header & footer)
- ✅ Site Settings

## Step 6: Configure Storage (Optional)

For image uploads:

1. Go to **Storage** in Supabase dashboard
2. Create a bucket named `products`
3. Set it to **Public**
4. Add policy for authenticated uploads:

```sql
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'products');
```

## Step 7: Set Up Authentication (Optional)

For admin panel access:

1. Go to **Authentication > Providers**
2. Enable **Email** provider
3. Create an admin user:
   - Go to **Authentication > Users**
   - Click "Add user"
   - Enter email and password
4. Update user role to admin:

```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-admin@email.com';
```

## Verification

After setup, verify everything works:

1. Start the dev server: `npm run dev`
2. Visit `/shop` - should show products from Supabase
3. Visit `/about` - should show team & milestones from Supabase
4. Visit `/admin` - should show admin dashboard
5. Visit `/admin/site-settings` - should show editable settings

## Troubleshooting

### "relation does not exist" error
- Run migrations in order
- Check SQL Editor for errors

### "permission denied" error
- Check RLS policies are created
- Verify your API keys are correct

### Seed script fails
- Ensure `SUPABASE_SERVICE_ROLE_KEY` is set
- Check if tables exist (run migrations first)

### Products not showing
- Verify products have `status = 'published'`
- Check browser console for errors

## File Structure

```
supabase/
├── migrations/
│   ├── 0001_core_tables.sql      # Core tables (products, orders, etc.)
│   ├── 0002_rls_policies.sql     # Row Level Security
│   ├── 0003_triggers.sql         # Database triggers
│   ├── 0004_search_and_storage.sql # Full-text search
│   ├── 0005_site_content.sql     # CMS tables (team, FAQs, etc.)
│   └── 0006_product_enhancements.sql # Additional product fields
└── functions/                     # Edge functions (if any)

scripts/
└── seed-database.ts              # Database seeding script

src/lib/supabase/
├── client.ts                     # Browser client
├── server.ts                     # Server client
├── admin.ts                      # Admin client
└── queries.ts                    # Data fetching functions
```

## Admin Panel Routes

- `/admin` - Dashboard
- `/admin/products` - Product management
- `/admin/categories` - Category management
- `/admin/orders` - Order management
- `/admin/reviews` - Review moderation
- `/admin/content` - CMS content (team, FAQs, banners, etc.)
- `/admin/site-settings` - Global site settings
