# Ember & Salt

A React single-page app for a wood-fire coastal restaurant, built with Vite and React Router.

## Screens

- **Home** (`/`) — hero, category shortcuts, featured dishes, promo banner, features, and a review quote.
- **Menu** (`/menu`) — full dish list with live category filtering and text search.
- **Gallery** (`/gallery`) — photo grid with a click-to-enlarge lightbox.
- **Story** (`/about`) — restaurant background and stats.
- **Reserve** (`/reserve`) — a validated reservation form (name, contact, date/time, party size) that confirms the booking and keeps a short local history of reservations.

## Functionality

- Client-side routing between screens with animated page transitions.
- Menu filtering by category (synced to the URL) and by search text.
- Reservation form with field validation, a confirmation message, and reservations persisted to `localStorage` (with the ability to cancel).
- Light/dark/auto theme toggle, persisted to `localStorage`.
- Scroll-triggered reveal animations.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```
