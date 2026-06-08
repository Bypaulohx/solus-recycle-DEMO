import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { CheckCircle2, Calendar, MapPin, Package } from "lucide-react";
import { useEffect, useState } from "react";
import type { Agendamento } from "@/lib/agendamentos";

export const Route = createFileRoute("/confirmacao/$id")({
  head: () => ({ meta: [{ title: "Coleta agendada — Solus" }] }),
  component: ConfirmacaoPage,
});

function ConfirmacaoPage() {
  const { id } = Route.useParams();
  const [a, setA] = useState<Agendamento | null>(null);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("solus.agendamentos.v1") || "[]");
    setA(list.find((x: Agendamento) => x.id === id) ?? null);
  }, [id]);

  if (!a) {
    return (
      <AppLayout>
        <p className="text-center text-muted-foreground">Agendamento não encontrado.</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary-soft text-primary">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-foreground">Coleta agendada!</h1>
        <p className="mt-2 text-muted-foreground">
          Sua coleta foi registrada com sucesso. Você pode acompanhar, editar ou cancelar a qualquer momento.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-xl rounded-3xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-start gap-3 border-b border-border pb-4">
          <MapPin className="mt-0.5 h-5 w-5 text-primary" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Ponto</p>
            <p className="font-semibold text-foreground">{a.ponto}</p>
            <p className="text-sm text-muted-foreground">{a.endereco}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 border-b border-border py-4">
          <Calendar className="mt-0.5 h-5 w-5 text-primary" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Data</p>
            <p className="font-semibold capitalize text-foreground">
              {new Date(a.data).toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 pt-4">
          <Package className="mt-0.5 h-5 w-5 text-primary" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Material</p>
            <p className="font-semibold text-foreground">{a.material} · {a.peso}kg</p>
            {a.observacao && <p className="mt-1 text-sm text-muted-foreground">"{a.observacao}"</p>}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
        <Link to="/agendamentos" className="flex-1 rounded-xl bg-primary px-6 py-3 text-center text-sm font-bold text-primary-foreground shadow-soft">
          Ver minhas coletas
        </Link>
        <Link to="/home" className="flex-1 rounded-xl border border-border bg-card px-6 py-3 text-center text-sm font-semibold text-foreground hover:bg-secondary">
          Voltar para início
        </Link>
      </div>
    </AppLayout>
  );
}
