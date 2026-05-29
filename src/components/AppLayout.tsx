import { Link, useRouterState } from "@tanstack/react-router";
import { Home, MapPin, Calendar, Recycle, User, Bell } from "lucide-react";
import logo from "@/assets/solus/icon.svg";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/home", label: "Início", icon: Home },
  { to: "/mapa", label: "Mapa", icon: MapPin },
  { to: "/agendamentos", label: "Coletas", icon: Calendar },
  { to: "/reciclagem", label: "Reciclar", icon: Recycle },
  { to: "/perfil", label: "Perfil", icon: User },
] as const;

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { location } = useRouterState();
  const path = location.pathname;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
          <Link to="/home" className="flex items-center gap-2">
            <img src={logo} alt="Solus" className="h-9 w-9" />
            <span className="text-lg font-bold tracking-tight text-foreground">
              Solus<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = path === item.to || (item.to !== "/home" && path.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    active
                      ? "bg-primary-soft text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            to="/notificacoes"
            className="relative rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Notificações"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto w-full max-w-6xl px-4 pb-28 pt-6 md:px-8 md:pb-12">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = path === item.to || (item.to !== "/home" && path.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex flex-1 flex-col items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className={cn("h-5 w-5", active && "stroke-[2.5]")} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
