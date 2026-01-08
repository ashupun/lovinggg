import { nanoid } from "nanoid";

export interface LoveNote {
  id: string;
  recipient: string;
  sender: string;
  message: string;
  template: string;
  createdAt: number;
}

const STORAGE_KEY = "loving_notes";

export function saveNote(note: Omit<LoveNote, "id" | "createdAt">): string {
  const id = nanoid(10);
  const notes = getNotes();
  const newNote: LoveNote = {
    ...note,
    id,
    createdAt: Date.now(),
  };
  notes[id] = newNote;
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }
  return id;
}

export function getNote(id: string): LoveNote | null {
  const notes = getNotes();
  return notes[id] || null;
}

function getNotes(): Record<string, LoveNote> {
  if (typeof window === "undefined") return {};
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}
