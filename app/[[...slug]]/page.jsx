import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "../lib/storyblok";

export default async function Page({ params }) {
  const { slug } = await params;

  const fullSlug = slug ? slug.join("/") : "home";

  const storyblokApi = getStoryblokApi();

  const sbParams = {
    version: "published",
  };

  // Pass the slug in the body of the request so it can be used in the custom fetch function to set cache tags for Next.js' Data Cache.
  const { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, sbParams, {
    body: {
      slug: fullSlug,
    },
  });

  return <StoryblokStory story={data.story} />;
}
