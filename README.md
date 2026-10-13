# Tamizha CCTV Sales and Service – one-page website

Static, single-page website for **Tamizha CCTV Sales and Service**, Tenkasi, Tamil Nadu.
Plain HTML5, CSS3 and vanilla JavaScript – no frameworks, no build step, no third-party requests.

- Phone / WhatsApp: **+91 93449 91530**
- Telephone link: `tel:+919344991530`
- WhatsApp link: `https://wa.me/919344991530`
- Production domain (to be verified): `https://tamizhacctv.in/`

---

## 1. Files

```
/
├── index.html                  The full one-page site (13 sections)
├── 404.html                    Not-found page (noindex)
├── robots.txt
├── sitemap.xml
├── favicon.ico                 16/32/48 px fallback icon
├── README.md
└── assets/
    ├── css/styles.css          All styles; brand colours are tokens at the top
    ├── js/main.js              Mobile menu, scroll effects, click tracking hooks
    ├── fonts/                  Self-hosted Manrope + Inter (variable, Latin) + OFL licences
    └── images/
        ├── tamizha-cctv-logo.png      PLACEHOLDER wordmark – replace with the real logo
        ├── favicon.svg
        ├── apple-touch-icon.png
        ├── og-image.jpg               1200×630 social sharing image
        ├── hero-cctv.svg              Generic illustration (replaceable)
        └── solution-*.svg             Generic illustrations for the 4 solution cards
```

**About the images.** No logo file was supplied with the brief, so `tamizha-cctv-logo.png` is a
temporary wordmark made for this build. The hero and solution images are original, generic
illustrations created for this site (not stock photos and not photos of real installations).
The footer states that illustrations do not depict actual installations.

---

## 2. Owner confirmations before launch

These items were deliberately left out or kept general because they were not confirmed:

- [ ] **Logo** – supply the real logo and replace the placeholder (section 5).
- [ ] **Domain** – confirm `tamizhacctv.in` is registered, pointed at the host and serving HTTPS.
- [ ] **Nearby towns** – confirm which towns are actually served. A ready-made list
      (Shenkottai/Sengottai, Kadayanallur, Surandai, Pavoorchatram, Courtallam) is commented out
      in the Service Areas section of `index.html`. Publish only the confirmed ones (section 7).
- [ ] **Business hours** – not shown anywhere. If you add them later, also add
      `openingHoursSpecification` to the JSON-LD.
- [ ] **Brands** – no brand names or dealership claims are made. Add only authorised ones.
- [ ] **AMC** – the AMC card says "where offered". Edit if AMC is a standard offering.
- [ ] **Photos and reviews** – add genuine installation photos and real reviews only when available.
- [ ] **Analytics** – supply a GA4 Measurement ID if you want tracking (section 11).

---

## 3. Preview locally

The site needs no build step. From the project folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Alternatives: VS Code "Live Server", or `npx serve .`.
Opening `index.html` directly from disk also works; `404.html` uses root-relative paths
(`/assets/...`) so it only displays correctly when served from the site root.

---

## 4. Edit business information

All content is in `index.html`. Search for these to update them consistently:

| What | Where it appears |
|---|---|
| `+91 93449 91530` (display) | Hero, steps, FAQs, contact, footer, mobile menu |
| `tel:+919344991530` | Every call button |
| `wa.me/919344991530` | Every WhatsApp button |
| `+91-93449-91530` | JSON-LD (`telephone`) in the `<head>` |
| Title / meta description | `<title>`, `<meta name="description">`, Open Graph tags |

**WhatsApp prefilled messages** must be URL-encoded. To encode a new message, open any browser
console and run:

```js
encodeURIComponent("Hello Tamizha CCTV, I need CCTV camera installation in Tenkasi. Please help me with a quotation.")
```

Paste the result after `https://wa.me/919344991530?text=`.

**FAQs** appear twice: in the visible FAQ section and in the `FAQPage` JSON-LD in the `<head>`.
If you change an answer, change both so they match. (Google currently shows FAQ rich results
only for a small set of authoritative sites, so the markup is unlikely to produce a rich result;
it is kept because it is valid and describes the visible content.)

**Colours** are CSS variables at the top of `assets/css/styles.css`.

---

## 5. Replace the logo

1. Export the real logo as a PNG (transparent background, about 3× display size, e.g. ~600 px wide)
   or as an SVG.
2. Save it as `assets/images/tamizha-cctv-logo.png` (overwrite the placeholder).
   If you use a different name or SVG, search-and-replace `tamizha-cctv-logo.png` in
   `index.html`, `404.html` and the JSON-LD `logo` URL.
3. Update the `width` and `height` attributes on the logo `<img>` tags to the new file's
   pixel ratio (e.g. a 600×150 logo → `width="176" height="44"`). CSS fixes the display height
   (40 px mobile, 44 px desktop) and keeps the proportions, so the logo is never stretched.
4. The footer shows the logo on a white rounded panel, so a dark logo stays readable on navy.
5. Optional: regenerate `favicon.svg`, `favicon.ico` and `apple-touch-icon.png` from the logo mark.

---

## 6. Replace illustrations with photos

Use only photos you own or have licensed. Do not present stock photos as Tamizha CCTV's own work.

| File | Used for | Suggested size |
|---|---|---|
| `hero-cctv.svg` | Hero image (loads first) | 1200×1040 (≈ 600:520) |
| `solution-home.svg` etc. | Solution cards (lazy-loaded) | 960×540 (16:9) |
| `og-image.jpg` | Social sharing preview | 1200×630 |

Steps: save as optimised WebP or JPG (aim for under ~150 KB each), update the `src`, `width`,
`height` and `alt` attributes, and keep `loading="lazy"` on everything except the hero image.
Once you have real installation photos, update the alt text to say what and where they show.

---

## 7. Publishing confirmed nearby towns

In `index.html`, find `OWNER CONFIRMATION NEEDED` in the Service Areas section. Replace the
comment with the `<h3>` and `<ul class="town-list">` it contains (styles already exist), keeping
only confirmed towns. Then:

- Update FAQ 9 ("Which nearby locations do you serve?") in **both** the HTML and the JSON-LD.
- Add each confirmed town to the JSON-LD `areaServed` as an array, for example:
  `"areaServed": [{"@type":"City","name":"Tenkasi"},{"@type":"City","name":"Kadayanallur"}]`
- Keep it to one Service Areas section. Do not create separate town pages with copied text.

---

## 8. Deploy to static hosting

Upload the whole folder (keep the structure). Any static host works:

- **Netlify / Cloudflare Pages:** drag-and-drop the folder or connect a Git repo. No build
  command; publish directory is the project root. Both serve `404.html` automatically.
- **GitHub Pages:** push to a repo, enable Pages from the root of the main branch, add the
  custom domain. `404.html` is used automatically.
- **cPanel / shared hosting:** upload to `public_html/`. Add the `.htaccess` below so the
  404 page and redirects work.

---

## 9. Canonical domain and HTTPS

The canonical URL is `https://tamizhacctv.in/` (no `www`). It is set in the canonical tag,
Open Graph URL, JSON-LD, `robots.txt` and `sitemap.xml`. If you choose `www` instead, change
it in all five places.

1. Point DNS at your host (A/AAAA records for the apex, CNAME for `www`, as the host instructs).
2. Turn on HTTPS (free certificates are standard on Netlify, Cloudflare, GitHub Pages and
   most cPanel hosts via AutoSSL / Let's Encrypt).
3. Redirect `http://` and `www` to `https://tamizhacctv.in/` with a 301.

Apache / cPanel `.htaccess`:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} ^www\. [NC]
RewriteRule ^ https://tamizhacctv.in%{REQUEST_URI} [L,R=301]
ErrorDocument 404 /404.html
```

Netlify `_redirects` (create in the project root):

```
https://www.tamizhacctv.in/*  https://tamizhacctv.in/:splat  301!
```

Check afterwards: `http://tamizhacctv.in`, `http://www.tamizhacctv.in` and
`https://www.tamizhacctv.in` should all end at `https://tamizhacctv.in/`.

---

## 10. Google Search Console

1. Add a **Domain property** for `tamizhacctv.in` and verify with the DNS TXT record (covers
   http/https and www). Or use a URL-prefix property and the HTML tag: paste it where
   `google-site-verification` is commented out in `index.html`.
2. Submit `https://tamizhacctv.in/sitemap.xml` under *Sitemaps*.
3. Use *URL Inspection* on the homepage and request indexing.
4. Run the homepage through Google's Rich Results Test and the Schema Markup Validator.
   Valid structured data does not guarantee any enhanced search appearance.

---

## 11. Google Analytics 4 and click tracking

`assets/js/main.js` already sends these events **once a GA4 or Google Tag Manager tag is
installed** – until then nothing is sent anywhere:

| Event | Fires when | Parameters |
|---|---|---|
| `phone_click` | any `tel:` link is clicked | `link_location` (header, home, contact, footer, mobile_bar…) |
| `whatsapp_click` | any `wa.me` link is clicked | `link_location`, `service` (on service cards) |
| `cta_click` | a main button with `data-cta` is clicked | `cta_name`, `link_location` |

To switch on GA4:

1. Create a GA4 property and web data stream for `https://tamizhacctv.in`; copy the
   Measurement ID (`G-…`).
2. In `index.html`, uncomment the Google Analytics block in the `<head>` and replace both
   `G-XXXXXXXXXX` placeholders with your ID.
3. Publish, then click a call and a WhatsApp button and confirm the events appear in GA4
   *Realtime* or *DebugView*.
4. In GA4 *Admin → Events*, mark `phone_click` and `whatsapp_click` as **key events**.
5. To use the events in Google Ads, import the GA4 key events into Google Ads as conversions.

Privacy: if you enable analytics, publish a short privacy notice explaining what is collected,
add a link to it in the footer, and check current Indian data protection requirements
(Digital Personal Data Protection Act). Do not add a privacy-policy link until the page exists.

---

## 12. Google Business Profile checklist

- [ ] Create or claim the profile for **Tamizha CCTV Sales and Service** (verify by the method Google offers).
- [ ] Primary category: choose the closest available match for CCTV/security system sales and
      installation (search the category list – e.g. a "security system supplier" or
      "security system installer" style category). Category names change, so pick from what Google shows.
- [ ] Additional categories: add only services you genuinely provide (e.g. installation, repair).
- [ ] Phone: `+91 93449 91530`. Website: `https://tamizhacctv.in/`.
- [ ] Set it up as a **service-area business**: add Tenkasi and only the towns you actually serve.
- [ ] **Hide the address** if customers are not served at your premises (no walk-in showroom),
      as Google requires for service-area businesses.
- [ ] Do not set opening hours you can't keep; add them only once confirmed.
- [ ] Add genuine photos of your work, vehicle, team or equipment when available – no stock photos.
- [ ] Ask real customers for reviews after completed jobs. No incentives, no review swaps,
      no reviews written by staff or family.
- [ ] Keep name, phone and website identical across the site, GBP, JustDial, IndiaMART,
      Facebook, etc.
- [ ] Do not create separate listings for nearby towns where you have no staffed location.

---

## 13. Pre-launch checklist

- [ ] Real logo in place; `width`/`height` updated.
- [ ] Domain live on HTTPS; http and www redirect to the canonical URL.
- [ ] Every call button dials **+91 93449 91530** on a real phone.
- [ ] Every WhatsApp button opens a chat with **+91 93449 91530** and the right prefilled message.
- [ ] Search every file for the previous business phone number – it must not appear anywhere.
- [ ] Nearby towns published only if confirmed.
- [ ] Search Console verified and sitemap submitted.
- [ ] GA4 events visible in Realtime (if analytics is enabled).

---

## Credits and licences

- **Manrope** and **Inter** fonts: SIL Open Font License 1.1 (licence files in `assets/fonts/`).
- Illustrations and the placeholder wordmark were created for this project.
- Line icons: drawn for this project, with some paths (phone, wrench, Wi-Fi, server, hard drive)
  adapted from Feather Icons (MIT licence).
- WhatsApp glyph (from Simple Icons, CC0): used only to label links to WhatsApp chats.
