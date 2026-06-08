import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Bell, Calendar, CheckCircle2, Recycle } from "lucide-react";

const notificacoes = [
  { icon: Calendar, titulo: "Coleta confirmada", texto: "Sua coleta de Metal foi confirmada para amanhã às 15h.", tempo: "há 2h", cor: "text-primary bg-primary-soft" },
  { icon: Recycle, titulo: "Dica de reciclagem", texto: "Sabia que tampinhas de garrafa podem ser doadas a campanhas solidárias?", tempo: "há 1 dia", cor: "text-emerald-600 bg-emerald-50" },
  { icon: CheckCircle2, titulo: "Coleta concluída", texto: "Obrigado! Sua última coleta foi concluída com sucesso.", tempo: "há 3 dias", cor: "text-primary bg-primary-soft" },
  { icon: Bell, titulo: "Coleta municipal", texto: "Próxima coleta municipal: 01/04 às 15h na Quadra 502 Sul.", tempo: "há 5 dias", cor: "text-amber-600 bg-amber-50" },
];

export const Route = createFileRoute("/notificacoes")({
  head: () => ({ meta: [{ title: "Notificações — Solus" }] }),
  component: NotificacoesPage,
});

function NotificacoesPage() {
  return (
    <AppLayout>
      <h1 className="text-2xl font-bold text-foreground md:text-3xl">Notificações</h1>

      <div className="mt-6 max-w-2xl space-y-3">
        {notificacoes.map((n, i) => {
          const Icon = n.icon;
          return (
            <div key={i} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${n.cor}`}>
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-foreground">{n.titulo}</h3>
                  <span className="shrink-0 text-xs text-muted-foreground">{n.tempo}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{n.texto}</p>
              </div>
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}
