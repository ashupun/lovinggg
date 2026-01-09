import { Redis } from "@upstash/redis";
import { LoveNote } from "./store";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function saveNote(id: string, note: LoveNote): Promise<void> {
  await redis.set(`note:${id}`, JSON.stringify(note));
}

export async function getNote(id: string): Promise<LoveNote | null> {
  const data = await redis.get(`note:${id}`);
  if (!data) return null;
  return typeof data === "string" ? JSON.parse(data) : (data as LoveNote);
}
