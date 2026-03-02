# Vercel Deployment Guide

This project is fully ready to be deployed on Vercel.

## Step 1: Push to GitHub/GitLab
Create a Git repository and push the entire `RoshinisHomeProducts` folder.

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/roshinis-home-products.git
git push -u origin main
```

## Step 2: Supabase Setup
1. Go to [database.new](https://database.new) and create a new project.
2. Navigate to SQL Editor and run the contents of `supabase/schema.sql` to create all tables and RLS policies.
3. Run `supabase/seed.sql` to insert the initial products and test coupons.
4. Copy your `Project URL` and `anon public` key.

## Step 3: Payment Gateway Setup
1. **PhonePe**: Get your Sandbox / UAT Merchant ID, Salt Key, and Salt Index from the PhonePe Developer Dashboard. 
2. **PayU**: Get your Sandbox Key and Salt from the PayU Test Environment.

## Step 4: Import to Vercel
1. Go to [Vercel](https://vercel.com) and click **Add New... > Project**.
2. Select the repository you created in Step 1.
3. Open the **Environment Variables** section and add the following keys from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `PHONEPE_MERCHANT_ID`
   - `PHONEPE_SALT_KEY`
   - `PHONEPE_SALT_INDEX`
   - `PAYU_MERCHANT_KEY`
   - `PAYU_MERCHANT_SALT`
4. Click **Deploy**.

## post-deployment
- Once deployed, your project URL (e.g., `https://roshinis-home-products.vercel.app`) should be added to PhonePe and PayU dashboards as the approved webhook URL so API callbacks work properly.
- Ensure any `remotePatterns` in `next.config.mjs` include the domains for images hosted in Supabase storage (`[project-id].supabase.co`).
