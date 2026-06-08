import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { User, Mail, MapPin, Award, Recycle, LogOut, ChevronRight, HelpCircle, Settings } from "lucide-react";
import { useAgendamentos } from "@/lib/agendamentos";

export const Route = createFileRoute("/perfil")({
  head: () => ({ meta: [{ title: "Perfil — Solus" }] }),
  component: PerfilPage,
});

function PerfilPage() {
  const { list } = useAgendamentos();
  const total = list.length;
  const ativas = list.filter((a) => a.status === "agendado").length;

  return (
    <AppLayout>
      <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
        <div className="rounded-3xl bg-gradient-primary p-6 text-primary-foreground shadow-card">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-white/20 backdrop-blur">
            <User className="h-10 w-10" />
          </div>
          <h1 className="mt-4 text-2xl font-bold">Visitante Solus</h1>
          <p className="text-sm text-primary-foreground/90">Conta de demonstração</p>

          <div className="mt-6 space-y-2 text-sm">
            <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> visitante@solus.app</p>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Palmas - TO</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
              <p className="text-2xl font-bold">{total}</p>
              <p className="text-xs text-primary-foreground/80">Coletas totais</p>
            </div>
            <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
              <p className="text-2xl font-bold">{ativas}</p>
              <p className="text-xs text-primary-foreground/80">Em andamento</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-bold text-foreground">Eco-pontuação</h3>
                <p className="text-sm text-muted-foreground">Continue reciclando para subir de nível.</p>
              </div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full bg-gradient-primary" style={{ width: `${Math.min(100, total * 20)}%` }} />
            </div>
            <p className="mt-2 text-xs font-semibold text-muted-foreground">Nível {Math.min(5, total + 1)} · Defensor verde</p>
          </div>

          <MenuItem to="/agendamentos" icon={Recycle} label="Minhas coletas" desc="Histórico e status" />
          <MenuItem to="/notificacoes" icon={Settings} label="Preferências" desc="Notificações e privacidade" />
          <MenuItem to="/ajuda" icon={HelpCircle} label="Ajuda & Suporte" desc="Fale com a equipe Solus" />

          <button className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left text-destructive shadow-soft hover:bg-destructive/5">
            <LogOut className="h-5 w-5" />
            <span className="font-semibold">Sair (demo)</span>
          </button>
        </div>
      </div>
    </AppLayout>
  );
}

function MenuItem({ to, icon: Icon, label, desc }: { to: string; icon: typeof User; label: string; desc: string }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/40"
    >
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div className="flex-1">
        <p className="font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </Link>
  );
}
