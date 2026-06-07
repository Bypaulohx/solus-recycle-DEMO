"use client";

import { MapPin, Users, Award, Trash2, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const CATADORES = [
  {
    id: 1,
    nome: "Coletores Sustentáveis",
    descricao: "Coletores especializados em reciclagem seletiva",
    endereco: "Palmas - TO",
    estrelas: 4.8,
    avaliacoes: 234,
    imagem: "👥",
  },
  {
    id: 2,
    nome: "Eco Catadores",
    descricao: "Grupo de catadores ambientalmente responsáveis",
    endereco: "Palmas - TO",
    estrelas: 4.9,
    avaliacoes: 512,
    imagem: "♻️",
  },
  {
    id: 3,
    nome: "Recicladores Urbanos",
    descricao: "Profissionais em coleta de recicláveis",
    endereco: "Palmas - TO",
    estrelas: 4.7,
    avaliacoes: 189,
    imagem: "🌱",
  },
];

export default function EncontrarCatadoresPage() {
  const [search, setSearch] = useState("");
  const filtered = CATADORES.filter(
    (c) =>
      c.nome.toLowerCase().includes(search.toLowerCase()) ||
      c.descricao.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Encontrar catadores</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Conecte-se com profissionais de reciclagem
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar catadores..."
          className="w-full rounded-full border border-input bg-card pl-10 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        {filtered.map((catador) => (
          <div
            key={catador.id}
            className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-card transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{catador.imagem}</div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground">{catador.nome}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {catador.descricao}
                </p>
                <div className="flex items-center gap-4 mt-3 flex-wrap">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {catador.endereco}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    {catador.estrelas} ⭐ ({catador.avaliacoes} avaliações)
                  </p>
                </div>
                <button className="mt-3 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                  Conectar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
