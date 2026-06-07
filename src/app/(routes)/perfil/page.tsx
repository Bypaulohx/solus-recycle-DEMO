"use client";

import { User, Mail, MapPin, Award, Recycle, LogOut, ChevronRight, HelpCircle, Settings } from "lucide-react";
import Link from "next/link";
import { useAgendamentos } from "@/lib/agendamentos";

export default function PerfilPage() {
  const { list } = useAgendamentos();
  const total = list.length;
  const ativas = list.filter((a) => a.status === "agendado").length;

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
      <div className="rounded-3xl bg-gradient-primary p-6 text-primary-foreground shadow-card">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-white/20 backdrop-blur">
          <User className="h-10 w-10" />
        </div>
        <h1 className="mt-4 text-2xl font-bold">Visitante Solus</h1>
        <p className="text-sm text-primary-foreground/90">Conta de demonstração</p>

        <div className="mt-6 space-y-2 text-sm">
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4" /> visitante@solus.app
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Palmas - TO
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
            <p className="text-2xl font-bold">{total}</p>
            <p className="text-xs text-primary-foreground/80">Coletas totais</p>
          </div>
          <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
            <p className="text-2xl font-bold">{ativas}</p>
            <p className="text-xs text-primary-foreground/80">Em andamento</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-bold text-foreground">Eco-pontuação</h3>
              <p className="text-sm text-muted-foreground">Continue reciclando para subir de nível.</p>
            </div>
            <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        <Link
          href="/reciclagem"
          className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-card transition-all flex items-center gap-3"
        >
          <Recycle className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-bold text-foreground">Meu impacto ambiental</h3>
            <p className="text-sm text-muted-foreground">Veja o seu impacto</p>
          </div>
          <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
        </Link>

        <Link
          href="/ajuda"
          className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-card transition-all flex items-center gap-3"
        >
          <HelpCircle className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-bold text-foreground">Ajuda</h3>
            <p className="text-sm text-muted-foreground">Dúvidas e suporte</p>
          </div>
          <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
        </Link>

        <button className="w-full rounded-2xl border border-destructive bg-destructive/10 p-5 text-destructive hover:bg-destructive/20 transition-all flex items-center gap-3">
          <LogOut className="h-5 w-5" />
          <span className="font-bold">Sair da conta</span>
        </button>
      </div>
    </div>
  );
}
