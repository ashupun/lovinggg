export interface Template {
  id: string;
  name: string;
  description: string;
  preview: {
    bg: string;
    accent: string;
    text: string;
  };
}

export const templates: Template[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, elegant, timeless",
    preview: {
      bg: "bg-white",
      accent: "text-gray-900",
      text: "text-gray-600",
    },
  },
  {
    id: "rose",
    name: "Rose Garden",
    description: "Soft pink, romantic warmth",
    preview: {
      bg: "bg-gradient-to-br from-rose-50 to-pink-100",
      accent: "text-rose-600",
      text: "text-rose-900",
    },
  },
  {
    id: "midnight",
    name: "Midnight",
    description: "Deep, mysterious, intimate",
    preview: {
      bg: "bg-gradient-to-br from-slate-900 to-slate-800",
      accent: "text-amber-300",
      text: "text-slate-200",
    },
  },
  {
    id: "lavender",
    name: "Lavender Dreams",
    description: "Gentle purple, dreamy vibes",
    preview: {
      bg: "bg-gradient-to-br from-violet-50 to-purple-100",
      accent: "text-violet-600",
      text: "text-violet-900",
    },
  },
  {
    id: "sunset",
    name: "Golden Hour",
    description: "Warm sunset, golden glow",
    preview: {
      bg: "bg-gradient-to-br from-amber-50 to-orange-100",
      accent: "text-orange-600",
      text: "text-amber-900",
    },
  },
  {
    id: "ocean",
    name: "Ocean Breeze",
    description: "Calm blue, peaceful serenity",
    preview: {
      bg: "bg-gradient-to-br from-sky-50 to-cyan-100",
      accent: "text-cyan-600",
      text: "text-sky-900",
    },
  },
  {
    id: "hellokitty",
    name: "Hello Kitty",
    description: "Sweet, pink, red bow",
    preview: {
      bg: "bg-gradient-to-br from-pink-100 to-red-50",
      accent: "text-red-500",
      text: "text-pink-700",
    },
  },
  {
    id: "cinnamoroll",
    name: "Cinnamoroll",
    description: "Fluffy clouds, baby blue",
    preview: {
      bg: "bg-gradient-to-br from-sky-100 to-blue-50",
      accent: "text-sky-500",
      text: "text-sky-700",
    },
  },
  {
    id: "pompompurin",
    name: "Pompompurin",
    description: "Golden puppy, warm yellow",
    preview: {
      bg: "bg-gradient-to-br from-yellow-100 to-amber-50",
      accent: "text-amber-600",
      text: "text-yellow-800",
    },
  },
  {
    id: "mysweetpiano",
    name: "My Sweet Piano",
    description: "Dreamy sheep, soft pink",
    preview: {
      bg: "bg-gradient-to-br from-pink-50 to-rose-100",
      accent: "text-pink-400",
      text: "text-pink-600",
    },
  },
  {
    id: "badtzmaru",
    name: "Badtz-Maru",
    description: "Cool penguin, black & yellow",
    preview: {
      bg: "bg-gradient-to-br from-gray-900 to-zinc-800",
      accent: "text-yellow-400",
      text: "text-gray-300",
    },
  },
  {
    id: "baku",
    name: "Baku",
    description: "Dream tapir, purple magic",
    preview: {
      bg: "bg-gradient-to-br from-indigo-100 to-purple-100",
      accent: "text-indigo-500",
      text: "text-purple-700",
    },
  },
  {
    id: "mymelody",
    name: "My Melody",
    description: "Soft pink hood, sweet vibes",
    preview: {
      bg: "bg-gradient-to-br from-pink-50 to-rose-100",
      accent: "text-pink-500",
      text: "text-pink-700",
    },
  },
  {
    id: "tuxedosam",
    name: "Tuxedo Sam",
    description: "Dapper penguin, classic blue",
    preview: {
      bg: "bg-gradient-to-br from-blue-100 to-slate-100",
      accent: "text-blue-600",
      text: "text-slate-700",
    },
  },
  {
    id: "kuromi",
    name: "Kuromi",
    description: "Edgy cute, purple & black",
    preview: {
      bg: "bg-gradient-to-br from-purple-900 to-black",
      accent: "text-pink-400",
      text: "text-purple-200",
    },
  },
  {
    id: "pochacco",
    name: "Pochacco",
    description: "Sporty pup, energetic vibes",
    preview: {
      bg: "bg-gradient-to-br from-emerald-50 to-teal-100",
      accent: "text-emerald-500",
      text: "text-teal-700",
    },
  },
];

export function getTemplateById(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}
