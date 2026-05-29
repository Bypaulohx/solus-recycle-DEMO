import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { getPonto } from "@/lib/pontos";
import { ArrowLeft, MapPin, Clock, Phone, Recycle } from "lucide-react";

export const Route = createFileRoute("/ponto/$id")({
  loader: ({ params }) => {
    const p = getPonto(params.id);
    if (!p) throw notFound();
    return { ponto: p };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.ponto.nome ?? "Ponto"} — Solus` }],
  }),
  component: DetalhesPonto,
});

function DetalhesPonto() {
  const { ponto } = Route.useLoaderData();
  const navigate = useNavigate();

  return (
    <AppLayout>
      <button
        onClick={() => navigate({ to: "/mapa" })}
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar ao mapa
      </button>

      <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
        <div className="rounded-3xl bg-gradient-primary p-6 text-primary-foreground shadow-card md:p-8">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20 backdrop-blur">
            <MapPin className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-2xl font-bold leading-tight md:text-3xl">{ponto.nome}</h1>
          <p className="mt-2 text-sm text-primary-foreground/90">{ponto.descricao}</p>
          <div className="mt-6 space-y-2 text-sm">
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {ponto.endereco} · {ponto.cidade}</p>
            <p className="flex items-center gap-2"><Clock className="h-4 w-4" /> {ponto.horario}</p>
            {ponto.telefone && <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> {ponto.telefone}</p>}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary">
              <Recycle className="h-4 w-4" /> Materiais aceitos
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {ponto.materiais.map((m: string) => (
                <span key={m} className="rounded-full bg-primary-soft px-3 py-1 text-sm font-semibold text-primary">
                  {m}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Peso mínimo para coleta em domicílio: <strong className="text-foreground">{ponto.pesoMinimo}kg</strong>
            </p>
          </div>

          <Link
            to="/agendar/$id"
            params={{ id: ponto.id }}
            className="block rounded-2xl bg-primary px-6 py-4 text-center text-base font-bold text-primary-foreground shadow-card transition-transform hover:-translate-y-0.5"
          >
            Agendar coleta neste ponto
          </Link>
          <Link
            to="/mapa"
            className="block rounded-2xl border border-border bg-card px-6 py-4 text-center text-sm font-semibold text-foreground hover:bg-secondary"
          >
            Ver outros pontos
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
