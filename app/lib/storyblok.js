import { apiPlugin, storyblokInit } from "@storyblok/react";

import { Feature, Grid, Page, Teaser } from "../components/storyblok";

const storyblokToken =
  process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN;

export const getStoryblokApi = storyblokInit({
  accessToken: storyblokToken,
  use: [apiPlugin],
  apiOptions: {
    // Creating custom fetch function to set work with the Next.js Data Cache
    // We want to limit requests to Storyblok so the cache is renewed only when new changes have been made to the content.
    fetch: async (urlOrRequest, init) => {
      const url = new URL(
        typeof urlOrRequest === "string" || urlOrRequest instanceof URL
          ? urlOrRequest
          : urlOrRequest.url,
      );

      // Slug should be passed in via the custom fetch function's init.body.
      const slug = init?.body ? init.body.slug : "";

      // Creating a cache tag for each Storyblok slug, so we can invalidate the cache for specific pages when they are updated in Storyblok.
      return fetch(url.toString(), {
        next: { tags: [`story:${slug}`] },
      });
    },
    region: "eu",
  },
  components: {
    feature: Feature,
    grid: Grid,
    page: Page,
    teaser: Teaser,
  },
});
