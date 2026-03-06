import { revalidateTag } from "next/cache";

/*
 We are using this function to revalidate the next cache to strictly limit the number of requests to Storyblok. The cache will only be renewed when new changes have been made to the content in Storyblok, which is determined by the cache tag "storyblok-space" that we set in the custom fetch function in storyblok.js. This way we can ensure that the cache is only renewed when necessary, and not on every page request.
*/
export async function POST(request: Request) {
  const body = await request.json();
  // TODO: Test with pages in folders to ensure slug matches what was initially set with fetch.
  const fullSlug = body.full_slug; // Assuming the slug is passed in the request body as "full_slug"
  const cacheTag: string | null = fullSlug ? `storyblok:${fullSlug}` : null;

  console.log(`Received revalidation request for cacheTag: ${cacheTag}`);

  if (cacheTag) {
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
    console.warn("Missing valid cacheTag or slug in request body");
    return new Response("Missing valid cacheTag or slug in request body", {
      status: 400,
    });
  }
}
