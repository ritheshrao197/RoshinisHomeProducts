# Roshini's Home Products E-commerce Platform

A production-grade, highly scalable e-commerce website built for authentic Karnataka home products.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Database & Auth**: Supabase
- **Payments**: PhonePe & PayU Integrations

## Features

- **Storefront**: High-converting Homepage, faceted Shop listing, and detailed Product pages.
- **Cart & Checkout**: Zustand-powered cart state, GST calculations, free shipping thresholds, coupon codes.
- **Payments**: Production-ready, cryptographically secure hash generation for Indian Payment Gateways.
- **Admin Panel**: Protected dashboard with complete CRUD views for Products, Orders, Customers, and Content.
- **SEO & Security**: Dynamic Metadata, JSON-LD structured data, custom Sitemap & Robots.txt, and Zod API validation schemas.

## Local Setup

1. Copy `.env.local.example` to `.env.local` and populate keys:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `PHONEPE_MERCHANT_ID` / `PHONEPE_SALT_KEY`
   - `PAYU_MERCHANT_KEY` / `PAYU_MERCHANT_SALT`
2. Run Database Migrations in Supabase SQL editor (`supabase/schema.sql` and `supabase/seed.sql`)
3. `npm install`
4. `npm run dev`

## Deployment Checklist (Vercel)

- [ ] Connect repository to Vercel.
- [ ] Add Environment Variables directly in Vercel project settings.
- [ ] Update `next.config.mjs` domain `remotePatterns` if using external CDN images.
- [ ] Add Production URLs for Webhooks (PhonePe, PayU callback URLs).
- [ ] Ensure Supabase Row Level Security (RLS) is configured correctly for public read and authenticated mutations.

---
Built with ❤️ by Antigravity
