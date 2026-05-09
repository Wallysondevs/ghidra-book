import { useRoute, Link } from "wouter";
import { chapterMap, chapters, sections } from "@/data/chapters";
import PageContainer from "@/components/PageContainer";
import CodeBlock from "@/components/CodeBlock";
import AlertBox from "@/components/AlertBox";
import NotFound from "./NotFound";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function ChapterPage() {
  const [, params] = useRoute("/c/:slug");
  const slug = params?.slug ?? "";
  const ch = chapterMap[slug];

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [slug]);

  if (!ch) return <NotFound />;

  const allSlugs = sections.flatMap((s) => s.chapterSlugs);
  const idx = allSlugs.indexOf(slug);
  const prev = idx > 0 ? chapterMap[allSlugs[idx - 1]] : null;
  const next = idx < allSlugs.length - 1 ? chapterMap[allSlugs[idx + 1]] : null;
  const sec = sections.find((s) => s.id === ch.section);

  return (
    <PageContainer title={ch.title} subtitle={ch.subtitle} difficulty={ch.difficulty}>
      {sec && (
        <p className="text-xs uppercase tracking-wide text-slate-600 mb-4">
          {sec.label} · Capítulo {idx + 1} de {chapters.length}
        </p>
      )}

      <p>{ch.intro}</p>

      {ch.codes.map((c, i) => (
        <CodeBlock key={i} code={c.code} language={c.lang} label={c.label} />
      ))}

      {ch.points.length > 0 && (
        <>
          <h2>Pontos-chave</h2>
          <ul>
            {ch.points.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </>
      )}

      {ch.alerts.map((a, i) => (
        <AlertBox key={i} type={a.type}>{a.content}</AlertBox>
      ))}

      <nav className="mt-12 pt-6 border-t border-[#22c55e20] flex items-center justify-between gap-4">
        {prev ? (
          <Link href={`/c/${allSlugs[idx - 1]}`} className="flex-1 group p-3 rounded-lg border border-[#22c55e20] hover:border-gh-green transition-colors">
            <div className="flex items-center gap-1 text-xs text-slate-600"><ArrowLeft size={12} /> Anterior</div>
            <div className="text-sm font-semibold text-gh-green truncate">{prev.title}</div>
          </Link>
        ) : <div className="flex-1" />}
        {next ? (
          <Link href={`/c/${allSlugs[idx + 1]}`} className="flex-1 group p-3 rounded-lg border border-[#22c55e20] hover:border-gh-green transition-colors text-right">
            <div className="flex items-center justify-end gap-1 text-xs text-slate-600">Próximo <ArrowRight size={12} /></div>
            <div className="text-sm font-semibold text-gh-green truncate">{next.title}</div>
          </Link>
        ) : <div className="flex-1" />}
      </nav>
    </PageContainer>
  );
}
