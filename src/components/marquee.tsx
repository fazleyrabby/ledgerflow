"use client";

import { motion } from "framer-motion";

const logos = [
  "Stripe",
  "Shopify",
  "Notion",
  "Vercel",
  "Linear",
  "Ramp",
  "Mercury",
  "Figma",
  "Loom",
  "Cal",
];

export default function Marquee() {
  return (
    <section className="py-16 border-y border-white/5 bg-zinc-950/40 backdrop-blur-sm">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-zinc-500 mb-8 tracking-wide">
          Trusted by finance teams at leading companies
        </p>
        <div className="relative overflow-hidden">
          {/* Subtle fade overlay on edges */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          
          <motion.div
            className="flex gap-16 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...logos, ...logos].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="text-lg font-semibold text-zinc-700 hover:text-accent/60 transition-colors duration-300 whitespace-nowrap tracking-tight"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

