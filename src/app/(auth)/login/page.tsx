"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Intentar iniciar sesión primero
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      // Si falla, intentamos registrar al usuario de forma invisible
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        // Si el registro también falla (ej. contraseña muy corta), mostramos error
        toast.error(signInError.message === "Invalid login credentials" ? "Credenciales inválidas." : signInError.message);
        setLoading(false);
        return;
      }
      
      // Si el registro fue exitoso
      toast.success("¡Cuenta creada exitosamente! Bienvenido al Club.");
      router.push("/home");
      router.refresh();
      return;
    }

    // Si el inicio de sesión fue exitoso
    toast.success("¡Bienvenido de vuelta!");
    router.push("/home");
    router.refresh();
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#040814] px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-[#040814] to-[#040814] opacity-50"></div>
      
      <div className="relative z-10 w-full max-w-md space-y-8 rounded-2xl border border-slate-800 bg-[#070b19]/80 p-8 shadow-2xl backdrop-blur-xl">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter text-white">
            swyng<span className="text-primary">.</span>
          </h1>
          <p className="text-slate-400">Accede a tu cuenta o crea una nueva al instante.</p>
        </div>

        <form className="space-y-6" onSubmit={handleAuth}>
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
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-slate-900 border-slate-800 text-white h-12 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white hover:bg-primary/90 h-12 text-md font-semibold"
            >
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <LogIn className="mr-2 h-5 w-5" />}
              Entrar al Club
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
