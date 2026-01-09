import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { saveNote } from "@/lib/notes";
import { LoveNote } from "@/lib/store";

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

    const id = nanoid(6);
    await saveNote(id, note);

    return NextResponse.json({ id });
  } catch {
    return NextResponse.json({ error: "Failed to create note" }, { status: 500 });
  }
}
