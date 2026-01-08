"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getNote, LoveNote } from "@/lib/store";

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
    <ellipse cx="16" cy="22" rx="10" ry="8" />
    <ellipse cx="48" cy="22" rx="10" ry="8" />
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

function MinimalTemplate({ note }: { note: LoveNote }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-xl text-center"
      >
        <p className="text-gray-400 text-sm tracking-widest uppercase mb-4">For</p>
        <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-semibold text-gray-900 mb-12">
          {note.recipient}
        </h1>
        <div className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl leading-relaxed text-gray-700 whitespace-pre-wrap">
          {note.message}
        </div>
        {note.sender && (
          <div className="mt-16 pt-8 border-t border-gray-100">
            <p className="text-gray-400 text-sm">With love,</p>
            <p className="font-[family-name:var(--font-playfair)] text-2xl text-gray-900 mt-1">{note.sender}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function RoseTemplate({ note }: { note: LoveNote }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-lg"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 md:p-14 shadow-xl border border-rose-100">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center mb-8"
          >
            <HeartIcon className="w-12 h-12 text-rose-400" />
          </motion.div>
          <p className="text-rose-400 text-center text-sm font-medium tracking-wide uppercase mb-2">
            A love note for
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-semibold text-rose-900 text-center mb-10">
            {note.recipient}
          </h1>
          <div className="font-[family-name:var(--font-playfair)] text-lg md:text-xl leading-relaxed text-rose-800 whitespace-pre-wrap text-center">
            {note.message}
          </div>
          {note.sender && (
            <div className="mt-12 text-center">
              <p className="text-rose-400 text-sm">Forever yours,</p>
              <p className="font-[family-name:var(--font-playfair)] text-2xl text-rose-700 mt-1">{note.sender}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function MidnightTemplate({ note }: { note: LoveNote }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-xl text-center relative z-10"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="flex justify-center mb-8"
        >
          <StarIcon className="w-12 h-12 text-amber-300" />
        </motion.div>
        <p className="text-amber-300/70 text-sm tracking-widest uppercase mb-4">To my dearest</p>
        <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-semibold text-white mb-12">
          {note.recipient}
        </h1>
        <div className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl leading-relaxed text-slate-200 whitespace-pre-wrap">
          {note.message}
        </div>
        {note.sender && (
          <div className="mt-16">
            <p className="text-slate-400 text-sm">Under the stars,</p>
            <p className="font-[family-name:var(--font-playfair)] text-2xl text-amber-300 mt-1">{note.sender}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function LavenderTemplate({ note }: { note: LoveNote }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl"
      >
        <div className="bg-white/60 backdrop-blur-md rounded-[2.5rem] p-10 md:p-16 shadow-2xl border border-purple-100">
          <div className="flex justify-center gap-3 mb-8">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              >
                <HeartIcon className="w-8 h-8 text-violet-400" />
              </motion.div>
            ))}
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-semibold text-violet-900 text-center mb-4">
            {note.recipient}
          </h1>
          <p className="text-violet-400 text-center text-sm mb-10">This is for you</p>
          <div className="font-[family-name:var(--font-playfair)] text-lg md:text-xl leading-relaxed text-violet-800 whitespace-pre-wrap">
            {note.message}
          </div>
          {note.sender && (
            <div className="mt-12 pt-8 border-t border-purple-100 text-right">
              <p className="text-violet-400 text-sm">Dreaming of you,</p>
              <p className="font-[family-name:var(--font-playfair)] text-2xl text-violet-700 mt-1">{note.sender}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function SunsetTemplate({ note }: { note: LoveNote }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 via-orange-100 to-rose-200 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-xl text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 mx-auto mb-10 shadow-lg shadow-orange-300/50"
        />
        <p className="text-orange-500 text-sm tracking-widest uppercase mb-3">With all my heart</p>
        <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-semibold text-amber-900 mb-12">
          {note.recipient}
        </h1>
        <div className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl leading-relaxed text-amber-800 whitespace-pre-wrap">
          {note.message}
        </div>
        {note.sender && (
          <div className="mt-16">
            <p className="text-orange-400 text-sm">Until the sun sets,</p>
            <p className="font-[family-name:var(--font-playfair)] text-2xl text-orange-700 mt-1">{note.sender}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function OceanTemplate({ note }: { note: LoveNote }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-cyan-50 to-blue-100 flex items-center justify-center p-6 relative overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 h-8 bg-gradient-to-t from-cyan-200/20 to-transparent"
          style={{ bottom: `${i * 40}px` }}
          animate={{ x: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-xl text-center relative z-10"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex justify-center gap-1 mb-8"
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-cyan-400"
              style={{ transform: `translateY(${i === 1 ? -4 : 0}px)` }}
            />
          ))}
        </motion.div>
        <p className="text-cyan-500 text-sm tracking-widest uppercase mb-4">Drifting to</p>
        <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-semibold text-sky-900 mb-12">
          {note.recipient}
        </h1>
        <div className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl leading-relaxed text-sky-800 whitespace-pre-wrap">
          {note.message}
        </div>
        {note.sender && (
          <div className="mt-16">
            <p className="text-cyan-400 text-sm">Across the waves,</p>
            <p className="font-[family-name:var(--font-playfair)] text-2xl text-cyan-700 mt-1">{note.sender}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function HelloKittyTemplate({ note }: { note: LoveNote }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <HeartIcon className="w-6 h-6 text-red-200" />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-lg relative z-10"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-[2rem] p-10 md:p-12 shadow-xl border-2 border-red-100">
          <div className="flex justify-center mb-6">
            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Image src="/hellokittyicon.jpg" alt="Hello Kitty" width={80} height={80} className="rounded-2xl" />
            </motion.div>
          </div>
          <p className="text-red-400 text-center text-sm font-medium tracking-wide uppercase mb-2">
            A sweet note for
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 text-center mb-8">
            {note.recipient}
          </h1>
          <div className="text-lg md:text-xl leading-relaxed text-pink-700 whitespace-pre-wrap text-center">
            {note.message}
          </div>
          {note.sender && (
            <div className="mt-10 text-center">
              <p className="text-pink-400 text-sm">xoxo,</p>
              <p className="text-2xl text-red-500 font-bold mt-1">{note.sender}</p>
            </div>
          )}
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
              >
                <HeartIcon className="w-4 h-4 text-red-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function KuromiTemplate({ note }: { note: LoveNote }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.8, 1, 0.8] }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <StarIcon className="w-4 h-4 text-pink-500/40" />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-lg relative z-10"
      >
        <div className="bg-black/70 backdrop-blur-md rounded-2xl p-10 md:p-12 border border-purple-500/30 shadow-2xl shadow-purple-500/20">
          <div className="flex justify-center mb-6">
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <Image src="/kuromiicon.jpg" alt="Kuromi" width={80} height={80} className="rounded-2xl" />
            </motion.div>
          </div>
          <p className="text-pink-400 text-center text-sm font-medium tracking-widest uppercase mb-2">
            Hey there
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white text-center mb-8">
            {note.recipient}
          </h1>
          <div className="text-lg md:text-xl leading-relaxed text-purple-200 whitespace-pre-wrap text-center">
            {note.message}
          </div>
          {note.sender && (
            <div className="mt-10 text-center">
              <p className="text-purple-400 text-sm">mischievously yours,</p>
              <p className="text-2xl text-pink-400 font-bold mt-1">{note.sender}</p>
            </div>
          )}
          <div className="flex justify-center gap-3 mt-6">
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <FlowerIcon className="w-8 h-8 text-pink-200" />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-lg relative z-10"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-[2.5rem] p-10 md:p-14 shadow-xl border border-pink-200">
          <div className="flex justify-center mb-6">
            <motion.div animate={{ rotate: [-3, 3, -3] }} transition={{ duration: 2, repeat: Infinity }}>
              <Image src="/mymelodyicon.jpg" alt="My Melody" width={80} height={80} className="rounded-2xl" />
            </motion.div>
          </div>
          <p className="text-pink-400 text-center text-sm font-medium tracking-wide mb-2">
            With love for
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-pink-600 text-center mb-10">
            {note.recipient}
          </h1>
          <div className="text-lg md:text-xl leading-relaxed text-pink-700 whitespace-pre-wrap text-center">
            {note.message}
          </div>
          {note.sender && (
            <div className="mt-12 text-center">
              <p className="text-pink-300 text-sm">sweetly,</p>
              <p className="text-2xl text-pink-500 font-medium mt-1">{note.sender}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function CinnamorollTemplate({ note }: { note: LoveNote }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-blue-50 to-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ x: [0, 30, 0], y: [0, -15, 0] }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <CloudIcon className="w-20 h-12 text-white drop-shadow-sm" />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-lg relative z-10"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-[3rem] p-10 md:p-14 shadow-lg border border-sky-100">
          <div className="flex justify-center mb-6">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <Image src="/cinnamorollicon.jpg" alt="Cinnamoroll" width={80} height={80} className="rounded-2xl" />
            </motion.div>
          </div>
          <p className="text-sky-400 text-center text-sm font-medium tracking-wide mb-2">
            Floating to
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-sky-600 text-center mb-10">
            {note.recipient}
          </h1>
          <div className="text-lg md:text-xl leading-relaxed text-sky-700 whitespace-pre-wrap text-center">
            {note.message}
          </div>
          {note.sender && (
            <div className="mt-12 text-center">
              <p className="text-sky-300 text-sm">fluffy hugs,</p>
              <p className="text-2xl text-sky-500 font-medium mt-1">{note.sender}</p>
            </div>
          )}
          <div className="flex justify-center gap-4 mt-6">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                <HeartIcon className="w-5 h-5 text-sky-200" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function BadtzMaruTemplate({ note }: { note: LoveNote }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ rotate: [0, 360], opacity: [0.1, 0.3, 0.1] }}
            transition={{
              duration: 8 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <BoltIcon className="w-6 h-6 text-yellow-400/30" />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg relative z-10"
      >
        <div className="bg-zinc-800/90 backdrop-blur-sm rounded-xl p-10 md:p-12 border border-yellow-400/30 shadow-xl">
          <div className="flex justify-center mb-6">
            <motion.div animate={{ rotate: [-10, 10, -10] }} transition={{ duration: 1, repeat: Infinity }}>
              <Image src="/badtzmaruicon.jpg" alt="Badtz-Maru" width={80} height={80} className="rounded-2xl" />
            </motion.div>
          </div>
          <p className="text-yellow-400 text-center text-sm font-bold tracking-widest uppercase mb-2">
            Yo
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white text-center mb-8">
            {note.recipient}
          </h1>
          <div className="text-lg md:text-xl leading-relaxed text-zinc-300 whitespace-pre-wrap text-center">
            {note.message}
          </div>
          {note.sender && (
            <div className="mt-10 text-center">
              <p className="text-zinc-500 text-sm">later,</p>
              <p className="text-2xl text-yellow-400 font-bold mt-1">{note.sender}</p>
            </div>
          )}
          <div className="flex justify-center mt-6">
            <BoltIcon className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function PompompurinTemplate({ note }: { note: LoveNote }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <StarIcon className="w-6 h-6 text-amber-200" />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-lg relative z-10"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-[2rem] p-10 md:p-14 shadow-xl border-2 border-amber-200">
          <div className="flex justify-center mb-6">
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <Image src="/pompompurinicon.jpg" alt="Pompompurin" width={80} height={80} className="rounded-2xl" />
            </motion.div>
          </div>
          <p className="text-amber-500 text-center text-sm font-medium tracking-wide mb-2">
            For my favorite
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-amber-700 text-center mb-10">
            {note.recipient}
          </h1>
          <div className="text-lg md:text-xl leading-relaxed text-amber-800 whitespace-pre-wrap text-center">
            {note.message}
          </div>
          {note.sender && (
            <div className="mt-12 text-center">
              <p className="text-amber-400 text-sm">pudding kisses,</p>
              <p className="text-2xl text-amber-600 font-bold mt-1">{note.sender}</p>
            </div>
          )}
          <div className="flex justify-center gap-3 mt-6">
            <HeartIcon className="w-5 h-5 text-amber-300" />
            <StarIcon className="w-5 h-5 text-yellow-400" />
            <HeartIcon className="w-5 h-5 text-amber-300" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MySweetPianoTemplate({ note }: { note: LoveNote }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <StarIcon className="w-5 h-5 text-pink-200" />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-lg relative z-10"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-[2.5rem] p-10 md:p-14 shadow-xl border border-pink-200">
          <div className="flex justify-center mb-6">
            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Image src="/mysweetpianoicon.jpg" alt="My Sweet Piano" width={80} height={80} className="rounded-2xl" />
            </motion.div>
          </div>
          <p className="text-pink-400 text-center text-sm font-medium tracking-wide mb-2">
            Dreaming of
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-pink-600 text-center mb-10">
            {note.recipient}
          </h1>
          <div className="text-lg md:text-xl leading-relaxed text-pink-700 whitespace-pre-wrap text-center">
            {note.message}
          </div>
          {note.sender && (
            <div className="mt-12 text-center">
              <p className="text-pink-300 text-sm">with sweet dreams,</p>
              <p className="text-2xl text-pink-500 font-medium mt-1">{note.sender}</p>
            </div>
          )}
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              >
                <HeartIcon className="w-4 h-4 text-pink-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function BakuTemplate({ note }: { note: LoveNote }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-violet-100 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.1, 0.4, 0.1], y: [0, -10, 0] }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <StarIcon className="w-4 h-4 text-indigo-300" />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-lg relative z-10"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-10 md:p-14 shadow-xl border border-indigo-200">
          <div className="flex justify-center mb-6">
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
              <Image src="/bakuicon.jpg" alt="Baku" width={80} height={80} className="rounded-2xl" />
            </motion.div>
          </div>
          <p className="text-indigo-400 text-center text-sm font-medium tracking-wide mb-2">
            Sweet dreams for
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-indigo-700 text-center mb-10">
            {note.recipient}
          </h1>
          <div className="text-lg md:text-xl leading-relaxed text-purple-700 whitespace-pre-wrap text-center">
            {note.message}
          </div>
          {note.sender && (
            <div className="mt-12 text-center">
              <p className="text-indigo-300 text-sm">magical wishes,</p>
              <p className="text-2xl text-indigo-600 font-medium mt-1">{note.sender}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function TuxedoSamTemplate({ note }: { note: LoveNote }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-slate-50 to-blue-50 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <StarIcon className="w-5 h-5 text-blue-200" />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-lg relative z-10"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-10 md:p-14 shadow-xl border border-blue-200">
          <div className="flex justify-center mb-6">
            <motion.div animate={{ rotate: [-3, 3, -3] }} transition={{ duration: 2, repeat: Infinity }}>
              <Image src="/tuzedosamicon.jpg" alt="Tuxedo Sam" width={80} height={80} className="rounded-2xl" />
            </motion.div>
          </div>
          <p className="text-blue-400 text-center text-sm font-medium tracking-wide mb-2">
            Formally for
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-blue-700 text-center mb-10">
            {note.recipient}
          </h1>
          <div className="text-lg md:text-xl leading-relaxed text-slate-700 whitespace-pre-wrap text-center">
            {note.message}
          </div>
          {note.sender && (
            <div className="mt-12 text-center">
              <p className="text-blue-300 text-sm">elegantly yours,</p>
              <p className="text-2xl text-blue-600 font-medium mt-1">{note.sender}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function PochaccoTemplate({ note }: { note: LoveNote }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -25, 0], scale: [1, 1.1, 1] }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <StarIcon className="w-5 h-5 text-emerald-200" />
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-lg relative z-10"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-[2rem] p-10 md:p-14 shadow-xl border border-emerald-200">
          <div className="flex justify-center mb-6">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <Image src="/pochaccoicon.jpg" alt="Pochacco" width={80} height={80} className="rounded-2xl" />
            </motion.div>
          </div>
          <p className="text-emerald-500 text-center text-sm font-medium tracking-wide mb-2">
            High-fives to
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-700 text-center mb-10">
            {note.recipient}
          </h1>
          <div className="text-lg md:text-xl leading-relaxed text-teal-700 whitespace-pre-wrap text-center">
            {note.message}
          </div>
          {note.sender && (
            <div className="mt-12 text-center">
              <p className="text-emerald-400 text-sm">energetically,</p>
              <p className="text-2xl text-emerald-600 font-bold mt-1">{note.sender}</p>
            </div>
          )}
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
              >
                <HeartIcon className="w-4 h-4 text-emerald-300" />
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
    const found = getNote(id);
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
      <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7]">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#fdfbf7]">
        <div className="text-center">
          <HeartIcon className="w-12 h-12 text-rose-300 mx-auto mb-6" />
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-gray-900 mb-3">
            Note not found
          </h1>
          <p className="text-gray-600 mb-8">This love website doesn&apos;t exist.</p>
          <Link
            href="/create"
            className="inline-flex px-6 py-3 bg-rose-500 text-white font-medium rounded-full hover:bg-rose-600 transition-colors"
          >
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-white rounded-full px-5 py-3 shadow-xl border border-gray-100 flex items-center gap-4">
            <p className="text-sm text-gray-600">Your website is ready!</p>
            <button
              onClick={copyLink}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                copied
                  ? "bg-green-100 text-green-700"
                  : "bg-rose-500 text-white hover:bg-rose-600"
              }`}
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </motion.div>
      )}
      <TemplateComponent note={note} />
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
        <Link
          href="/"
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full"
        >
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
        <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7]">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
      }
    >
      <NoteContent />
    </Suspense>
  );
}
