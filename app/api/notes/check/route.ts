import { NextResponse } from "next/server";
import { getNote } from "@/lib/notes";
import { nanoid } from "nanoid";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(id) || id.length < 2 || id.length > 20) {
    return NextResponse.json({
      available: false,
      error: "Invalid format",
      suggestions: generateSuggestions(id.replace(/[^a-zA-Z0-9_-]/g, ""))
    });
  }

  const existing = await getNote(id);

  if (existing) {
    return NextResponse.json({
      available: false,
      suggestions: generateSuggestions(id)
    });
  }

  return NextResponse.json({ available: true });
}

function generateSuggestions(base: string): string[] {
  const clean = base.slice(0, 14);
  return [
    `${clean}${nanoid(3)}`,
    `${clean}${Math.floor(Math.random() * 99)}`,
    `${clean}_${nanoid(2)}`,
  ];
}
