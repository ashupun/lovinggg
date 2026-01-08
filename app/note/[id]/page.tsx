"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { decodeNote, LoveNote, fontOptions } from "@/lib/store";

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

function MinimalTemplate({ note }: { note: LoveNote }) {
  const fontClass = fontOptions.find(f => f.id === note.font)?.class || "";
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`w-full max-w-md text-center ${fontClass}`}
      >
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-semibold text-gray-900 mb-8">
          {note.recipient}
        </h1>
        <p className="text-lg md:text-xl leading-relaxed text-gray-600 whitespace-pre-wrap">
          {note.message}
        </p>
        {note.sender && (
          <div className="mt-10 pt-6 border-t border-gray-100">
            <p className="text-gray-400 text-xs tracking-wide">{note.signoff}</p>
            <p className="text-xl text-gray-800 mt-1">{note.sender}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function RoseTemplate({ note }: { note: LoveNote }) {
  const fontClass = fontOptions.find(f => f.id === note.font)?.class || "";
  const positions = [
    { x: 5, y: 8 }, { x: 85, y: 15 }, { x: 25, y: 75 }, { x: 70, y: 85 }, { x: 45, y: 5 },
    { x: 12, y: 45 }, { x: 92, y: 55 }, { x: 35, y: 25 }, { x: 60, y: 65 }, { x: 78, y: 35 },
    { x: 8, y: 90 }, { x: 55, y: 40 }, { x: 20, y: 60 }, { x: 88, y: 78 }, { x: 40, y: 92 },
    { x: 65, y: 12 }, { x: 30, y: 50 }, { x: 95, y: 25 }, { x: 15, y: 30 }, { x: 75, y: 58 }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{
              y: [0, -40 + (i % 3) * 15, 0],
              x: [0, 25 * Math.sin(i * 0.7), 0],
              rotate: [0, 180, 360],
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 8 + (i % 5), repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
          >
            <HeartIcon className={`${i % 3 === 0 ? 'w-10 h-10' : i % 3 === 1 ? 'w-14 h-14' : 'w-7 h-7'} text-rose-200/50`} />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <div className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl border border-rose-100 text-center ${fontClass}`}>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-6"
          >
            <HeartIcon className="w-10 h-10 text-rose-400 mx-auto" />
          </motion.div>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-semibold text-rose-900 mb-6">
            {note.recipient}
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-rose-700 whitespace-pre-wrap">
            {note.message}
          </p>
          {note.sender && (
            <div className="mt-8 pt-6 border-t border-rose-100">
              <p className="text-rose-400 text-xs">{note.signoff}</p>
              <p className="text-xl text-rose-600 mt-1">{note.sender}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function MidnightTemplate({ note }: { note: LoveNote }) {
  const fontClass = fontOptions.find(f => f.id === note.font)?.class || "";
  const starPositions = [
    { x: 8, y: 12 }, { x: 92, y: 8 }, { x: 18, y: 82 }, { x: 78, y: 88 }, { x: 52, y: 6 },
    { x: 6, y: 48 }, { x: 88, y: 45 }, { x: 28, y: 32 }, { x: 68, y: 72 }, { x: 82, y: 28 },
    { x: 15, y: 68 }, { x: 58, y: 38 }, { x: 38, y: 58 }, { x: 72, y: 18 }, { x: 45, y: 88 },
    { x: 25, y: 15 }, { x: 62, y: 52 }, { x: 95, y: 68 }, { x: 3, y: 25 }, { x: 85, y: 62 }
  ];
  const dotPositions = [
    { x: 12, y: 5 }, { x: 88, y: 18 }, { x: 32, y: 72 }, { x: 65, y: 92 }, { x: 48, y: 15 },
    { x: 5, y: 55 }, { x: 92, y: 38 }, { x: 22, y: 42 }, { x: 75, y: 65 }, { x: 55, y: 28 },
    { x: 18, y: 88 }, { x: 42, y: 48 }, { x: 82, y: 82 }, { x: 35, y: 8 }, { x: 68, y: 35 },
    { x: 8, y: 72 }, { x: 58, y: 62 }, { x: 95, y: 48 }, { x: 28, y: 25 }, { x: 78, y: 5 }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {starPositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.4, 0.8],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 6 + (i % 4), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          >
            <StarIcon className={`${i % 4 === 0 ? 'w-8 h-8' : i % 4 === 1 ? 'w-12 h-12' : i % 4 === 2 ? 'w-5 h-5' : 'w-10 h-10'} text-amber-300/40`} />
          </motion.div>
        ))}
        {dotPositions.map((pos, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ opacity: [0.1, 0.9, 0.1], scale: [1, 1.8, 1] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className={`w-full max-w-md text-center relative z-10 ${fontClass}`}
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mb-6"
        >
          <StarIcon className="w-10 h-10 text-amber-300 mx-auto" />
        </motion.div>
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-semibold text-white mb-8">
          {note.recipient}
        </h1>
        <p className="text-lg md:text-xl leading-relaxed text-slate-200 whitespace-pre-wrap">
          {note.message}
        </p>
        {note.sender && (
          <div className="mt-10">
            <p className="text-slate-400 text-xs">{note.signoff}</p>
            <p className="text-xl text-amber-300 mt-1">{note.sender}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function LavenderTemplate({ note }: { note: LoveNote }) {
  const fontClass = fontOptions.find(f => f.id === note.font)?.class || "";
  const positions = [
    { x: 8, y: 15, type: 0 }, { x: 88, y: 22, type: 1 }, { x: 22, y: 78, type: 2 }, { x: 72, y: 82, type: 0 },
    { x: 48, y: 8, type: 1 }, { x: 5, y: 52, type: 2 }, { x: 92, y: 58, type: 0 }, { x: 32, y: 28, type: 1 },
    { x: 62, y: 68, type: 2 }, { x: 80, y: 38, type: 0 }, { x: 15, y: 88, type: 1 }, { x: 55, y: 42, type: 2 },
    { x: 25, y: 62, type: 0 }, { x: 85, y: 75, type: 1 }, { x: 42, y: 92, type: 2 }, { x: 68, y: 15, type: 0 }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{
              y: [0, -35 + (i % 3) * 10, 0],
              x: [0, 20 * Math.sin(i * 0.8), 0],
              rotate: [0, 20, -20, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 7 + (i % 4), repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
          >
            {pos.type === 0 ? (
              <HeartIcon className={`${i % 2 === 0 ? 'w-12 h-12' : 'w-8 h-8'} text-violet-300/45`} />
            ) : pos.type === 1 ? (
              <FlowerIcon className={`${i % 2 === 0 ? 'w-14 h-14' : 'w-10 h-10'} text-fuchsia-200/35`} />
            ) : (
              <StarIcon className={`${i % 2 === 0 ? 'w-10 h-10' : 'w-6 h-6'} text-purple-300/45`} />
            )}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <div className={`bg-white/60 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-2xl border border-purple-100 text-center ${fontClass}`}>
          <div className="flex justify-center gap-2 mb-6">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -8, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              >
                <HeartIcon className="w-8 h-8 text-violet-400" />
              </motion.div>
            ))}
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-semibold text-violet-900 mb-6">
            {note.recipient}
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-violet-700 whitespace-pre-wrap">
            {note.message}
          </p>
          {note.sender && (
            <div className="mt-8 pt-6 border-t border-purple-100">
              <p className="text-violet-400 text-xs">{note.signoff}</p>
              <p className="text-xl text-violet-600 mt-1">{note.sender}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function SunsetTemplate({ note }: { note: LoveNote }) {
  const fontClass = fontOptions.find(f => f.id === note.font)?.class || "";
  const cloudPositions = [
    { x: 5, y: 8 }, { x: 75, y: 12 }, { x: 25, y: 25 }, { x: 88, y: 35 },
    { x: 45, y: 18 }, { x: 12, y: 38 }, { x: 65, y: 5 }, { x: 35, y: 32 }
  ];
  const sparklePositions = [
    { x: 10, y: 55 }, { x: 85, y: 62 }, { x: 28, y: 78 }, { x: 72, y: 85 }, { x: 50, y: 48 },
    { x: 8, y: 72 }, { x: 92, y: 75 }, { x: 38, y: 65 }, { x: 62, y: 58 }, { x: 18, y: 88 },
    { x: 78, y: 45 }, { x: 55, y: 92 }, { x: 42, y: 52 }, { x: 68, y: 68 }, { x: 22, y: 42 }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 via-orange-100 to-rose-200 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {cloudPositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{
              x: [0, 40, 0],
              y: [0, 10, 0],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ duration: 10 + (i % 4), repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
          >
            <CloudIcon className={`${i % 2 === 0 ? 'w-28 h-18' : 'w-20 h-12'} text-white/50`} />
          </motion.div>
        ))}
        {sparklePositions.map((pos, i) => (
          <motion.div
            key={`ray-${i}`}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, 30, 0]
            }}
            transition={{ duration: 5 + (i % 4), repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
          >
            <StarIcon className={`${i % 3 === 0 ? 'w-10 h-10' : 'w-6 h-6'} text-amber-300/45`} />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className={`w-full max-w-md text-center relative z-10 ${fontClass}`}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], boxShadow: ['0 0 30px rgba(251,191,36,0.4)', '0 0 60px rgba(251,191,36,0.6)', '0 0 30px rgba(251,191,36,0.4)'] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 mx-auto mb-8 shadow-lg shadow-orange-300/50"
        />
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-semibold text-amber-900 mb-8">
          {note.recipient}
        </h1>
        <p className="text-lg md:text-xl leading-relaxed text-amber-800 whitespace-pre-wrap">
          {note.message}
        </p>
        {note.sender && (
          <div className="mt-10">
            <p className="text-orange-400 text-xs">{note.signoff}</p>
            <p className="text-xl text-orange-600 mt-1">{note.sender}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function OceanTemplate({ note }: { note: LoveNote }) {
  const fontClass = fontOptions.find(f => f.id === note.font)?.class || "";
  const bubblePositions = [
    { x: 8 }, { x: 22 }, { x: 38 }, { x: 52 }, { x: 68 }, { x: 82 }, { x: 95 },
    { x: 15 }, { x: 32 }, { x: 45 }, { x: 58 }, { x: 75 }, { x: 88 }, { x: 5 },
    { x: 28 }, { x: 42 }, { x: 62 }, { x: 78 }, { x: 92 }, { x: 12 }
  ];
  const starPositions = [
    { x: 10, y: 15 }, { x: 85, y: 22 }, { x: 25, y: 35 }, { x: 72, y: 18 },
    { x: 48, y: 28 }, { x: 5, y: 45 }, { x: 92, y: 52 }, { x: 35, y: 42 },
    { x: 62, y: 12 }, { x: 18, y: 58 }, { x: 78, y: 38 }, { x: 55, y: 48 }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-cyan-50 to-blue-100 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`wave-${i}`}
            className="absolute left-0 right-0 bg-gradient-to-t from-cyan-200/35 to-transparent"
            style={{ bottom: `${i * 60}px`, height: `${25 + i * 10}px` }}
            animate={{ x: [0, 50, 0], opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
          />
        ))}
        {bubblePositions.map((pos, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full bg-white/45"
            style={{
              left: `${pos.x}%`,
              bottom: `-5%`,
              width: `${12 + (i % 4) * 8}px`,
              height: `${12 + (i % 4) * 8}px`
            }}
            animate={{
              y: [0, -900],
              x: [0, 35 * Math.sin(i * 0.6), 0],
              opacity: [0.7, 0.35, 0]
            }}
            transition={{ duration: 10 + (i % 6), repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
          />
        ))}
        {starPositions.map((pos, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.25, 0.55, 0.25], rotate: [0, 180, 360] }}
            transition={{ duration: 7 + (i % 4), repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
          >
            <StarIcon className={`${i % 2 === 0 ? 'w-8 h-8' : 'w-5 h-5'} text-cyan-300/40`} />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`w-full max-w-md text-center relative z-10 ${fontClass}`}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex justify-center gap-2 mb-6"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, i % 2 === 0 ? -6 : -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
              className={`${i === 2 ? 'w-4 h-4' : 'w-3 h-3'} rounded-full bg-cyan-400`}
            />
          ))}
        </motion.div>
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-semibold text-sky-900 mb-8">
          {note.recipient}
        </h1>
        <p className="text-lg md:text-xl leading-relaxed text-sky-700 whitespace-pre-wrap">
          {note.message}
        </p>
        {note.sender && (
          <div className="mt-10">
            <p className="text-cyan-400 text-xs">{note.signoff}</p>
            <p className="text-xl text-cyan-600 mt-1">{note.sender}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function HelloKittyTemplate({ note }: { note: LoveNote }) {
  const fontClass = fontOptions.find(f => f.id === note.font)?.class || "";
  const positions = [
    { x: 5, y: 12, type: 0 }, { x: 88, y: 8, type: 1 }, { x: 22, y: 78, type: 2 }, { x: 72, y: 85, type: 0 },
    { x: 48, y: 5, type: 1 }, { x: 8, y: 48, type: 2 }, { x: 92, y: 52, type: 0 }, { x: 32, y: 28, type: 1 },
    { x: 62, y: 68, type: 2 }, { x: 78, y: 32, type: 0 }, { x: 15, y: 88, type: 1 }, { x: 55, y: 42, type: 2 },
    { x: 25, y: 58, type: 0 }, { x: 85, y: 72, type: 1 }, { x: 42, y: 92, type: 2 }, { x: 68, y: 18, type: 0 },
    { x: 12, y: 35, type: 1 }, { x: 95, y: 38, type: 2 }, { x: 38, y: 15, type: 0 }, { x: 75, y: 55, type: 1 }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{
              y: [0, -35 + (i % 3) * 12, 0],
              x: [0, 25 * Math.sin(i * 0.6), 0],
              rotate: [0, 25, -25, 0],
              scale: [1, 1.25, 1]
            }}
            transition={{ duration: 7 + (i % 4), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          >
            {pos.type === 0 ? (
              <HeartIcon className={`${i % 2 === 0 ? 'w-12 h-12' : 'w-8 h-8'} text-red-200/55`} />
            ) : pos.type === 1 ? (
              <FlowerIcon className={`${i % 2 === 0 ? 'w-14 h-14' : 'w-10 h-10'} text-pink-200/45`} />
            ) : (
              <StarIcon className={`${i % 2 === 0 ? 'w-10 h-10' : 'w-6 h-6'} text-red-100/55`} />
            )}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <div className={`bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl border-2 border-red-100 text-center ${fontClass}`}>
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="mb-5">
            <Image src="/hellokittyicon.jpg" alt="Hello Kitty" width={64} height={64} className="rounded-xl mx-auto" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-6">{note.recipient}</h1>
          <p className="text-base md:text-lg leading-relaxed text-pink-700 whitespace-pre-wrap">{note.message}</p>
          {note.sender && (
            <div className="mt-8 pt-6 border-t border-red-100">
              <p className="text-pink-400 text-xs">{note.signoff}</p>
              <p className="text-xl text-red-500 font-bold mt-1">{note.sender}</p>
            </div>
          )}
          <div className="flex justify-center gap-1.5 mt-5">
            {[...Array(5)].map((_, i) => (
              <motion.div key={i} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}>
                <HeartIcon className="w-3 h-3 text-red-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function KuromiTemplate({ note }: { note: LoveNote }) {
  const fontClass = fontOptions.find(f => f.id === note.font)?.class || "";
  const positions = [
    { x: 8, y: 10 }, { x: 88, y: 15 }, { x: 18, y: 82 }, { x: 75, y: 88 }, { x: 52, y: 5 },
    { x: 5, y: 45 }, { x: 92, y: 48 }, { x: 28, y: 32 }, { x: 68, y: 72 }, { x: 82, y: 28 },
    { x: 15, y: 68 }, { x: 58, y: 38 }, { x: 38, y: 58 }, { x: 72, y: 18 }, { x: 45, y: 88 },
    { x: 25, y: 15 }, { x: 62, y: 52 }, { x: 95, y: 65 }, { x: 3, y: 25 }, { x: 85, y: 58 }
  ];
  const dotPositions = [
    { x: 12, y: 8 }, { x: 85, y: 22 }, { x: 32, y: 75 }, { x: 65, y: 92 }, { x: 48, y: 18 },
    { x: 8, y: 52 }, { x: 92, y: 35 }, { x: 22, y: 42 }, { x: 75, y: 62 }, { x: 55, y: 28 },
    { x: 18, y: 85 }, { x: 42, y: 48 }, { x: 82, y: 78 }, { x: 35, y: 12 }, { x: 68, y: 38 }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{
              opacity: [0.15, 0.6, 0.15],
              scale: [0.8, 1.4, 0.8],
              rotate: [0, 360],
              y: [0, -25, 0]
            }}
            transition={{ duration: 6 + (i % 4), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          >
            {i % 2 === 0 ? (
              <StarIcon className={`${i % 4 === 0 ? 'w-10 h-10' : 'w-6 h-6'} text-pink-500/50`} />
            ) : (
              <HeartIcon className={`${i % 4 === 1 ? 'w-12 h-12' : 'w-8 h-8'} text-purple-400/40`} />
            )}
          </motion.div>
        ))}
        {dotPositions.map((pos, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-2 h-2 bg-pink-400/35 rounded-full"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.8, 1] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <div className={`bg-black/70 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-purple-500/30 shadow-2xl shadow-purple-500/20 text-center ${fontClass}`}>
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="mb-5">
            <Image src="/kuromiicon.jpg" alt="Kuromi" width={64} height={64} className="rounded-xl mx-auto" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-6">{note.recipient}</h1>
          <p className="text-base md:text-lg leading-relaxed text-purple-200 whitespace-pre-wrap">{note.message}</p>
          {note.sender && (
            <div className="mt-8">
              <p className="text-purple-400 text-xs">{note.signoff}</p>
              <p className="text-xl text-pink-400 font-bold mt-1">{note.sender}</p>
            </div>
          )}
          <div className="flex justify-center gap-2 mt-5">
            <HeartIcon className="w-4 h-4 text-pink-500" />
            <StarIcon className="w-4 h-4 text-purple-400" />
            <HeartIcon className="w-4 h-4 text-pink-500" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MyMelodyTemplate({ note }: { note: LoveNote }) {
  const fontClass = fontOptions.find(f => f.id === note.font)?.class || "";
  const positions = [
    { x: 8, y: 12, type: 0 }, { x: 85, y: 18, type: 1 }, { x: 22, y: 75, type: 2 }, { x: 72, y: 82, type: 0 },
    { x: 48, y: 8, type: 1 }, { x: 5, y: 48, type: 2 }, { x: 92, y: 55, type: 0 }, { x: 32, y: 25, type: 1 },
    { x: 62, y: 65, type: 2 }, { x: 78, y: 35, type: 0 }, { x: 15, y: 85, type: 1 }, { x: 55, y: 42, type: 2 },
    { x: 25, y: 55, type: 0 }, { x: 88, y: 72, type: 1 }, { x: 42, y: 92, type: 2 }, { x: 68, y: 15, type: 0 }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{
              y: [0, -40 + (i % 3) * 12, 0],
              x: [0, 30 * Math.sin(i * 0.7), 0],
              rotate: [0, 35, -35, 0],
              scale: [1, 1.25, 1]
            }}
            transition={{ duration: 8 + (i % 5), repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
          >
            {pos.type === 0 ? (
              <FlowerIcon className={`${i % 2 === 0 ? 'w-16 h-16' : 'w-12 h-12'} text-pink-200/45`} />
            ) : pos.type === 1 ? (
              <HeartIcon className={`${i % 2 === 0 ? 'w-12 h-12' : 'w-8 h-8'} text-rose-200/45`} />
            ) : (
              <StarIcon className={`${i % 2 === 0 ? 'w-10 h-10' : 'w-6 h-6'} text-pink-300/35`} />
            )}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <div className={`bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl border border-pink-200 text-center ${fontClass}`}>
          <motion.div animate={{ rotate: [-3, 3, -3] }} transition={{ duration: 2, repeat: Infinity }} className="mb-5">
            <Image src="/mymelodyicon.jpg" alt="My Melody" width={64} height={64} className="rounded-xl mx-auto" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-semibold text-pink-600 mb-6">{note.recipient}</h1>
          <p className="text-base md:text-lg leading-relaxed text-pink-700 whitespace-pre-wrap">{note.message}</p>
          {note.sender && (
            <div className="mt-8 pt-6 border-t border-pink-100">
              <p className="text-pink-300 text-xs">{note.signoff}</p>
              <p className="text-xl text-pink-500 mt-1">{note.sender}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function CinnamorollTemplate({ note }: { note: LoveNote }) {
  const fontClass = fontOptions.find(f => f.id === note.font)?.class || "";
  const cloudPositions = [
    { x: 5, y: 10 }, { x: 78, y: 8 }, { x: 25, y: 35 }, { x: 88, y: 42 },
    { x: 45, y: 18 }, { x: 12, y: 55 }, { x: 65, y: 28 }, { x: 92, y: 65 },
    { x: 35, y: 75 }, { x: 55, y: 85 }, { x: 8, y: 82 }, { x: 72, y: 52 }
  ];
  const starPositions = [
    { x: 18, y: 22 }, { x: 82, y: 18 }, { x: 32, y: 62 }, { x: 68, y: 78 },
    { x: 52, y: 42 }, { x: 8, y: 38 }, { x: 92, y: 28 }, { x: 42, y: 88 }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-blue-50 to-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {cloudPositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ x: [0, 35, 0], y: [0, -15, 0] }}
            transition={{ duration: 10 + (i % 5), repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
          >
            <CloudIcon className={`${i % 2 === 0 ? 'w-24 h-14' : 'w-18 h-12'} text-white/70 drop-shadow-sm`} />
          </motion.div>
        ))}
        {starPositions.map((pos, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3], rotate: [0, 180, 360] }}
            transition={{ duration: 6 + (i % 3), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          >
            <StarIcon className={`${i % 2 === 0 ? 'w-8 h-8' : 'w-5 h-5'} text-sky-200/50`} />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <div className={`bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-lg border border-sky-100 text-center ${fontClass}`}>
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }} className="mb-5">
            <Image src="/cinnamorollicon.jpg" alt="Cinnamoroll" width={64} height={64} className="rounded-xl mx-auto" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-semibold text-sky-600 mb-6">{note.recipient}</h1>
          <p className="text-base md:text-lg leading-relaxed text-sky-700 whitespace-pre-wrap">{note.message}</p>
          {note.sender && (
            <div className="mt-8 pt-6 border-t border-sky-100">
              <p className="text-sky-300 text-xs">{note.signoff}</p>
              <p className="text-xl text-sky-500 mt-1">{note.sender}</p>
            </div>
          )}
          <div className="flex justify-center gap-3 mt-5">
            {[...Array(3)].map((_, i) => (
              <motion.div key={i} animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>
                <HeartIcon className="w-4 h-4 text-sky-200" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function BadtzMaruTemplate({ note }: { note: LoveNote }) {
  const fontClass = fontOptions.find(f => f.id === note.font)?.class || "";
  const positions = [
    { x: 8, y: 12 }, { x: 88, y: 8 }, { x: 22, y: 78 }, { x: 75, y: 85 },
    { x: 48, y: 5 }, { x: 5, y: 45 }, { x: 92, y: 52 }, { x: 32, y: 28 },
    { x: 65, y: 68 }, { x: 82, y: 32 }, { x: 15, y: 88 }, { x: 55, y: 42 },
    { x: 25, y: 58 }, { x: 85, y: 72 }, { x: 42, y: 92 }, { x: 68, y: 18 }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ rotate: [0, 360], opacity: [0.15, 0.45, 0.15], scale: [1, 1.3, 1] }}
            transition={{ duration: 8 + (i % 5), repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
          >
            <BoltIcon className={`${i % 3 === 0 ? 'w-10 h-10' : i % 3 === 1 ? 'w-7 h-7' : 'w-5 h-5'} text-yellow-400/35`} />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className={`bg-zinc-800/90 backdrop-blur-sm rounded-xl p-8 md:p-10 border border-yellow-400/30 shadow-xl text-center ${fontClass}`}>
          <motion.div animate={{ rotate: [-10, 10, -10] }} transition={{ duration: 1, repeat: Infinity }} className="mb-5">
            <Image src="/badtzmaruicon.jpg" alt="Badtz-Maru" width={64} height={64} className="rounded-xl mx-auto" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-6">{note.recipient}</h1>
          <p className="text-base md:text-lg leading-relaxed text-zinc-300 whitespace-pre-wrap">{note.message}</p>
          {note.sender && (
            <div className="mt-8">
              <p className="text-zinc-500 text-xs">{note.signoff}</p>
              <p className="text-xl text-yellow-400 font-bold mt-1">{note.sender}</p>
            </div>
          )}
          <div className="flex justify-center mt-5">
            <BoltIcon className="w-6 h-6 text-yellow-400" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function PompompurinTemplate({ note }: { note: LoveNote }) {
  const fontClass = fontOptions.find(f => f.id === note.font)?.class || "";
  const positions = [
    { x: 8, y: 15, type: 0 }, { x: 88, y: 12, type: 1 }, { x: 22, y: 75, type: 0 }, { x: 72, y: 82, type: 1 },
    { x: 48, y: 8, type: 0 }, { x: 5, y: 48, type: 1 }, { x: 92, y: 55, type: 0 }, { x: 32, y: 28, type: 1 },
    { x: 62, y: 65, type: 0 }, { x: 78, y: 35, type: 1 }, { x: 15, y: 88, type: 0 }, { x: 55, y: 42, type: 1 },
    { x: 25, y: 58, type: 0 }, { x: 85, y: 72, type: 1 }, { x: 42, y: 92, type: 0 }, { x: 68, y: 18, type: 1 }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{
              y: [0, -20 + (i % 3) * 8, 0],
              x: [0, 15 * Math.sin(i * 0.5), 0],
              rotate: [0, 15, -15, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 6 + (i % 4), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          >
            {pos.type === 0 ? (
              <StarIcon className={`${i % 2 === 0 ? 'w-10 h-10' : 'w-7 h-7'} text-amber-200/55`} />
            ) : (
              <HeartIcon className={`${i % 2 === 0 ? 'w-8 h-8' : 'w-6 h-6'} text-yellow-300/45`} />
            )}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <div className={`bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl border-2 border-amber-200 text-center ${fontClass}`}>
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity }} className="mb-5">
            <Image src="/pompompurinicon.jpg" alt="Pompompurin" width={64} height={64} className="rounded-xl mx-auto" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-amber-700 mb-6">{note.recipient}</h1>
          <p className="text-base md:text-lg leading-relaxed text-amber-800 whitespace-pre-wrap">{note.message}</p>
          {note.sender && (
            <div className="mt-8 pt-6 border-t border-amber-100">
              <p className="text-amber-400 text-xs">{note.signoff}</p>
              <p className="text-xl text-amber-600 font-bold mt-1">{note.sender}</p>
            </div>
          )}
          <div className="flex justify-center gap-2 mt-5">
            <HeartIcon className="w-4 h-4 text-amber-300" />
            <StarIcon className="w-4 h-4 text-yellow-400" />
            <HeartIcon className="w-4 h-4 text-amber-300" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MySweetPianoTemplate({ note }: { note: LoveNote }) {
  const fontClass = fontOptions.find(f => f.id === note.font)?.class || "";
  const positions = [
    { x: 8, y: 12, type: 0 }, { x: 85, y: 18, type: 1 }, { x: 22, y: 78, type: 2 }, { x: 72, y: 85, type: 0 },
    { x: 48, y: 5, type: 1 }, { x: 5, y: 48, type: 2 }, { x: 92, y: 52, type: 0 }, { x: 32, y: 28, type: 1 },
    { x: 62, y: 65, type: 2 }, { x: 78, y: 35, type: 0 }, { x: 15, y: 88, type: 1 }, { x: 55, y: 42, type: 2 },
    { x: 25, y: 58, type: 0 }, { x: 88, y: 72, type: 1 }, { x: 42, y: 92, type: 2 }, { x: 68, y: 15, type: 0 }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{
              y: [0, -25 + (i % 3) * 8, 0],
              x: [0, 18 * Math.sin(i * 0.6), 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 6 + (i % 4), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          >
            {pos.type === 0 ? (
              <StarIcon className={`${i % 2 === 0 ? 'w-10 h-10' : 'w-6 h-6'} text-pink-200/55`} />
            ) : pos.type === 1 ? (
              <HeartIcon className={`${i % 2 === 0 ? 'w-8 h-8' : 'w-5 h-5'} text-rose-200/50`} />
            ) : (
              <FlowerIcon className={`${i % 2 === 0 ? 'w-12 h-12' : 'w-8 h-8'} text-pink-100/45`} />
            )}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <div className={`bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl border border-pink-200 text-center ${fontClass}`}>
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="mb-5">
            <Image src="/mysweetpianoicon.jpg" alt="My Sweet Piano" width={64} height={64} className="rounded-xl mx-auto" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-semibold text-pink-600 mb-6">{note.recipient}</h1>
          <p className="text-base md:text-lg leading-relaxed text-pink-700 whitespace-pre-wrap">{note.message}</p>
          {note.sender && (
            <div className="mt-8 pt-6 border-t border-pink-100">
              <p className="text-pink-300 text-xs">{note.signoff}</p>
              <p className="text-xl text-pink-500 mt-1">{note.sender}</p>
            </div>
          )}
          <div className="flex justify-center gap-1.5 mt-5">
            {[...Array(3)].map((_, i) => (
              <motion.div key={i} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}>
                <HeartIcon className="w-3 h-3 text-pink-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function BakuTemplate({ note }: { note: LoveNote }) {
  const fontClass = fontOptions.find(f => f.id === note.font)?.class || "";
  const positions = [
    { x: 8, y: 12 }, { x: 88, y: 18 }, { x: 22, y: 78 }, { x: 72, y: 82 },
    { x: 48, y: 8 }, { x: 5, y: 48 }, { x: 92, y: 55 }, { x: 32, y: 28 },
    { x: 62, y: 65 }, { x: 78, y: 35 }, { x: 15, y: 88 }, { x: 55, y: 42 },
    { x: 25, y: 58 }, { x: 85, y: 72 }, { x: 42, y: 92 }, { x: 68, y: 15 }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-violet-100 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{
              opacity: [0.15, 0.5, 0.15],
              y: [0, -20, 0],
              x: [0, 12 * Math.sin(i * 0.5), 0],
              scale: [1, 1.25, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 5 + (i % 4), repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
          >
            <StarIcon className={`${i % 3 === 0 ? 'w-8 h-8' : i % 3 === 1 ? 'w-5 h-5' : 'w-10 h-10'} text-indigo-300/50`} />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <div className={`bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-xl border border-indigo-200 text-center ${fontClass}`}>
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="mb-5">
            <Image src="/bakuicon.jpg" alt="Baku" width={64} height={64} className="rounded-xl mx-auto" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-semibold text-indigo-700 mb-6">{note.recipient}</h1>
          <p className="text-base md:text-lg leading-relaxed text-purple-700 whitespace-pre-wrap">{note.message}</p>
          {note.sender && (
            <div className="mt-8 pt-6 border-t border-indigo-100">
              <p className="text-indigo-300 text-xs">{note.signoff}</p>
              <p className="text-xl text-indigo-600 mt-1">{note.sender}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function TuxedoSamTemplate({ note }: { note: LoveNote }) {
  const fontClass = fontOptions.find(f => f.id === note.font)?.class || "";
  const positions = [
    { x: 8, y: 15, type: 0 }, { x: 85, y: 12, type: 1 }, { x: 22, y: 78, type: 0 }, { x: 72, y: 85, type: 1 },
    { x: 48, y: 8, type: 0 }, { x: 5, y: 52, type: 1 }, { x: 92, y: 48, type: 0 }, { x: 32, y: 28, type: 1 },
    { x: 62, y: 68, type: 0 }, { x: 78, y: 38, type: 1 }, { x: 15, y: 88, type: 0 }, { x: 55, y: 42, type: 1 },
    { x: 25, y: 55, type: 0 }, { x: 88, y: 72, type: 1 }, { x: 42, y: 92, type: 0 }, { x: 68, y: 18, type: 1 }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-slate-50 to-blue-50 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{
              y: [0, -20 + (i % 3) * 8, 0],
              x: [0, 15 * Math.sin(i * 0.5), 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 6 + (i % 4), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          >
            {pos.type === 0 ? (
              <StarIcon className={`${i % 2 === 0 ? 'w-10 h-10' : 'w-6 h-6'} text-blue-200/50`} />
            ) : (
              <HeartIcon className={`${i % 2 === 0 ? 'w-8 h-8' : 'w-5 h-5'} text-sky-200/45`} />
            )}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <div className={`bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-xl border border-blue-200 text-center ${fontClass}`}>
          <motion.div animate={{ rotate: [-3, 3, -3] }} transition={{ duration: 2, repeat: Infinity }} className="mb-5">
            <Image src="/tuzedosamicon.jpg" alt="Tuxedo Sam" width={64} height={64} className="rounded-xl mx-auto" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-semibold text-blue-700 mb-6">{note.recipient}</h1>
          <p className="text-base md:text-lg leading-relaxed text-slate-700 whitespace-pre-wrap">{note.message}</p>
          {note.sender && (
            <div className="mt-8 pt-6 border-t border-blue-100">
              <p className="text-blue-300 text-xs">{note.signoff}</p>
              <p className="text-xl text-blue-600 mt-1">{note.sender}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function PochaccoTemplate({ note }: { note: LoveNote }) {
  const fontClass = fontOptions.find(f => f.id === note.font)?.class || "";
  const positions = [
    { x: 8, y: 12, type: 0 }, { x: 88, y: 18, type: 1 }, { x: 22, y: 75, type: 0 }, { x: 72, y: 82, type: 1 },
    { x: 48, y: 5, type: 0 }, { x: 5, y: 48, type: 1 }, { x: 92, y: 55, type: 0 }, { x: 32, y: 28, type: 1 },
    { x: 62, y: 65, type: 0 }, { x: 78, y: 35, type: 1 }, { x: 15, y: 88, type: 0 }, { x: 55, y: 42, type: 1 },
    { x: 25, y: 58, type: 0 }, { x: 85, y: 72, type: 1 }, { x: 42, y: 92, type: 0 }, { x: 68, y: 15, type: 1 }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{
              y: [0, -25 + (i % 3) * 10, 0],
              x: [0, 18 * Math.sin(i * 0.6), 0],
              scale: [1, 1.25, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 5 + (i % 4), repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
          >
            {pos.type === 0 ? (
              <StarIcon className={`${i % 2 === 0 ? 'w-10 h-10' : 'w-6 h-6'} text-emerald-200/55`} />
            ) : (
              <HeartIcon className={`${i % 2 === 0 ? 'w-8 h-8' : 'w-5 h-5'} text-teal-200/45`} />
            )}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <div className={`bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl border border-emerald-200 text-center ${fontClass}`}>
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="mb-5">
            <Image src="/pochaccoicon.jpg" alt="Pochacco" width={64} height={64} className="rounded-xl mx-auto" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-6">{note.recipient}</h1>
          <p className="text-base md:text-lg leading-relaxed text-teal-700 whitespace-pre-wrap">{note.message}</p>
          {note.sender && (
            <div className="mt-8 pt-6 border-t border-emerald-100">
              <p className="text-emerald-400 text-xs">{note.signoff}</p>
              <p className="text-xl text-emerald-600 font-bold mt-1">{note.sender}</p>
            </div>
          )}
          <div className="flex justify-center gap-1.5 mt-5">
            {[...Array(3)].map((_, i) => (
              <motion.div key={i} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}>
                <HeartIcon className="w-3 h-3 text-emerald-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const templateComponents: Record<string, React.FC<{ note: LoveNote }>> = {
  minimal: MinimalTemplate,
  rose: RoseTemplate,
  midnight: MidnightTemplate,
  lavender: LavenderTemplate,
  sunset: SunsetTemplate,
  ocean: OceanTemplate,
  hellokitty: HelloKittyTemplate,
  cinnamoroll: CinnamorollTemplate,
  pompompurin: PompompurinTemplate,
  mysweetpiano: MySweetPianoTemplate,
  badtzmaru: BadtzMaruTemplate,
  baku: BakuTemplate,
  mymelody: MyMelodyTemplate,
  tuxedosam: TuxedoSamTemplate,
  kuromi: KuromiTemplate,
  pochacco: PochaccoTemplate,
};

function NoteContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const isNew = searchParams.get("new") === "true";
  const [note, setNote] = useState<LoveNote | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    const found = decodeNote(id);
    setNote(found);
    setLoading(false);
  }, [params.id]);

  const copyLink = async () => {
    const url = window.location.href.replace("?new=true", "");
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7] dark:bg-[#0f0f0f]">
        <div className="animate-pulse text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#fdfbf7] dark:bg-[#0f0f0f]">
        <div className="text-center">
          <HeartIcon className="w-12 h-12 text-rose-300 mx-auto mb-6" />
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Note not found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">This love website doesn&apos;t exist.</p>
          <Link href="/create" className="inline-flex px-6 py-3 bg-rose-500 text-white font-medium rounded-full hover:bg-rose-600 transition-colors">
            Create your own
          </Link>
        </div>
      </div>
    );
  }

  const TemplateComponent = templateComponents[note.template] || MinimalTemplate;

  return (
    <div className="relative">
      {isNew && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-white rounded-full px-5 py-3 shadow-xl border border-gray-100 flex items-center gap-4">
            <p className="text-sm text-gray-600">Your website is ready!</p>
            <button
              onClick={copyLink}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${copied ? "bg-green-100 text-green-700" : "bg-rose-500 text-white hover:bg-rose-600"}`}
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </motion.div>
      )}
      <TemplateComponent note={note} />
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
        <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
          Made with loving.gg
        </Link>
      </div>
    </div>
  );
}

export default function ViewNote() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7] dark:bg-[#0f0f0f]">
          <div className="animate-pulse text-gray-500 dark:text-gray-400">Loading...</div>
        </div>
      }
    >
      <NoteContent />
    </Suspense>
  );
}
