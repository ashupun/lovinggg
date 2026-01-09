import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { saveNote, getNote } from "@/lib/notes";
import { LoveNote, expirationOptions } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const note: LoveNote = {
      ...data,
      font: data.font || "classic",
      signoff: data.signoff || "",
    };

    if (!note.recipient || !note.message || !note.template) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let id = nanoid(6);

    if (data.customId) {
      const customId = data.customId.trim();
      if (!/^[a-zA-Z0-9_-]+$/.test(customId) || customId.length < 2 || customId.length > 20) {
        return NextResponse.json({ error: "Invalid link format" }, { status: 400 });
      }
      const existing = await getNote(customId);
      if (existing) {
        return NextResponse.json({ error: "Link already taken" }, { status: 409 });
      }
      id = customId;
    }

    const expOption = expirationOptions.find(e => e.id === data.expiration);
    const ttl = expOption?.seconds || 86400;

    await saveNote(id, note, ttl);

    return NextResponse.json({ id });
  } catch {
    return NextResponse.json({ error: "Failed to create note" }, { status: 500 });
  }
}
