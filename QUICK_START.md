# Quick Start - Deploy Maison Furniture to Vercel

## ✅ What's Done

- ✅ Code pushed to GitHub: `aryal05/Masion-Furniture`
- ✅ All components and pages implemented
- ✅ Environment variable template created (`.env.example`)
- ✅ Comprehensive README added
- ✅ Vercel configuration added
- ✅ Deployment guide created

## 🚀 Deploy Now in 3 Steps

### Step 1: Set Up Supabase (5 minutes)

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for database to initialize
3. Copy your project URL and keys:
   - Project URL: `Settings` → `API` → `Project URL`
   - Anon key: `Settings` → `API` → `anon/public key`
   - Service role key: `Settings` → `API` → `service_role key`
4. Run migrations:
   - Go to `SQL Editor` in Supabase dashboard
   - Copy content from each file in `supabase/migrations/` folder
   - Execute them in order (0001 through 0007)

### Step 2: Deploy to Vercel (5 minutes)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository: `aryal05/Masion-Furniture`
4. Add environment variables (minimum required):

```env
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

5. Click "Deploy" and wait 2-3 minutes

### Step 3: Post-Deployment Setup (3 minutes)

1. **Update Supabase Auth URLs:**
   - In Supabase dashboard: `Authentication` → `URL Configuration`
   - Site URL: `https://your-vercel-domain.vercel.app`
   - Redirect URLs: Add `https://your-vercel-domain.vercel.app/auth/callback`

2. **Seed Database (Optional):**
   ```bash
   npm run db:seed
   ```

3. **Test Your Site:**
   - Visit your Vercel URL
   - Test browsing products
   - Test user registration

## 🎯 What's Next?

### Essential (Do These First)

- [ ] Configure payment gateways (eSewa & Khalti)
- [ ] Add real product images to Supabase Storage
- [ ] Set up email service for order confirmations
- [ ] Create admin user account

### Optional (When Ready)

- [ ] Set up custom domain
- [ ] Enable Vercel Analytics
- [ ] Configure SEO metadata
- [ ] Add product data to database

## 📚 Detailed Documentation

- **Full deployment guide:** See `DEPLOYMENT.md`
- **Supabase setup:** See `SUPABASE_SETUP.md`
- **Project overview:** See `README.md`
- **Environment variables:** See `.env.example`

## ⚡ Payment Gateway Setup (For Nepal)

### eSewa
1. Register at [esewa.com.np](https://esewa.com.np)
2. Apply for merchant account
3. Get merchant ID and secret key
4. Add to Vercel environment variables:
   - `NEXT_PUBLIC_ESEWA_MERCHANT_ID`
   - `ESEWA_SECRET_KEY`

### Khalti
1. Register at [khalti.com](https://khalti.com)
2. Apply for merchant account
3. Get public and secret keys
4. Add to Vercel environment variables:
   - `NEXT_PUBLIC_KHALTI_PUBLIC_KEY`
   - `KHALTI_SECRET_KEY`

## 🆘 Need Help?

- Check `DEPLOYMENT.md` for troubleshooting
- Review build logs in Vercel dashboard
- Check Supabase logs for database errors
- Verify all environment variables are set correctly

---

**Your GitHub repository:** https://github.com/aryal05/Masion-Furniture

**Ready to deploy? Go to:** https://vercel.com/new

Good luck! 🚀
