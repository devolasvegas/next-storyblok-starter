import { revalidateTag } from "next/cache";

/*
 We are using this function to revalidate the next cache to strictly limit the number of requests to Storyblok. The cache will only be renewed when new changes have been made to the content in Storyblok, which is determined by the cache tag "storyblok-space" that we set in the custom fetch function in storyblok.js. This way we can ensure that the cache is only renewed when necessary, and not on every page request.
*/
export async function POST(request: Request) {
  const url = new URL(request.url);
  const cacheTag: string | null = url.searchParams.get("cacheTag");

  // Making this more complex than needed right now just in case we want to be able to have multiple cache tags down the road.
  const validCacheTags = ["storyblok-space"];
  const isValidCacheTag = validCacheTags.includes(cacheTag || "");

  console.log(`Received revalidation request for cacheTag: ${cacheTag}`);

  if (cacheTag && isValidCacheTag) {
    try {
      revalidateTag(cacheTag, "max");

      console.log(
        `Successfully triggered revalidation for cacheTag: ${cacheTag}`,
      );

      return new Response("Revalidation triggered", { status: 200 });
    } catch (error) {
      console.error("Error triggering revalidation:", error);
      return new Response("Failed to trigger revalidation", { status: 500 });
    }
  } else {
    console.warn("Missing valid cacheTag parameter in revalidation request");
    return new Response("Missing valid cacheTag parameter", { status: 400 });
  }
}
