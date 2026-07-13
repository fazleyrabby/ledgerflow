"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CFO",
    company: "ScaleUp Ventures",
    content:
      "LedgerFlow transformed how we manage our finances. The automation features alone saved us 20 hours per week.",
  },
  {
    name: "Marcus Rivera",
    role: "Head of Finance",
    company: "NexGen Inc.",
    content:
      "The analytics and reporting capabilities are unmatched. We finally have real-time visibility into our cash flow.",
  },
  {
    name: "Emily Larsson",
    role: "Finance Operations",
    company: "Brightside Studio",
    content:
      "Setting up recurring invoices and payment reminders was a game changer for our agency. Our payment times dropped by 40%.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 border border-secondary/30 px-4 py-1.5 text-xs font-semibold text-accent/90 backdrop-blur-sm mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Loved by finance teams
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            See why thousands of businesses trust LedgerFlow to manage their
            finances.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-zinc-800/80 bg-zinc-950/50 p-6 backdrop-blur-sm hover:border-secondary/40 transition-all duration-300 shadow-xl"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-accent text-accent"
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-zinc-300">"{t.content}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary via-secondary to-accent border border-white/10 flex items-center justify-center text-sm font-semibold text-white shadow-md">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {t.name}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

