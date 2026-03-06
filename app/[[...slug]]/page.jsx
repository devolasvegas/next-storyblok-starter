import { notFound } from "next/navigation";
import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "../lib/storyblok";

getStoryblokApi();

async function getStory(slug) {
  const res = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/${slug}?token=${process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN}&version=published`,
    {
      cache: "force-cache",
      next: {
        tags: ["storyblok", `storyblok:${slug}`],
      },
    },
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data.story;
}

export default async function Page({ params }) {
  const { slug } = await params;
  const fullSlug = slug ? slug.join("/") : "home";
  const story = await getStory(fullSlug);

  if (!story) {
    notFound();
  }

  return <StoryblokStory story={story} />;
}
