import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "../lib/storyblok";

export default async function Page({ params }) {
  const { slug } = await params;

  const fullSlug = slug ? slug.join("/") : "home";

  const sbParams = {
    version: "published",
  };

  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, sbParams);

  return <StoryblokStory story={data.story} />;
}
