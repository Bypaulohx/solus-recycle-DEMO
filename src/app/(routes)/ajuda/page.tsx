"use client";

import { HelpCircle, Mail, Phone, MessageSquare, ChevronRight } from "lucide-react";

const FAQS = [
  {
    question: "Como agendar uma coleta?",
    answer: "Vá para o mapa, selecione um ponto de coleta próximo a você e confirme a data e hora desejadas.",
  },
  {
    question: "Quais materiais posso reciclar?",
    answer: "Você pode reciclar papel, plástico, metal e vidro. Visite a seção 'O que posso reciclar?' para mais detalhes.",
  },
  {
    question: "Posso cancelar uma coleta agendada?",
    answer: "Sim, você pode cancelar uma coleta até 24 horas antes da data agendada.",
  },
  {
    question: "Quanto custa agendar uma coleta?",
    answer: "Agendar uma coleta é totalmente gratuito! Você contribui com o meio ambiente sem gastar nada.",
  },
];

export default function AjudaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Ajuda e Suporte</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Encontre respostas para suas dúvidas
        </p>
      </div>

      <div className="grid gap-3">
        <a
          href="mailto:suporte@solus.app"
          className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-card transition-all flex items-center gap-3"
        >
          <Mail className="h-5 w-5 text-primary flex-shrink-0" />
          <div>
            <h3 className="font-bold text-foreground">Email</h3>
            <p className="text-sm text-muted-foreground">suporte@solus.app</p>
          </div>
          <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
        </a>

        <a
          href="tel:+556332123456"
          className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-card transition-all flex items-center gap-3"
        >
          <Phone className="h-5 w-5 text-primary flex-shrink-0" />
          <div>
            <h3 className="font-bold text-foreground">Telefone</h3>
            <p className="text-sm text-muted-foreground">(63) 3212-3456</p>
          </div>
          <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
        </a>

        <button className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-card transition-all flex items-center gap-3">
          <MessageSquare className="h-5 w-5 text-primary flex-shrink-0" />
          <div className="text-left">
            <h3 className="font-bold text-foreground">Chat ao vivo</h3>
            <p className="text-sm text-muted-foreground">Converse conosco em tempo real</p>
          </div>
          <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-3">
        <h2 className="font-bold text-foreground flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-primary" /> Perguntas Frequentes
        </h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <details
              key={faq.question}
              className="rounded-2xl border border-border bg-card shadow-soft"
            >
              <summary className="cursor-pointer p-4 font-bold text-foreground flex items-center justify-between">
                {faq.question}
                <span className="ml-2 text-muted-foreground">▶</span>
              </summary>
              <div className="border-t border-border p-4 text-sm text-muted-foreground">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
