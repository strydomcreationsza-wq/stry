# 🚀 Deploy Strydom Creations to Vercel — Step-by-Step

**Time needed:** ~10 minutes  
**Cost:** Free forever

---

## ✅ Before you start — create 2 free accounts

### 1. GitHub account (for code hosting)
👉 Go to https://github.com/signup  
- Use your `strydomcreations.za@gmail.com` email
- Pick a username like `strydomcreations`
- Verify your email

### 2. Vercel account (for website hosting)
👉 Go to https://vercel.com/signup  
- Click **"Continue with GitHub"** (uses the account you just made)
- Approve the Vercel app when GitHub asks

Both are 100% free — no credit card needed.

---

## 📦 Step 1: Upload the code to GitHub (3 min)

### Easiest way — use GitHub's website:

1. Go to https://github.com/new
2. **Repository name:** `strydom-creations`
3. Set it to **Public** (Vercel free tier needs this)
4. **Do NOT** check "Add a README file"
5. Click **Create repository**

You'll see a page with instructions. Look for the section **"…or push an existing repository from the command line"**. You'll use those commands in a moment.

### Upload the code:

You have two options:

**Option A (easier): Upload via web browser**
1. On the new empty repo page, click the link **"uploading an existing file"**
2. Drag the entire project folder onto that page
3. Scroll down, click **Commit changes**

**Option B (for developers): Use terminal**
```bash
cd /path/to/strydom-creations
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/strydom-creations.git
git push -u origin main
```

---

## 🚀 Step 2: Deploy on Vercel (3 min)

1. Go to https://vercel.com/new
2. You'll see your `strydom-creations` repo listed — click **Import**
3. Vercel automatically detects it's a Next.js project ✨
4. **Don't change any settings** — just click **Deploy**

Vercel now builds your site. Wait 1–2 minutes.

**When it finishes, you'll see fireworks 🎉 and a link like:**
```
https://strydom-creations.vercel.app
```

**That link is permanent, free, and works forever.**

---

## 🗄️ Step 3: Add a free database (3 min)

The site needs a database to save orders.

1. In your Vercel project dashboard, click the **Storage** tab
2. Click **Create Database**
3. Choose **Neon** (or **Vercel Postgres**) — both free
4. Select the **Free / Hobby** tier
5. Choose a region close to South Africa (Europe is fine)
6. Click **Create**

Vercel automatically connects the database and adds `DATABASE_URL` to your environment.

### Push the tables to your new database:

1. In Vercel → **Storage** → your database → click **`.env.local`** tab
2. Copy the `DATABASE_URL` value
3. On your computer, in the project folder, run:
   ```bash
   DATABASE_URL="paste-the-url-here" npx drizzle-kit push
   ```
4. Type `y` if it asks to confirm

**Redeploy:**  
Back on Vercel → **Deployments** tab → click the "…" menu on the latest deployment → **Redeploy**.

---

## 📧 Step 4: Activate email delivery (1 min)

1. Open your website at your Vercel URL
2. Fill in the **Contact** form with a test message
3. Check `strydomcreations.za@gmail.com` inbox (and **Spam folder!**)
4. Find the email from **FormSubmit** with subject like *"Please Activate Your Form"*
5. Click the **Activate** button — done!

Now every future order and enquiry lands in your Gmail. ✨

---

## 🌐 Step 5 (optional): Add your own domain

Once you buy a domain like `strydomcreations.co.za`:

1. In Vercel → your project → **Settings** → **Domains**
2. Type your domain and click **Add**
3. Vercel shows you 2 DNS records to add at your domain registrar
4. Add them → wait a few minutes → done

Domain registrars for `.co.za`:
- **domains.co.za** — R99/year
- **afrihost.com** — R99/year

---

## 🎉 You're LIVE!

Your website is now:
- ✅ Permanent URL (never expires)
- ✅ Fast (Vercel's global CDN)
- ✅ Auto-updates when you push code to GitHub
- ✅ Free forever (on hobby tier)
- ✅ Real database saving orders
- ✅ Real emails to Gmail
- ✅ Admin dashboard at `/admin` (password: `strydomcreations`)

---

## 🆘 If something goes wrong

- **Build failed on Vercel?** → Check the build logs. Usually a missing env var.
- **Database error?** → Make sure you ran `drizzle-kit push` and redeployed.
- **Emails not arriving?** → Check Gmail spam folder for FormSubmit's activation link.
- **WhatsApp button showing "blocked"?** → On desktop it now opens a popup with WhatsApp Web + copy options. On mobile it opens the app directly.

Need help with any step? Just ask! 💛
