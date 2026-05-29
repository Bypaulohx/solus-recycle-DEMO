import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { HelpCircle, Mail, MessageCircle } from "lucide-react";

const faq = [
  { q: "Como agendar uma coleta?", a: "Vá até o Mapa, escolha um ponto de coleta e clique em 'Agendar coleta'." },
  { q: "Posso cancelar uma coleta?", a: "Sim, em 'Minhas coletas' você pode cancelar a qualquer momento antes da data." },
  { q: "Quanto custa usar o Solus?", a: "O Solus é gratuito para usuários domésticos." },
  { q: "Quais materiais posso reciclar?", a: "Papel, plástico, vidro, metal e eletrônicos (em pontos específicos)." },
];

export const Route = createFileRoute("/ajuda")({
  head: () => ({ meta: [{ title: "Ajuda — Solus" }] }),
  component: AjudaPage,
});

function AjudaPage() {
  return (
    <AppLayout>
      <h1 className="text-2xl font-bold text-foreground md:text-3xl">Como podemos ajudar?</h1>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <a href="mailto:contato@solus.app" className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft hover:border-primary/40">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary"><Mail className="h-5 w-5" /></span>
          <div>
            <p className="font-bold text-foreground">E-mail</p>
            <p className="text-sm text-muted-foreground">contato@solus.app</p>
          </div>
        </a>
        <a href="#" className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft hover:border-primary/40">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary"><MessageCircle className="h-5 w-5" /></span>
          <div>
            <p className="font-bold text-foreground">Chat</p>
            <p className="text-sm text-muted-foreground">Conversar com um atendente</p>
          </div>
        </a>
      </div>

      <h2 className="mt-10 text-lg font-bold text-foreground">Perguntas frequentes</h2>
      <div className="mt-4 max-w-2xl space-y-3">
        {faq.map((f) => (
          <details key={f.q} className="group rounded-2xl border border-border bg-card p-4 shadow-soft">
            <summary className="flex cursor-pointer items-center justify-between gap-3 font-semibold text-foreground">
              <span className="flex items-center gap-2"><HelpCircle className="h-4 w-4 text-primary" /> {f.q}</span>
              <span className="text-muted-foreground group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </AppLayout>
  );
}
