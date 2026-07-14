# Malik & Ahmed Law Chambers Website

A responsive one-page website for a Rawalpindi law practice. The visual system uses dark timber tones, burgundy, ivory stone and antique gold to create a formal courtroom atmosphere.

## Files

- `index.html`: website content, accessibility structure and search metadata
- `styles-mobile-v3.css`: full responsive design, motion and cache-proof mobile navigation fix
- `script.js`: mobile navigation, section highlighting, reveal effects and consultation form behavior
- `assets/asad-ullah-malik.webp`: optimized lawyer portrait
- `assets/favicon.svg`: scales-of-justice browser icon

## Open locally

Double-click `index.html`, or serve the folder with any static web server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Contact form

The consultation form works without a server. It validates the fields and opens the visitor's default email application with a prepared message to `asadullahmalik405@gmail.com`.

For direct online submission, connect the form to Formspree, Netlify Forms, a custom API or another form service before deployment.

## Before publishing

Confirm these supplied details with the lawyer:

- The public firm name, currently presented as **Malik & Ahmed Law Chambers**
- The title **Patron-in-Chief**
- The wording **Panel Advocate of PEMRA**, corrected from the supplied phrase "Penal Advocate"
- Whether **NCCI** is the intended agency acronym
- The exact Islamabad Bar Council and High Court Bar Association membership wording

## Deploy

This is a static website and can be uploaded to standard hosting, GitHub Pages, Netlify, Vercel or cPanel. Keep the folder structure unchanged so the stylesheet, script and portrait load correctly.
