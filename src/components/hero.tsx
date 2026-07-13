"use client";

import { useScroll, motion, useMotionValueEvent, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowRight, Play } from "lucide-react";

const TOTAL_FRAMES = 180;

function pad(num: number) {
  return String(num).padStart(3, "0");
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const { scrollY } = useScroll();

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const img = imagesRef.current[index - 1];
    if (img && img.complete) {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  };

  // Preload and store frame elements on mount for instant canvas drawing
  useEffect(() => {
    const preloadImages = () => {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = `/hero/frame-${pad(i)}.webp`;
        if (i === 1) {
          img.onload = () => {
            drawFrame(1);
          };
        }
        imagesRef.current.push(img);
      }
    };
    preloadImages();
  }, []);

  // Hardware-accelerated scroll reveal opacity transforms using absolute scroll Y pixel values
  const opacityBadge = useTransform(scrollY, [0, 40, 3200, 3800], [0.15, 1.0, 1.0, 0.0]);
  const opacityModern = useTransform(scrollY, [0, 3200, 3800], [1.0, 1.0, 0.0]);
  const opacityFinance = useTransform(scrollY, [0, 60, 3200, 3800], [0.15, 1.0, 1.0, 0.0]);
  const opacitySimplified = useTransform(scrollY, [0, 40, 120, 3200, 3800], [0.15, 0.15, 1.0, 1.0, 0.0]);
  const opacityDescription = useTransform(scrollY, [0, 100, 220, 3200, 3800], [0.0, 0.0, 1.0, 1.0, 0.0]);
  const opacityCTAs = useTransform(scrollY, [0, 180, 320, 3200, 3800], [0.0, 0.0, 1.0, 1.0, 0.0]);
  const opacityTrust = useTransform(scrollY, [0, 260, 420, 3200, 3800], [0.0, 0.0, 1.0, 1.0, 0.0]);

  // Bottom exit fades and indicator scroll transforms (no state triggers)
  const bottomFadeOpacity = useTransform(scrollY, [3000, 3500], [0.0, 1.0]);
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 350], [1.0, 0.0]);

  // Track scrollY and draw onto Canvas directly using requestAnimationFrame (60/120 FPS hardware acceleration)
  useMotionValueEvent(scrollY, "change", (y) => {
    const heroHeight = typeof window !== "undefined" ? window.innerHeight * 4 : 4000;
    const p = Math.min(1, Math.max(0, y / heroHeight));
    const currentFrame = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(p * (TOTAL_FRAMES - 1) + 1)));
    
    requestAnimationFrame(() => {
      drawFrame(currentFrame);
    });
  });

  return (
    <section ref={sectionRef} className="relative min-h-[500vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <canvas
            ref={canvasRef}
            width={1920}
            height={1080}
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        </div>

        <div className="absolute inset-0 bg-black/60 pointer-events-none" />


        {/* Central Text Box */}
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div style={{ opacity: opacityBadge }}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm border border-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              New — Intelligent Finance Platform
            </span>
          </motion.div>

          <h1 className="mt-6 sm:mt-8 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight text-white select-none">
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
            className="mx-auto mt-6 max-w-xl text-lg sm:text-xl leading-relaxed text-white/60 select-none"
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
            <div className="text-sm text-white/50 select-none">
              <span className="font-semibold text-white/80">10,000+</span>{" "}
              businesses trust LedgerFlow
            </div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <motion.div
          style={{ opacity: bottomFadeOpacity }}
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none"
        />

        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
        >
          <span className="text-xs font-medium text-white/40 tracking-widest uppercase select-none">
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


