"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Bell, User, Settings, LogOut, ChevronLeft } from "lucide-react";

export function TopHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#040814]/80 backdrop-blur-xl">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()} 
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Regresar"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <Link href="/home" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tighter text-white">
              SWYNG<span className="text-primary">.</span>
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/notifications">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
            </button>
          </Link>
          
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 border border-slate-700 hover:border-primary transition-colors focus:outline-none"
              >
                <User className="h-4 w-4 text-slate-300" />
              </button>
              
              {isMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setIsMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-800 bg-slate-900 shadow-xl z-50 overflow-hidden">
                     <div className="px-4 py-3 bg-slate-800/30">
                       <p className="text-sm font-medium text-white">Darío (Tú)</p>
                       <p className="text-xs text-slate-400 truncate">{user.email}</p>
                     </div>
                     <div className="border-t border-slate-800" />
                     <div className="py-1">
                       <Link href="/profile" className="flex w-full items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
                         <User className="mr-2 h-4 w-4" />
                         Mi Perfil
                       </Link>
                       <Link href="/pricing" className="flex w-full items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
                         <Settings className="mr-2 h-4 w-4" />
                         Suscripción
                       </Link>
                     </div>
                     <div className="border-t border-slate-800" />
                     <div className="py-1">
                       <button onClick={handleLogout} className="flex w-full items-center px-4 py-2.5 text-sm text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors text-left">
                         <LogOut className="mr-2 h-4 w-4" />
                         Cerrar Sesión
                       </button>
                     </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link href="/login" className="text-sm font-medium text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-full transition-colors">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
