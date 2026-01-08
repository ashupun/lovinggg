"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { saveNote } from "@/lib/store";
import { templates, getTemplateById, Template } from "@/lib/templates";

const BowIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 64 32" fill="currentColor" className={className}>
    <ellipse cx="16" cy="16" rx="14" ry="12" />
    <ellipse cx="48" cy="16" rx="14" ry="12" />
    <circle cx="32" cy="16" r="6" />
  </svg>
);

const HeartIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const StarIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const SkullIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="currentColor" className={className}>
    <ellipse cx="24" cy="20" rx="18" ry="16" />
    <circle cx="16" cy="18" r="4" fill="black" />
    <circle cx="32" cy="18" r="4" fill="black" />
    <ellipse cx="24" cy="26" rx="2" ry="3" fill="black" />
    <rect x="18" y="34" width="3" height="6" rx="1" />
    <rect x="23" y="34" width="3" height="8" rx="1" />
    <rect x="28" y="34" width="3" height="6" rx="1" />
  </svg>
);

const FlowerIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className}>
    <circle cx="16" cy="8" r="6" />
    <circle cx="8" cy="16" r="6" />
    <circle cx="24" cy="16" r="6" />
    <circle cx="10" cy="24" r="6" />
    <circle cx="22" cy="24" r="6" />
    <circle cx="16" cy="16" r="5" fill="white" />
  </svg>
);

const CloudIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 64 40" fill="currentColor" className={className}>
    <ellipse cx="20" cy="28" rx="16" ry="12" />
    <ellipse cx="44" cy="28" rx="16" ry="12" />
    <ellipse cx="32" cy="20" rx="20" ry="14" />
  </svg>
);

const BoltIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const BeretIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 48 24" fill="currentColor" className={className}>
    <ellipse cx="24" cy="18" rx="22" ry="6" />
    <ellipse cx="24" cy="12" rx="18" ry="10" />
    <circle cx="24" cy="4" r="4" />
  </svg>
);

function TemplatePreview({ template, onSelect, onClose }: { template: Template; onSelect: () => void; onClose: () => void }) {
  const previewStyles: Record<string, { bg: string; card: string; title: string; text: string; accent: string; icon: React.ReactNode }> = {
    minimal: {
      bg: "bg-white",
      card: "",
      title: "text-gray-900",
      text: "text-gray-600",
      accent: "text-gray-400",
      icon: null,
    },
    rose: {
      bg: "bg-gradient-to-br from-rose-50 to-pink-100",
      card: "bg-white/80 border border-rose-100",
      title: "text-rose-900",
      text: "text-rose-700",
      accent: "text-rose-400",
      icon: <HeartIcon className="w-6 h-6 text-rose-400" />,
    },
    midnight: {
      bg: "bg-gradient-to-br from-slate-900 to-slate-800",
      card: "",
      title: "text-white",
      text: "text-slate-300",
      accent: "text-amber-300",
      icon: <StarIcon className="w-6 h-6 text-amber-300" />,
    },
    lavender: {
      bg: "bg-gradient-to-br from-violet-50 to-purple-100",
      card: "bg-white/60 border border-purple-100",
      title: "text-violet-900",
      text: "text-violet-700",
      accent: "text-violet-400",
      icon: <HeartIcon className="w-6 h-6 text-violet-400" />,
    },
    sunset: {
      bg: "bg-gradient-to-b from-amber-100 to-rose-200",
      card: "",
      title: "text-amber-900",
      text: "text-amber-800",
      accent: "text-orange-500",
      icon: <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-300 to-orange-400" />,
    },
    ocean: {
      bg: "bg-gradient-to-b from-sky-100 to-blue-100",
      card: "",
      title: "text-sky-900",
      text: "text-sky-700",
      accent: "text-cyan-500",
      icon: <div className="flex gap-0.5">{[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-400" />)}</div>,
    },
    hellokitty: {
      bg: "bg-gradient-to-br from-pink-50 to-red-50",
      card: "bg-white/95 border-2 border-red-100",
      title: "text-pink-600",
      text: "text-pink-700",
      accent: "text-red-400",
      icon: <Image src="/hellokittyicon.jpg" alt="Hello Kitty" width={40} height={40} className="rounded-xl" />,
    },
    cinnamoroll: {
      bg: "bg-gradient-to-b from-sky-100 to-white",
      card: "bg-white/95 border border-sky-100",
      title: "text-sky-600",
      text: "text-sky-700",
      accent: "text-sky-400",
      icon: <Image src="/cinnamorollicon.jpg" alt="Cinnamoroll" width={40} height={40} className="rounded-xl" />,
    },
    pompompurin: {
      bg: "bg-gradient-to-br from-yellow-50 to-amber-50",
      card: "bg-white/90 border-2 border-amber-200",
      title: "text-amber-700",
      text: "text-amber-800",
      accent: "text-amber-500",
      icon: <Image src="/pompompurinicon.jpg" alt="Pompompurin" width={40} height={40} className="rounded-xl" />,
    },
    mysweetpiano: {
      bg: "bg-gradient-to-br from-pink-50 to-rose-100",
      card: "bg-white/90 border border-pink-200",
      title: "text-pink-600",
      text: "text-pink-600",
      accent: "text-pink-400",
      icon: <Image src="/mysweetpianoicon.jpg" alt="My Sweet Piano" width={40} height={40} className="rounded-xl" />,
    },
    badtzmaru: {
      bg: "bg-gradient-to-br from-zinc-900 to-black",
      card: "bg-zinc-800/90 border border-yellow-400/30",
      title: "text-white",
      text: "text-zinc-300",
      accent: "text-yellow-400",
      icon: <Image src="/badtzmaruicon.jpg" alt="Badtz-Maru" width={40} height={40} className="rounded-xl" />,
    },
    baku: {
      bg: "bg-gradient-to-br from-indigo-100 to-purple-100",
      card: "bg-white/90 border border-indigo-200",
      title: "text-indigo-700",
      text: "text-purple-700",
      accent: "text-indigo-400",
      icon: <Image src="/bakuicon.jpg" alt="Baku" width={40} height={40} className="rounded-xl" />,
    },
    mymelody: {
      bg: "bg-gradient-to-br from-pink-50 to-rose-100",
      card: "bg-white/90 border border-pink-200",
      title: "text-pink-600",
      text: "text-pink-700",
      accent: "text-pink-400",
      icon: <Image src="/mymelodyicon.jpg" alt="My Melody" width={40} height={40} className="rounded-xl" />,
    },
    tuxedosam: {
      bg: "bg-gradient-to-br from-blue-100 to-slate-100",
      card: "bg-white/95 border border-blue-200",
      title: "text-blue-700",
      text: "text-slate-700",
      accent: "text-blue-400",
      icon: <Image src="/tuzedosamicon.jpg" alt="Tuxedo Sam" width={40} height={40} className="rounded-xl" />,
    },
    kuromi: {
      bg: "bg-gradient-to-br from-purple-950 to-black",
      card: "bg-black/70 border border-purple-500/30",
      title: "text-white",
      text: "text-purple-200",
      accent: "text-pink-400",
      icon: <Image src="/kuromiicon.jpg" alt="Kuromi" width={40} height={40} className="rounded-xl" />,
    },
    pochacco: {
      bg: "bg-gradient-to-br from-emerald-50 to-teal-100",
      card: "bg-white/95 border border-emerald-200",
      title: "text-emerald-700",
      text: "text-teal-700",
      accent: "text-emerald-500",
      icon: <Image src="/pochaccoicon.jpg" alt="Pochacco" width={40} height={40} className="rounded-xl" />,
    },
  };

  const style = previewStyles[template.id] || previewStyles.minimal;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">{template.name} Preview</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
          </div>

          <div className={`${style.bg} p-8 min-h-[400px] flex items-center justify-center`}>
            <div className={`w-full max-w-sm ${style.card} rounded-2xl p-6 text-center`}>
              {style.icon && <div className="flex justify-center mb-4">{style.icon}</div>}
              <p className={`text-xs uppercase tracking-wide ${style.accent} mb-1`}>A note for</p>
              <h2 className={`text-2xl font-bold ${style.title} mb-4`}>Sarah</h2>
              <p className={`text-sm leading-relaxed ${style.text} mb-6`}>
                Every moment with you feels like a beautiful dream I never want to wake up from. You make my heart smile.
              </p>
              <div className="pt-4 border-t border-gray-100/20">
                <p className={`text-xs ${style.accent}`}>With love,</p>
                <p className={`text-lg font-medium ${style.title}`}>Alex</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 text-gray-600 font-medium rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              Back
            </button>
            <button
              onClick={onSelect}
              className="flex-1 px-4 py-3 bg-rose-500 text-white font-medium rounded-full hover:bg-rose-600 transition-colors"
            >
              Use This Design
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TemplateCard({ template, isSelected, onSelect, onPreview }: { template: Template; isSelected: boolean; onSelect: () => void; onPreview: () => void }) {
  const cardStyles: Record<string, { icon: React.ReactNode; iconBg: string }> = {
    minimal: { icon: null, iconBg: "" },
    rose: { icon: <HeartIcon className="w-5 h-5 text-rose-400" />, iconBg: "bg-rose-100" },
    midnight: { icon: <StarIcon className="w-5 h-5 text-amber-400" />, iconBg: "bg-slate-700" },
    lavender: { icon: <HeartIcon className="w-5 h-5 text-violet-400" />, iconBg: "bg-violet-100" },
    sunset: { icon: <div className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-300 to-orange-400" />, iconBg: "bg-amber-100" },
    ocean: { icon: <div className="flex gap-0.5">{[0,1,2].map(i => <div key={i} className="w-1 h-1 rounded-full bg-cyan-400" />)}</div>, iconBg: "bg-sky-100" },
    hellokitty: { icon: <Image src="/hellokittyicon.jpg" alt="Hello Kitty" width={32} height={32} className="rounded-xl" />, iconBg: "" },
    cinnamoroll: { icon: <Image src="/cinnamorollicon.jpg" alt="Cinnamoroll" width={32} height={32} className="rounded-xl" />, iconBg: "" },
    pompompurin: { icon: <Image src="/pompompurinicon.jpg" alt="Pompompurin" width={32} height={32} className="rounded-xl" />, iconBg: "" },
    mysweetpiano: { icon: <Image src="/mysweetpianoicon.jpg" alt="My Sweet Piano" width={32} height={32} className="rounded-xl" />, iconBg: "" },
    badtzmaru: { icon: <Image src="/badtzmaruicon.jpg" alt="Badtz-Maru" width={32} height={32} className="rounded-xl" />, iconBg: "" },
    baku: { icon: <Image src="/bakuicon.jpg" alt="Baku" width={32} height={32} className="rounded-xl" />, iconBg: "" },
    mymelody: { icon: <Image src="/mymelodyicon.jpg" alt="My Melody" width={32} height={32} className="rounded-xl" />, iconBg: "" },
    tuxedosam: { icon: <Image src="/tuzedosamicon.jpg" alt="Tuxedo Sam" width={32} height={32} className="rounded-xl" />, iconBg: "" },
    kuromi: { icon: <Image src="/kuromiicon.jpg" alt="Kuromi" width={32} height={32} className="rounded-xl" />, iconBg: "" },
    pochacco: { icon: <Image src="/pochaccoicon.jpg" alt="Pochacco" width={32} height={32} className="rounded-xl" />, iconBg: "" },
  };

  const style = cardStyles[template.id] || cardStyles.minimal;

  return (
    <div
      className={`group relative rounded-2xl ${template.preview.bg} p-4 flex flex-col border-2 transition-all cursor-pointer ${
        isSelected ? "border-rose-500 shadow-lg" : "border-transparent hover:border-gray-200 hover:shadow-md"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-auto">
        {style.icon && (
          <div className={`w-8 h-8 rounded-lg ${style.iconBg} flex items-center justify-center`}>
            {style.icon}
          </div>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onPreview(); }}
          className="text-xs px-2 py-1 rounded-full bg-white/80 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
        >
          Preview
        </button>
      </div>

      <div className="mt-8">
        <p className={`font-semibold ${template.preview.accent}`}>{template.name}</p>
        <p className={`text-xs ${template.preview.text} opacity-70 mt-0.5`}>{template.description}</p>
      </div>
    </div>
  );
}

function CreateForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateParam = searchParams.get("template");

  const [step, setStep] = useState(templateParam ? 2 : 1);
  const [selectedTemplate, setSelectedTemplate] = useState(templateParam || "");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (templateParam) {
      setSelectedTemplate(templateParam);
      setStep(2);
    }
  }, [templateParam]);

  const handleTemplateSelect = (id: string) => {
    setSelectedTemplate(id);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !message || !selectedTemplate) return;

    setIsCreating(true);
    const id = saveNote({ recipient, sender, message, template: selectedTemplate });
    router.push(`/note/${id}?new=true`);
  };

  const currentTemplate = getTemplateById(selectedTemplate);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <AnimatePresence>
        {previewTemplate && (
          <TemplatePreview
            template={previewTemplate}
            onSelect={() => {
              handleTemplateSelect(previewTemplate.id);
              setPreviewTemplate(null);
            }}
            onClose={() => setPreviewTemplate(null)}
          />
        )}
      </AnimatePresence>

      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-10">
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
              Choose a design
            </h1>
            <p className="text-gray-600">Click preview to see how your love website will look</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplate === template.id}
                onSelect={() => handleTemplateSelect(template.id)}
                onPreview={() => setPreviewTemplate(template)}
              />
            ))}
          </div>
        </motion.div>
      )}

      {step === 2 && currentTemplate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setStep(1)}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              ← Change design
            </button>
            <button
              onClick={() => setPreviewTemplate(currentTemplate)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${currentTemplate.preview.bg} ${currentTemplate.preview.accent} hover:opacity-80 transition-opacity`}
            >
              {currentTemplate.name} · Preview
            </button>
          </div>

          <div className="text-center mb-8">
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
              Write your message
            </h1>
            <p className="text-gray-600">Add your personal touch</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Their name"
                    className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:outline-none focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                  <input
                    type="text"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    placeholder="Your name (optional)"
                    className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:outline-none focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your love note</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write something from the heart..."
                  rows={8}
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:outline-none focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100 transition-all resize-none font-[family-name:var(--font-playfair)] text-lg leading-relaxed"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isCreating || !recipient || !message}
              className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-medium rounded-full shadow-lg shadow-rose-500/30 hover:shadow-rose-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isCreating ? "Creating..." : "Create Website"}
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}

export default function Create() {
  return (
    <main className="min-h-screen flex flex-col bg-[#fdfbf7]">
      <nav className="flex items-center justify-between px-6 md:px-12 py-6">
        <Link href="/" className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-rose-600">
          loving.gg
        </Link>
      </nav>

      <div className="flex-1 flex items-start justify-center px-6 py-8">
        <Suspense fallback={<div className="animate-pulse text-gray-400">Loading...</div>}>
          <CreateForm />
        </Suspense>
      </div>
    </main>
  );
}
