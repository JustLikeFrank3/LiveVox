# Quick Reference: Custom Domain Setup

> **Quick Links:** [Main README](./README.md) | [Detailed Setup Guide](./CUSTOM-DOMAIN.md) | [Domain Examples & Ideas](./CUSTOM-DOMAIN-EXAMPLES.md)

## One-Page Cheat Sheet for LiveVox Custom Domain

---

### 🎯 Your Spark Details
- **Spark ID:** `92ccfd0a-d09b-4142-a2a8-9513b5d5ef2a`
- **Default URL:** `https://spark.github.com/92ccfd0a-d09b-4142-a2a8-9513b5d5ef2a/`
- **Your Custom Domain:** `_______________.___________` ← Fill in your domain

---

### 📝 DNS Configuration (Copy-Paste Ready)

**For Subdomain (e.g., livevox.yourname.com):**
```
Type:  CNAME
Name:  livevox          ← Your subdomain
Value: spark.github.com
TTL:   3600 (Auto)
```

**For Apex/Root Domain (e.g., livevox.app):**
```
Type:  ALIAS or ANAME
Name:  @ (or leave blank)
Value: spark.github.com
TTL:   3600 (Auto)
```

---

### ✅ Setup Checklist

- [ ] Choose your custom domain name
- [ ] Log in to your DNS provider (Cloudflare, Namecheap, etc.)
- [ ] Add CNAME record pointing to `spark.github.com`
- [ ] Save DNS changes
- [ ] Wait for propagation (check with [whatsmydns.net](https://www.whatsmydns.net/))
- [ ] Configure custom domain in Spark settings
- [ ] Verify HTTPS works
- [ ] Test the app at new URL
- [ ] Update README.md with new URL
- [ ] Test social media previews
- [ ] Update external links and marketing materials

---

### 🧪 Testing Commands

**Check DNS propagation:**
```bash
# macOS/Linux
dig livevox.yourname.com
nslookup livevox.yourname.com

# Windows
nslookup livevox.yourname.com
```

**Expected result:**
```
livevox.yourname.com CNAME spark.github.com
```

---

### 🔗 Quick Links

| Tool | Purpose | URL |
|------|---------|-----|
| DNS Checker | Check global propagation | [whatsmydns.net](https://www.whatsmydns.net/) |
| SSL Checker | Verify HTTPS | [sslshopper.com](https://www.sslshopper.com/ssl-checker.html) |
| Facebook Debug | Test social preview | [developers.facebook.com/tools/debug/](https://developers.facebook.com/tools/debug/) |
| Twitter Card | Test Twitter preview | [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator) |

---

### 🏃‍♂️ Popular DNS Provider Quick Access

| Provider | DNS Settings Location |
|----------|----------------------|
| **Cloudflare** | Dashboard → Your Domain → DNS → Records |
| **Namecheap** | Domain List → Your Domain → Advanced DNS |
| **GoDaddy** | My Products → Domains → Your Domain → DNS |
| **Google Domains** | Your Domain → DNS |
| **AWS Route 53** | Route 53 → Hosted Zones → Your Domain |

---

### ⏱️ Expected Timeline

| Step | Time |
|------|------|
| DNS configuration | 5 minutes |
| DNS propagation | 1-2 hours |
| SSL certificate | 5-10 minutes |
| **Total time** | **~2 hours** |

---

### 🐛 Common Issues & Fixes

| Problem | Solution |
|---------|----------|
| Domain not loading | Wait for DNS propagation (check whatsmydns.net) |
| SSL error | Wait 10 minutes for certificate provisioning |
| Wrong content | Hard refresh: `Ctrl+Shift+R` or `Cmd+Shift+R` |
| Microphone blocked | Must use HTTPS (never HTTP) |
| Social preview wrong | Clear cache with Facebook Debugger |

---

### 📞 Support

**Need detailed help?** See [CUSTOM-DOMAIN.md](./CUSTOM-DOMAIN.md) for:
- Detailed step-by-step instructions
- Screenshots for each DNS provider
- Advanced configuration options
- Troubleshooting guide
- Analytics setup
- Best practices

**Still stuck?** Contact GitHub Spark support with:
- Your Spark ID
- Your custom domain
- Description of the issue
- Screenshots of DNS settings

---

### 💡 Example Configurations

**Personal Website:**
```
yourdomain.com → Your portfolio
blog.yourdomain.com → Your blog
livevox.yourdomain.com → This app ✅
```

**Studio/Business:**
```
yourstudio.com → Main website
work.yourstudio.com → Portfolio
tools.yourstudio.com → Apps collection
voice.yourstudio.com → LiveVox ✅
```

**Dedicated Domain:**
```
livevox.app → This app ✅
www.livevox.app → Redirects to above
```

---

### 🎨 After Setup: Update These

**README.md:**
- [ ] Update live URL in header
- [ ] Update URL in "Try it Live!" button
- [ ] Update URL in "Getting Started" section
- [ ] Update URL in "Sharing Options" section

**index.html (optional):**
- [ ] Update `<meta property="og:url">`
- [ ] Update `<meta name="twitter:url">`
- [ ] Add `<link rel="canonical">`

**External:**
- [ ] GitHub repo description
- [ ] Portfolio website
- [ ] Social media profiles
- [ ] Email signature
- [ ] Business cards

---

<div align="center">

**🚀 Ready to launch with your custom domain!**

[📖 Detailed Guide](./CUSTOM-DOMAIN.md) | [🏠 Main README](./README.md)

</div>
