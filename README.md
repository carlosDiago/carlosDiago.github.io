# Carlos Diago Guijarro - Interactive CV

Static GitHub Pages user site for Carlos Diago Guijarro.

The site is built with plain HTML, CSS and JavaScript. It has no build step, no framework, no npm dependencies, no analytics and no tracking scripts. The only external runtime dependency is Leaflet.js from CDN plus OpenStreetMap map tiles for the interactive assignment map.

## Files

- `index.html` - semantic page structure and CV content.
- `styles.css` - responsive visual system, layout and Leaflet popup styling.
- `script.js` - mobile navigation, section highlighting, reveal effects and interactive map markers.
- `assets/cv/Carlos_Diago_CV.pdf` - harmless placeholder retained in the assets folder; it is not linked from the visible UI.
- `assets/img/` - optional folder for future image assets.

## Local Use

Open `index.html` directly in a browser. No local server is required.

The map requires an internet connection because Leaflet and OpenStreetMap tiles are loaded from external CDNs.

## GitHub Pages Deployment

This is a GitHub Pages user site. To deploy:

1. Keep `index.html`, `styles.css`, `script.js` and `assets/` at the repository root.
2. Commit the files to the `main` branch.
3. In GitHub, open repository settings.
4. Under Pages, publish from `main` branch and `/root`.
5. The site will be served at `https://carlosdiago.github.io/`.

## Content Guidelines

Keep public content professional and non-confidential. Do not add internal incident details, proprietary logs, contract amounts, customer-private records or internal Siemens/Renfe operational data.
