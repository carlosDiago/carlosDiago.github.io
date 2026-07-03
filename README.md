# Juan Carlos Diago Guijarro - Interactive Railway Systems Portfolio

Static GitHub Pages user site for Juan Carlos Diago Guijarro.

The site is built with plain HTML, CSS and JavaScript. It has no build step, no framework, no npm dependencies, no analytics and no tracking scripts. The only external runtime dependency is Leaflet.js from CDN plus OpenStreetMap map tiles for the interactive assignment map.

## Current Features

- Controlled bilingual interface: English by default, Spanish available through the ES / EN switcher.
- Consistent identity usage for Juan Carlos Diago Guijarro, with Carlos Diago Guijarro only in compact navigation contexts.
- Railway-themed professional journey with station nodes, current-role highlight and focusable experience cards.
- Leaflet assignment map with non-confidential project summaries, technology/context and role details.
- Technical Notes & Blog placeholder prepared for a future Blogger integration.
- Personal Drive section covering endurance running and marathon preparation without external integrations.
- Responsive layout for desktop and mobile, including horizontal railway line on desktop and vertical railway line on mobile.

## Files

- `index.html` - semantic page structure and English fallback content.
- `styles.css` - responsive visual system, railway-line journey, layout and Leaflet popup styling.
- `script.js` - bilingual dictionary, mobile navigation, section highlighting, reveal effects, interactive map markers and journey station focus.
- `assets/cv/Carlos_Diago_CV.pdf` - harmless placeholder retained in the assets folder; it is not linked from the visible UI.
- `assets/img/` - optional folder for future image assets.

## Local Use

Open `index.html` directly in a browser. No local server is required.

The map requires an internet connection because Leaflet and OpenStreetMap tiles are loaded from external CDNs.

## Placeholders

- Blog: the section is intentionally not connected to Blogger until a valid public Blogger URL is configured.
- Running / endurance: no Strava or external sports service is connected.

## GitHub Pages Deployment

This is a GitHub Pages user site. To deploy:

1. Keep `index.html`, `styles.css`, `script.js` and `assets/` at the repository root.
2. Commit the files to the `main` branch.
3. In GitHub, open repository settings.
4. Under Pages, set the source to **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`.
6. The site will be served at `https://carlosdiago.github.io/`.

## Content Guidelines

Keep public content professional and non-confidential. Do not add internal incident details, proprietary logs, contract amounts, customer-private records or internal Siemens/Renfe operational data.
