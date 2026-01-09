"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fontOptions, expirationOptions } from "@/lib/store";
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

const SunIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
);

const MoonIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
);

interface PreviewStyle {
  bg: string;
  card: string;
  title: string;
  text: string;
  accent: string;
  icon: React.ReactNode;
}

const previewStyles: Record<string, PreviewStyle> = {
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
    icon: <HeartIcon className="w-4 h-4 text-rose-400" />,
  },
  midnight: {
    bg: "bg-gradient-to-br from-slate-900 to-slate-800",
    card: "",
    title: "text-white",
    text: "text-slate-300",
    accent: "text-amber-300",
    icon: <StarIcon className="w-4 h-4 text-amber-300" />,
  },
  lavender: {
    bg: "bg-gradient-to-br from-violet-50 to-purple-100",
    card: "bg-white/60 border border-purple-100",
    title: "text-violet-900",
    text: "text-violet-700",
    accent: "text-violet-400",
    icon: <HeartIcon className="w-4 h-4 text-violet-400" />,
  },
  sunset: {
    bg: "bg-gradient-to-b from-amber-100 to-rose-200",
    card: "",
    title: "text-amber-900",
    text: "text-amber-800",
    accent: "text-orange-500",
    icon: <div className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-300 to-orange-400" />,
  },
  ocean: {
    bg: "bg-gradient-to-b from-sky-100 to-blue-100",
    card: "",
    title: "text-sky-900",
    text: "text-sky-700",
    accent: "text-cyan-500",
    icon: <div className="flex gap-0.5">{[0,1,2].map(i => <div key={i} className="w-1 h-1 rounded-full bg-cyan-400" />)}</div>,
  },
  hellokitty: {
    bg: "bg-gradient-to-br from-pink-50 to-red-50",
    card: "bg-white/95 border-2 border-red-100",
    title: "text-pink-600",
    text: "text-pink-700",
    accent: "text-red-400",
    icon: <Image src="/hellokittyicon.jpg" alt="" width={20} height={20} className="rounded-md" />,
  },
  cinnamoroll: {
    bg: "bg-gradient-to-b from-sky-100 to-white",
    card: "bg-white/95 border border-sky-100",
    title: "text-sky-600",
    text: "text-sky-700",
    accent: "text-sky-400",
    icon: <Image src="/cinnamorollicon.jpg" alt="" width={20} height={20} className="rounded-md" />,
  },
  pompompurin: {
    bg: "bg-gradient-to-br from-yellow-50 to-amber-50",
    card: "bg-white/90 border-2 border-amber-200",
    title: "text-amber-700",
    text: "text-amber-800",
    accent: "text-amber-500",
    icon: <Image src="/pompompurinicon.jpg" alt="" width={20} height={20} className="rounded-md" />,
  },
  mysweetpiano: {
    bg: "bg-gradient-to-br from-pink-50 to-rose-100",
    card: "bg-white/90 border border-pink-200",
    title: "text-pink-600",
    text: "text-pink-600",
    accent: "text-pink-400",
    icon: <Image src="/mysweetpianoicon.jpg" alt="" width={20} height={20} className="rounded-md" />,
  },
  badtzmaru: {
    bg: "bg-gradient-to-br from-zinc-900 to-black",
    card: "bg-zinc-800/90 border border-yellow-400/30",
    title: "text-white",
    text: "text-zinc-300",
    accent: "text-yellow-400",
    icon: <Image src="/badtzmaruicon.jpg" alt="" width={20} height={20} className="rounded-md" />,
  },
  baku: {
    bg: "bg-gradient-to-br from-indigo-100 to-purple-100",
    card: "bg-white/90 border border-indigo-200",
    title: "text-indigo-700",
    text: "text-purple-700",
    accent: "text-indigo-400",
    icon: <Image src="/bakuicon.jpg" alt="" width={20} height={20} className="rounded-md" />,
  },
  mymelody: {
    bg: "bg-gradient-to-br from-pink-50 to-rose-100",
    card: "bg-white/90 border border-pink-200",
    title: "text-pink-600",
    text: "text-pink-700",
    accent: "text-pink-400",
    icon: <Image src="/mymelodyicon.jpg" alt="" width={20} height={20} className="rounded-md" />,
  },
  tuxedosam: {
    bg: "bg-gradient-to-br from-blue-100 to-slate-100",
    card: "bg-white/95 border border-blue-200",
    title: "text-blue-700",
    text: "text-slate-700",
    accent: "text-blue-400",
    icon: <Image src="/tuzedosamicon.jpg" alt="" width={20} height={20} className="rounded-md" />,
  },
  kuromi: {
    bg: "bg-gradient-to-br from-purple-950 to-black",
    card: "bg-black/70 border border-purple-500/30",
    title: "text-white",
    text: "text-purple-200",
    accent: "text-pink-400",
    icon: <Image src="/kuromiicon.jpg" alt="" width={20} height={20} className="rounded-md" />,
  },
  pochacco: {
    bg: "bg-gradient-to-br from-emerald-50 to-teal-100",
    card: "bg-white/95 border border-emerald-200",
    title: "text-emerald-700",
    text: "text-teal-700",
    accent: "text-emerald-500",
    icon: <Image src="/pochaccoicon.jpg" alt="" width={20} height={20} className="rounded-md" />,
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
          <div className="mt-1 flex flex-col items-center">
            <HeartIcon className={`w-2 h-2 ${style.accent}`} />
            <p className={`text-[8px] font-medium ${style.title} truncate`}>You</p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-[#1a1a1c] px-2 py-1.5 text-center">
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

function LivePreview({ templateId, recipient, sender, message, font, isMobile = false }: {
  templateId: string;
  recipient: string;
  sender: string;
  message: string;
  font: string;
  isMobile?: boolean;
}) {
  const style = previewStyles[templateId] || previewStyles.minimal;
  const displayRecipient = recipient || "Someone";
  const displayMessage = message || "Your message will appear here...";
  const displaySender = sender;
  const fontOption = fontOptions.find(f => f.id === font) || fontOptions[0];
  const fontClass = fontOption?.class || "";
  const fontScale = fontOption?.scale || 1;

  if (isMobile) {
    return (
      <div className={`${style.bg} w-full h-full overflow-hidden relative`}>
        <div className="absolute inset-0 overflow-hidden">
          <BackgroundElements templateId={templateId} />
        </div>
        <div className="h-full flex items-center justify-center p-6">
          <div className={`${style.card} rounded-2xl p-8 w-full max-w-sm text-center ${fontClass} relative z-10`} style={{ fontSize: `${fontScale}em` }}>
            {style.icon && <div className="flex justify-center mb-4 scale-150">{style.icon}</div>}
            <h2 className={`text-3xl font-bold ${style.title} mb-4`}>{displayRecipient}</h2>
            <p className={`text-base leading-relaxed ${style.text} whitespace-pre-wrap`}>{displayMessage}</p>
            {displaySender && (
              <div className="mt-6 pt-4 border-t border-gray-100/20 flex flex-col items-center">
                <HeartIcon className={`w-4 h-4 ${style.accent}`} />
                <p className={`text-xl font-medium ${style.title}`}>{displaySender}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="relative">
        <div className="absolute -inset-[3px] bg-gradient-to-b from-gray-300 via-gray-200 to-gray-400 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 rounded-[52px] shadow-xl" />
        <div className="relative bg-[#1a1a1a] rounded-[49px] p-[10px] shadow-2xl">
          <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[90px] h-[28px] bg-black rounded-full z-20 flex items-center justify-center gap-2">
            <div className="w-[10px] h-[10px] rounded-full bg-[#1a1a1a] ring-1 ring-gray-800" />
          </div>
          <div className={`${style.bg} rounded-[39px] w-[252px] h-[545px] overflow-hidden relative`}>
            <div className="absolute inset-0 overflow-hidden">
              <BackgroundElements templateId={templateId} />
            </div>
            <div className="h-full flex items-center justify-center p-4 pt-12">
              <div className={`${style.card} rounded-xl p-5 w-full text-center ${fontClass} relative z-10`} style={{ fontSize: `${fontScale}em` }}>
                {style.icon && <div className="flex justify-center mb-2">{style.icon}</div>}
                <h2 className={`text-xl font-bold ${style.title} mb-3`}>{displayRecipient}</h2>
                <p className={`text-xs leading-relaxed ${style.text} whitespace-pre-wrap line-clamp-6`}>{displayMessage}</p>
                {displaySender && (
                  <div className="mt-4 pt-3 border-t border-gray-100/20 flex flex-col items-center">
                    <HeartIcon className={`w-3 h-3 ${style.accent}`} />
                    <p className={`text-base font-medium ${style.title}`}>{displaySender}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-black/30 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

const messageIdeas = [
  "Every moment with you feels like a dream I never want to wake up from.",
  "You make my heart smile in ways I never knew were possible.",
  "I fall in love with you a little more every single day.",
  "You're my favorite notification, my best good morning, and my sweetest goodnight.",
  "Thank you for being my person. I love you endlessly.",
  "You're the reason I believe in magic.",
  "My heart knew you before my eyes ever did.",
  "With you, forever doesn't feel long enough.",
];

function CreateForm() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState("rose");
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [font, setFont] = useState("classic");
  const [expiration, setExpiration] = useState("1d");
  const [customLink, setCustomLink] = useState("");
  const [linkStatus, setLinkStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
  const [linkSuggestions, setLinkSuggestions] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [activeTab, setActiveTab] = useState<"write" | "design" | "theme" | "style" | "header">("write");
  const [showIdeas, setShowIdeas] = useState(false);

  useEffect(() => {
    if (!customLink.trim()) {
      setLinkStatus("idle");
      setLinkSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLinkStatus("checking");
      try {
        const res = await fetch(`/api/notes/check?id=${encodeURIComponent(customLink.trim())}`);
        const data = await res.json();
        if (data.available) {
          setLinkStatus("available");
          setLinkSuggestions([]);
        } else {
          setLinkStatus("taken");
          setLinkSuggestions(data.suggestions || []);
        }
      } catch {
        setLinkStatus("idle");
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [customLink]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!recipient || !message || !selectedTemplate) return;
    if (customLink && linkStatus === "taken") return;

    setIsCreating(true);
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient,
          sender,
          message,
          template: selectedTemplate,
          signoff: "",
          font,
          expiration,
          customId: customLink.trim() || undefined
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.id) {
        setIsCreating(false);
        return;
      }
      router.push(`/note/${data.id}?new=true`);
    } catch {
      setIsCreating(false);
    }
  };

  return (
    <>
      <div className={`lg:hidden fixed inset-0 top-[56px] z-40 flex flex-col ${showMobilePreview ? 'block' : 'hidden'}`}>
        <div className="flex-1 relative">
          <LivePreview
            templateId={selectedTemplate}
            recipient={recipient}
            sender={sender}
            message={message}
            font={font}
            isMobile={true}
          />
        </div>

        <div className="bg-white/95 dark:bg-[#121214]/95 backdrop-blur-xl border-t border-gray-200 dark:border-[#2a2a2d]">
          <div className="flex border-b border-gray-100 dark:border-[#2a2a2d]">
            {[
              { id: "theme", label: "Theme" },
              { id: "style", label: "Style" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 py-3 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "text-rose-600 dark:text-rose-400 border-b-2 border-rose-500"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4">
            {activeTab === "theme" && (
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                {templates.map((template) => {
                  const style = previewStyles[template.id] || previewStyles.minimal;
                  return (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedTemplate === template.id
                          ? "border-rose-500 ring-2 ring-rose-200 dark:ring-rose-900"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <div className={`${style.bg} w-full h-full flex items-center justify-center`}>
                        {style.icon || <HeartIcon className="w-4 h-4 text-gray-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {activeTab === "style" && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  {fontOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setFont(option.id)}
                      className={`flex-1 px-3 py-3 rounded-xl text-sm transition-all ${option.class} ${
                        font === option.id
                          ? "bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 ring-2 ring-rose-300 dark:ring-rose-700"
                          : "bg-gray-100 dark:bg-[#232326] text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      Aa
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  {expirationOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setExpiration(option.id)}
                      className={`flex-1 px-3 py-2.5 rounded-xl text-xs transition-all ${
                        expiration === option.id
                          ? "bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 ring-2 ring-rose-300 dark:ring-rose-700"
                          : "bg-gray-100 dark:bg-[#232326] text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 whitespace-nowrap">loving.gg/</span>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={customLink}
                      onChange={(e) => setCustomLink(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ""))}
                      placeholder="custom-link"
                      maxLength={20}
                      className={`w-full px-3 py-2 bg-gray-50 dark:bg-[#232326] text-gray-900 dark:text-gray-100 border rounded-lg focus:outline-none transition-all placeholder:text-gray-400 text-xs ${
                        linkStatus === "available" ? "border-green-400" :
                        linkStatus === "taken" ? "border-red-400" :
                        "border-transparent"
                      }`}
                    />
                    {linkStatus === "checking" && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <div className="w-3 h-3 border-2 border-gray-300 border-t-rose-500 rounded-full animate-spin" />
                      </div>
                    )}
                    {linkStatus === "available" && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                    )}
                    {linkStatus === "taken" && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                {linkStatus === "taken" && linkSuggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {linkSuggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setCustomLink(s)}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-[#2a2a2d] text-gray-500 rounded hover:bg-rose-100 dark:hover:bg-rose-900/30 hover:text-rose-600 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

          <div className="px-4 pb-4 flex gap-3">
            <button
              type="button"
              onClick={() => setShowMobilePreview(false)}
              className="flex-1 py-3 px-4 rounded-xl font-medium bg-gray-100 dark:bg-[#232326] text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
              Edit
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isCreating || !recipient || !message || (customLink && linkStatus === "taken")}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-medium rounded-xl shadow-lg shadow-rose-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isCreating ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      </div>

      <div className={`lg:hidden ${showMobilePreview ? 'hidden' : 'block'}`}>
        <div className="min-h-[calc(100vh-72px-80px)] flex flex-col">
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            <div className="space-y-4 flex-1">
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1.5">To</label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Their name"
                  className="w-full px-4 py-3 bg-white dark:bg-[#1a1a1c] text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-[#2a2a2d] rounded-xl focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 dark:focus:ring-rose-900 transition-all placeholder:text-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1.5">From</label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-white dark:bg-[#1a1a1c] text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-[#2a2a2d] rounded-xl focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 dark:focus:ring-rose-900 transition-all placeholder:text-gray-400"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm text-gray-700 dark:text-gray-300">Message</label>
                  <button
                    type="button"
                    onClick={() => setShowIdeas(!showIdeas)}
                    className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                      showIdeas
                        ? "bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400"
                        : "bg-gray-100 dark:bg-[#232326] text-gray-600 dark:text-gray-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:text-rose-600 dark:hover:text-rose-400"
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                    Ideas
                  </button>
                </div>
                {showIdeas && (
                  <div className="mb-3 p-3 bg-rose-50 dark:bg-rose-950/30 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-rose-600 dark:text-rose-400">Tap to use:</p>
                      <button
                        type="button"
                        onClick={() => {
                          const randomIdea = messageIdeas[Math.floor(Math.random() * messageIdeas.length)];
                          setMessage(randomIdea);
                        }}
                        className="text-xs px-2.5 py-1 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                        </svg>
                        Random
                      </button>
                    </div>
                    <div className="flex flex-col gap-2">
                      {messageIdeas.map((idea, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setMessage(idea);
                            setShowIdeas(false);
                          }}
                          className="text-xs px-3 py-2 bg-white dark:bg-[#232326] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors text-left"
                        >
                          {idea}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write something from the heart..."
                  className="w-full px-4 py-3 bg-white dark:bg-[#1a1a1c] text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-[#2a2a2d] rounded-xl focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 dark:focus:ring-rose-900 transition-all resize-none placeholder:text-gray-400 min-h-[180px]"
                  required
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex w-full max-w-6xl mx-auto gap-6">
        <div className="flex flex-col gap-2 pt-1">
          {[
            { id: "write", label: "Write", icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            )},
            { id: "design", label: "Design", icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
              </svg>
            )},
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                (tab.id === "design" && activeTab !== "write") || (tab.id === "write" && activeTab === "write")
                  ? "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-white dark:bg-[#1a1a1c] rounded-2xl shadow-sm border border-gray-100 dark:border-[#2a2a2d] p-6">
          {activeTab === "write" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1.5">To</label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Their name"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#232326] text-gray-900 dark:text-gray-100 border border-transparent rounded-xl focus:outline-none focus:border-rose-300 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-rose-100 dark:focus:ring-rose-900 transition-all placeholder:text-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1.5">From</label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="Your name (optional)"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#232326] text-gray-900 dark:text-gray-100 border border-transparent rounded-xl focus:outline-none focus:border-rose-300 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-rose-100 dark:focus:ring-rose-900 transition-all placeholder:text-gray-400"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm text-gray-700 dark:text-gray-300">Message</label>
                  <button
                    type="button"
                    onClick={() => setShowIdeas(!showIdeas)}
                    className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                      showIdeas
                        ? "bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400"
                        : "bg-gray-100 dark:bg-[#232326] text-gray-600 dark:text-gray-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:text-rose-600 dark:hover:text-rose-400"
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                    Ideas
                  </button>
                </div>
                {showIdeas && (
                  <div className="mb-3 p-3 bg-rose-50 dark:bg-rose-950/30 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-rose-600 dark:text-rose-400">Click to use:</p>
                      <button
                        type="button"
                        onClick={() => {
                          const randomIdea = messageIdeas[Math.floor(Math.random() * messageIdeas.length)];
                          setMessage(randomIdea);
                        }}
                        className="text-xs px-2.5 py-1 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                        </svg>
                        Random
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {messageIdeas.map((idea, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setMessage(idea);
                            setShowIdeas(false);
                          }}
                          className="text-xs px-3 py-1.5 bg-white dark:bg-[#232326] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors text-left"
                        >
                          {idea.length > 50 ? idea.slice(0, 50) + "..." : idea}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write something from the heart..."
                  rows={10}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#232326] text-gray-900 dark:text-gray-100 border border-transparent rounded-xl focus:outline-none focus:border-rose-300 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-rose-100 dark:focus:ring-rose-900 transition-all resize-none placeholder:text-gray-400"
                  required
                />
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isCreating || !recipient || !message}
                className="w-full mt-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-medium rounded-full shadow-lg shadow-rose-500/30 hover:shadow-rose-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isCreating ? "Creating..." : "Create Website"}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Theme</p>
                <div className="flex gap-2 flex-wrap">
                  {templates.map((template) => {
                    const style = previewStyles[template.id] || previewStyles.minimal;
                    return (
                      <button
                        key={template.id}
                        type="button"
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                          selectedTemplate === template.id
                            ? "border-rose-500 ring-2 ring-rose-200 dark:ring-rose-900"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        <div className={`${style.bg} w-full h-full flex items-center justify-center`}>
                          {style.icon || <HeartIcon className="w-5 h-5 text-gray-400" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Font Style</p>
                <div className="flex gap-2">
                  {fontOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setFont(option.id)}
                      className={`flex-1 px-4 py-3 rounded-xl text-sm transition-all ${option.class} ${
                        font === option.id
                          ? "bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 ring-2 ring-rose-300 dark:ring-rose-700"
                          : "bg-gray-100 dark:bg-[#232326] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      Aa
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Link Duration</p>
                <div className="flex gap-2">
                  {expirationOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setExpiration(option.id)}
                      className={`flex-1 px-4 py-3 rounded-xl text-sm transition-all ${
                        expiration === option.id
                          ? "bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 ring-2 ring-rose-300 dark:ring-rose-700"
                          : "bg-gray-100 dark:bg-[#232326] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Custom Link</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">loving.gg/note/</span>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={customLink}
                      onChange={(e) => setCustomLink(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ""))}
                      placeholder="your-link"
                      maxLength={20}
                      className={`w-full px-3 py-2 bg-gray-50 dark:bg-[#232326] text-gray-900 dark:text-gray-100 border rounded-lg focus:outline-none transition-all placeholder:text-gray-400 text-sm ${
                        linkStatus === "available" ? "border-green-400 focus:border-green-500" :
                        linkStatus === "taken" ? "border-red-400 focus:border-red-500" :
                        "border-transparent focus:border-rose-300"
                      }`}
                    />
                    {linkStatus === "checking" && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-rose-500 rounded-full animate-spin" />
                      </div>
                    )}
                    {linkStatus === "available" && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                    )}
                    {linkStatus === "taken" && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                {linkStatus === "taken" && linkSuggestions.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Try:</p>
                    <div className="flex flex-wrap gap-1">
                      {linkSuggestions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setCustomLink(s)}
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-[#2a2a2d] text-gray-600 dark:text-gray-400 rounded hover:bg-rose-100 dark:hover:bg-rose-900/30 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {!customLink && (
                  <p className="text-xs text-gray-400 mt-1">Leave empty for random link</p>
                )}
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isCreating || !recipient || !message || (customLink && linkStatus === "taken")}
                className="w-full mt-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-medium rounded-full shadow-lg shadow-rose-500/30 hover:shadow-rose-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isCreating ? "Creating..." : "Create Website"}
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3 self-start">Live preview</p>
          <LivePreview
            templateId={selectedTemplate}
            recipient={recipient}
            sender={sender}
            message={message}
            font={font}
          />
        </div>
      </div>

      <div className={`fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-[#121214]/95 backdrop-blur-xl border-t border-gray-200 dark:border-[#2a2a2d] lg:hidden z-50 px-4 py-3 ${showMobilePreview ? 'hidden' : ''}`}>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setShowMobilePreview(true)}
            className="flex-1 py-3.5 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 bg-gray-100 dark:bg-[#232326] text-gray-700 dark:text-gray-300"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            Design
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isCreating || !recipient || !message}
            className="flex-1 py-3.5 px-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-medium rounded-xl shadow-lg shadow-rose-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isCreating ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </>
  );
}

export default function Create() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored === "dark" || (!stored && prefersDark);
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#fdfbf7] dark:bg-[#121214]">
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 lg:py-6">
        <Link href="/" className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          loving<span className="text-rose-500">.gg</span>
        </Link>
        {mounted && (
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            {isDark ? (
              <SunIcon className="w-5 h-5 text-white" />
            ) : (
              <MoonIcon className="w-5 h-5 text-gray-800" />
            )}
          </button>
        )}
      </nav>

      <div className="flex-1 px-4 lg:px-6 pb-24 lg:pb-8">
        <Suspense fallback={<div className="animate-pulse text-gray-500 dark:text-gray-400">Loading...</div>}>
          <CreateForm />
        </Suspense>
      </div>
    </main>
  );
}
