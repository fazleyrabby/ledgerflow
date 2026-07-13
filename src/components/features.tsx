"use client";

import { motion } from "framer-motion";
import {
  FileText,
  BarChart3,
  PieChart,
  Users,
  Cable,
  FileSpreadsheet,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Invoices",
    description:
      "Create, send, and track invoices with automated reminders and recurring billing.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Real-time insights into revenue, expenses, and growth trends with custom reports.",
  },
  {
    icon: PieChart,
    title: "Charts",
    description:
      "Interactive visualizations that make your financial data easy to understand at a glance.",
  },
  {
    icon: Users,
    title: "Team Management",
    description:
      "Assign roles, set permissions, and collaborate with your team in real time.",
  },
  {
    icon: Cable,
    title: "Automation",
    description:
      "Automate recurring tasks, payment reminders, and reconciliation workflows.",
  },
  {
    icon: FileSpreadsheet,
    title: "Reports",
    description:
      "Generate P&L, balance sheets, and cash flow statements with one click.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 relative overflow-hidden bg-black bg-radial-grid">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 border border-secondary/30 px-4 py-1.5 text-xs font-semibold text-accent/90 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Everything you need
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Built for modern finance teams
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            From invoicing to reporting, LedgerFlow brings every financial
            tool your business needs into one powerful platform.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-950/40 p-8 backdrop-blur-sm transition-all duration-300 hover:border-secondary/40 hover:bg-zinc-900/40 hover:shadow-gold-glow"
            >
              {/* Subtle hover neon line top */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 border border-secondary/20 text-accent group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-md">
                <feature.icon className="h-5 w-5" />
              </div>
              
              <h3 className="mt-6 text-lg font-semibold text-white tracking-tight group-hover:text-accent transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {feature.description}
              </p>
              
              <a
                href="#"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent/80 hover:text-white group-hover:gap-2.5 transition-all duration-300"
              >
                Learn more
                <span className="text-xs">→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

