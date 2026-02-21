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
3. **Important:** Leave **Root Directory** blank (repo root) so `turbo run build` runs correctly
4. Click **Deploy** (first deploy may fail until env vars are set—that's okay)

## 3. Add Environment Variables

1. Project → **Settings** → **Environment Variables**
2. Add for **Production** (and Preview if desired):

| Name | Value |
|------|-------|
| `RESEND_API_KEY` | Your Resend API key |
| `CONTACT_EMAIL` | rithikreddy680@gmail.com |

3. **Redeploy** (Deployments → ... → Redeploy)

## 4. Custom Domain

1. In Vercel: **Project** → **Settings** → **Domains**
2. Click **Add** and enter your domain (e.g. `rithikreddy.com` or `www.rithikreddy.com`)
3. Add the DNS records at your registrar. **Vercel will show you the exact values** in the Domains panel. Typically:
   - **Apex** (yourdomain.com): A record → `76.76.21.21`
   - **www**: CNAME → your project's Vercel CNAME (e.g. `*.vercel-dns.com`)

4. Wait 5–60 minutes (or up to 24h) for DNS to propagate.
5. For HTTPS, Vercel provisions SSL automatically once DNS is verified.

## 5. Done

- Default URL: `https://your-project.vercel.app`
- Custom domain: `https://yourdomain.com` (after DNS is set up)

---

## Troubleshooting

**Build fails with "turbo run build exited with 1"**
- Ensure `.next` is never committed (it's in `.gitignore`). Build artifacts can break Vercel's fresh build.
