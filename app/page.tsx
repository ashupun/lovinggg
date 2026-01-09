"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
    </svg>
  );
}

export default function Home() {
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
    <main className="min-h-screen bg-[#fdfbf7] dark:bg-[#121214]">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            loving<span className="text-rose-500">.gg</span>
          </Link>
        </motion.div>
        <div className="flex items-center gap-3">
          {mounted && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isDark ? (
                <SunIcon className="w-5 h-5 text-white" />
              ) : (
                <MoonIcon className="w-5 h-5 text-gray-800" />
              )}
            </motion.button>
          )}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Link
              href="/create"
              className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Create
            </Link>
          </motion.div>
        </div>
      </nav>

      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-gray-900 dark:text-white leading-[0.9] mb-8"
          >
            Love is
            <br />
            <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 bg-clip-text text-transparent">
              a link
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-lg mx-auto font-light"
          >
            Create a beautiful personalized page for someone you love. No signup. Free forever.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col items-center gap-6"
          >
            <Link href="/create">
              <motion.span
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-full text-lg cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start creating
                <span>→</span>
              </motion.span>
            </Link>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Takes 30 seconds
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-6">
              How it works
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-light">
              Three simple steps to spread love
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                num: "01",
                title: "Pick a theme",
                desc: "Choose from 16 beautiful designs including Sanrio characters"
              },
              {
                num: "02",
                title: "Write your message",
                desc: "Express your feelings or use our message ideas for inspiration"
              },
              {
                num: "03",
                title: "Share the link",
                desc: "Get a unique URL to send to your special someone"
              }
            ].map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center md:text-left"
              >
                <span className="text-5xl md:text-6xl font-black text-rose-500/20 dark:text-rose-400/20 mb-4 block">{item.num}</span>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-gray-900 dark:bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-tight">
              Ready to make
              <br />
              someone smile?
            </h2>
            <p className="text-lg text-gray-400 mb-10 font-light max-w-md mx-auto">
              It&apos;s free, takes 30 seconds, and no signup required
            </p>
            <Link href="/create">
              <motion.span
                className="inline-flex items-center gap-2 px-10 py-5 bg-white text-gray-900 font-semibold rounded-full text-xl cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Create now
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 px-6 bg-gray-900 dark:bg-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-sm text-gray-500">loving<span className="text-rose-500">.gg</span></span>
          <p className="text-sm text-gray-500">
            Made with love
          </p>
        </div>
      </footer>
    </main>
  );
}
