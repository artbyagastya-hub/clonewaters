# 🐻 Clone Waters - Psychedelic Craft Beer

Clone Waters is a Direct-to-Consumer (DTC) static storefront and brand site for our psychedelic craft beer line based in Vietnam. The project features a fully responsive, visually rich design with immersive 3D WebGL can mockups that rotate and sparkle on a dark nebula canvas.

## Features

- **Interactive 3D Can Viewer:** Built with `Three.js` and `GLTFLoader`, showcasing dynamic models of our beer cans with a wandering bear mascot.
- **Age Gate:** Ensuring visitors are of legal drinking age before entering the main site.
- **Dynamic Product Filtering:** Easily sort through `Upcoming`, `Available` and `Past` releases.
- **Membership Platform:** "The Inner Circle" features a leveled loyalty program (Hopper, Dank Finder, Brew Master) with points, early access to drops, and an integrated user dashboard.
- **Shopping Cart & Checkout:** A multi-step, modal-based checkout flow supporting Cash on Delivery, Bank Transfer, and MoMo/ZaloPay.
- **Admin Dashboard:** A dedicated `admin.html` page to manage orders, add new products, launch presales, and view artwork delivery guides.

## Tech Stack

- **Frontend:** HTML5, CSS3 (Vanilla, CSS Variables), Vanilla JavaScript (`app.js`, `admin.js`)
- **3D Graphics:** [Three.js](https://threejs.org/) (r128)
- **Fonts:** Google Fonts (Bebas Neue, Permanent Marker, DM Sans, Instrument Serif)

## Project Structure

```
├── index.html        # Main DTC storefront & 3D canvas
├── admin.html        # Internal dashboard for orders and products
├── css/
│   ├── style.css     # Main website styles
│   └── admin.css     # Admin dashboard styles
├── js/
│   ├── app.js        # Main site logic (cart, 3D render, members)
│   └── admin.js      # Admin logic (charting, mock data)
├── img/              # Logos, favicons, UI icons
└── MANUAL.md         # Detailed operations manual for the site
```

## Running the Site Locally

Because this is a static site, you don't need any complex build tools to run it.

1. Clone the repository.
2. Serve the directory using any local web server. For example, using Python or npx:

```bash
# Using python 3
python -m http.server 8000

# Or using npx
npx serve .
```

3. Open `http://localhost:8000` in your browser.

## Documentation

For non-technical operations, please refer to the **[Clone Waters Operations Manual](./MANUAL.md)**. It covers:
- Maintaining website copy and social links.
- Adding new beer releases and managing stock in the Admin panel.
- Strict guidelines for preparing and uploading 3D can label artwork.
