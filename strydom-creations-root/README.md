# Strydom Creations 📚

Personalised children's learning book e-commerce store, built with Next.js, PostgreSQL, and Tailwind CSS.

## What's inside

- 🏠 Home, About, FAQ, Contact pages
- 🛒 3 shop categories:
  1. **Customised Learning Adventure Books** — full step-by-step configurator (ages 1–12)
  2. **Occasion Books** — Mother's Day, Father's Day, Birthday, Welcome Baby
  3. Category 3 (coming soon)
- 💳 EFT checkout with Standard Bank details
- 📧 Automatic email delivery via FormSubmit.co
- 💬 WhatsApp integration (mobile: opens app · desktop: friendly modal)
- 🔐 Admin dashboard at `/admin` (password: `strydomcreations`)
- 🎨 Warm parent-focused design, mobile-first

## Deploy to Vercel (free, ~10 minutes)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
gh repo create strydom-creations --public --push
```

Or: create an empty repo on github.com, then push manually.

### 2. Import to Vercel

1. Go to https://vercel.com/new
2. Click **Import** next to your `strydom-creations` repo
3. Vercel auto-detects Next.js — click **Deploy**

### 3. Add a free Postgres database

1. In your Vercel project → **Storage** tab → **Create Database** → **Postgres**
2. Choose the free "Hobby" tier
3. Vercel automatically adds `DATABASE_URL` to your env vars

### 4. Push the schema

Once deployed, run this locally (from the project folder) with your Vercel database URL:

```bash
DATABASE_URL="postgresql://...your-vercel-url..." npx drizzle-kit push
```

### 5. (Optional) Set your own domain

- Buy a domain (e.g. `strydomcreations.co.za`) from any registrar
- In Vercel → Project → **Settings** → **Domains** → add it
- Follow Vercel's DNS instructions

## Local development

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your database URL
npx drizzle-kit push
npm run dev
```

Open http://localhost:3000

## Environment variables

See `.env.example` for the full list. Only `DATABASE_URL` is strictly required — everything else has sensible defaults hardcoded for Strydom Creations.

## Email setup (one-time)

The site uses [FormSubmit.co](https://formsubmit.co) for zero-config email delivery:

1. The first time someone submits a form or places an order, FormSubmit sends a one-time activation email to `strydomcreations.za@gmail.com`.
2. Open that email and click **Activate**.
3. Done — all future orders and enquiries land in your Gmail inbox.

## Business info

- **Business:** Strydom Book Creations (Pty) Ltd
- **WhatsApp:** +27 65 589 4577
- **Email:** strydomcreations.za@gmail.com
- **Bank:** Standard Bank · Sandton City · Account 10279619837 · Branch code 051001

## Support

Built with ❤️ for Strydom Creations. All order data is stored securely in your Postgres database.
