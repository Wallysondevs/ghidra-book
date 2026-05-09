import { Link } from "wouter";
import { sections, chapters, chapterMap } from "@/data/chapters";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { ArrowRight, Cpu } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <div className="inline-block mb-4">
          <Cpu size={64} className="text-gh-green neon-text mx-auto" strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gh-green neon-text mb-4">
          Ghidra: Do Zero ao Avançado
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Um livro completo em português com <strong className="text-slate-200">{chapters.length} capítulos</strong> práticos —
          do primeiro{" "}
          <code className="text-gh-green bg-[#0f2518] px-1 rounded">analyzeHeadless</code>{" "}
          até análise de malware e CTF.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link
            href={`/c/${sections[0]?.chapterSlugs[0]}`}
            className="inline-flex items-center gap-2 bg-gh-green hover:bg-gh-green-dark text-black px-6 py-3 rounded-lg font-semibold shadow transition-colors"
          >
            <Cpu size={18} /> Começar agora
          </Link>
          <a
            href="https://github.com/NationalSecurityAgency/ghidra"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-gh-green text-gh-green px-6 py-3 rounded-lg font-semibold hover:bg-[#22c55e15] transition-colors"
          >
            GitHub do Ghidra <ArrowRight size={18} />
          </a>
        </div>
      </motion.section>

      {/* Featured code block — just like python-book */}
      <section className="mb-14 bg-[#050d05] text-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl border border-[#22c55e20]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-gh-green">ghidra_analysis.py</span>
          <span className="text-xs text-slate-500">GhidraBridge · Python 3</span>
        </div>
        <pre className="text-sm leading-relaxed font-mono overflow-x-auto text-slate-300"><code>{`import ghidra_bridge

# Conecta ao Ghidra via bridge (Python 3 real)
b = ghidra_bridge.GhidraBridge(namespace=globals())

# Pega o programa aberto no Ghidra
prog = currentProgram
print(f"Analisando: {prog.getName()}")

# Lista todas as funções identificadas
fm = prog.getFunctionManager()
for func in fm.getFunctions(True):
    print(f"  0x{func.getEntryPoint()} -> {func.getName()}")

# Encontra a função 'main'
main = fm.getFunctionAt(prog.getSymbolTable()
    .getSymbols("main").next().getAddress())
print(f"\\n[+] Main em: {main.getEntryPoint()}")
print(f"    Tamanho:   {main.getBody().getNumAddresses()} bytes")`}</code></pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-6">
          {sections.length} trilhas, {chapters.length} capítulos
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((s, i) => {
            const Icon = (Icons as any)[s.icon] || Icons.BookOpen;
            const first = s.chapterSlugs[0];
            const firstCh = first ? chapterMap[first] : null;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <Link
                  href={firstCh ? `/c/${first}` : "/"}
                  className="block h-full bg-[#0d1424] border border-[#22c55e20] rounded-xl p-5 hover:border-gh-green hover:shadow-lg hover:shadow-[#22c55e10] transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[#22c55e15] text-gh-green rounded-lg">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs uppercase tracking-wide text-slate-500">
                      {s.chapterSlugs.length} capítulos
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-200 group-hover:text-gh-green mb-1 transition-colors">
                    {s.label}
                  </h3>
                  {firstCh && (
                    <p className="text-sm text-slate-600">
                      Começa com: <span className="text-slate-400">{firstCh.title}</span>
                    </p>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mt-16 text-center text-sm text-slate-600 pb-8">
        <p>
          Ghidra é mantido pela{" "}
          <a className="text-gh-green font-semibold" href="https://www.nsa.gov/" target="_blank" rel="noreferrer">NSA Research</a>
          {" · "}
          Licença{" "}
          <a className="text-gh-green font-semibold" href="https://github.com/NationalSecurityAgency/ghidra/blob/master/LICENSE" target="_blank" rel="noreferrer">Apache 2.0</a>
        </p>
      </section>
    </div>
  );
}
