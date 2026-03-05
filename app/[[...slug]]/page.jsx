import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "../lib/storyblok";

export default async function Page({ params }) {
  const { slug } = await params;

  const fullSlug = slug ? slug.join("/") : "home";

  const storyblokApi = getStoryblokApi();
  const sbCacheVersion = await storyblokApi.cacheVersion();

  console.log("Cache version:", sbCacheVersion);

  const sbParams = {
    version: "published",
  };

  const { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, sbParams);

  return <StoryblokStory story={data.story} />;
}
