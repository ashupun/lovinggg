import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const keys = await redis.keys("note:*");
  const notes = await Promise.all(
    keys.map(async (key) => {
      const data = await redis.get(key);
      const id = key.replace("note:", "");
      return { id, url: `/note/${id}`, data };
    })
  );

  return NextResponse.json({ count: notes.length, notes });
}
