import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { getPonto } from "@/lib/pontos";
import { ArrowLeft, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { useAgendamentos } from "@/lib/agendamentos";
import { toast } from "sonner";

export const Route = createFileRoute("/agendar/$id")({
  loader: ({ params }) => {
    const p = getPonto(params.id);
    if (!p) throw notFound();
    return { ponto: p };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `Agendar coleta — ${loaderData?.ponto.nome ?? ""}` }],
  }),
  component: AgendarPage,
});

const MES = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const DIAS = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];

function AgendarPage() {
  const { ponto } = Route.useLoaderData();
  const { create } = useAgendamentos();
  const navigate = useNavigate();

  const today = new Date();
  const [mes, setMes] = useState(today.getMonth());
  const [ano, setAno] = useState(today.getFullYear());
  const [dia, setDia] = useState<number | null>(null);
  const [material, setMaterial] = useState(ponto.materiais[0]);
  const [peso, setPeso] = useState(String(ponto.pesoMinimo));
  const [obs, setObs] = useState("");

  const dias = useMemo(() => {
    const first = new Date(ano, mes, 1).getDay();
    const last = new Date(ano, mes + 1, 0).getDate();
    const arr: { d: number; disabled: boolean }[] = [];
    for (let i = 0; i < first; i++) arr.push({ d: 0, disabled: true });
    for (let d = 1; d <= last; d++) {
      const date = new Date(ano, mes, d);
      arr.push({ d, disabled: date < new Date(today.getFullYear(), today.getMonth(), today.getDate()) });
    }
    return arr;
  }, [mes, ano]);

  function prev() {
    if (mes === 0) { setMes(11); setAno(ano - 1); } else setMes(mes - 1);
  }
  function next() {
    if (mes === 11) { setMes(0); setAno(ano + 1); } else setMes(mes + 1);
  }

  function submit() {
    if (!dia) { toast.error("Selecione uma data"); return; }
    const data = new Date(ano, mes, dia).toISOString();
    const novo = create({
      ponto: ponto.nome,
      endereco: `${ponto.endereco} · ${ponto.cidade}`,
      data,
      material,
      peso,
      observacao: obs,
    });
    navigate({ to: "/confirmacao/$id", params: { id: novo.id } });
  }

  return (
    <AppLayout>
      <Link to="/ponto/$id" params={{ id: ponto.id }} className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Link>

      <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Ponto selecionado</p>
          <h1 className="mt-1 text-xl font-bold text-foreground">{ponto.nome}</h1>
          <p className="text-sm text-muted-foreground">{ponto.endereco} · {ponto.cidade}</p>

          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold text-foreground">Quando será sua coleta?</p>
            <div className="flex items-center justify-between">
              <button onClick={prev} className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground hover:bg-secondary">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm font-bold text-foreground">{MES[mes]} {ano}</span>
              <button onClick={next} className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground hover:bg-secondary">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted-foreground">
              {DIAS.map((d) => <span key={d} className="py-1">{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {dias.map((item, i) => {
                if (item.d === 0) return <span key={i} />;
                const selected = dia === item.d;
                return (
                  <button
                    key={i}
                    disabled={item.disabled}
                    onClick={() => setDia(item.d)}
                    className={
                      "aspect-square rounded-lg text-sm font-semibold transition-colors " +
                      (item.disabled
                        ? "cursor-not-allowed text-muted-foreground/40"
                        : selected
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "text-foreground hover:bg-primary-soft")
                    }
                  >
                    {item.d}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-card">
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">Materiais coletados</label>
            <p className="mb-2 text-xs text-muted-foreground">Este ponto aceita: {ponto.materiais.join(", ")}</p>
            <select value={material} onChange={(e) => setMaterial(e.target.value)} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary">
              {ponto.materiais.map((m: string) => <option key={m}>{m}</option>)}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">Peso aproximado</label>
            <p className="mb-2 text-xs text-muted-foreground">Mínimo: {ponto.pesoMinimo}kg</p>
            <select value={peso} onChange={(e) => setPeso(e.target.value)} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary">
              {[ponto.pesoMinimo, ponto.pesoMinimo + 10, ponto.pesoMinimo + 20, ponto.pesoMinimo + 40].map((k) => (
                <option key={k} value={k}>{k}kg</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">Observações</label>
            <textarea
              value={obs}
              onChange={(e) => setObs(e.target.value)}
              placeholder="Horário preferido, instruções de acesso, etc."
              rows={4}
              className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <button
            onClick={submit}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-card transition-transform hover:-translate-y-0.5"
          >
            <Check className="h-5 w-5" /> Confirmar agendamento
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
