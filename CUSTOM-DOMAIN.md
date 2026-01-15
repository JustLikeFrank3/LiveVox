# 🌐 Custom Domain Setup for LiveVox

> **Quick Links:** [Main README](./README.md) | [Quick Start Cheat Sheet](./CUSTOM-DOMAIN-QUICKSTART.md) | [Domain Examples & Ideas](./CUSTOM-DOMAIN-EXAMPLES.md)

This guide explains how to configure a custom domain for your LiveVox app, giving you branded sharing URLs like `livevox.yourdomain.com` instead of the default Spark URL.

---

## 🎯 Why Use a Custom Domain?

### Professional Branding
- **Brand recognition**: Users see your domain, not a generic Spark URL
- **Trust**: Custom domains feel more official and trustworthy
- **Memorability**: `livevox.yourname.com` is easier to remember than a UUID

### Better Sharing
- **Cleaner links**: Share `livevox.studio/monitor` instead of `spark.github.com/92ccfd0a-d09b-4142-a2a8-9513b5d5ef2a/`
- **Professional appearance**: Great for portfolios, resumes, and marketing
- **Custom branding**: Your domain shows in social media previews

### SEO Benefits
- **Search ranking**: Custom domains can rank higher in search results
- **Analytics**: Easier to track traffic with your own domain
- **Subdomain flexibility**: Create multiple apps at different subdomains

---

## 🚀 Quick Start

### Option 1: Use a Subdomain (Recommended)
Perfect if you already own a domain like `yourname.com`:
- ✅ `livevox.yourname.com`
- ✅ `voice.yourname.com`
- ✅ `monitor.yourstudio.com`

### Option 2: Use a New Domain
Register a dedicated domain for LiveVox:
- ✅ `livevox.app`
- ✅ `voicemonitor.io`
- ✅ `yourname.studio`

---

## 📋 Prerequisites

Before setting up a custom domain, you'll need:

1. **A domain name** - Either:
   - An existing domain you own (e.g., `yourname.com`)
   - A new domain purchased from a registrar (Namecheap, GoDaddy, Cloudflare, etc.)

2. **Access to DNS settings** - You need to be able to:
   - Add CNAME records
   - Or modify A/AAAA records
   - Usually done through your domain registrar's control panel

3. **Your Spark ID** - This is the unique identifier for your app:
   - Found in your current URL: `spark.github.com/[YOUR-SPARK-ID]/`
   - For LiveVox: `92ccfd0a-d09b-4142-a2a8-9513b5d5ef2a`

---

## 🛠️ Setup Instructions

### Step 1: Choose Your Custom Domain

Decide on the exact domain or subdomain you want to use:

**Examples:**
- `livevox.yourname.com` (subdomain of your personal site)
- `voice.yourstudio.com` (subdomain of your business)
- `livevox.app` (dedicated domain)

**Best Practices:**
- ✅ Keep it short and memorable
- ✅ Use hyphens sparingly
- ✅ Avoid numbers and special characters
- ✅ Choose a descriptive name (includes "voice", "audio", or "monitor")

### Step 2: Configure DNS Records

Log in to your domain registrar or DNS provider and add a CNAME record:

**For Subdomains (Recommended):**
```
Type: CNAME
Name: livevox (or your chosen subdomain)
Value: spark.github.com
TTL: 3600 (or Auto)
```

**Example DNS Configurations:**

<details>
<summary><strong>Cloudflare</strong></summary>

1. Log in to Cloudflare Dashboard
2. Select your domain
3. Go to **DNS** → **Records**
4. Click **Add record**
5. Configure:
   - **Type**: CNAME
   - **Name**: `livevox` (your subdomain)
   - **Target**: `spark.github.com`
   - **Proxy status**: ✅ Proxied (recommended for speed)
   - **TTL**: Auto
6. Click **Save**
</details>

<details>
<summary><strong>Namecheap</strong></summary>

1. Log in to Namecheap
2. Go to **Domain List** → Select your domain
3. Click **Advanced DNS**
4. Click **Add New Record**
5. Configure:
   - **Type**: CNAME Record
   - **Host**: `livevox` (your subdomain)
   - **Value**: `spark.github.com.`
   - **TTL**: Automatic
6. Click the ✓ to save
</details>

<details>
<summary><strong>GoDaddy</strong></summary>

1. Log in to GoDaddy
2. Go to **My Products** → **Domains**
3. Click your domain → **DNS**
4. Click **Add** under Records
5. Configure:
   - **Type**: CNAME
   - **Name**: `livevox` (your subdomain)
   - **Value**: `spark.github.com`
   - **TTL**: 1 Hour
6. Click **Save**
</details>

<details>
<summary><strong>Google Domains</strong></summary>

1. Log in to Google Domains
2. Select your domain
3. Go to **DNS** tab
4. Scroll to **Custom resource records**
5. Configure:
   - **Name**: `livevox` (your subdomain)
   - **Type**: CNAME
   - **TTL**: 1h
   - **Data**: `spark.github.com.`
6. Click **Add**
</details>

<details>
<summary><strong>AWS Route 53</strong></summary>

1. Log in to AWS Console
2. Go to **Route 53** → **Hosted Zones**
3. Select your domain
4. Click **Create Record**
5. Configure:
   - **Record name**: `livevox` (your subdomain)
   - **Record type**: CNAME
   - **Value**: `spark.github.com`
   - **TTL**: 300
   - **Routing policy**: Simple
6. Click **Create records**
</details>

### Step 3: Verify DNS Propagation

DNS changes can take time to propagate globally (5 minutes to 48 hours, typically 1-2 hours).

**Check propagation status:**

1. **Command Line** (Mac/Linux):
   ```bash
   dig livevox.yourname.com
   nslookup livevox.yourname.com
   ```

2. **Online Tools**:
   - [whatsmydns.net](https://www.whatsmydns.net/) - Check global DNS propagation
   - [dnschecker.org](https://dnschecker.org/) - Multi-location DNS lookup
   - [mxtoolbox.com](https://mxtoolbox.com/SuperTool.aspx) - DNS lookup tool

**What to look for:**
- The CNAME should point to `spark.github.com`
- Multiple global locations should show the same result
- No errors or timeouts

### Step 4: Configure Custom Domain in Spark

Once DNS is propagated, configure the custom domain in your Spark settings:

1. **Access Spark Settings**:
   - Go to your Spark dashboard/settings page
   - Or contact GitHub Spark support with your domain details

2. **Add Custom Domain**:
   - Enter your custom domain: `livevox.yourname.com`
   - Enter your Spark ID: `92ccfd0a-d09b-4142-a2a8-9513b5d5ef2a`
   - Save settings

3. **Enable HTTPS**:
   - Spark will automatically provision an SSL certificate
   - This may take a few minutes
   - Your custom domain will only work with HTTPS enabled

### Step 5: Test Your Custom Domain

Visit your new custom domain and verify:

- ✅ `https://livevox.yourname.com` loads your LiveVox app
- ✅ HTTPS is working (padlock icon in browser)
- ✅ All features work (microphone access, audio monitoring, etc.)
- ✅ Settings persist (volume, device selection, etc.)
- ✅ Social media previews show correctly when sharing

**Test social media previews:**
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

---

## 🎨 Update README and Marketing

Once your custom domain is live, update your documentation:

### Update README.md

Replace references to the Spark URL:

```markdown
### 🌐 [**Try it Live!**](https://livevox.yourname.com/)
```

```markdown
**🔗 Live URL:** https://livevox.yourname.com/
```

### Update Social Links

Update links in:
- GitHub repository description
- GitHub Pages
- Portfolio website
- Social media profiles
- Email signature

### Update Open Graph Tags (Optional)

If you want to customize the metadata for your custom domain, update `index.html`:

```html
<meta property="og:url" content="https://livevox.yourname.com/" />
<meta name="twitter:url" content="https://livevox.yourname.com/" />
<link rel="canonical" href="https://livevox.yourname.com/" />
```

---

## 🔧 Advanced Configuration

### Multiple Subdomains

Point different subdomains to the same app:

```
Type: CNAME, Name: livevox, Value: spark.github.com
Type: CNAME, Name: voice, Value: spark.github.com
Type: CNAME, Name: monitor, Value: spark.github.com
```

All will point to the same LiveVox app.

### Apex Domain (Root Domain)

To use the root domain (e.g., `livevox.app` instead of `www.livevox.app`):

**Option A: ALIAS record (Cloudflare, Route53, DNSimple):**
```
Type: ALIAS
Name: @ (or leave blank)
Value: spark.github.com
```

**Option B: ANAME record (some registrars):**
```
Type: ANAME
Name: @ (or leave blank)
Value: spark.github.com
```

**Option C: A records (if ALIAS not supported):**
Contact Spark support for the correct IP addresses, then:
```
Type: A
Name: @ (or leave blank)
Value: [Spark IP address]
```

### WWW and Non-WWW

Ensure both `livevox.app` and `www.livevox.app` work:

1. Set up CNAME for `www`:
   ```
   Type: CNAME, Name: www, Value: spark.github.com
   ```

2. Set up redirect from non-www to www (or vice versa) in Cloudflare or registrar

### CDN/Proxy (Cloudflare)

For better performance and DDoS protection:

1. Enable Cloudflare proxy (orange cloud icon)
2. Configure SSL/TLS settings to "Full (strict)"
3. Enable "Always Use HTTPS"
4. Enable "Auto Minify" for JS, CSS, HTML
5. Enable "Brotli" compression
6. Configure caching rules for static assets

---

## 📊 Analytics and Monitoring

### Track Custom Domain Traffic

**Google Analytics:**
```html
<!-- Add to index.html before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Cloudflare Analytics:**
- Built-in if using Cloudflare proxy
- View traffic, threats, performance in Cloudflare dashboard

**Plausible/Fathom:**
- Privacy-friendly alternatives to Google Analytics
- Add tracking script to `index.html`

### Monitor Uptime

Use a monitoring service to track availability:
- [UptimeRobot](https://uptimerobot.com/) - Free tier available
- [Pingdom](https://www.pingdom.com/)
- [StatusCake](https://www.statuscake.com/)
- [Better Uptime](https://betteruptime.com/)

---

## 🐛 Troubleshooting

### Domain Not Loading

**"This site can't be reached"**
- ❌ DNS not propagated yet → Wait 1-2 hours, check with whatsmydns.net
- ❌ CNAME points to wrong target → Should be `spark.github.com`
- ❌ Typo in subdomain name → Double-check DNS record

**"Connection not secure" or SSL error**
- ❌ SSL certificate not provisioned → Wait a few minutes, or contact Spark support
- ❌ HTTPS not enabled in Spark → Enable HTTPS in Spark settings
- ❌ Mixed content issues → Ensure all resources use HTTPS

### Domain Loads but Looks Wrong

**Old content or cached version**
- ✅ Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- ✅ Clear browser cache
- ✅ Try in incognito/private window

**Broken assets or missing files**
- ❌ Absolute paths in code → Use relative paths
- ❌ CORS issues → Contact Spark support

### Social Previews Not Working

**Wrong image or description appears**
- ✅ Check Open Graph tags in `index.html`
- ✅ Clear social media cache (Facebook Debugger, Twitter validator)
- ✅ Ensure `og-image.svg` exists in `/public/` folder
- ✅ Wait for DNS to fully propagate

**Preview not updating**
- ✅ Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to force refresh
- ✅ Add `?v=1` to URL to bust cache: `livevox.yourname.com/?v=1`

### Microphone Permissions Not Working

**Browser says site is not secure**
- ❌ HTTP instead of HTTPS → Must use HTTPS for microphone access
- ❌ Invalid SSL certificate → Contact Spark support

---

## 💡 Best Practices

### Security
- ✅ Always use HTTPS (required for microphone access)
- ✅ Enable HSTS (HTTP Strict Transport Security)
- ✅ Keep DNS records simple and minimal
- ✅ Use Cloudflare or similar for DDoS protection

### Performance
- ✅ Enable CDN/proxy for faster global access
- ✅ Use DNS providers with global anycast networks
- ✅ Enable compression (Gzip/Brotli)
- ✅ Set appropriate cache headers

### Branding
- ✅ Choose a memorable, descriptive domain
- ✅ Keep it short and easy to type
- ✅ Avoid hyphens and numbers if possible
- ✅ Consider future expansion (don't be too specific)

### SEO
- ✅ Update all external links to use custom domain
- ✅ Set up 301 redirects from old URL (if possible)
- ✅ Add custom domain to Google Search Console
- ✅ Create a sitemap and robots.txt

---

## 📚 Resources

### Domain Registrars
- [Namecheap](https://www.namecheap.com/) - Affordable domains with privacy
- [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) - At-cost pricing
- [Google Domains](https://domains.google/) - Simple interface
- [Porkbun](https://porkbun.com/) - Great prices and features

### DNS Providers
- [Cloudflare](https://www.cloudflare.com/) - Free tier with CDN
- [Route 53](https://aws.amazon.com/route53/) - AWS DNS
- [Vercel DNS](https://vercel.com/docs/concepts/projects/custom-domains) - Great for web apps

### Testing Tools
- [whatsmydns.net](https://www.whatsmydns.net/) - Global DNS propagation
- [SSL Checker](https://www.sslshopper.com/ssl-checker.html) - Verify SSL setup
- [GTmetrix](https://gtmetrix.com/) - Performance testing
- [WebPageTest](https://www.webpagetest.org/) - Detailed performance analysis

### Documentation
- [GitHub Pages Custom Domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Cloudflare DNS Records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/)
- [MDN: DNS](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_domain_name)

---

## 🆘 Getting Help

### GitHub Spark Support
- Contact Spark support team for:
  - Custom domain configuration assistance
  - SSL certificate issues
  - IP addresses for A records
  - Advanced routing needs

### Community Resources
- GitHub Spark documentation
- GitHub Community discussions
- Stack Overflow (tagged: github-spark, custom-domain)

### Quick Questions
**Q: Does a custom domain cost extra?**
A: The custom domain itself costs money (typically $10-15/year for a `.com`), but Spark hosting and SSL certificates are included.

**Q: Can I change my custom domain later?**
A: Yes, just update your DNS records and Spark configuration.

**Q: Will the old Spark URL still work?**
A: Yes, both URLs will work simultaneously.

**Q: How long does setup take?**
A: DNS propagation: 1-2 hours. SSL provisioning: 5-10 minutes. Total: Usually under 3 hours.

**Q: Can I use a domain from any registrar?**
A: Yes, as long as you can configure DNS records.

---

<div align="center">

**Need help?** Open an issue or contact Spark support!

**Custom domain working?** Update your README and start sharing! 🎉

</div>
