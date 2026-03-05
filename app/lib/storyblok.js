import { apiPlugin, storyblokInit } from "@storyblok/react";

import { Feature, Grid, Page, Teaser } from "../components/storyblok";
import { get } from "http";

const storyblokToken =
  process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN;

const storyblokSpaceCacheTag = "storyblok-space";

// Retrieve the current cache version
// async function getCv() {
//   return await storyblokClient
//     .get("cdn/spaces/me", { version: "published" })
//     .then((x) => x.data.space.version);
// }

export const getStoryblokApi = storyblokInit({
  accessToken: storyblokToken,
  use: [apiPlugin],
  apiOptions: {
    // Creating custom fetch function to set work with the Next.js Data Cache
    // We want to limit requests to Storyblok so the cache is renewed only when new changes have been made to the content.
    fetch: async (urlOrRequest, things) => {
      console.log("things", things);

      const url = new URL(
        typeof urlOrRequest === "string" || urlOrRequest instanceof URL
          ? urlOrRequest
          : urlOrRequest.url,
      );

      if (url.pathname === "/v2/cdn/spaces/me") {
        /**
         * Never put the cache version in the request url for the space,
         * as we use this request to get the up to date cache version.
         */
        url.searchParams.delete("cv");

        return fetch(url.toString(), {
          next: {
            tags: [storyblokSpaceCacheTag],
            revalidate: false,
          },
        });
      }

      // url.searchParams.set("cv", (await getCv()).toString());

      return fetch(url.toString(), {
        next: { revalidate: false },
      });
    },
    rateLimit: 100000,
    cache: { type: "none" },
    region: "eu",
  },
  components: {
    feature: Feature,
    grid: Grid,
    page: Page,
    teaser: Teaser,
  },
});
