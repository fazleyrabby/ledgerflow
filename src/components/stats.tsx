"use client";

import { useInView, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { value: 10, suffix: "K+", label: "Businesses" },
  { value: 2, prefix: "$", suffix: "B+", label: "Transactions" },
  { value: 99.9, suffix: "%", label: "Uptime" },
  { value: 4.9, suffix: "★", label: "Rating" },
];

function Counter({
  target,
  prefix,
  suffix,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}
      {count % 1 === 0 ? count : count.toFixed(1)}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="py-24 relative overflow-hidden bg-black border-y border-white/5 bg-radial-grid">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label} 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center group relative p-6 rounded-2xl border border-zinc-900/60 bg-zinc-950/40 backdrop-blur-sm hover:border-secondary/20 hover:bg-zinc-900/10 transition-all duration-300"
            >
              {/* Vertical neon accent indicator on hover */}
              <div className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-accent/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-mono group-hover:text-accent transition-colors duration-300">
                <Counter
                  target={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <div className="mt-3 text-xs font-semibold text-zinc-500 uppercase tracking-widest group-hover:text-zinc-400 transition-colors duration-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

