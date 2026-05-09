import { Link } from "wouter";
import { Menu, Github, Cpu } from "lucide-react";

export default function Header({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 bg-[#080d1a] border-b border-[#22c55e20] shadow-sm">
      <div className="flex items-center gap-3 px-4 h-14">
        <button onClick={onMenu} className="lg:hidden p-2 -ml-2 text-slate-300" aria-label="Menu">
          <Menu size={22} />
        </button>
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Cpu size={22} className="text-gh-green" />
          <span className="text-gh-green neon-text">GHIDRA BOOK</span>
          <span className="text-slate-500 font-normal text-sm hidden sm:inline">– Reverse Engineering do Zero</span>
        </Link>
        <div className="ml-auto">
          <a
            href="https://github.com/NationalSecurityAgency/ghidra"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-gh-green transition-colors"
          >
            <Github size={18} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
