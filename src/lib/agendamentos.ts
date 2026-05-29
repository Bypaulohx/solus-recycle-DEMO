import { useEffect, useState, useCallback } from "react";

export type Agendamento = {
  id: string;
  ponto: string;
  endereco: string;
  data: string; // ISO date
  material: string;
  peso: string;
  observacao: string;
  status: "agendado" | "cancelado" | "concluido";
  criadoEm: string;
};

const KEY = "solus.agendamentos.v1";

function read(): Agendamento[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function write(list: Agendamento[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("solus:agendamentos"));
}

export function useAgendamentos() {
  const [list, setList] = useState<Agendamento[]>([]);

  useEffect(() => {
    setList(read());
    const refresh = () => setList(read());
    window.addEventListener("solus:agendamentos", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("solus:agendamentos", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const create = useCallback((a: Omit<Agendamento, "id" | "status" | "criadoEm">) => {
    const novo: Agendamento = {
      ...a,
      id: crypto.randomUUID(),
      status: "agendado",
      criadoEm: new Date().toISOString(),
    };
    write([novo, ...read()]);
    return novo;
  }, []);

  const cancelar = useCallback((id: string) => {
    write(read().map((a) => (a.id === id ? { ...a, status: "cancelado" } : a)));
  }, []);

  const remover = useCallback((id: string) => {
    write(read().filter((a) => a.id !== id));
  }, []);

  return { list, create, cancelar, remover };
}
