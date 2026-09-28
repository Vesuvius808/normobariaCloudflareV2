# Normobaric Chamber Website

This is a [Next.js](https://nextjs.org) project configured to deploy on **Cloudflare Workers** using [OpenNext](https://opennext.js.org/).

## Local Development

First, run the development server. We recommend using `bun` or `pnpm`:

```bash
bun run dev
# or
pnpm run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Admin Panel (`/admin`)

All site content (text, images, blog posts) is stored in version-controlled JSON files:

- `data/site.json` — every text label, section heading, contact detail and image path (PL/EN/UK)
- `data/blog.json` — blog posts
- `public/uploads/` — images uploaded through the panel

The admin panel at **`/admin`** (login with the password from `ADMIN_PASSWORD` in `.env.local`)
lets you edit all of it without touching code:

- **Site content** tab — edit each section's text per language, reorder/add/remove list items
  (menu links, stats, benefit cards, metric cards), and upload images (e.g. hero background).
- **Blog** tab — create, edit, publish/unpublish and delete posts (title/excerpt/content in
  all three languages, cover image upload, automatic URL slug). When no posts are published,
  the blog section and its links disappear from the site completely.

### Workflow

1. Run the dev server locally (`npm run dev`) and edit content at http://localhost:3000/admin —
   changes are saved to the JSON files instantly and appear on the site.
2. Commit the changed `data/` + `public/uploads/` files.
3. Deploy with `npm run deploy`.

> Editing works in **local dev only** — the deployed Cloudflare site is read-only, so content
> changes reach production through the deploy pipeline above.

### Environment variables

Set in `.env.local` (not committed):

```
ADMIN_PASSWORD=...        # required in production; defaults to admin123 with a warning
ADMIN_SESSION_SECRET=...  # optional; signs the admin session cookie
```
