# Jinil Krishna — Portfolio Go-Live & Customization Guide

This document contains the exact files, line numbers, and steps to update your portfolio with your real data and publish it live.

---

## Quick Navigation
1. [Connecting Your Unlisted YouTube Playlist](#1-connecting-your-unlisted-youtube-playlist)
2. [Updating Contact & Social Media Links](#2-updating-contact--social-media-links)
3. [Personalizing Bio, Philosophy & Equipment](#3-personalizing-bio-philosophy--equipment)
4. [SEO & Title Updates](#4-seo--title-updates)
5. [Publishing Live to GitHub & Vercel](#5-publishing-live-to-github--vercel)

---

## 1. Connecting Your Unlisted YouTube Playlist

Whenever you upload an unlisted wedding film to your YouTube playlist, it will automatically appear on your website.

* **File to edit**: [`script.js`](file:///d:/Personal/Jinil-protfolio/script.js)
* **Lines**: `15 – 18`

```javascript
const SYNC_CONFIG = {
  youtubeChannelId: '',   
  youtubePlaylistId: 'PASTE_YOUR_PLAYLIST_ID_HERE',  // <-- Paste your PL... ID here
};
```

### How to get your Playlist ID:
1. Open your unlisted playlist on YouTube in a web browser.
2. Look at the URL in the address bar:
   `https://www.youtube.com/playlist?list=PLab123cd456ef...`
3. Copy the letters after `list=` (starting with `PL...`).
4. Paste it between the single quotes on line 17 of `script.js`.

---

## 2. Updating Contact & Social Media Links

All contact chips, email addresses, and phone links are located in [`index.html`](file:///d:/Personal/Jinil-protfolio/index.html).

### A. Top Navigation WhatsApp Button
* **File**: `index.html`
* **Line**: `39`
```html
<!-- Update with your actual WhatsApp phone number -->
<a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" class="header-btn" title="Chat on WhatsApp">
  <i class="fab fa-whatsapp"></i> WhatsApp
</a>
```

### B. Profile Contact Chips (Under Bio)
* **File**: `index.html`
* **Lines**: `91 – 103`

```html
<!-- 1. Email (Line 91-93) -->
<a href="mailto:your_email@gmail.com" class="social-chip" title="Email Jinil">
  <i class="fas fa-envelope"></i> your_email@gmail.com
</a>

<!-- 2. Instagram (Line 94-96) -->
<a href="https://instagram.com/YOUR_INSTAGRAM_HANDLE" target="_blank" rel="noopener noreferrer" class="social-chip" title="Instagram">
  <i class="fab fa-instagram"></i> @YOUR_INSTAGRAM_HANDLE
</a>

<!-- 3. Phone & WhatsApp Direct Chat -->
<a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" class="social-chip" title="Phone / WhatsApp">
  <i class="fab fa-whatsapp"></i> WhatsApp Me
</a>
```
*(Tip for WhatsApp: Replace `91XXXXXXXXXX` with your country code + phone number without any spaces or plus signs, e.g. `919876543210`).*

### C. Footer Links
* **File**: `index.html`
```html
<div class="footer-contact">
  <a href="mailto:your_email@gmail.com" class="footer-email">your_email@gmail.com</a>
  <div class="footer-icons">
    <a href="https://instagram.com/YOUR_HANDLE" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
  </div>
</div>
```

---

## 3. Personalizing Bio, Philosophy & Equipment

* **File**: [`index.html`](file:///d:/Personal/Jinil-protfolio/index.html)

### A. Tagline & Short Bio
* **Lines**: `56 – 62`
```html
<p class="profile-tagline">Preserving authentic emotion, unspoken glances, and wild joy in timeless motion picture.</p>

<div class="profile-bio">
  <p>
    Based in Kerala, India and available for destination celebrations worldwide. Over the past 7+ years, I’ve documented over 100 couples committing their lives to one another. My approach is unobtrusive, documentary-driven, and centered on honest feelings rather than staged poses.
  </p>
</div>
```
*(Customize with your actual background, years of filmmaking, and storytelling philosophy).*

### B. Equipment & Craft Specifications
* **Lines**: `65 – 80`
```html
<div class="details-list">
  <div class="detail-item">
    <i class="fas fa-video detail-icon"></i>
    <div>
      <strong>Style & Craft</strong>
      <span>Cinema 4K 10-Bit • Handcrafted Color Tone</span>
    </div>
  </div>
  <div class="detail-item">
    <i class="fas fa-location-dot detail-icon"></i>
    <div>
      <strong>Location & Travel</strong>
      <span>India & Worldwide (Passport Ready)</span>
    </div>
  </div>
</div>
```

---

## 4. SEO & Title Updates

* **File**: [`index.html`](file:///d:/Personal/Jinil-protfolio/index.html)
* **Lines**: `6 – 7`
```html
<title>Jinil Krishna | Freelance Filmmaker</title>
<meta name="description" content="Jinil Krishna is a freelance filmmaker and wedding videographer crafting intimate, cinematic, and timeless wedding films.">
```

---

## 5. Publishing Live to GitHub & Vercel

Once you finish editing your data:

### Step 1: Push Changes to GitHub
Open your terminal inside `d:\Personal\Jinil-protfolio` and run:
```bash
git add .
git commit -m "Update portfolio with real contact and YouTube playlist data"
git push
```

### Step 2: Automatic Vercel Deployment
* Vercel will automatically detect your git push and re-deploy your site within **15 seconds**!
* Open your Vercel live URL (e.g. `https://jinil-protfolio.vercel.app`) to see your live portfolio with all your real films and contact details.

### Step 3: Add Custom Domain (Optional)
1. Go to your **Vercel Dashboard** → click your **jinil-portfolio** project.
2. Go to **Settings** → **Domains**.
3. Add your custom domain (e.g. `jinilkrishna.com`).
4. Follow the DNS instructions provided by Vercel on your domain provider (GoDaddy, Namecheap, etc.).
