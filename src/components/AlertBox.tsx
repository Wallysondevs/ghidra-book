import { AlertTriangle, Info, CheckCircle, XCircle, Lightbulb } from "lucide-react";
import type { ReactNode } from "react";

type Type = "info" | "warning" | "danger" | "success" | "tip";

const styles: Record<Type, { bg: string; border: string; text: string; icon: ReactNode; label: string }> = {
  info:    { bg: "bg-blue-950/40",   border: "border-blue-500",   text: "text-blue-300",   icon: <Info size={20} />,          label: "Informação" },
  warning: { bg: "bg-amber-950/40",  border: "border-amber-400",  text: "text-amber-300",  icon: <AlertTriangle size={20} />, label: "Atenção" },
  danger:  { bg: "bg-red-950/40",    border: "border-red-500",    text: "text-red-300",    icon: <XCircle size={20} />,       label: "Cuidado" },
  success: { bg: "bg-green-950/40",  border: "border-green-500",  text: "text-green-300",  icon: <CheckCircle size={20} />,   label: "Sucesso" },
  tip:     { bg: "bg-purple-950/40", border: "border-purple-400", text: "text-purple-300", icon: <Lightbulb size={20} />,     label: "Dica" },
};

export default function AlertBox({ type = "info", title, children }: { type?: Type; title?: string; children: ReactNode }) {
  const s = styles[type];
  return (
    <div className={`${s.bg} ${s.text} border-l-4 ${s.border} p-4 my-4 rounded-r-lg flex gap-3`}>
      <div className="shrink-0 mt-0.5">{s.icon}</div>
      <div className="flex-1">
        <div className="font-semibold mb-1">{title || s.label}</div>
        <div className="text-sm leading-relaxed text-slate-300">{children}</div>
      </div>
    </div>
  );
}
