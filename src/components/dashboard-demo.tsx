"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Layers, 
  DollarSign, 
  Globe, 
  ShieldCheck, 
  CreditCard,
  Zap
} from "lucide-react";

type Tab = "overview" | "transactions" | "cashflow" | "card";

interface Transaction {
  id: string;
  merchant: string;
  category: string;
  amount: number;
  type: "in" | "out";
  status: "settled" | "pending" | "failed";
  date: string;
}

const initialTransactions: Transaction[] = [
  { id: "TX-9021", merchant: "Stripe Transfer", category: "Payout", amount: 48250.00, type: "in", status: "settled", date: "Just now" },
  { id: "TX-9020", merchant: "Amazon Web Services", category: "Cloud Infrastructure", amount: 8431.20, type: "out", status: "settled", date: "10 mins ago" },
  { id: "TX-9019", merchant: "Hiring Escrow Ltd", category: "Contractors", amount: 12500.00, type: "out", status: "pending", date: "1 hour ago" },
  { id: "TX-9018", merchant: "Figma Subscription", category: "Design Tools", amount: 420.00, type: "out", status: "settled", date: "3 hours ago" },
  { id: "TX-9017", merchant: "ACME Corp Licensing", category: "Enterprise Sale", amount: 95000.00, type: "in", status: "settled", date: "5 hours ago" },
  { id: "TX-9016", merchant: "OpenAI API Fees", category: "AI Services", amount: 1820.40, type: "out", status: "settled", date: "1 day ago" },
];

export default function DashboardDemo() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [liveBalance, setLiveBalance] = useState(2481950.40);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  
  // Card 3D tilt coordinates
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Live balance ticking simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time sales/deposits/costs ticking up
      const delta = (Math.random() - 0.4) * 8.5; // average positive bias
      setLiveBalance(prev => Math.max(1000000, prev + delta));
      
      // Randomly inject a live transaction every 12 seconds
      if (Math.random() > 0.85) {
        const isDeposit = Math.random() > 0.4;
        const newAmt = isDeposit ? Math.round(Math.random() * 5000) : Math.round(Math.random() * 800);
        const newTx: Transaction = {
          id: `TX-${Math.floor(Math.random() * 1000) + 9000}`,
          merchant: isDeposit ? "Global Client Deposit" : "SaaS Software API",
          category: isDeposit ? "Revenue" : "Infrastructure",
          amount: newAmt,
          type: isDeposit ? "in" : "out",
          status: Math.random() > 0.1 ? "settled" : "pending",
          date: "Just now"
        };
        setTransactions(prev => [newTx, ...prev.slice(0, 5)]);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    // Calculate rotation (-15deg to 15deg)
    setRotateX(-y / 8);
    setRotateY(x / 8);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <section id="solutions" className="py-24 lg:py-32 relative overflow-hidden bg-black">
      {/* Glow shapes */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-[1280px] px-6 lg:px-8 relative z-10"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 border border-secondary/30 px-4 py-1.5 text-xs font-semibold text-accent/90 backdrop-blur-sm">
              <Zap className="h-3 w-3 text-accent fill-accent animate-pulse" />
              Live Interactive Sandbox
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Real-time analytics.
              <br />
              <span className="bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
                Uncompromising speed.
              </span>
            </h2>
          </div>
          
          {/* Tab selector */}
          <div className="flex bg-zinc-950 border border-zinc-800 p-1.5 rounded-xl gap-1 w-full sm:w-auto overflow-x-auto">
            {(["overview", "transactions", "cashflow", "card"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-2 text-xs font-semibold rounded-lg capitalize transition-all duration-350 ${
                  activeTab === tab 
                    ? "text-black z-10" 
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-accent to-secondary rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {tab === "card" ? "Titanium Card" : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Grid Shell */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT PANEL: Interactive Screen Widgets */}
          <div className="lg:col-span-8 bg-zinc-950/60 border border-zinc-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Corner glows */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 blur-[50px] pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-zinc-500 font-medium tracking-widest uppercase">Available Vault Balance</p>
                      <h3 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-tight text-white mt-1.5 flex items-baseline">
                        ${liveBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        <span className="ml-2.5 h-2 w-2 rounded-full bg-emerald-500 animate-ping align-middle inline-block mb-1.5" />
                      </h3>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2 text-right">
                        <span className="text-[10px] text-zinc-500 block uppercase tracking-wider">Inflow (Mo)</span>
                        <span className="text-sm font-semibold text-emerald-400 flex items-center gap-1 mt-0.5 justify-end">
                          <ArrowUpRight className="h-3.5 w-3.5" />
                          +14.8%
                        </span>
                      </div>
                      <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2 text-right">
                        <span className="text-[10px] text-zinc-500 block uppercase tracking-wider">Outflow (Mo)</span>
                        <span className="text-sm font-semibold text-zinc-400 mt-0.5 block">$384,102.50</span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Mock Chart */}
                  <div className="h-64 bg-zinc-900/20 border border-zinc-900 rounded-2xl p-6 relative flex flex-col justify-between overflow-hidden">
                    <div className="absolute inset-0 bg-radial-grid opacity-20 pointer-events-none" />
                    
                    <div className="flex justify-between items-start z-10">
                      <div>
                        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Liquid Cash Analytics</h4>
                        <span className="text-xs text-zinc-500 mt-0.5 block">Historical trend projection based on actual ledgers</span>
                      </div>
                      <span className="bg-primary/20 border border-secondary/20 text-accent text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        Live Auto-Reconciliation
                      </span>
                    </div>

                    {/* Faux Sparkline bars */}
                    <div className="flex items-end justify-between gap-1 sm:gap-2 h-36 mt-4">
                      {[65, 78, 72, 85, 90, 82, 95, 110, 105, 120, 115, 138].map((val, idx) => (
                        <div key={idx} className="flex-1 flex flex-col justify-end group cursor-pointer relative h-full">
                          {/* Hover Tooltip */}
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-accent px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl z-20">
                            ${(val * 17500).toLocaleString()}
                          </div>
                          
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${val}%` }}
                            transition={{ delay: idx * 0.04, duration: 0.8, ease: "easeOut" }}
                            className={`rounded-t-sm transition-all duration-300 ${
                              idx === 11 
                                ? "bg-gradient-to-t from-secondary via-accent to-white group-hover:brightness-125" 
                                : "bg-gradient-to-t from-primary/30 to-secondary/80 group-hover:to-accent"
                            }`}
                          />
                          <span className="text-[9px] text-zinc-600 text-center mt-2 font-mono block">
                            {["J","F","M","A","M","J","J","A","S","O","N","D"][idx]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cash allocation details */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-4">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Global Payout Velocity</span>
                      <span className="text-lg font-bold text-white mt-1 block">18.5 ms</span>
                      <div className="w-full bg-zinc-900 h-1 rounded-full mt-2 overflow-hidden">
                        <div className="bg-accent h-full w-[95%]" />
                      </div>
                    </div>
                    <div className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-4">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Corporate Card Limit</span>
                      <span className="text-lg font-bold text-white mt-1 block">$1,250,000</span>
                      <div className="w-full bg-zinc-900 h-1 rounded-full mt-2 overflow-hidden">
                        <div className="bg-secondary h-full w-[65%]" />
                      </div>
                    </div>
                    <div className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-4">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Fraud Shield Status</span>
                      <span className="text-lg font-bold text-emerald-400 mt-1 flex items-center gap-1">
                        <ShieldCheck className="h-4 w-4" />
                        100% Secure
                      </span>
                      <div className="w-full bg-zinc-900 h-1 rounded-full mt-2 overflow-hidden">
                        <div className="bg-emerald-500 h-full w-full" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "transactions" && (
                <motion.div
                  key="transactions"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-semibold text-white">Live Ledger Streams</h4>
                      <p className="text-xs text-zinc-500">Ticking list of real-time transactions processed</p>
                    </div>
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
                      Streaming
                    </span>
                  </div>

                  <div className="divide-y divide-zinc-900 overflow-y-auto max-h-[350px] pr-2 green-scrollbar">
                    {transactions.map((tx, idx) => (
                      <motion.div 
                        key={tx.id} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center justify-between py-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`h-9 w-9 rounded-lg flex items-center justify-center border ${
                            tx.type === "in" 
                              ? "bg-emerald-950/30 border-emerald-900/50 text-emerald-400" 
                              : "bg-zinc-900 border-zinc-800 text-zinc-400"
                          }`}>
                            {tx.type === "in" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-white block">{tx.merchant}</span>
                            <span className="text-[10px] text-zinc-500 block">{tx.category}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className={`text-xs font-bold font-mono ${tx.type === "in" ? "text-emerald-400" : "text-zinc-300"}`}>
                            {tx.type === "in" ? "+" : "-"}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </span>
                          <span className="text-[10px] text-zinc-500 block mt-0.5">{tx.date}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "cashflow" && (
                <motion.div
                  key="cashflow"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-white">Cross-Border Payout Allocation</h4>
                    <p className="text-xs text-zinc-500">Global breakdown of current cash distribution streams</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 items-center py-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-medium text-zinc-400 mb-1">
                          <span className="flex items-center gap-1.5">
                            <Globe className="h-3.5 w-3.5 text-accent" /> North America (USD)
                          </span>
                          <span className="font-semibold text-white">62.4%</span>
                        </div>
                        <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-800">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "62.4%" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="bg-gradient-to-r from-primary to-accent h-full"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-medium text-zinc-400 mb-1">
                          <span className="flex items-center gap-1.5">
                            <Globe className="h-3.5 w-3.5 text-secondary" /> Europe Union (EUR)
                          </span>
                          <span className="font-semibold text-white">24.8%</span>
                        </div>
                        <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-800">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "24.8%" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="bg-gradient-to-r from-primary to-secondary h-full"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-medium text-zinc-400 mb-1">
                          <span className="flex items-center gap-1.5">
                            <Globe className="h-3.5 w-3.5 text-zinc-500" /> Asia Pacific (SGD / JPY)
                          </span>
                          <span className="font-semibold text-white">12.8%</span>
                        </div>
                        <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-800">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "12.8%" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="bg-gradient-to-r from-zinc-800 to-zinc-600 h-full"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 text-center space-y-4">
                      <Layers className="h-8 w-8 text-accent mx-auto" />
                      <div className="space-y-1">
                        <h5 className="text-xs font-semibold text-white uppercase tracking-wider">Multi-Entity Sync</h5>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          LedgerFlow consolidates nested child corporate structures in real-time, matching transactions inside parent ledger accounts without manual CSV pipelines.
                        </p>
                      </div>
                      <button className="text-xs font-bold text-accent hover:text-white transition-colors">
                        Read Sync Docs →
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "card" && (
                <motion.div
                  key="card"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-semibold text-white">LedgerFlow Titanium Corporate Card</h4>
                      <p className="text-xs text-zinc-500">Configure spend controls, card freezing, and instant rewards limits</p>
                    </div>
                    <span className="text-[10px] font-bold text-black bg-accent px-2 py-0.5 rounded uppercase tracking-wider">
                      Premium Titanium
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 items-stretch pt-4">
                    <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between space-y-6">
                      <div className="space-y-2">
                        <span className="text-[10px] text-zinc-500 block uppercase tracking-wider">Active Card Spend Limit</span>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-white">$150,000.00</span>
                          <span className="text-xs text-zinc-400">per month</span>
                        </div>
                        <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-800">
                          <div className="bg-accent h-full w-[45%]" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-850">
                          <span className="text-[9px] text-zinc-500 block uppercase">Cashback Earned</span>
                          <span className="text-sm font-bold text-emerald-400 mt-0.5 block">$3,481.50</span>
                        </div>
                        <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-850">
                          <span className="text-[9px] text-zinc-500 block uppercase">Auto-Reconcile</span>
                          <span className="text-sm font-bold text-accent mt-0.5 block">100% Enabled</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xs text-zinc-400 flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Card Active (No. 4022)
                        </span>
                        <button className="text-xs font-semibold text-accent hover:text-white transition-colors">
                          Spend Controls →
                        </button>
                      </div>
                    </div>

                    <div className="border border-zinc-800/80 rounded-2xl bg-zinc-950/20 p-6 flex flex-col justify-center text-center space-y-4">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-accent mx-auto border border-secondary/20 shadow-md">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <h5 className="text-xs font-semibold text-white">Instant Virtual Cards</h5>
                        <p className="text-xs text-zinc-400 mt-1 max-w-[220px] mx-auto leading-relaxed">
                          Issue custom single-use virtual cards for recurring software expenses instantly with bespoke daily limits.
                        </p>
                      </div>
                      <button className="text-xs font-bold text-accent hover:text-white transition-colors mt-2">
                        Create Card Link →
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT PANEL: Floating 3D Credit Card Showpiece */}
          <div className="lg:col-span-4 bg-zinc-950/60 border border-zinc-800/80 rounded-3xl p-8 backdrop-blur-md flex flex-col justify-between items-center shadow-2xl relative overflow-hidden group min-h-[420px]">
            {/* Background grids */}
            <div className="absolute inset-0 bg-radial-grid opacity-10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 blur-[60px] pointer-events-none rounded-full" />
            
            <div className="text-center z-10 space-y-1.5 w-full">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-accent bg-primary/25 border border-secondary/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Luxury Titanium Asset
              </span>
              <h4 className="text-sm font-semibold text-white mt-1">Interactive spend controls</h4>
              <p className="text-xs text-zinc-500 max-w-[200px] mx-auto">Hover card to trigger 3D metallic light refraction</p>
            </div>

            {/* Credit Card Container with Perspective */}
            <div 
              className="perspective-1000 w-full max-w-[280px] h-[180px] flex items-center justify-center my-6 cursor-grab active:cursor-grabbing z-10"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div
                ref={cardRef}
                style={{
                  rotateX: rotateX,
                  rotateY: rotateY,
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  rotateX: { type: "spring", stiffness: 150, damping: 20 },
                  rotateY: { type: "spring", stiffness: 150, damping: 20 }
                }}
                className="relative w-full h-full rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden"
              >
                {/* Refractive Light Highlight Overlay */}
                <div 
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"
                  style={{
                    transform: `translate(${rotateY * 2}px, ${-rotateX * 2}px)`,
                  }}
                />

                {/* Main Card Image */}
                <img 
                  src="/premium_card.png" 
                  alt="LedgerFlow Titanium Corporate Card" 
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable={false}
                />
              </motion.div>
            </div>

            {/* Bottom mini metric */}
            <div className="w-full border-t border-zinc-900 pt-4 flex justify-between items-center z-10 text-xs">
              <span className="text-zinc-500 font-medium">Physical Card Weight:</span>
              <span className="font-bold text-white flex items-center gap-1">
                18 grams <span className="text-accent">Titanium</span>
              </span>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
