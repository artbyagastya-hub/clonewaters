# 🐻 Clone Waters - Brand Operations Manual

This document provides a comprehensive guide to maintaining the Clone Waters web presence, managing the social media links, uploading new product releases, and preparing print/digital label artwork for 3D cans and site listings.

---

## 1. Maintaining the Website

Clone Waters runs as a Direct-to-Consumer (DTC) static storefront. Maintenance requires only a basic text editor or IDE (such as VS Code).

### Updating Website Copy
Most of the user-facing text resides in the `index.html` file.
1. Open `clonewaters/index.html`.
2. To modify the Hero tags or "About" copy, locate the `<section class="hero" id="hero">` block.
3. Edit the text contained inside the `<p>` tags (e.g., `"Psychedelic hops. Bold flavors. Brewed in small batches."`).
4. Save the file. Changes are reflected instantly.

### Editing Assets
- **Images:** Any static logos, favicons, or UI icons are stored in the `/img/` directory. If you want to update the master logo, simply replace `logo.svg` in that directory.
- **Styling:** Colors, typography, and responsive layouts are defined in `/css/style.css` and `/css/admin.css`. Adjust the root CSS variables (`:root`) for quick theme adjustments.

---

## 2. Connecting Social Media

Social media connections are hardcoded into the site's footer to ensure performance and avoid unnecessary dependency loading.

### How to Update Social Links
1. Open `clonewaters/index.html` in your editor.
2. Scroll to the very bottom, locate the `<div class="footer-social">` block around **line 267**.
3. You will see anchor tags with placeholder URLs:
   ```html
   <a href="https://facebook.com/clonewaters" target="_blank">fb</a>
   <a href="https://instagram.com/clonewaters" target="_blank">ig</a>
   <a href="https://tiktok.com/@clonewaters" target="_blank">tk</a>
   <a href="https://zalo.me/yourzaloid" target="_blank">zl</a>
   ```
4. Replace the URLs inside the `href=""` attributes with the live profile links of the brand's respective accounts.
5. Save the file.

---

## 3. Adding New Products & Releases

Product releases, inventory tracking, and presale access configurations are managed through the internal Admin Dashboard.

### Creating a Product Listing
1. Navigate to `/admin.html` (the internal admin URL) in your browser.
2. Click the **Products (🍺)** tab on the sidebar.
3. Click the **+ New Product** button in the top right corner.
4. Fill out the **Product Modal**:
   - **Details:** Beer Name, Style, ABV%, IBU, and Can Volume (330ml).
   - **Commerce:** Set the consumer Price (in ₫K) and define the starting **Stock Level**.
   - **Automation:** Set the *"Sold Out When Below"* count (e.g., `20`) so the system auto-locks orders when low on stock.
   - **Release Date & Status:** Choose between `Upcoming`, `Available`, or `Past/Retired`.
5. Upload the **Can Label Artwork** (see section #4 below for dimensions).
6. Click **Save Product**.

### Launching a Presale Campaign
If the release is tier-gated to members:
1. Go to the **Presale (🚀)** tab.
2. Click **+ New Presale**. 
3. Link it to the newly created product.
4. Set the Access Mode to **Members Only** and select the Minimum Tier allowed to purchase (e.g., *Dank Finder+* or *Brew Master Only*).

---

## 4. Preparing & Adding Artwork

Adding artwork for the interactive 3D WebGL can mockups requires strict adherence to dimension and format guides.

### Artwork Upload Process
When creating a **New Product** via `/admin.html`:
1. Use the **Upload Zone** at the bottom of the modal.
2. Formats accepted: `.PNG` (transparent backgrounds) and `.SVG` vectors.
3. Maximum file size: `20MB`.

### 3D Model & Web Specification Checklist
The label must be designed to properly wrap onto the cylindrical Three.js 3D can canvas in `index.html`:
- **Web Label (Flat wrap):** Minimum `800 × 1200px`.
- **Can Mockup (3D render output):** `1200 × 1800px`.
- **Color Mode:** Use RGB for the web uploads (keep a CMYK variant offline for actual can printing).
- **Backgrounds:** Labels must maintain high contrast as they often rotate over a dark/psychedelic nebula canvas (`#08080c`).

### Character Assets (The Bear)
Clone Waters' psychedelic bear mascot and hops assets should be isolated on transparent backgrounds.
1. When providing layer exports to developers or printing press, ensure the Bear is separated from the background effects.
2. Include gradients (e.g., sunglasses lenses) as separate vector layers if possible, keeping resizing lossless.

### Typography
- The Clone Waters logo and specific Beer names (like "Teddy Hopper") should be expanded into vector paths before rendering out the `.PNG` layout, to avoid missing font issues on the web canvas.
- Maintain consistency for ABV%, style, and volume indicators.
