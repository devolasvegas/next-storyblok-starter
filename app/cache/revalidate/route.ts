import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const cacheTag: string | null = url.searchParams.get("cacheTag");

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
