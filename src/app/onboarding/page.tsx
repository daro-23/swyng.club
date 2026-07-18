"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, User, Briefcase, Building, Dumbbell, AlignLeft, Check } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [formData, setFormData] = useState({
    full_name: "",
    role: "",
    company: "",
    bio: "",
  });
  
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const SPORTS_OPTIONS = ["Golf", "Pádel", "Tenis", "Ciclismo", "Correr", "Natación", "Fútbol"];

  useEffect(() => {
    // Verificar que el usuario está logueado
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        router.push("/login");
      } else {
        setUser(data.user);
      }
    });
  }, [supabase.auth, router]);

  const toggleSport = (sport: string) => {
    if (selectedSports.includes(sport)) {
      setSelectedSports(selectedSports.filter(s => s !== sport));
    } else {
      if (selectedSports.length < 3) {
        setSelectedSports([...selectedSports, sport]);
      } else {
        toast.error("Puedes seleccionar máximo 3 deportes");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (selectedSports.length === 0) {
      toast.error("Selecciona al menos un deporte");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("profiles").insert({
      id: user.id,
      full_name: formData.full_name,
      role: formData.role,
      company: formData.company,
      bio: formData.bio,
      sports: selectedSports,
      onboarding_completed: true,
    });

    if (error) {
      toast.error("Hubo un error guardando tu perfil: " + error.message);
      setLoading(false);
      return;
    }

    toast.success("¡Perfil completado exitosamente!");
    router.push("/home");
    router.refresh();
  };

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#040814]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040814] px-4 py-12 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-[#040814] to-[#040814] opacity-50 -z-10"></div>
      
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tighter text-white mb-2">
            Completa tu perfil
          </h1>
          <p className="text-slate-400">
            Cuéntanos un poco sobre ti para conectar con las personas adecuadas en el club.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-800 backdrop-blur-sm">
          
          <div className="space-y-2">
            <Label htmlFor="full_name" className="text-slate-300 flex items-center gap-2">
              <User className="h-4 w-4" /> Nombre Completo
            </Label>
            <Input
              id="full_name"
              placeholder="Ej. Juan Pérez"
              className="bg-slate-900 border-slate-800 text-white h-12"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role" className="text-slate-300 flex items-center gap-2">
                <Briefcase className="h-4 w-4" /> Puesto / Rol
              </Label>
              <Input
                id="role"
                placeholder="Ej. Founder, CEO"
                className="bg-slate-900 border-slate-800 text-white h-12"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company" className="text-slate-300 flex items-center gap-2">
                <Building className="h-4 w-4" /> Empresa
              </Label>
              <Input
                id="company"
                placeholder="Ej. Acme Corp"
                className="bg-slate-900 border-slate-800 text-white h-12"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-slate-300 flex items-center gap-2">
              <AlignLeft className="h-4 w-4" /> Pequeña Bio
            </Label>
            <Textarea
              id="bio"
              placeholder="¿Qué estás construyendo? ¿Qué buscas en el club?"
              className="bg-slate-900 border-slate-800 text-white resize-none"
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              required
            />
          </div>

          <div className="space-y-3 pt-2">
            <Label className="text-slate-300 flex items-center gap-2">
              <Dumbbell className="h-4 w-4" /> ¿Qué deportes juegas? (Máx 3)
            </Label>
            <div className="flex flex-wrap gap-2">
              {SPORTS_OPTIONS.map((sport) => {
                const isSelected = selectedSports.includes(sport);
                return (
                  <button
                    key={sport}
                    type="button"
                    onClick={() => toggleSport(sport)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all flex items-center gap-2 ${
                      isSelected 
                        ? 'border-primary bg-primary/20 text-primary' 
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3" />}
                    {sport}
                  </button>
                );
              })}
            </div>
          </div>

          <Button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white hover:bg-primary/90 h-12 text-md font-semibold mt-4"
          >
            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Terminar y Entrar al Club"}
          </Button>
        </form>
      </div>
    </div>
  );
}
