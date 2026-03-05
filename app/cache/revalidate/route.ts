import { revalidateTag } from "next/cache";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const cacheTag = url.searchParams.get("cacheTag");

  console.log(`Received revalidation request for cacheTag: ${cacheTag}`);

  if (cacheTag) {
    try {
      revalidateTag(cacheTag);

      console.log(
        `Successfully triggered revalidation for cacheTag: ${cacheTag}`,
      );

      return new Response("Revalidation triggered", { status: 200 });
    } catch (error) {
      console.error("Error triggering revalidation:", error);
      return new Response("Failed to trigger revalidation", { status: 500 });
    }
  } else {
    console.warn("Missing cacheTag parameter in revalidation request");
    return new Response("Missing cacheTag parameter", { status: 400 });
  }
}
