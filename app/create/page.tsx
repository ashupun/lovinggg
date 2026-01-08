"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { encodeNote, signoffOptions, fontOptions } from "@/lib/store";
import { templates } from "@/lib/templates";

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

interface PreviewStyle {
  bg: string;
  card: string;
  title: string;
  text: string;
  accent: string;
  icon: React.ReactNode;
  signoff: string;
}

const previewStyles: Record<string, PreviewStyle> = {
  minimal: {
    bg: "bg-white",
    card: "",
    title: "text-gray-900",
    text: "text-gray-600",
    accent: "text-gray-400",
    icon: null,
    signoff: "With love,",
  },
  rose: {
    bg: "bg-gradient-to-br from-rose-50 to-pink-100",
    card: "bg-white/80 border border-rose-100",
    title: "text-rose-900",
    text: "text-rose-700",
    accent: "text-rose-400",
    icon: <HeartIcon className="w-4 h-4 text-rose-400" />,
    signoff: "Forever yours,",
  },
  midnight: {
    bg: "bg-gradient-to-br from-slate-900 to-slate-800",
    card: "",
    title: "text-white",
    text: "text-slate-300",
    accent: "text-amber-300",
    icon: <StarIcon className="w-4 h-4 text-amber-300" />,
    signoff: "Under the stars,",
  },
  lavender: {
    bg: "bg-gradient-to-br from-violet-50 to-purple-100",
    card: "bg-white/60 border border-purple-100",
    title: "text-violet-900",
    text: "text-violet-700",
    accent: "text-violet-400",
    icon: <HeartIcon className="w-4 h-4 text-violet-400" />,
    signoff: "Dreaming of you,",
  },
  sunset: {
    bg: "bg-gradient-to-b from-amber-100 to-rose-200",
    card: "",
    title: "text-amber-900",
    text: "text-amber-800",
    accent: "text-orange-500",
    icon: <div className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-300 to-orange-400" />,
    signoff: "Until sunset,",
  },
  ocean: {
    bg: "bg-gradient-to-b from-sky-100 to-blue-100",
    card: "",
    title: "text-sky-900",
    text: "text-sky-700",
    accent: "text-cyan-500",
    icon: <div className="flex gap-0.5">{[0,1,2].map(i => <div key={i} className="w-1 h-1 rounded-full bg-cyan-400" />)}</div>,
    signoff: "Across the waves,",
  },
  hellokitty: {
    bg: "bg-gradient-to-br from-pink-50 to-red-50",
    card: "bg-white/95 border-2 border-red-100",
    title: "text-pink-600",
    text: "text-pink-700",
    accent: "text-red-400",
    icon: <Image src="/hellokittyicon.jpg" alt="" width={20} height={20} className="rounded-md" />,
    signoff: "xoxo,",
  },
  cinnamoroll: {
    bg: "bg-gradient-to-b from-sky-100 to-white",
    card: "bg-white/95 border border-sky-100",
    title: "text-sky-600",
    text: "text-sky-700",
    accent: "text-sky-400",
    icon: <Image src="/cinnamorollicon.jpg" alt="" width={20} height={20} className="rounded-md" />,
    signoff: "Fluffy hugs,",
  },
  pompompurin: {
    bg: "bg-gradient-to-br from-yellow-50 to-amber-50",
    card: "bg-white/90 border-2 border-amber-200",
    title: "text-amber-700",
    text: "text-amber-800",
    accent: "text-amber-500",
    icon: <Image src="/pompompurinicon.jpg" alt="" width={20} height={20} className="rounded-md" />,
    signoff: "Pudding kisses,",
  },
  mysweetpiano: {
    bg: "bg-gradient-to-br from-pink-50 to-rose-100",
    card: "bg-white/90 border border-pink-200",
    title: "text-pink-600",
    text: "text-pink-600",
    accent: "text-pink-400",
    icon: <Image src="/mysweetpianoicon.jpg" alt="" width={20} height={20} className="rounded-md" />,
    signoff: "Sweet dreams,",
  },
  badtzmaru: {
    bg: "bg-gradient-to-br from-zinc-900 to-black",
    card: "bg-zinc-800/90 border border-yellow-400/30",
    title: "text-white",
    text: "text-zinc-300",
    accent: "text-yellow-400",
    icon: <Image src="/badtzmaruicon.jpg" alt="" width={20} height={20} className="rounded-md" />,
    signoff: "Later,",
  },
  baku: {
    bg: "bg-gradient-to-br from-indigo-100 to-purple-100",
    card: "bg-white/90 border border-indigo-200",
    title: "text-indigo-700",
    text: "text-purple-700",
    accent: "text-indigo-400",
    icon: <Image src="/bakuicon.jpg" alt="" width={20} height={20} className="rounded-md" />,
    signoff: "Magical wishes,",
  },
  mymelody: {
    bg: "bg-gradient-to-br from-pink-50 to-rose-100",
    card: "bg-white/90 border border-pink-200",
    title: "text-pink-600",
    text: "text-pink-700",
    accent: "text-pink-400",
    icon: <Image src="/mymelodyicon.jpg" alt="" width={20} height={20} className="rounded-md" />,
    signoff: "Sweetly,",
  },
  tuxedosam: {
    bg: "bg-gradient-to-br from-blue-100 to-slate-100",
    card: "bg-white/95 border border-blue-200",
    title: "text-blue-700",
    text: "text-slate-700",
    accent: "text-blue-400",
    icon: <Image src="/tuzedosamicon.jpg" alt="" width={20} height={20} className="rounded-md" />,
    signoff: "Elegantly yours,",
  },
  kuromi: {
    bg: "bg-gradient-to-br from-purple-950 to-black",
    card: "bg-black/70 border border-purple-500/30",
    title: "text-white",
    text: "text-purple-200",
    accent: "text-pink-400",
    icon: <Image src="/kuromiicon.jpg" alt="" width={20} height={20} className="rounded-md" />,
    signoff: "Mischievously,",
  },
  pochacco: {
    bg: "bg-gradient-to-br from-emerald-50 to-teal-100",
    card: "bg-white/95 border border-emerald-200",
    title: "text-emerald-700",
    text: "text-teal-700",
    accent: "text-emerald-500",
    icon: <Image src="/pochaccoicon.jpg" alt="" width={20} height={20} className="rounded-md" />,
    signoff: "Energetically,",
  },
};

function MiniBackgroundElements({ templateId }: { templateId: string }) {
  const positions = [
    { x: 10, y: 15 }, { x: 80, y: 20 }, { x: 25, y: 70 }, { x: 75, y: 75 },
    { x: 50, y: 10 }, { x: 15, y: 45 }, { x: 85, y: 50 }
  ];

  const renderElements = () => {
    switch (templateId) {
      case "rose":
        return positions.slice(0, 5).map((pos, i) => (
          <motion.div key={i} className="absolute" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ y: [0, -4, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3 + (i % 2), repeat: Infinity, delay: i * 0.2 }}
          >
            <HeartIcon className="w-2 h-2 text-rose-200/50" />
          </motion.div>
        ));
      case "midnight":
        return positions.slice(0, 5).map((pos, i) => (
          <motion.div key={i} className="absolute" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 3 + (i % 2), repeat: Infinity, delay: i * 0.15 }}
          >
            <StarIcon className="w-2 h-2 text-amber-300/40" />
          </motion.div>
        ));
      case "lavender":
        return positions.slice(0, 5).map((pos, i) => (
          <motion.div key={i} className="absolute" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ y: [0, -5, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3 + (i % 2), repeat: Infinity, delay: i * 0.2 }}
          >
            {i % 2 === 0 ? <HeartIcon className="w-2 h-2 text-violet-300/45" /> : <StarIcon className="w-2 h-2 text-purple-300/45" />}
          </motion.div>
        ));
      case "sunset":
        return positions.slice(0, 4).map((pos, i) => (
          <motion.div key={i} className="absolute" style={{ left: `${pos.x}%`, top: `${pos.y * 0.4}%` }}
            animate={{ x: [0, 5, 0], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 4 + (i % 2), repeat: Infinity, delay: i * 0.3 }}
          >
            <CloudIcon className="w-4 h-3 text-white/50" />
          </motion.div>
        ));
      case "ocean":
        return positions.slice(0, 5).map((pos, i) => (
          <motion.div key={i} className="absolute rounded-full bg-white/40" style={{ left: `${pos.x}%`, bottom: `${10 + i * 10}%`, width: '4px', height: '4px' }}
            animate={{ y: [0, -30], opacity: [0.5, 0] }}
            transition={{ duration: 4 + (i % 2), repeat: Infinity, delay: i * 0.3 }}
          />
        ));
      case "hellokitty":
      case "mymelody":
      case "mysweetpiano":
        return positions.slice(0, 5).map((pos, i) => (
          <motion.div key={i} className="absolute" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ y: [0, -4, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3 + (i % 2), repeat: Infinity, delay: i * 0.2 }}
          >
            {i % 2 === 0 ? <HeartIcon className="w-2 h-2 text-red-200/55" /> : <FlowerIcon className="w-3 h-3 text-pink-200/45" />}
          </motion.div>
        ));
      case "kuromi":
        return positions.slice(0, 5).map((pos, i) => (
          <motion.div key={i} className="absolute" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ opacity: [0.15, 0.4, 0.15], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 3 + (i % 2), repeat: Infinity, delay: i * 0.15 }}
          >
            {i % 2 === 0 ? <StarIcon className="w-2 h-2 text-pink-500/50" /> : <HeartIcon className="w-2 h-2 text-purple-400/40" />}
          </motion.div>
        ));
      case "cinnamoroll":
        return positions.slice(0, 5).map((pos, i) => (
          <motion.div key={i} className="absolute" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ x: [0, 5, 0], y: [0, -3, 0] }}
            transition={{ duration: 4 + (i % 2), repeat: Infinity, delay: i * 0.2 }}
          >
            <CloudIcon className="w-4 h-2 text-white/60" />
          </motion.div>
        ));
      case "badtzmaru":
        return positions.slice(0, 5).map((pos, i) => (
          <motion.div key={i} className="absolute" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ rotate: [0, 180], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 4 + (i % 2), repeat: Infinity, delay: i * 0.2 }}
          >
            <BoltIcon className="w-2 h-2 text-yellow-400/35" />
          </motion.div>
        ));
      case "pompompurin":
        return positions.slice(0, 5).map((pos, i) => (
          <motion.div key={i} className="absolute" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ y: [0, -4, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3 + (i % 2), repeat: Infinity, delay: i * 0.2 }}
          >
            {i % 2 === 0 ? <StarIcon className="w-2 h-2 text-amber-200/55" /> : <HeartIcon className="w-2 h-2 text-yellow-300/45" />}
          </motion.div>
        ));
      case "baku":
        return positions.slice(0, 5).map((pos, i) => (
          <motion.div key={i} className="absolute" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ opacity: [0.15, 0.4, 0.15], y: [0, -4, 0], rotate: [0, 90, 180] }}
            transition={{ duration: 3 + (i % 2), repeat: Infinity, delay: i * 0.15 }}
          >
            <StarIcon className="w-2 h-2 text-indigo-300/50" />
          </motion.div>
        ));
      case "tuxedosam":
      case "pochacco":
        return positions.slice(0, 5).map((pos, i) => (
          <motion.div key={i} className="absolute" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ y: [0, -4, 0], scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3 + (i % 2), repeat: Infinity, delay: i * 0.15 }}
          >
            {i % 2 === 0 ? (
              <StarIcon className={`w-2 h-2 ${templateId === 'tuxedosam' ? 'text-blue-200/50' : 'text-emerald-200/55'}`} />
            ) : (
              <HeartIcon className={`w-2 h-2 ${templateId === 'tuxedosam' ? 'text-sky-200/45' : 'text-teal-200/45'}`} />
            )}
          </motion.div>
        ));
      default:
        return null;
    }
  };

  return <>{renderElements()}</>;
}

function MiniPreview({ templateId, isSelected, onClick }: {
  templateId: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  const style = previewStyles[templateId] || previewStyles.minimal;
  const template = templates.find(t => t.id === templateId);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
        isSelected ? "border-rose-500 ring-2 ring-rose-200" : "border-transparent hover:border-gray-200"
      }`}
    >
      <div className={`${style.bg} p-3 aspect-[3/4] relative overflow-hidden`}>
        <div className="absolute inset-0 overflow-hidden">
          <MiniBackgroundElements templateId={templateId} />
        </div>
        <div className={`${style.card} rounded-lg p-2 h-full flex flex-col justify-center text-center relative z-10`}>
          {style.icon && <div className="flex justify-center mb-1">{style.icon}</div>}
          <p className={`text-xs font-bold ${style.title} truncate`}>Someone</p>
          <p className={`text-[7px] ${style.text} mt-1 line-clamp-2 leading-tight`}>Your message here...</p>
          <div className="mt-1">
            <p className={`text-[6px] ${style.accent}`}>{style.signoff}</p>
            <p className={`text-[8px] font-medium ${style.title} truncate`}>You</p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900 px-2 py-1.5 text-center">
        <p className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">{template?.name}</p>
      </div>
    </motion.div>
  );
}

function BackgroundElements({ templateId }: { templateId: string }) {
  const positions = [
    { x: 8, y: 12 }, { x: 85, y: 18 }, { x: 22, y: 75 }, { x: 72, y: 82 },
    { x: 48, y: 8 }, { x: 5, y: 48 }, { x: 92, y: 55 }, { x: 32, y: 28 },
    { x: 62, y: 65 }, { x: 78, y: 35 }, { x: 15, y: 88 }, { x: 55, y: 42 }
  ];

  const renderElements = () => {
    switch (templateId) {
      case "rose":
        return positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ y: [0, -15, 0], scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 6 + (i % 3), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          >
            <HeartIcon className={`${i % 2 === 0 ? 'w-6 h-6' : 'w-4 h-4'} text-rose-200/50`} />
          </motion.div>
        ));
      case "midnight":
        return positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.3, 0.8], rotate: [0, 180, 360] }}
            transition={{ duration: 5 + (i % 3), repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
          >
            <StarIcon className={`${i % 2 === 0 ? 'w-5 h-5' : 'w-3 h-3'} text-amber-300/40`} />
          </motion.div>
        ));
      case "lavender":
        return positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ y: [0, -20, 0], scale: [1, 1.15, 1], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 6 + (i % 3), repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
          >
            {i % 3 === 0 ? (
              <HeartIcon className={`${i % 2 === 0 ? 'w-6 h-6' : 'w-4 h-4'} text-violet-300/45`} />
            ) : i % 3 === 1 ? (
              <FlowerIcon className={`${i % 2 === 0 ? 'w-7 h-7' : 'w-5 h-5'} text-fuchsia-200/35`} />
            ) : (
              <StarIcon className={`${i % 2 === 0 ? 'w-5 h-5' : 'w-3 h-3'} text-purple-300/45`} />
            )}
          </motion.div>
        ));
      case "sunset":
        return (
          <>
            {positions.slice(0, 6).map((pos, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: `${pos.x}%`, top: `${pos.y * 0.4}%` }}
                animate={{ x: [0, 20, 0], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 8 + (i % 3), repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
              >
                <CloudIcon className={`${i % 2 === 0 ? 'w-12 h-8' : 'w-8 h-5'} text-white/50`} />
              </motion.div>
            ))}
            {positions.slice(6).map((pos, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
              >
                <StarIcon className="w-4 h-4 text-amber-300/45" />
              </motion.div>
            ))}
          </>
        );
      case "ocean":
        return (
          <>
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={`wave-${i}`}
                className="absolute left-0 right-0 bg-gradient-to-t from-cyan-200/30 to-transparent"
                style={{ bottom: `${i * 40}px`, height: `${15 + i * 6}px` }}
                animate={{ x: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
              />
            ))}
            {positions.slice(0, 8).map((pos, i) => (
              <motion.div
                key={`bubble-${i}`}
                className="absolute rounded-full bg-white/40"
                style={{ left: `${pos.x}%`, bottom: `-5%`, width: `${8 + (i % 3) * 4}px`, height: `${8 + (i % 3) * 4}px` }}
                animate={{ y: [0, -400], opacity: [0.6, 0] }}
                transition={{ duration: 8 + (i % 4), repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
              />
            ))}
          </>
        );
      case "hellokitty":
      case "mymelody":
      case "mysweetpiano":
        return positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ y: [0, -18, 0], scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 6 + (i % 3), repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
          >
            {i % 3 === 0 ? (
              <HeartIcon className={`${i % 2 === 0 ? 'w-6 h-6' : 'w-4 h-4'} text-red-200/55`} />
            ) : i % 3 === 1 ? (
              <FlowerIcon className={`${i % 2 === 0 ? 'w-7 h-7' : 'w-5 h-5'} text-pink-200/45`} />
            ) : (
              <StarIcon className={`${i % 2 === 0 ? 'w-5 h-5' : 'w-3 h-3'} text-pink-100/55`} />
            )}
          </motion.div>
        ));
      case "kuromi":
        return positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ opacity: [0.15, 0.5, 0.15], scale: [0.8, 1.3, 0.8], rotate: [0, 360] }}
            transition={{ duration: 5 + (i % 3), repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
          >
            {i % 2 === 0 ? (
              <StarIcon className={`${i % 4 === 0 ? 'w-5 h-5' : 'w-3 h-3'} text-pink-500/50`} />
            ) : (
              <HeartIcon className={`${i % 4 === 1 ? 'w-6 h-6' : 'w-4 h-4'} text-purple-400/40`} />
            )}
          </motion.div>
        ));
      case "cinnamoroll":
        return positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
            transition={{ duration: 8 + (i % 4), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          >
            <CloudIcon className={`${i % 2 === 0 ? 'w-10 h-6' : 'w-7 h-4'} text-white/60 drop-shadow-sm`} />
          </motion.div>
        ));
      case "badtzmaru":
        return positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ rotate: [0, 360], opacity: [0.15, 0.4, 0.15], scale: [1, 1.2, 1] }}
            transition={{ duration: 7 + (i % 4), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          >
            <BoltIcon className={`${i % 3 === 0 ? 'w-5 h-5' : 'w-3 h-3'} text-yellow-400/35`} />
          </motion.div>
        ));
      case "pompompurin":
        return positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ y: [0, -12, 0], scale: [1, 1.15, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5 + (i % 3), repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
          >
            {i % 2 === 0 ? (
              <StarIcon className={`${i % 2 === 0 ? 'w-5 h-5' : 'w-3 h-3'} text-amber-200/55`} />
            ) : (
              <HeartIcon className={`${i % 2 === 0 ? 'w-4 h-4' : 'w-3 h-3'} text-yellow-300/45`} />
            )}
          </motion.div>
        ));
      case "baku":
        return positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ opacity: [0.15, 0.45, 0.15], y: [0, -12, 0], scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 5 + (i % 3), repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
          >
            <StarIcon className={`${i % 3 === 0 ? 'w-5 h-5' : 'w-3 h-3'} text-indigo-300/50`} />
          </motion.div>
        ));
      case "tuxedosam":
      case "pochacco":
        return positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ y: [0, -15, 0], scale: [1, 1.15, 1], opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 5 + (i % 3), repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
          >
            {i % 2 === 0 ? (
              <StarIcon className={`${i % 2 === 0 ? 'w-5 h-5' : 'w-3 h-3'} ${templateId === 'tuxedosam' ? 'text-blue-200/50' : 'text-emerald-200/55'}`} />
            ) : (
              <HeartIcon className={`${i % 2 === 0 ? 'w-4 h-4' : 'w-3 h-3'} ${templateId === 'tuxedosam' ? 'text-sky-200/45' : 'text-teal-200/45'}`} />
            )}
          </motion.div>
        ));
      default:
        return null;
    }
  };

  return <>{renderElements()}</>;
}

function LivePreview({ templateId, recipient, sender, message, signoff, font }: {
  templateId: string;
  recipient: string;
  sender: string;
  message: string;
  signoff: string;
  font: string;
}) {
  const style = previewStyles[templateId] || previewStyles.minimal;
  const displayRecipient = recipient || "Someone";
  const displayMessage = message || "Your message will appear here...";
  const displaySender = sender;
  const fontClass = fontOptions.find(f => f.id === font)?.class || "";

  return (
    <div className={`${style.bg} rounded-2xl p-6 h-full min-h-[400px] flex items-center justify-center relative overflow-hidden`}>
      <div className="absolute inset-0 overflow-hidden">
        <BackgroundElements templateId={templateId} />
      </div>
      <div className={`${style.card} rounded-xl p-6 w-full max-w-sm text-center ${fontClass} relative z-10`}>
        {style.icon && <div className="flex justify-center mb-3">{style.icon}</div>}
        <h2 className={`text-2xl font-bold ${style.title} mb-4`}>{displayRecipient}</h2>
        <p className={`text-sm leading-relaxed ${style.text} whitespace-pre-wrap`}>{displayMessage}</p>
        {displaySender && (
          <div className="mt-6 pt-4 border-t border-gray-100/20">
            <p className={`text-xs ${style.accent}`}>{signoff}</p>
            <p className={`text-lg font-medium ${style.title}`}>{displaySender}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CreateForm() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState("rose");
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [signoff, setSignoff] = useState("With love");
  const [font, setFont] = useState("classic");
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !message || !selectedTemplate) return;

    setIsCreating(true);
    const id = encodeNote({ recipient, sender, message, template: selectedTemplate, signoff, font });
    router.push(`/note/${id}?new=true`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-[280px_1fr_1fr] gap-6">
        <div className="lg:h-[calc(100vh-140px)] lg:overflow-y-auto lg:pr-2 scrollbar-thin">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3 sticky top-0 bg-[#fdfbf7] dark:bg-[#0f0f0f] py-2">Choose design</p>
          <div className="grid grid-cols-3 lg:grid-cols-2 gap-2">
            {templates.map((template) => (
              <MiniPreview
                key={template.id}
                templateId={template.id}
                isSelected={selectedTemplate === template.id}
                onClick={() => setSelectedTemplate(template.id)}
              />
            ))}
          </div>
        </div>

        <div className="lg:order-3">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Write your message</p>
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1.5">To</label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Their name"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-transparent rounded-xl focus:outline-none focus:border-rose-300 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-rose-100 dark:focus:ring-rose-900 transition-all placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1.5">From</label>
                  <input
                    type="text"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    placeholder="Your name (optional)"
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-transparent rounded-xl focus:outline-none focus:border-rose-300 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-rose-100 dark:focus:ring-rose-900 transition-all placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1.5">Sign off</label>
                  <select
                    value={signoff}
                    onChange={(e) => setSignoff(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-transparent rounded-xl focus:outline-none focus:border-rose-300 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-rose-100 dark:focus:ring-rose-900 transition-all appearance-none cursor-pointer"
                  >
                    {signoffOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1.5">Font</label>
                <div className="flex gap-2">
                  {fontOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setFont(option.id)}
                      className={`flex-1 px-3 py-2 rounded-xl text-sm transition-all ${option.class} ${
                        font === option.id
                          ? "bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 ring-2 ring-rose-300 dark:ring-rose-700"
                          : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write something from the heart..."
                  rows={6}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-transparent rounded-xl focus:outline-none focus:border-rose-300 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-rose-100 dark:focus:ring-rose-900 transition-all resize-none placeholder:text-gray-400"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isCreating || !recipient || !message}
              className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-medium rounded-full shadow-lg shadow-rose-500/30 hover:shadow-rose-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isCreating ? "Creating..." : "Create Website"}
            </button>
          </form>
        </div>

        <div className="lg:order-2">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Live preview</p>
          <LivePreview
            templateId={selectedTemplate}
            recipient={recipient}
            sender={sender}
            message={message}
            signoff={signoff}
            font={font}
          />
        </div>
      </div>
    </div>
  );
}

export default function Create() {
  return (
    <main className="min-h-screen flex flex-col bg-[#fdfbf7] dark:bg-[#0f0f0f]">
      <nav className="flex items-center justify-between px-6 md:px-12 py-6">
        <Link href="/" className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-rose-600">
          loving.gg
        </Link>
      </nav>

      <div className="flex-1 px-6 pb-8">
        <Suspense fallback={<div className="animate-pulse text-gray-500 dark:text-gray-400">Loading...</div>}>
          <CreateForm />
        </Suspense>
      </div>
    </main>
  );
}
