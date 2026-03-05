import { apiPlugin, storyblokInit } from "@storyblok/react";

import { Feature, Grid, Page, Teaser } from "../components/storyblok";

const storyblokToken =
  process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN;

console.log("Storyblok Token:", storyblokToken);

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: "eu",
  },
  components: {
    feature: Feature,
    grid: Grid,
    page: Page,
    teaser: Teaser,
  },
});
