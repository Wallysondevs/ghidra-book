import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CodeBlock({ code, language = "assembly", label }: { code: string; language?: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <div className="relative my-4 group">
      <div className="flex items-center justify-between bg-[#0a1a0a] text-gh-green text-xs px-4 py-2 rounded-t-lg font-mono border border-[#22c55e30] border-b-0">
        <span>{label || language}</span>
        <button onClick={copy} className="flex items-center gap-1 hover:text-gh-green-light transition-colors text-slate-400">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copiado!" : "Copiar"}
        </button>
      </div>
      <pre className="bg-[#050d05] text-slate-200 p-4 rounded-b-lg overflow-x-auto text-sm leading-relaxed font-mono border border-[#22c55e30] border-t-0">
        <code>{code}</code>
      </pre>
    </div>
  );
}
