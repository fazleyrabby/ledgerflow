import Link from "next/link";

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
    <footer className="border-t border-white/5 bg-zinc-950/80 py-16 lg:py-20 relative overflow-hidden">
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
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} LedgerFlow. All rights reserved.
          </p>
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
    </footer>
  );
}

