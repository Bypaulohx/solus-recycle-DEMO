"use client";

import { Calendar, MapPin, User, CheckCircle2, Clock, Phone, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useAgendamentos } from "@/lib/agendamentos";

export default function AgendamentosPage() {
  const { list } = useAgendamentos();
  const agendados = list.filter((a) => a.status === "agendado");
  const concluidos = list.filter((a) => a.status === "concluído");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Minhas coletas</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Acompanhe o status de suas coletas agendadas
        </p>
      </div>

      {agendados.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-bold text-foreground flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" /> Em andamento ({agendados.length})
          </h2>
          <div className="grid gap-3">
            {agendados.map((a) => (
              <Link
                key={a.id}
                href={`/confirmacao/${a.id}`}
                className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-card transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-foreground">{a.endereco}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(a.data).toLocaleDateString("pt-BR")} às {a.hora}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {a.ponto}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                    {a.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {concluidos.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-bold text-foreground flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" /> Concluídas ({concluidos.length})
          </h2>
          <div className="grid gap-3">
            {concluidos.map((a) => (
              <div
                key={a.id}
                className="rounded-2xl border border-border bg-card p-5 shadow-soft opacity-75"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-foreground">{a.endereco}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(a.data).toLocaleDateString("pt-BR")} às {a.hora}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    {a.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {list.length === 0 && (
        <div className="text-center py-16">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-bold text-foreground">Nenhuma coleta agendada</h3>
          <p className="text-sm text-muted-foreground mt-1">Agende sua primeira coleta agora mesmo!</p>
          <Link
            href="/mapa"
            className="inline-block mt-4 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Agendar coleta
          </Link>
        </div>
      )}
    </div>
  );
}
