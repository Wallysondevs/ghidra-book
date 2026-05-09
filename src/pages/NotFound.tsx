import { Link } from "wouter";
import { Cpu } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-4"><Cpu size={64} className="mx-auto text-gh-green neon-text" /></div>
      <h1 className="text-4xl font-bold text-gh-green neon-text mb-2">0x404</h1>
      <p className="text-slate-500 mb-8">
        Endereço de memória não encontrado. Esta página não existe no binário.
      </p>
      <Link href="/" className="inline-flex items-center gap-2 bg-gh-green hover:bg-gh-green-dark text-black px-5 py-2.5 rounded-lg font-semibold transition-colors">
        <Cpu size={18} /> Voltar ao início
      </Link>
    </div>
  );
}
