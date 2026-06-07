"use client";

import { Leaf, Droplet, Recycle, AlertCircle, CheckCircle2, Search } from "lucide-react";
import { useState } from "react";

const RECYCLE_ITEMS = [
  {
    id: 1,
    name: "Papel e Papelão",
    icon: Recycle,
    color: "bg-blue-100 text-blue-700",
    items: ["Jornais", "Revistas", "Caixas", "Papelão ondulado", "Envelopes"],
  },
  {
    id: 2,
    name: "Plástico",
    icon: Recycle,
    color: "bg-yellow-100 text-yellow-700",
    items: ["Garrafas PET", "Sacolas plásticas", "Potes de iogurte", "Embalagens", "Copos descartáveis"],
  },
  {
    id: 3,
    name: "Metal",
    icon: Recycle,
    color: "bg-gray-100 text-gray-700",
    items: ["Latas de alumínio", "Latas de aço", "Tampas metálicas", "Arame", "Canos"],
  },
  {
    id: 4,
    name: "Vidro",
    icon: Recycle,
    color: "bg-green-100 text-green-700",
    items: ["Garrafas de vidro", "Potes de vidro", "Jarras", "Copos de vidro"],
  },
];

export default function ReciclagemPage() {
  const [search, setSearch] = useState("");
  const filtered = RECYCLE_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.items.some((i) => i.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">O que posso reciclar?</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Descubra quais materiais podem ser reciclados
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar material..."
          className="w-full rounded-full border border-input bg-card pl-10 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-border bg-card p-5 shadow-soft"
          >
            <div className="flex items-start gap-4">
              <div className={`rounded-full p-3 ${item.color}`}>
                <item.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground">{item.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">Pode reciclar:</p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  {item.items.map((i, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-bold text-foreground">Nenhum resultado encontrado</h3>
          <p className="text-sm text-muted-foreground mt-1">Tente buscar por outro termo</p>
        </div>
      )}
    </div>
  );
}
