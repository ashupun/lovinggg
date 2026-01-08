export interface LoveNote {
  recipient: string;
  sender: string;
  message: string;
  template: string;
  signoff: string;
  font: string;
}

export const fontOptions = [
  { id: "classic", name: "Classic", class: "font-sans" },
  { id: "elegant", name: "Elegant", class: "font-[family-name:var(--font-playfair)]" },
  { id: "romantic", name: "Romantic", class: "font-[family-name:var(--font-romantic)]" },
];

export const signoffOptions = [
  "With love",
  "Forever yours",
  "xoxo",
  "Always",
  "Yours truly",
  "Love always",
  "Thinking of you",
  "Hugs & kisses",
  "All my love",
  "Sweetly",
];

export function encodeNote(note: LoveNote): string {
  const json = JSON.stringify(note);
  const utf8Bytes = new TextEncoder().encode(json);
  const base64 = btoa(String.fromCharCode(...utf8Bytes));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeNote(encoded: string): LoveNote | null {
  try {
    let base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) base64 += "=";
    const binaryStr = atob(base64);
    const bytes = Uint8Array.from(binaryStr, (c) => c.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json);
  } catch {
    return null;
  }
}
