import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { MapPin, Search, Recycle, Calendar, ArrowRight, Leaf } from "lucide-react";
import { useAgendamentos } from "@/lib/agendamentos";
import coleta from "@/assets/solus/coleta.png";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Solus — Reciclagem inteligente" },
      { name: "description", content: "Agende coletas de recicláveis e encontre pontos próximos." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { list } = useAgendamentos();
  const proximas = list.filter((a) => a.status === "agendado").slice(0, 1);

  return (
    <AppLayout>
      <section className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div className="rounded-3xl bg-gradient-primary p-6 text-primary-foreground shadow-card md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            <Leaf className="h-3.5 w-3.5" /> Olá, bem-vindo de volta
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
            Recicle hoje.<br />Transforme amanhã.
          </h1>
          <p className="mt-3 max-w-md text-sm text-primary-foreground/90 md:text-base">
            Agende uma coleta em domicílio ou encontre o ponto de descarte mais próximo de você.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/mapa"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary shadow-soft transition-transform hover:-translate-y-0.5"
            >
              Agendar coleta <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/reciclagem"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              O que posso reciclar?
            </Link>
          </div>
        </div>
        <div className="hidden overflow-hidden rounded-3xl shadow-card md:block">
          <img src={coleta} alt="Coleta seletiva" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-soft">
        {proximas.length > 0 ? (
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Próxima coleta</p>
              <p className="mt-1 font-semibold text-foreground">{proximas[0].ponto}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(proximas[0].data).toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })} · {proximas[0].material} · {proximas[0].peso}kg
              </p>
            </div>
            <Link
              to="/agendamentos"
              className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary-soft px-4 py-2 text-sm font-semibold text-primary"
            >
              Ver detalhes
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Nenhuma coleta agendada</p>
              <p className="mt-1 text-sm text-muted-foreground">Que tal marcar sua primeira coleta agora?</p>
            </div>
            <Link to="/mapa" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
              Agendar
            </Link>
          </div>
        )}
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-lg font-bold text-foreground">Atalhos</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { to: "/mapa", icon: MapPin, label: "Pontos de coleta", color: "from-emerald-50 to-emerald-100" },
            { to: "/encontrar-catadores", icon: Search, label: "Encontrar catadores", color: "from-lime-50 to-lime-100" },
            { to: "/reciclagem", icon: Recycle, label: "O que reciclar", color: "from-teal-50 to-teal-100" },
            { to: "/agendamentos", icon: Calendar, label: "Minhas coletas", color: "from-green-50 to-green-100" },
          ].map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/40"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-foreground">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-foreground">Próxima coleta municipal</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="font-semibold text-primary">01/04 — 15h</span> · Quadra 502 Sul · Palmas - TO
            </p>
          </div>
          <Link
            to="/mapa"
            className="rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary-soft"
          >
            Ver local
          </Link>
        </div>
      </section>
    </AppLayout>
  );
}
