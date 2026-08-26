# kaiorosa1.github.io

Source for Kaio Rosa's personal portfolio, published at [kaiorosa1.github.io](https://kaiorosa1.github.io/).

## Stack

Static site — no build step, no framework:

* HTML
* CSS (custom properties for theming, light/dark via `prefers-color-scheme`)
* Vanilla JS (scroll-spy navigation, mobile menu, language toggle)

## Structure

* `index.html` — single-page portfolio (About, Experience, Education, Skills, Projects, Services, contact)
* `css/styles.css` — design tokens and component styles
* `js/scripts.js` — nav/menu behavior and the PT/EN language toggle
* `assets/` — images

## Internationalization

The home page is bilingual (Portuguese / English). Any element with two `data-i18n-lang`
(`pt`/`en`) siblings is shown or hidden based on a `data-lang` attribute set on `<html>`, toggled
by the language pill in the sidebar and persisted per-visitor in `localStorage`. Content outside
this repo (linked service pages) is Portuguese-only, flagged inline where relevant.

## Status

Visual design is a provisional direction, not a final brand identity — subject to a full visual
redesign pass in the future.
