This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Storyblok

This project has been configured to connect to [Storyblok](https://app.storyblok.com), and generate pages dynamically using a single page route at `app/[[...slug]]/page.jsx`.

Storyblok SDK config and component registration is handled in `app/lib/storyblok.js
.

### Content Caching

In lieu of using the Storyblok SDK methods for fetching content, we have opted to use `fetch()`, which is currently in `page.jsx` in our catch-all dynamic route. This could, of course, be moved into its own file. The Storyblok SDK is only being used for registering/rendering our components and for the Storyblok live preview functionality.

The `fetch()` call we use to request our content is configured to utilize [the Next.js Data Cache](https://nextjs.org/docs/app/guides/caching#data-cache) and tag requests for each separate piece of content individually. This way, cached individual Storyblok stories can be invalidated using a Storyblok webhook, instead of invalidating the entire cache at once.

The Storyblok webhook will send a request to the route handler at `api/revalidate`. Included in Storyblok webhook calls is the `full_slug` which is used to invalidate the appropriate cache tag for an individual requested story.

Using this method, we minimize calls to the Storyblok API while still maintaining the benefits of an SSR-first website. CMS users don't have to wait for a rebuild to see changes on the live site, and build times on the deployment service are minimized.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## TODO

1. Convert files to .ts
