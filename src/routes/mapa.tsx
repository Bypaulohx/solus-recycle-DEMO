import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { PONTOS } from "@/lib/pontos";
import { MapPin, Search, Clock, Phone } from "lucide-react";
import { useState } from "react";
import maps from "@/assets/solus/maps.png";

export const Route = createFileRoute("/mapa")({
  head: () => ({
    meta: [{ title: "Pontos de coleta — Solus" }],
  }),
  component: MapaPage,
});

function MapaPage() {
  const [q, setQ] = useState("");
  const filtered = PONTOS.filter(
    (p) =>
      p.nome.toLowerCase().includes(q.toLowerCase()) ||
      p.endereco.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
        <div className="overflow-hidden rounded-3xl border border-border shadow-card">
          <div className="relative h-72 w-full md:h-[520px]">
            <img src={maps} alt="Mapa" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            {PONTOS.slice(0, 4).map((p, i) => (
              <div
                key={p.id}
                className="absolute"
                style={{ top: `${20 + i * 18}%`, left: `${25 + i * 15}%` }}
              >
                <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-card ring-4 ring-white/70">
                  <MapPin className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Encontre pontos de coleta perto de você
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Toque em um ponto para ver detalhes e agendar uma coleta.
          </p>

          <div className="relative mt-4">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nome ou endereço…"
              className="w-full rounded-full border border-input bg-card py-3 pl-11 pr-4 text-sm shadow-soft outline-none transition-colors focus:border-primary"
            />
          </div>

          <ul className="mt-4 space-y-3">
            {filtered.map((p) => (
              <li key={p.id}>
                <Link
                  to="/ponto/$id"
                  params={{ id: p.id }}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/40"
                >
                  <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground">{p.nome}</h3>
                    <p className="text-sm text-muted-foreground">{p.endereco} · {p.cidade}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-primary">
                      <Clock className="h-3 w-3" /> {p.horario}
                    </p>
                    {p.telefone && (
                      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" /> {p.telefone}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                Nenhum ponto encontrado.
              </li>
            )}
          </ul>
        </div>
      </div>
    </AppLayout>
  );
}
