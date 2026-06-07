import { Metadata } from "next";
import { MapPin, Search, Recycle, Calendar, ArrowRight, Leaf } from "lucide-react";
import Link from "next/link";
import { useAgendamentos } from "@/lib/agendamentos";

export const metadata: Metadata = {
  title: "Solus — Reciclagem inteligente",
  description: "Agende coletas de recicláveis e encontre pontos próximos.",
};

export default function HomePage() {
  return (
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
            href="/mapa"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary shadow-soft transition-transform hover:-translate-y-0.5"
          >
            Agendar coleta <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/reciclagem"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            O que posso reciclar?
          </Link>
        </div>
      </div>
      <div className="hidden overflow-hidden rounded-3xl shadow-card md:block">
        <img
          src="/assets/solus/coleta.png"
          alt="Coleta seletiva"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
