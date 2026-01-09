import LZString from "lz-string";

export interface LoveNote {
  recipient: string;
  sender: string;
  message: string;
  template: string;
  signoff: string;
  font: string;
}

export const fontOptions = [
  { id: "classic", name: "Classic", class: "font-sans", scale: 1 },
  { id: "elegant", name: "Elegant", class: "font-[family-name:var(--font-playfair)]", scale: 1 },
  { id: "romantic", name: "Romantic", class: "font-[family-name:var(--font-romantic)]", scale: 1 },
  { id: "handwriting", name: "Handwriting", class: "font-[family-name:var(--font-handwriting)]", scale: 1.25 },
];

export const expirationOptions = [
  { id: "1d", name: "1 day", seconds: 86400 },
  { id: "3d", name: "3 days", seconds: 259200 },
  { id: "7d", name: "1 week", seconds: 604800 },
];


interface CompactNote {
  r: string;
  s: string;
  m: string;
  t: string;
  o: string;
  f: string;
}

export function encodeNote(note: LoveNote): string {
  const compact: CompactNote = {
    r: note.recipient,
    s: note.sender,
    m: note.message,
    t: note.template,
    o: note.signoff,
    f: note.font,
  };
  const json = JSON.stringify(compact);
  return LZString.compressToEncodedURIComponent(json);
}

export function decodeNote(encoded: string): LoveNote | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    const compact: CompactNote = JSON.parse(json);
    return {
      recipient: compact.r,
      sender: compact.s,
      message: compact.m,
      template: compact.t,
      signoff: compact.o,
      font: compact.f,
    };
  } catch {
    return null;
  }
}
