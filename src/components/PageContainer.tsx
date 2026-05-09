import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function PageContainer({ title, subtitle, difficulty, children }: {
  title: string; subtitle?: string; difficulty?: "iniciante" | "intermediario" | "avancado"; children: ReactNode;
}) {
  const colors = {
    iniciante: "bg-green-900/40 text-green-300",
    intermediario: "bg-yellow-900/40 text-yellow-300",
    avancado: "bg-red-900/40 text-red-300",
  };
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto px-4 sm:px-6 py-8"
    >
      <div className="mb-6 pb-6 border-b border-[#22c55e20]">
        {difficulty && (
          <span className={`inline-block text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded mb-3 ${colors[difficulty]}`}>
            {difficulty}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold text-white">{title}</h1>
        {subtitle && <p className="mt-2 text-slate-400">{subtitle}</p>}
      </div>
      <div className="prose-gh">{children}</div>
    </motion.article>
  );
}
