"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-black">
      {/* Background neon glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/20 blur-[150px] pointer-events-none rounded-full" />
      
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl bg-zinc-950 border border-secondary/20 shadow-2xl px-8 py-16 lg:px-16 lg:py-24 text-center overflow-hidden"
        >
          {/* Subtle grid pattern inside */}
          <div className="absolute inset-0 bg-radial-grid opacity-10 pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Ready to simplify your finances?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-400">
              Join thousands of businesses already using LedgerFlow. Start
              your free trial today — no credit card required.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-secondary px-6 py-3.5 text-sm font-bold text-black shadow-lg transition-all hover:shadow-xl hover:brightness-110"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-zinc-900/50 hover:bg-zinc-900 text-white px-6 py-3.5 text-sm font-semibold transition-all"
              >
                Book a Demo
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

  );
}
