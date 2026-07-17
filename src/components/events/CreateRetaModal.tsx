"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Lock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export function CreateRetaModal() {
  const [open, setOpen] = useState(false);
  
  // SIMULATED FREEMIUM LOGIC
  const isPremium = false; // Hardcoded for demo
  const activeRetasCount = 1; // User already has 1 active reta

  const isGuarded = !isPremium && activeRetasCount >= 1;

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isGuarded) return;

    setLoading(true);
    // Simulate async submission
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      toast.success("¡Reta creada exitosamente!", {
        description: "Tu partido ya es visible en el Clubhouse.",
        className: "bg-primary text-primary-foreground",
      });
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="fixed bottom-20 right-4 sm:right-8 sm:bottom-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_40px_-10px_rgba(255,106,0,0.8)] hover:scale-105 transition-transform">
          <Plus className="h-6 w-6" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-[#040814] border-slate-800 text-white p-0 overflow-hidden">
        {isGuarded ? (
          <div className="p-8 text-center flex flex-col items-center">
            <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 border border-primary/50">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-bold mb-2">Upgrade to Club Member</DialogTitle>
            <DialogDescription className="text-slate-400 text-base mb-8">
              Los usuarios Player solo pueden organizar 1 Reta activa al mes. Sube de nivel para organizar eventos ilimitados y dominar el ecosistema.
            </DialogDescription>
            <DialogFooter className="w-full sm:justify-center">
              <Link
                href="/pricing"
                onClick={() => setOpen(false)}
                className={buttonVariants({ variant: "default", className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg font-bold" })}
              >
                Upgrade Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-xl">Arma la Reta</DialogTitle>
              <DialogDescription className="text-slate-400">
                Reserva un partido e invita al ecosistema.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-5 py-4">
              <div className="space-y-2">
                <Label htmlFor="sport">Deporte</Label>
                <Select required>
                  <SelectTrigger className="bg-slate-900 border-slate-800">
                    <SelectValue placeholder="Selecciona un deporte" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800 text-white">
                    <SelectItem value="padel">Pádel</SelectItem>
                    <SelectItem value="golf">Golf</SelectItem>
                    <SelectItem value="barre">Barre</SelectItem>
                    <SelectItem value="tennis">Tenis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Fecha & Hora</Label>
                  <Input id="date" type="datetime-local" className="bg-slate-900 border-slate-800 text-white" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="players">Faltan (Jugadores)</Label>
                  <Input id="players" type="number" min="1" max="3" placeholder="Ej. 2" className="bg-slate-900 border-slate-800 text-white" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Club / Ubicación</Label>
                <Input id="location" placeholder="Ej. Club Padel MTY" className="bg-slate-900 border-slate-800 text-white" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic">Tema del "Tercer Tiempo"</Label>
                <Input id="topic" placeholder="Ej. Seed Round Discussion, B2B SaaS" className="bg-slate-900 border-slate-800 text-white" required />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12">
                {loading ? "Publicando..." : "Publicar Reta"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
