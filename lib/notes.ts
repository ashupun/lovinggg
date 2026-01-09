import { Redis } from "@upstash/redis";
import { LoveNote } from "./store";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function saveNote(id: string, note: LoveNote, ttl?: number): Promise<void> {
  if (ttl) {
    await redis.set(`note:${id}`, JSON.stringify(note), { ex: ttl });
  } else {
    await redis.set(`note:${id}`, JSON.stringify(note), { ex: 86400 });
  }
}

export async function getNote(id: string): Promise<LoveNote | null> {
  const data = await redis.get(`note:${id}`);
  if (!data) return null;
  return typeof data === "string" ? JSON.parse(data) : (data as LoveNote);
}
