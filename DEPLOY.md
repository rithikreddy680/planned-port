# Deploy to Vercel

## 1. Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

## 2. Import on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New** → **Project**
2. Import your GitHub repository
3. **Important:** Set **Root Directory** to `apps/web`
4. Click **Deploy** (first deploy may fail until env vars are set—that's okay)

## 3. Add Environment Variables

1. Project → **Settings** → **Environment Variables**
2. Add for **Production** (and Preview if desired):

| Name | Value |
|------|-------|
| `RESEND_API_KEY` | Your Resend API key |
| `CONTACT_EMAIL` | rithikreddy680@gmail.com |

3. **Redeploy** (Deployments → ... → Redeploy)

## 4. Done

Your site will be live at `https://your-project.vercel.app`

## Custom Domain (optional)

Settings → Domains → Add your domain → Follow DNS instructions at your registrar.
