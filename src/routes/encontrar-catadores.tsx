import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Search, Phone, Star } from "lucide-react";
import { useState } from "react";

const catadores = [
  { nome: "João Pereira", bairro: "Plano Diretor Sul", materiais: ["Papel", "Plástico"], tel: "(63) 99876-1234", rating: 4.9 },
  { nome: "Maria Souza", bairro: "Aureny III", materiais: ["Metal", "Vidro"], tel: "(63) 99812-4400", rating: 4.7 },
  { nome: "Cooperativa Renascer", bairro: "Taquaralto", materiais: ["Papel", "Plástico", "Metal"], tel: "(63) 3216-7080", rating: 4.8 },
  { nome: "Carlos Lima", bairro: "Plano Diretor Norte", materiais: ["Eletrônicos", "Metal"], tel: "(63) 99655-2030", rating: 4.6 },
];

export const Route = createFileRoute("/encontrar-catadores")({
  head: () => ({ meta: [{ title: "Encontrar catadores — Solus" }] }),
  component: EncontrarPage,
});

function EncontrarPage() {
  const [q, setQ] = useState("");
  const filtered = catadores.filter((c) => (c.nome + c.bairro).toLowerCase().includes(q.toLowerCase()));

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold text-foreground md:text-3xl">Encontre catadores próximos</h1>
      <p className="mt-1 text-sm text-muted-foreground">Catadores autônomos e cooperativas cadastradas na sua região.</p>

      <div className="relative mt-5 max-w-xl">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nome ou bairro…"
          className="w-full rounded-full border border-input bg-card py-3 pl-11 pr-4 text-sm shadow-soft outline-none focus:border-primary"
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {filtered.map((c) => (
          <article key={c.nome} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-foreground">{c.nome}</h3>
                <p className="text-sm text-muted-foreground">{c.bairro}</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-bold text-primary">
                <Star className="h-3 w-3 fill-current" /> {c.rating}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {c.materiais.map((m) => (
                <span key={m} className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">{m}</span>
              ))}
            </div>
            <a href={`tel:${c.tel}`} className="mt-4 inline-flex items-center gap-2 rounded-xl border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary-soft">
              <Phone className="h-4 w-4" /> {c.tel}
            </a>
          </article>
        ))}
      </div>
    </AppLayout>
  );
}
