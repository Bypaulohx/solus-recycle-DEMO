"use client";

import { Metadata } from "next";
import { MapPin, Search, Clock, Phone } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { PONTOS } from "@/lib/pontos";

export default function MapaPage() {
  const [q, setQ] = useState("");
  const filtered = PONTOS.filter(
    (p) =>
      p.nome.toLowerCase().includes(q.toLowerCase()) ||
      p.endereco.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
      <div className="overflow-hidden rounded-3xl border border-border shadow-card">
        <div className="relative h-72 w-full md:h-[520px]">
          <img
            src="/assets/solus/maps.png"
            alt="Mapa"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          {PONTOS.slice(0, 4).map((p, i) => (
            <div
              key={p.id}
              className="absolute"
              style={{ top: `${20 + i * 18}%`, left: `${25 + i * 15}%` }}
            >
              <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-card ring-4 ring-white/70">
                <MapPin className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Encontre pontos de coleta perto de você
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Toque em um ponto para ver detalhes e agendar uma coleta.
        </p>

        <div className="mt-6 space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nome ou endereço..."
              className="w-full rounded-full border border-input bg-card pl-10 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((p) => (
                <Link
                  key={p.id}
                  href={`/ponto/${p.id}`}
                  className="block rounded-2xl border border-border bg-card p-4 shadow-soft hover:shadow-card transition-all hover:border-primary"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-foreground">{p.nome}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {p.endereco}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {p.horario}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Phone className="h-3 w-3" />
                        {p.telefone}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-sm text-muted-foreground py-8">
                Nenhum ponto encontrado
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
