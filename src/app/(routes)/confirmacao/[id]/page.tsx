"use client";

import { CheckCircle2, MapPin, Calendar, Clock, ChevronLeft, Home } from "lucide-react";
import Link from "next/link";
import { PONTOS } from "@/lib/pontos";

export default function ConfirmacaoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = require("react").use(params);
  const ponto = PONTOS.find((p) => p.id === parseInt(id));

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-gradient-primary p-8 text-primary-foreground shadow-card text-center">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-white/20 p-4">
            <CheckCircle2 className="h-12 w-12" />
          </div>
        </div>
        <h1 className="text-2xl font-bold">Coleta agendada com sucesso!</h1>
        <p className="text-primary-foreground/90 mt-2">
          Você receberá uma confirmação em breve
        </p>
      </div>

      {ponto && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-bold text-foreground mb-4">Detalhes do agendamento</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" /> {ponto.nome}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" /> {ponto.endereco}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" /> 15 de março de 2025
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" /> 14:00
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Link
          href="/agendamentos"
          className="block w-full rounded-full bg-primary text-primary-foreground py-3 text-center font-bold hover:bg-primary/90 transition-colors"
        >
          Ver minhas coletas
        </Link>
        <Link
          href="/home"
          className="block w-full rounded-full border border-input bg-card py-3 text-center font-bold text-foreground hover:bg-secondary transition-colors"
        >
          Voltar para início
        </Link>
      </div>
    </div>
  );
}
