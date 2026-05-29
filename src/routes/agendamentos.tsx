import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { useAgendamentos } from "@/lib/agendamentos";
import { Calendar, MapPin, Trash2, XCircle, CheckCircle2, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/agendamentos")({
  head: () => ({ meta: [{ title: "Minhas coletas — Solus" }] }),
  component: AgendamentosPage,
});

function AgendamentosPage() {
  const { list, cancelar, remover } = useAgendamentos();
  const [tab, setTab] = useState<"agendado" | "cancelado">("agendado");
  const filtered = list.filter((a) => a.status === tab);

  return (
    <AppLayout>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Minhas coletas</h1>
          <p className="mt-1 text-sm text-muted-foreground">Acompanhe e gerencie suas coletas agendadas.</p>
        </div>
        <Link
          to="/mapa"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft"
        >
          <Plus className="h-4 w-4" /> Nova coleta
        </Link>
      </div>

      <div className="mt-6 inline-flex rounded-full border border-border bg-card p-1 shadow-soft">
        {[
          { id: "agendado", label: "Agendadas" },
          { id: "cancelado", label: "Canceladas" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as typeof tab)}
            className={
              "rounded-full px-5 py-2 text-sm font-semibold transition-colors " +
              (tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <Calendar className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-3 font-semibold text-foreground">
              {tab === "agendado" ? "Nenhuma coleta agendada" : "Nenhuma coleta cancelada"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {tab === "agendado" && "Que tal marcar uma coleta agora?"}
            </p>
            {tab === "agendado" && (
              <Link to="/mapa" className="mt-4 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground">
                Agendar coleta
              </Link>
            )}
          </div>
        )}

        {filtered.map((a) => (
          <article key={a.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {new Date(a.data).toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })}
                </p>
                <h3 className="mt-1 truncate font-bold text-foreground">{a.ponto}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {a.endereco}
                </p>
              </div>
              <span
                className={
                  "shrink-0 rounded-full px-2.5 py-1 text-xs font-bold " +
                  (a.status === "agendado"
                    ? "bg-primary-soft text-primary"
                    : "bg-destructive/10 text-destructive")
                }
              >
                {a.status === "agendado" ? "Agendada" : "Cancelada"}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-secondary px-3 py-1 font-semibold text-secondary-foreground">{a.material}</span>
              <span className="rounded-full bg-secondary px-3 py-1 font-semibold text-secondary-foreground">{a.peso}kg</span>
            </div>
            {a.observacao && (
              <p className="mt-3 rounded-xl bg-muted p-3 text-sm text-muted-foreground">"{a.observacao}"</p>
            )}

            <div className="mt-4 flex gap-2">
              {a.status === "agendado" ? (
                <button
                  onClick={() => {
                    cancelar(a.id);
                    toast.success("Coleta cancelada");
                  }}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-destructive/30 px-4 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive/10"
                >
                  <XCircle className="h-4 w-4" /> Cancelar
                </button>
              ) : (
                <button
                  onClick={() => {
                    remover(a.id);
                    toast.success("Removido");
                  }}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-secondary"
                >
                  <Trash2 className="h-4 w-4" /> Remover
                </button>
              )}
              <Link
                to="/confirmacao/$id"
                params={{ id: a.id }}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-primary-soft px-4 py-2.5 text-sm font-semibold text-primary"
              >
                <CheckCircle2 className="h-4 w-4" /> Detalhes
              </Link>
            </div>
          </article>
        ))}
      </div>
    </AppLayout>
  );
}
