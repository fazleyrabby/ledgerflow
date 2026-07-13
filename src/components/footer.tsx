"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const columns = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Integrations", "Changelog", "API"],
    },
    {
      title: "Company",
      links: ["About", "Blog", "Careers", "Press", "Partners"],
    },
    {
      title: "Resources",
      links: ["Docs", "Help Center", "Community", "Tutorials", "Status"],
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "Security", "Cookies", "GDPR"],
    },
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-white/5 bg-zinc-950/80 py-16 lg:py-20 relative overflow-hidden"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-xs font-bold text-white">L</span>
              </div>
              <span className="text-lg font-bold text-white">
                LedgerFlow
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400 max-w-xs">
              Modern finance management for forward-thinking businesses.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-zinc-200">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-zinc-400 transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p className="text-xs text-zinc-500">
              &copy; {new Date().getFullYear()} LedgerFlow. All rights reserved.
            </p>
            <span className="hidden sm:inline text-zinc-800 text-xs">|</span>
            <p className="text-xs text-zinc-500">
              Made with <span className="text-red-500">❤️</span> by{" "}
              <a
                href="https://rhtech.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-white transition-colors font-semibold"
              >
                rhtech
              </a>
            </p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

