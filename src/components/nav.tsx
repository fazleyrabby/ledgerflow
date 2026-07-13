"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#solutions" },
  { label: "Stats", href: "#stats" },
  { label: "Customers", href: "#customers" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);
      setPastHero(scrollY > window.innerHeight * 5.5);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/75 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-xs font-bold text-white">L</span>
          </div>
          <span className="text-lg font-bold text-white transition-colors duration-300">
            LedgerFlow
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#"
            className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors duration-300 px-4 py-2"
          >
            Log in
          </a>
          <a
            href="#"
            className="rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:brightness-110"
          >
            Start Free
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-b px-6 pb-6 bg-black border-white/10 text-white">
          <div className="flex flex-col gap-4 pt-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <hr className="border-white/10" />
            <a
              href="#"
              className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
            >
              Log in
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-primary to-secondary text-white"
            >
              Start Free
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

