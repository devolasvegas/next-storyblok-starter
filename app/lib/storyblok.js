import { apiPlugin, storyblokInit } from "@storyblok/react";

import { Feature, Grid, Page, Teaser } from "../components/storyblok";

const storyblokToken =
  process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN;

export const getStoryblokApi = storyblokInit({
  accessToken: storyblokToken,
  use: [apiPlugin],
  components: {
    feature: Feature,
    grid: Grid,
    page: Page,
    teaser: Teaser,
  },
});
