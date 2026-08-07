# Prince CDC Offset Press — Static Website

A fully converted static HTML/CSS/JavaScript website for Prince CDC Offset Press, a professional printing and digital service provider based in Kathmandu, Nepal.

## Project Structure

```
/
├── index.html          # Main landing page with all sections
├── css/
│   └── style.css       # Complete stylesheet (no Tailwind)
├── js/
│   ├── main.js         # Entry point: config, helpers, orchestration
│   ├── animations.js   # Loader, scroll reveal, hero FX, ripples, parallax, FAQ
│   ├── scroll.js       # Navbar, dark mode, mobile menu, progress bar, active nav
│   ├── cursor.js       # Custom desktop cursor
│   ├── counter.js      # Animated stat counters
│   └── slider.js       # Testimonial slider (autoplay, arrows, dots, swipe)
├── assets/             # Images and static assets
│   ├── hero-press.jpg
│   ├── work-bill-books.jpg
│   ├── work-certificates.jpg
│   ├── work-flex-banner.jpg
│   ├── work-marriage-cards.jpg
│   ├── work-office.jpg
│   ├── work-posters.jpg
│   ├── work-stamps.jpg
│   └── work-visiting-cards.jpg
├── pages/
│   ├── about.html      # About page
│   ├── contact.html    # Contact page
│   └── services.html   # Services page
├── README.md
└── .gitignore
```

## Features

- **Fully responsive** — mobile-first design with breakpoints at 640px, 768px, 1024px, and 1280px
- **Dark mode toggle** — persisted in localStorage
- **Scroll reveal animations** — IntersectionObserver-based
- **Animated counters** — stats section with count-up animation
- **Portfolio filtering** — filter by category (All, Printing, Design, Office)
- **Image lightbox** — click any portfolio image to preview
- **Testimonials slider** — auto-rotating with manual navigation
- **FAQ accordion** — expand/collapse questions
- **Contact form** — validates and opens WhatsApp with pre-filled message
- **Floating action buttons** — WhatsApp, Call, Back to Top
- **Smooth scrolling** — anchor link navigation
- **SEO optimized** — semantic HTML5, meta tags, Open Graph, structured data (JSON-LD)
- **Accessible** — ARIA labels, keyboard navigation, skip link, focus-visible outlines
- **No dependencies** — zero npm packages, no frameworks, no CDNs for CSS/JS

## How to Use

1. Open `index.html` in any modern browser
2. Or host on any static web server (GitHub Pages, Netlify, Cloudflare Pages, Apache, Nginx, cPanel)

No build step required. No dependencies to install.

## Technology Stack

- **HTML5** — semantic markup with proper heading hierarchy
- **CSS3** — custom properties, Flexbox, Grid, animations, responsive design
- **Vanilla JavaScript (ES6+)** — no frameworks, modular and readable
- **Font Awesome 6** — icon library via CDN
- **Google Fonts** — Poppins and Inter fonts

## Conversion Notes

This project was converted from a React + Tailwind CSS application. All React components have been transformed into reusable HTML sections. All Tailwind utility classes have been replaced with custom CSS classes organized into logical sections. All React Router navigation has been replaced with standard HTML anchor links.

## License

© 2026 Prince CDC Offset Press. All Rights Reserved.