# Alex Rivera Coaching — Fitness Consultation Website

A modern, mobile-first React + Tailwind site for a personal fitness coach:
Home (bio, achievements, testimonials) + a Consultation booking page.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

This outputs static files to `dist/` — you can deploy that folder to
Vercel, Netlify, GitHub Pages, or any static host.

## Customize

Everything you'll want to change first lives in `src/App.jsx`:

- **Name & bio**: search for "ALEX RIVERA" and update the nav, hero, and footer.
- **Colors**: edit the `C` object near the top of the file (all colors are
  defined once as hex values there).
- **Stats & achievements**: `Achievements()` component — 4 `StatCard`s.
- **Testimonials**: the `data` array inside `Testimonials()`.
- **Contact info**: search for the phone/email/Instagram placeholders in the
  `Footer` and `ConsultationPage` components.
- **Booking form behavior**: `ConsultationPage()` — currently the form
  validates and shows a success screen but doesn't send data anywhere yet.
  To actually receive bookings, wire the `handleSubmit` function up to:
  - An email service (e.g. Formspree, EmailJS), or
  - A backend endpoint / API route, or
  - A calendar tool like Calendly/Cal.com embedded instead of the custom form.

## Notes

- Built with React 18, Tailwind CSS 3, and lucide-react icons.
- No backend included — the consultation form is front-end only until you
  connect it to an email service or API.
- Fonts (Anton, Inter, Space Mono) load from Google Fonts via CSS `@import`.
