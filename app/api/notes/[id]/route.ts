import { NextResponse } from "next/server";
import { getNote } from "@/lib/notes";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const note = await getNote(id);

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(note);
  } catch {
    return NextResponse.json({ error: "Failed to get note" }, { status: 500 });
  }
}
