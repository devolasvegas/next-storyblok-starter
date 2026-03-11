# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Turbopack + HTTPS)
npm run build    # Production build (Turbopack)
npm run lint     # Run ESLint
```

There are no tests configured.

## Environment Variables

- `STORYBLOCK_PUBLIC_ACCESS_TOKEN` — required for fetching content from Storyblok

## Architecture

This is a Next.js 16 app using the App Router, React 19, Tailwind CSS v4, and the `@storyblok/react` SDK.

### Content flow

All pages are served from a single catch-all route at `app/[[...slug]]/page.jsx`. It fetches the matching Storyblok story directly via `fetch()` (not via the Storyblok SDK) using Next.js Data Cache with per-story cache tags in the format `storyblok:<full_slug>`. The root slug maps to `"home"`.

### Cache invalidation

Storyblok webhooks POST to `app/api/revalidate/route.ts` with a `full_slug` in the request body. The handler calls `revalidateTag("storyblok:<full_slug>", "max")` to invalidate only the affected story's cache entry, avoiding full-cache purges.

### Storyblok SDK usage

The SDK (`@storyblok/react`) is used only for:

1. **Component registration** — `app/lib/storyblok.js` calls `storyblokInit()` and maps Storyblok component names to React components
2. **Live preview** — `StoryblokStory` from `@storyblok/react/rsc` renders stories server-side; `StoryblokProvider` (a client component) initializes the SDK on the client for live preview in the Storyblok editor

`getStoryblokApi()` must be called before any story rendering — it's invoked in both `page.jsx` (server) and `StoryblokProvider.tsx` (client).

### Adding a new Storyblok component

1. Create a component in `app/components/storyblok/`
2. Export it from `app/components/storyblok/index.js`
3. Register it in `app/lib/storyblok.js` under `components`

### File types

The codebase is mixed `.jsx`/`.js`/`.tsx`/`.ts`. Converting all files to TypeScript is a known TODO.
