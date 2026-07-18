"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Bell, User, Settings, LogOut, ChevronLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TopHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);

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
          <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
          </button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 border border-slate-700 hover:border-primary transition-colors focus:outline-none">
                <User className="h-4 w-4 text-slate-300" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-slate-900 border-slate-800 text-slate-300">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-white">Darío (Tú)</p>
                    <p className="text-xs leading-none text-slate-400">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-800" />
                <DropdownMenuItem className="hover:bg-slate-800 focus:bg-slate-800 cursor-pointer p-0">
                  <Link href="/profile" className="flex w-full items-center px-2 py-1.5">
                    <User className="mr-2 h-4 w-4" />
                    <span>Mi Perfil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-slate-800 focus:bg-slate-800 cursor-pointer p-0">
                  <Link href="/pricing" className="flex w-full items-center px-2 py-1.5">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Suscripción</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-800" />
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  className="text-red-400 hover:bg-slate-800 focus:bg-slate-800 hover:text-red-300 cursor-pointer"
                >
                  <div className="flex w-full items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
