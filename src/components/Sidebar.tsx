import { Link, useLocation } from "wouter";
import { useMemo, useState } from "react";
import { sections, chapterMap } from "@/data/chapters";
import * as Icons from "lucide-react";
import { ChevronDown, Search, X } from "lucide-react";

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [location] = useLocation();
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    if (!query.trim()) return sections;
    const q = query.toLowerCase();
    return sections
      .map((s) => ({
        ...s,
        chapterSlugs: s.chapterSlugs.filter((slug) => {
          const c = chapterMap[slug];
          return c && (c.title.toLowerCase().includes(q) || c.subtitle.toLowerCase().includes(q));
        }),
      }))
      .filter((s) => s.chapterSlugs.length > 0);
  }, [query]);

  return (
    <>
      {open && <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={onClose} />}
      <aside
        className={`fixed lg:sticky lg:top-14 top-0 left-0 z-50 lg:z-10 h-screen lg:h-[calc(100vh-3.5rem)] w-72 bg-[#080d1a] border-r border-[#22c55e20] overflow-y-auto transition-transform ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="p-3 border-b border-[#22c55e20] flex items-center gap-2 lg:hidden">
          <span className="font-bold text-gh-green neon-text">Menu</span>
          <button onClick={onClose} className="ml-auto p-1 text-slate-400 hover:text-gh-green"><X size={18} /></button>
        </div>
        <div className="p-3 sticky top-0 bg-[#080d1a] z-10">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar capítulo…"
              className="w-full pl-8 pr-2 py-1.5 text-sm bg-[#0d1424] text-slate-300 rounded border border-[#22c55e20] focus:border-gh-green focus:outline-none placeholder:text-slate-600"
            />
          </div>
        </div>
        <nav className="px-2 pb-8">
          {filtered.map((s) => {
            const Icon = (Icons as any)[s.icon] || Icons.BookOpen;
            const isCollapsed = collapsed[s.id];
            return (
              <div key={s.id} className="mb-1">
                <button
                  onClick={() => setCollapsed((c) => ({ ...c, [s.id]: !c[s.id] }))}
                  className="w-full flex items-center gap-2 px-2 py-2 text-sm font-semibold text-slate-300 hover:bg-[#0d1a0d] hover:text-gh-green rounded transition-colors"
                >
                  <Icon size={16} className="text-gh-green shrink-0" />
                  <span className="flex-1 text-left">{s.label}</span>
                  <ChevronDown size={14} className={`transition-transform text-slate-500 ${isCollapsed ? "-rotate-90" : ""}`} />
                </button>
                {!isCollapsed && (
                  <ul className="ml-4 border-l border-[#22c55e20]">
                    {s.chapterSlugs.map((slug) => {
                      const c = chapterMap[slug];
                      if (!c) return null;
                      const path = `/c/${slug}`;
                      const active = location === path;
                      return (
                        <li key={slug}>
                          <Link
                            href={path}
                            onClick={onClose}
                            className={`block pl-3 pr-2 py-1.5 text-sm border-l-2 -ml-px transition-colors ${
                              active
                                ? "border-gh-green text-gh-green font-semibold bg-[#22c55e15]"
                                : "border-transparent text-slate-500 hover:text-slate-200 hover:border-[#22c55e40]"
                            }`}
                          >
                            {c.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
