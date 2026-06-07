"use client";

import { Bell, CheckCircle2, AlertCircle, Info } from "lucide-react";

const NOTIFICATIONS = [
  {
    id: 1,
    title: "Coleta agendada",
    message: "Sua coleta está confirmada para 15 de março, 14h.",
    date: "15 de março",
    type: "success",
    read: false,
  },
  {
    id: 2,
    title: "Novo ponto de coleta",
    message: "Um novo ponto de coleta foi aberto perto de você!",
    date: "14 de março",
    type: "info",
    read: false,
  },
  {
    id: 3,
    title: "Coleta concluída",
    message: "Sua coleta foi concluída com sucesso. Obrigado!",
    date: "13 de março",
    type: "success",
    read: true,
  },
];

export default function NotificacoesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Notificações</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Fique atualizado com as últimas notícias
        </p>
      </div>

      <div className="space-y-3">
        {NOTIFICATIONS.map((notification) => (
          <div
            key={notification.id}
            className={`rounded-2xl border p-4 ${
              notification.read
                ? "border-border bg-card/50"
                : "border-primary bg-primary/5"
            } shadow-soft`}
          >
            <div className="flex items-start gap-4">
              <div className={`rounded-full p-2 ${
                notification.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}>
                {notification.type === "success" ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <Info className="h-5 w-5" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground">{notification.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {notification.date}
                </p>
              </div>
              {!notification.read && (
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
