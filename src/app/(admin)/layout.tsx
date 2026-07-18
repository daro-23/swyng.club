import Link from "next/link";
import { LayoutDashboard, Users, CalendarDays, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-[#040814] text-slate-300">
      {/* Sidebar for Desktop */}
      <aside className="hidden w-64 flex-col border-r border-slate-800 bg-[#070b19] sm:flex">
        <div className="flex h-14 items-center px-4 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tighter text-white">
              swyng<span className="text-primary">Admin</span>
            </span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start px-2 text-sm font-medium gap-1">
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" />
              Panel General
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Users className="h-4 w-4" />
              Gestión de Usuarios
            </Link>
            <Link
              href="/admin/retas"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <CalendarDays className="h-4 w-4" />
              Moderación de Retas
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Settings className="h-4 w-4" />
              Configuración
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4 border-t border-slate-800">
          <Link href="/clubhouse" className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-400 hover:bg-slate-800 transition-colors">
            <LogOut className="h-4 w-4" />
            Salir a la App
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
