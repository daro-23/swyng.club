"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("¡Bienvenido al Club!");
    router.push("/discover");
    router.refresh();
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Revisa tu correo para verificar tu cuenta.");
    setLoading(false);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#040814] px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-[#040814] to-[#040814] opacity-50"></div>
      
      <div className="relative z-10 w-full max-w-md space-y-8 rounded-2xl border border-slate-800 bg-[#070b19]/80 p-8 shadow-2xl backdrop-blur-xl">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter text-white">
            swyng<span className="text-primary">.</span>
          </h1>
          <p className="text-slate-400">Inicia sesión o regístrate en el club.</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@startup.com"
              className="bg-slate-900 border-slate-800 text-white h-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="bg-slate-900 border-slate-800 text-white h-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Button 
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-primary text-white hover:bg-primary/90 h-12 text-md font-semibold"
            >
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <LogIn className="mr-2 h-5 w-5" />}
              Entrar al Club
            </Button>
            <Button 
              onClick={handleSignUp}
              disabled={loading}
              variant="outline"
              className="w-full border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white h-12"
            >
              Solicitar Acceso (Registro)
            </Button>
          </div>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          Al continuar, aceptas nuestros <Link href="#" className="text-primary hover:underline">Términos de Servicio</Link> y <Link href="#" className="text-primary hover:underline">Política de Privacidad</Link>.
        </p>
      </div>
    </div>
  );
}
