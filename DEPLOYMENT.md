# Vercel Deployment Guide for Maison Furniture

## ✅ Pre-Deployment Checklist

Before deploying to Vercel, ensure you have:

- [x] GitHub repository with all code pushed
- [ ] Supabase project created and configured
- [ ] Environment variables ready
- [ ] Payment gateway accounts (eSewa & Khalti)

## 🚀 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your GitHub repository: `aryal05/Masion-Furniture`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (leave default)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)

4. **Add Environment Variables**
   
   Click "Environment Variables" and add these (copy from your `.env.local`):

   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Site Configuration
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app

   # Payment Gateway - eSewa (Nepal)
   NEXT_PUBLIC_ESEWA_MERCHANT_ID=your_esewa_merchant_id
   ESEWA_SECRET_KEY=your_esewa_secret_key

   # Payment Gateway - Khalti (Nepal)
   NEXT_PUBLIC_KHALTI_PUBLIC_KEY=your_khalti_public_key
   KHALTI_SECRET_KEY=your_khalti_secret_key

   # Email Service (Optional)
   RESEND_API_KEY=your_resend_api_key

   # Revalidation Secret
   REVALIDATION_SECRET=your_random_secret_string
   ```

   **Important:** For `NEXT_PUBLIC_SITE_URL`, use your Vercel domain once deployed, or use a custom domain.

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (2-5 minutes)
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

Follow the prompts to:
- Set up the project
- Link to existing project or create new one
- Confirm settings
- Add environment variables when prompted

## 🔧 Post-Deployment Configuration

### 1. Update Site URL

After deployment, update the environment variable:

```env
NEXT_PUBLIC_SITE_URL=https://your-actual-domain.vercel.app
```

Go to: Project Settings → Environment Variables → Edit `NEXT_PUBLIC_SITE_URL` → Redeploy

### 2. Configure Supabase Authentication

In your Supabase dashboard:

1. Go to **Authentication** → **URL Configuration**
2. Add your Vercel URL to **Site URL**: `https://your-domain.vercel.app`
3. Add to **Redirect URLs**:
   - `https://your-domain.vercel.app/auth/callback`
   - `https://your-domain.vercel.app/admin/login`

### 3. Configure Payment Gateways

#### eSewa
1. Login to eSewa Merchant Dashboard
2. Add your Vercel URL to allowed domains
3. Set callback URL: `https://your-domain.vercel.app/api/payments/esewa/callback`

#### Khalti
1. Login to Khalti Merchant Dashboard
2. Add your Vercel URL to allowed domains
3. Set return URL: `https://your-domain.vercel.app/checkout/confirmation`

### 4. Set Up Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Click "Add Domain"
3. Enter your custom domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (can take up to 48 hours)

### 5. Enable Automatic Deployments

Vercel automatically deploys:
- **Production:** Every push to `main` branch
- **Preview:** Every push to other branches and pull requests

To customize:
- Go to Project Settings → Git
- Configure branch deployment settings

## 🔍 Monitoring & Analytics

### Vercel Analytics
1. Go to your project dashboard
2. Click "Analytics" tab
3. Enable Web Analytics (free tier available)

### Performance Monitoring
- **Speed Insights:** Measures real-world performance
- **Error Tracking:** Monitor runtime errors
- **Logs:** View deployment and function logs

Access via: Project Dashboard → respective tabs

## 🐛 Troubleshooting

### Build Fails

**Check build logs:**
- Go to Deployments → Failed deployment → View logs

**Common issues:**
1. Missing environment variables
   - Solution: Add all required env vars in Project Settings

2. TypeScript errors
   - Solution: Fix errors locally and push again

3. Dependency installation failures
   - Solution: Ensure `package-lock.json` is committed

### Runtime Errors

**Check function logs:**
- Go to Project → Functions → Select function → View logs

**Common issues:**
1. Supabase connection errors
   - Solution: Verify `NEXT_PUBLIC_SUPABASE_URL` and keys are correct

2. Payment gateway errors
   - Solution: Verify payment credentials and callback URLs

3. 404 errors on dynamic routes
   - Solution: Check middleware configuration and route patterns

### Performance Issues

1. **Enable caching:**
   - ISR is already configured in pages
   - Check `revalidate` values in page components

2. **Optimize images:**
   - All images should use Next.js `<Image>` component
   - Verify images are properly optimized

3. **Monitor bundle size:**
   - Run `npm run build` locally
   - Check bundle analyzer output
   - Code-split large components if needed

## 📊 Deployment Status

After successful deployment:

- ✅ Production URL: `https://your-domain.vercel.app`
- ✅ Preview URLs: Auto-generated for each PR
- ✅ Automatic HTTPS: Enabled by default
- ✅ Edge Network: Global CDN
- ✅ Serverless Functions: API routes deployed

## 🔐 Security Checklist

- [ ] All sensitive keys in environment variables (not in code)
- [ ] CORS configured properly in Supabase
- [ ] RLS policies enabled on all Supabase tables
- [ ] Admin routes protected by middleware
- [ ] Rate limiting configured for API routes
- [ ] HTTPS enforced (automatic on Vercel)

## 📈 Next Steps

1. **Test the deployment:**
   - Browse the site
   - Test user registration/login
   - Test product browsing and search
   - Test cart and checkout flow
   - Test payment integration (use test credentials)
   - Test admin dashboard

2. **Set up monitoring:**
   - Enable Vercel Analytics
   - Set up error tracking (Sentry optional)
   - Monitor Core Web Vitals

3. **Performance optimization:**
   - Check Lighthouse scores
   - Optimize images further if needed
   - Review and optimize database queries

4. **SEO setup:**
   - Submit sitemap to Google Search Console
   - Configure meta tags and Open Graph images
   - Set up robots.txt (already included)

## 🆘 Support

If you encounter issues:

1. Check [Vercel Documentation](https://vercel.com/docs)
2. Check [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
3. Check Vercel Community Forums
4. Review deployment logs for specific errors

---

**Congratulations! Your Maison Furniture e-commerce site is now live! 🎉**
