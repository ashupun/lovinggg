"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { templates } from "@/lib/templates";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 md:px-12 py-6">
        <Link href="/" className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-rose-600">
          loving.gg
        </Link>
      </nav>

      <section className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="mb-6">
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block text-5xl"
            >
              ♥
            </motion.span>
          </div>

          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-semibold text-gray-900 mb-4 leading-tight">
            Create a love website <br />
            <span className="bg-gradient-to-r from-rose-500 to-rose-600 bg-clip-text text-transparent">
              for someone special
            </span>
          </h1>

          <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto">
            Choose a design, write your message, and share a beautiful personalized website with your loved one.
          </p>

          <Link
            href="/create"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-medium rounded-full shadow-lg shadow-rose-500/30 hover:shadow-rose-500/40 hover:-translate-y-0.5 transition-all"
          >
            Create Your Website
          </Link>
        </motion.div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-center text-gray-900 mb-10">
            Choose from beautiful designs
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {templates.map((template, i) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/create?template=${template.id}`}>
                  <div className={`aspect-[4/3] rounded-2xl ${template.preview.bg} p-6 flex flex-col justify-end border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer`}>
                    <p className={`font-[family-name:var(--font-playfair)] text-lg font-semibold ${template.preview.accent}`}>
                      {template.name}
                    </p>
                    <p className={`text-sm ${template.preview.text} opacity-70`}>
                      {template.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-center text-gray-900 mb-12">
            How it works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "1", title: "Pick a design", desc: "Choose a template that matches your style" },
              { num: "2", title: "Add your words", desc: "Write a heartfelt message for your loved one" },
              { num: "3", title: "Share the link", desc: "Send them a beautiful personalized website" },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 font-semibold flex items-center justify-center mx-auto mb-4">
                  {item.num}
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-6 px-6 text-center text-gray-400 text-sm">
        <p>Made with ♥</p>
      </footer>
    </main>
  );
}
