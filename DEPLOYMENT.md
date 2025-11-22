# 🚀 Deployment Guide - GitHub Pages

Complete step-by-step guide to deploy your website on GitHub Pages.

## 📋 Prerequisites

- GitHub account
- Git installed on your computer
- Firebase project setup (see README.md)

## 🎯 Step-by-Step Deployment

### Step 1: Prepare Your Project

#### 1.1 Update Firebase Config
Make sure Firebase config is updated in:
- `index.html`
- `admin.js`
- `test-firebase.html`

#### 1.2 Update Contact Details
Replace with your information:
- Phone number
- Email address
- WhatsApp link
- Address

#### 1.3 Add Your Images
- Replace `pandiji.png` with your photo
- Replace `payment-qr.jpg` with your QR code

### Step 2: Create GitHub Repository

#### 2.1 Create New Repository
1. Go to [GitHub](https://github.com)
2. Click "+" → "New repository"
3. Repository name: `pandit-website` (or any name)
4. Description: "Astrology & Puja Services Website"
5. Select "Public"
6. Click "Create repository"

#### 2.2 Initialize Git (If not already done)
Open terminal/command prompt in your project folder:

```bash
git init
git add .
git commit -m "Initial commit"
```

#### 2.3 Connect to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/pandit-website.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

#### 3.1 Go to Repository Settings
1. Open your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" in left sidebar

#### 3.2 Configure GitHub Pages
1. **Source**: Select "Deploy from a branch"
2. **Branch**: Select `main`
3. **Folder**: Select `/ (root)`
4. Click "Save"

#### 3.3 Wait for Deployment
- GitHub will build your site (takes 1-2 minutes)
- Refresh the page
- You'll see: "Your site is live at https://YOUR_USERNAME.github.io/pandit-website/"

### Step 4: Test Your Website

#### 4.1 Visit Your Site
Open: `https://YOUR_USERNAME.github.io/pandit-website/`

#### 4.2 Test All Features
- ✅ Homepage loads correctly
- ✅ Navigation works
- ✅ Booking form works
- ✅ Contact form works
- ✅ Admin panel accessible
- ✅ Firebase connection works

#### 4.3 Test Firebase
1. Open: `https://YOUR_USERNAME.github.io/pandit-website/test-firebase.html`
2. Click "Test Connection"
3. Should show: "✅ SUCCESS! Connection working!"

### Step 5: Update README Links

Update README.md with your actual URLs:
```markdown
## 🚀 Live Demo

- **Main Website**: https://YOUR_USERNAME.github.io/pandit-website/
- **Admin Panel**: https://YOUR_USERNAME.github.io/pandit-website/admin.html
- **Test Firebase**: https://YOUR_USERNAME.github.io/pandit-website/test-firebase.html
```

Commit and push:
```bash
git add README.md
git commit -m "Update live demo links"
git push
```

## 🔄 Updating Your Website

### Make Changes Locally
1. Edit files in your project
2. Test locally by opening `index.html` in browser

### Push Changes to GitHub
```bash
git add .
git commit -m "Description of changes"
git push
```

### Wait for Deployment
- GitHub Pages will automatically rebuild (1-2 minutes)
- Refresh your live site to see changes

## 🌐 Custom Domain (Optional)

### Step 1: Buy Domain
Buy a domain from:
- GoDaddy
- Namecheap
- Google Domains

### Step 2: Configure DNS
Add these DNS records:

**A Records:**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME Record:**
```
www → YOUR_USERNAME.github.io
```

### Step 3: Add Custom Domain in GitHub
1. Go to Repository Settings → Pages
2. Under "Custom domain", enter: `yourdomain.com`
3. Click "Save"
4. Wait 24-48 hours for DNS propagation

## 🔒 HTTPS Setup

GitHub Pages automatically provides HTTPS for:
- `*.github.io` domains
- Custom domains (after DNS verification)

To enable:
1. Go to Settings → Pages
2. Check "Enforce HTTPS"

## 📊 Analytics (Optional)

### Google Analytics
1. Create account at [Google Analytics](https://analytics.google.com/)
2. Get tracking ID
3. Add to `index.html` (already has placeholder)

### Facebook Pixel
1. Create Facebook Business account
2. Get Pixel ID
3. Add tracking code to `index.html`

## 🐛 Common Issues

### Issue 1: 404 Error
**Problem**: Site shows 404 Not Found

**Solution**:
- Check branch is set to `main`
- Check folder is set to `/ (root)`
- Wait 2-3 minutes for deployment
- Clear browser cache

### Issue 2: Firebase Not Working
**Problem**: Bookings/contacts not saving

**Solution**:
- Verify Firebase config is correct
- Check Firestore rules allow write
- Test with `test-firebase.html`
- Check browser console for errors

### Issue 3: Images Not Loading
**Problem**: Images show broken

**Solution**:
- Check image files are in repository
- Verify file names match exactly (case-sensitive)
- Use relative paths: `./image.jpg` not `/image.jpg`

### Issue 4: CSS Not Loading
**Problem**: Website looks broken

**Solution**:
- Hard refresh: Ctrl + Shift + R
- Check `index.css` is in repository
- Verify path in HTML: `<link rel="stylesheet" href="index.css">`

## 📱 Mobile Testing

Test on mobile devices:
1. Open site on phone
2. Test all features
3. Check responsive design
4. Test booking form
5. Test payment QR code

## 🔐 Security Checklist

Before going live:
- ✅ Change admin credentials
- ✅ Update Firebase rules
- ✅ Remove test data
- ✅ Update contact information
- ✅ Test all forms
- ✅ Check HTTPS is enabled

## 📈 SEO Optimization

### Update Meta Tags
In `index.html`, update:
- Title
- Description
- Keywords
- Open Graph tags
- Twitter cards

### Submit to Search Engines
1. **Google Search Console**
   - Add property
   - Verify ownership
   - Submit sitemap

2. **Bing Webmaster Tools**
   - Add site
   - Verify
   - Submit sitemap

## 🎉 Launch Checklist

Before announcing your website:

- [ ] All Firebase config updated
- [ ] Contact details updated
- [ ] Images replaced
- [ ] Admin credentials changed
- [ ] All features tested
- [ ] Mobile responsive checked
- [ ] Forms working
- [ ] Payment integration tested
- [ ] Admin panel accessible
- [ ] README updated with live URLs
- [ ] Custom domain configured (if applicable)
- [ ] HTTPS enabled
- [ ] Analytics added (optional)

## 📞 Need Help?

If you face any issues:
1. Check browser console (F12) for errors
2. Review this guide again
3. Contact developer:
   - WhatsApp: +91 70702 79513
   - Email: m4740600@gmail.com

---

Good luck with your deployment! 🚀
