"use client";

import { useScroll, motion, useMotionValueEvent, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Play, CreditCard, TrendingUp, ShieldCheck } from "lucide-react";

const TOTAL_FRAMES = 180;

function pad(num: number) {
  return String(num).padStart(3, "0");
}

const FloatingIcon = ({ 
  children, 
  delay, 
  className,
  customOpacity 
}: { 
  children: React.ReactNode; 
  delay: number; 
  className: string;
  customOpacity: any;
}) => (
  <motion.div
    animate={{ 
      y: [-12, 12, -12],
      rotate: [-4, 4, -4]
    }}
    style={{ opacity: customOpacity }}
    transition={{
      y: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      },
      rotate: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }
    }}
    className={`absolute hidden lg:flex items-center justify-center p-4.5 rounded-2xl bg-zinc-950/50 border border-secondary/20 shadow-gold-glow backdrop-blur-sm text-accent z-10 hover:border-accent/40 hover:text-white transition-colors duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const [frame, setFrame] = useState(1);
  const [fadeOut, setFadeOut] = useState(false);

  // Hardware-accelerated scroll reveal opacity transforms (ultra-responsive reveal starting from first scroll)
  const opacityBadge = useTransform(scrollYProgress, [0, 0.02, 0.82, 1.0], [0.15, 1.0, 1.0, 0.0]);
  const opacityModern = useTransform(scrollYProgress, [0, 0.82, 1.0], [1.0, 1.0, 0.0]);
  const opacityFinance = useTransform(scrollYProgress, [0, 0.02, 0.82, 1.0], [0.15, 1.0, 1.0, 0.0]);
  const opacitySimplified = useTransform(scrollYProgress, [0, 0.01, 0.04, 0.82, 1.0], [0.15, 0.15, 1.0, 1.0, 0.0]);
  const opacityDescription = useTransform(scrollYProgress, [0, 0.02, 0.06, 0.82, 1.0], [0.0, 0.0, 1.0, 1.0, 0.0]);
  const opacityCTAs = useTransform(scrollYProgress, [0, 0.04, 0.08, 0.82, 1.0], [0.0, 0.0, 1.0, 1.0, 0.0]);
  const opacityTrust = useTransform(scrollYProgress, [0, 0.06, 0.10, 0.82, 1.0], [0.0, 0.0, 1.0, 1.0, 0.0]);
  const iconsOp = useTransform(scrollYProgress, [0, 0.02, 0.10, 0.82, 1.0], [0.10, 0.10, 0.85, 0.85, 0.0]);



  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setFrame(Math.round(p * (TOTAL_FRAMES - 1) + 1));
    setFadeOut(p > 0.85);
  });

  return (
    <section ref={sectionRef} className="relative min-h-[500vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img
            src={`/hero/frame-${pad(frame)}.webp`}
            className="w-full h-full object-cover"
            alt=""
            draggable={false}
          />
        </div>

        <div className="absolute inset-0 bg-black/60" />

        {/* Floating Fintech Objects */}
        <FloatingIcon delay={0} customOpacity={iconsOp} className="left-[8%] top-[25%]">
          <CreditCard className="h-8 w-8 stroke-[1.5]" />
        </FloatingIcon>
        <FloatingIcon delay={1.5} customOpacity={iconsOp} className="right-[8%] top-[35%]">
          <TrendingUp className="h-8 w-8 stroke-[1.5]" />
        </FloatingIcon>
        <FloatingIcon delay={3} customOpacity={iconsOp} className="left-[12%] bottom-[25%]">
          <ShieldCheck className="h-7 w-7 stroke-[1.5]" />
        </FloatingIcon>

        {/* Central Text Box */}
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div style={{ opacity: opacityBadge }}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm border border-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              New — Intelligent Finance Platform
            </span>
          </motion.div>

          <h1 className="mt-6 sm:mt-8 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight text-white">
            <motion.span style={{ opacity: opacityModern }} className="inline-block">Modern </motion.span>{" "}
            <motion.span style={{ opacity: opacityFinance }} className="inline-block">Finance.</motion.span>
            <br />
            <motion.span 
              style={{ opacity: opacitySimplified }}
              className="bg-gradient-to-r from-accent via-secondary to-white bg-clip-text text-transparent inline-block"
            >
              Simplified.
            </motion.span>
          </h1>

          <motion.p
            style={{ opacity: opacityDescription }}
            className="mx-auto mt-6 max-w-xl text-lg sm:text-xl leading-relaxed text-white/60"
          >
            One dashboard to manage invoices, payments, analytics, and
            team collaboration. Built for businesses that move fast.
          </motion.p>

          <motion.div
            style={{ opacity: opacityCTAs }}
            className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-4"
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-secondary px-7 py-3.5 text-sm font-semibold text-black shadow-lg transition-all hover:shadow-xl hover:brightness-110"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              <Play className="h-4 w-4" />
              Watch Demo
            </a>
          </motion.div>

          <motion.div
            style={{ opacity: opacityTrust }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-black bg-gradient-to-br from-secondary/60 to-primary/30"
                />
              ))}
            </div>
            <div className="text-sm text-white/50">
              <span className="font-semibold text-white/80">10,000+</span>{" "}
              businesses trust LedgerFlow
            </div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <motion.div
          animate={{ opacity: fadeOut ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none"
        />

        <motion.div
          animate={{ opacity: fadeOut ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-xs font-medium text-white/40 tracking-widest uppercase">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-6 w-[1px] bg-white/30"
          />
        </motion.div>
      </div>
    </section>
  );
}

