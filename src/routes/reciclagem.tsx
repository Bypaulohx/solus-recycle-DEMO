import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import papel from "@/assets/solus/papel.png";
import plastico from "@/assets/solus/plastico.png";
import vidro from "@/assets/solus/vidro.png";
import metal from "@/assets/solus/metal.png";

const itens = [
  { img: papel, nome: "Papel", cor: "from-blue-50 to-blue-100", text: "Caixas, jornais, revistas, folhas e papelão limpo." },
  { img: plastico, nome: "Plástico", cor: "from-red-50 to-red-100", text: "Embalagens, garrafas PET, potes e tampinhas." },
  { img: vidro, nome: "Vidro", cor: "from-emerald-50 to-emerald-100", text: "Garrafas, frascos e recipientes em geral." },
  { img: metal, nome: "Metal", cor: "from-amber-50 to-amber-100", text: "Latas de alumínio, arames e utensílios." },
];

export const Route = createFileRoute("/reciclagem")({
  head: () => ({ meta: [{ title: "O que reciclar — Solus" }] }),
  component: ReciclagemPage,
});

function ReciclagemPage() {
  return (
    <AppLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Resíduos que você pode separar para coleta
        </h1>
        <p className="mt-2 text-muted-foreground">
          Separe corretamente cada tipo de material para facilitar o trabalho dos catadores e garantir a reciclagem.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {itens.map((it) => (
          <div key={it.nome} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            <div className={`grid h-32 place-items-center bg-gradient-to-br ${it.cor}`}>
              <img src={it.img} alt={it.nome} className="h-20 w-20 object-contain" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-foreground">{it.nome}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{it.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-primary/20 bg-primary-soft p-6">
        <h2 className="text-lg font-bold text-foreground">Dicas importantes</h2>
        <ul className="mt-3 grid gap-2 text-sm text-foreground/80 md:grid-cols-2">
          <li>· Lave embalagens antes de descartar.</li>
          <li>· Achatar caixas economiza espaço.</li>
          <li>· Pilhas e eletrônicos têm ponto específico.</li>
          <li>· Vidro quebrado deve ir embalado e identificado.</li>
        </ul>
        <Link to="/mapa" className="mt-5 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">
          Encontrar ponto de coleta
        </Link>
      </div>
    </AppLayout>
  );
}
