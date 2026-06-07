"use client";

import { MapPin, Phone, Clock, ChevronLeft, Calendar, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PONTOS } from "@/lib/pontos";

export default function PontoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = require("react").use(params);
  const ponto = PONTOS.find((p) => p.id === parseInt(id));
  const [quantidade, setQuantidade] = useState(1);

  if (!ponto) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-foreground">Ponto não encontrado</h1>
        <Link href="/mapa" className="mt-4 inline-block px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
          Voltar para mapa
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href="/mapa" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
        <ChevronLeft className="h-4 w-4" /> Voltar
      </Link>

      <div className="rounded-3xl bg-gradient-primary p-8 text-primary-foreground shadow-card">
        <h1 className="text-3xl font-bold">{ponto.nome}</h1>
        <div className="mt-6 space-y-3">
          <p className="flex items-center gap-2">
            <MapPin className="h-5 w-5" /> {ponto.endereco}
          </p>
          <p className="flex items-center gap-2">
            <Clock className="h-5 w-5" /> {ponto.horario}
          </p>
          <p className="flex items-center gap-2">
            <Phone className="h-5 w-5" /> {ponto.telefone}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Agendar coleta</h2>
        
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <label className="block text-sm font-semibold text-foreground mb-2">
            Data
          </label>
          <input
            type="date"
            className="w-full rounded-full border border-input bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <label className="block text-sm font-semibold text-foreground mb-2">
            Hora
          </label>
          <input
            type="time"
            className="w-full rounded-full border border-input bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <label className="block text-sm font-semibold text-foreground mb-3">
            Quantidade de sacolas (aproximado)
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
              className="rounded-full p-2 hover:bg-secondary transition-colors"
            >
              <Minus className="h-5 w-5 text-primary" />
            </button>
            <span className="text-2xl font-bold text-foreground">{quantidade}</span>
            <button
              onClick={() => setQuantidade(quantidade + 1)}
              className="rounded-full p-2 hover:bg-secondary transition-colors"
            >
              <Plus className="h-5 w-5 text-primary" />
            </button>
          </div>
        </div>

        <Link
          href={`/confirmacao/${ponto.id}`}
          className="block w-full rounded-full bg-primary text-primary-foreground py-3 text-center font-bold hover:bg-primary/90 transition-colors"
        >
          Confirmar agendamento
        </Link>
      </div>
    </div>
  );
}
