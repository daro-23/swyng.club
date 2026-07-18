"use client";

import { User, Briefcase, Target, Activity, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function ProfilePage() {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Perfil actualizado correctamente");
  };

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8 overflow-y-auto pb-24 max-w-4xl mx-auto w-full">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-white">Mi Perfil</h2>
        <p className="text-slate-400">Gestiona tu identidad y tus objetivos de networking.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="h-5 w-5 text-primary" /> Identidad
            </CardTitle>
            <CardDescription className="text-slate-400">
              Tu información personal básica.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-6 mb-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 border-2 border-slate-700">
                <User className="h-10 w-10 text-slate-400" />
              </div>
              <Button variant="outline" className="border-slate-700 text-white bg-slate-800 hover:bg-slate-700" type="button">
                Cambiar Foto
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">Nombre Completo</Label>
                <Input id="name" defaultValue="Darío" className="bg-slate-950 border-slate-800 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-300">Cargo / Puesto</Label>
                <Input id="title" defaultValue="Founder" className="bg-slate-950 border-slate-800 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin" className="text-slate-300">Perfil de LinkedIn (URL)</Label>
                <Input id="linkedin" placeholder="https://linkedin.com/in/tu-perfil" className="bg-slate-950 border-slate-800 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" /> Empresa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-slate-300">Nombre de la Empresa</Label>
                <Input id="company" defaultValue="Swyng" className="bg-slate-950 border-slate-800 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="text-slate-300">Sitio Web</Label>
                <Input id="website" defaultValue="https://swyng.club" className="bg-slate-950 border-slate-800 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" /> Networking
            </CardTitle>
            <CardDescription className="text-slate-400">
              ¿Qué valor aportas y qué estás buscando en la comunidad? (Separado por comas)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="offers" className="text-slate-300">Servicios / Valor que ofrezco</Label>
              <Input id="offers" defaultValue="Desarrollo Full-Stack, Producto, UX/UI" className="bg-slate-950 border-slate-800 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lookingFor" className="text-slate-300">Estoy buscando</Label>
              <Input id="lookingFor" defaultValue="Usuarios Beta, Feedback, Inversión" className="bg-slate-950 border-slate-800 text-white" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" /> Preferencias Deportivas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Deporte Principal</Label>
                <Select defaultValue="padel">
                  <SelectTrigger className="bg-slate-950 border-slate-800 text-white">
                    <SelectValue placeholder="Selecciona un deporte" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800 text-white">
                    <SelectItem value="padel">Pádel</SelectItem>
                    <SelectItem value="golf">Golf</SelectItem>
                    <SelectItem value="barre">Barre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Nivel de Juego</Label>
                <Select defaultValue="principiante">
                  <SelectTrigger className="bg-slate-950 border-slate-800 text-white">
                    <SelectValue placeholder="Selecciona tu nivel" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800 text-white">
                    <SelectItem value="principiante">Principiante (Amateur)</SelectItem>
                    <SelectItem value="intermedio">Intermedio (Competitivo)</SelectItem>
                    <SelectItem value="avanzado">Avanzado (Pro)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end pt-4">
          <Button type="submit" className="bg-primary text-white hover:bg-primary/90 flex items-center gap-2 px-8">
            <Save className="h-4 w-4" /> Guardar Cambios
          </Button>
        </div>
      </form>
    </div>
  );
}
