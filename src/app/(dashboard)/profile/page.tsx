"use client";

import { User, Briefcase, Target, Activity, Save, Ghost, Image as ImageIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useState, useRef } from "react";

const NETWORKING_TAGS = [
  "Inversión (Venture Capital)",
  "Usuarios Beta / Early Adopters",
  "Feedback de Producto",
  "Ventas B2B",
  "Contratar Talento",
  "Networking General",
  "Socios / Co-founders"
];

export default function ProfilePage() {
  const [catalogItems, setCatalogItems] = useState([
    { id: 1, title: "Consultoría de Producto", description: "Auditoría completa de UX/UI y roadmap de producto." }
  ]);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const profileImageRef = useRef<HTMLInputElement>(null);
  const companyLogoRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setter(url);
      toast.success("Imagen cargada (vista previa)");
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Perfil actualizado correctamente");
  };

  const handleAddItem = () => {
    if (!newItemTitle.trim()) return;
    setCatalogItems([...catalogItems, { id: Date.now(), title: newItemTitle, description: newItemDesc }]);
    setNewItemTitle("");
    setNewItemDesc("");
    setIsAddingItem(false);
    toast.success("Servicio añadido al catálogo");
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
            <div className="flex items-center gap-6 mb-6 bg-slate-950/30 p-4 rounded-xl border border-slate-800">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden shrink-0 shadow-lg">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <User className="h-10 w-10 text-slate-400" />
                )}
              </div>
              <div className="space-y-2">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={profileImageRef}
                  onChange={(e) => handleImageUpload(e, setProfileImage)}
                />
                <Button 
                  variant="outline" 
                  className="border-slate-700 text-white bg-slate-800 hover:bg-slate-700 block" 
                  type="button"
                  onClick={() => profileImageRef.current?.click()}
                >
                  Cambiar Foto
                </Button>
                <p className="text-xs text-slate-500">Formato cuadrado 1:1 recomendado. Máximo 5MB.</p>
              </div>
            </div>

            {/* Rol Específico: Inversor */}
            <div className="flex items-center justify-between p-4 mb-6 rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Ghost className="h-4 w-4 text-primary" />
                  <Label className="text-white font-medium">Modo Incógnito (Inversor)</Label>
                </div>
                <p className="text-xs text-slate-400">Navega por las retas sin que tu perfil aparezca en el directorio.</p>
              </div>
              <Switch />
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
              <Briefcase className="h-5 w-5 text-primary" /> Empresa & Catálogo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-6 mb-6 bg-slate-950/30 p-4 rounded-xl border border-slate-800">
              <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white border-2 border-slate-700 overflow-hidden shrink-0 shadow-lg">
                {companyLogo ? (
                  <img src={companyLogo} alt="Company Logo" className="h-full w-full object-contain" />
                ) : (
                  <div className="h-full w-full bg-slate-800 flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-slate-400" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={companyLogoRef}
                  onChange={(e) => handleImageUpload(e, setCompanyLogo)}
                />
                <Label className="text-white block">Logo de la Empresa</Label>
                <Button 
                  variant="outline" 
                  className="border-slate-700 text-white bg-slate-800 hover:bg-slate-700 block mt-1" 
                  type="button"
                  onClick={() => companyLogoRef.current?.click()}
                >
                  Subir Logo
                </Button>
                <p className="text-xs text-slate-500">Soporta PNG con fondo transparente.</p>
              </div>
            </div>

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
            
            <div className="space-y-2 pt-2">
              <Label htmlFor="description" className="text-slate-300">Pitch de la Empresa (Lo que hacen en 1 oración)</Label>
              <Input id="description" placeholder="Ej. Revolucionando el mundo B2B con IA" className="bg-slate-950 border-slate-800 text-white" />
            </div>

            {/* Catalog Section */}
            <div className="pt-6 mt-6 border-t border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-white text-base">Catálogo de Productos / Servicios</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 border-primary/50 text-primary hover:bg-primary/10"
                  type="button"
                  onClick={() => setIsAddingItem(!isAddingItem)}
                >
                  <Plus className="h-4 w-4 mr-1" /> {isAddingItem ? "Cancelar" : "Añadir"}
                </Button>
              </div>

              {isAddingItem && (
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-4 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Nombre del Servicio/Producto</Label>
                    <Input 
                      placeholder="Ej. Consultoría 1-1" 
                      className="bg-slate-950 border-slate-800 text-white" 
                      value={newItemTitle}
                      onChange={(e) => setNewItemTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Descripción breve</Label>
                    <Input 
                      placeholder="¿Qué incluye y qué problema resuelve?" 
                      className="bg-slate-950 border-slate-800 text-white" 
                      value={newItemDesc}
                      onChange={(e) => setNewItemDesc(e.target.value)}
                    />
                  </div>
                  <Button type="button" onClick={handleAddItem} className="w-full bg-primary hover:bg-primary/90 text-white">
                    Guardar Servicio
                  </Button>
                </div>
              )}

              {catalogItems.length === 0 ? (
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 text-center text-slate-400">
                  Aún no has agregado productos a tu catálogo. <br/>
                  <span className="text-xs mt-2 block text-slate-500">Sube tus servicios para recibir preguntas y likes de la comunidad.</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {catalogItems.map(item => (
                    <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-lg p-4 relative group">
                      <h4 className="text-white font-medium">{item.title}</h4>
                      <p className="text-slate-400 text-sm mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" /> Networking & Matchmaking
            </CardTitle>
            <CardDescription className="text-slate-400">
              Dile a nuestra IA exactamente qué buscas para conectarte con las personas correctas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="offers" className="text-slate-300">Servicios / Valor que ofrezco</Label>
              <Input id="offers" defaultValue="Desarrollo Full-Stack, Producto, UX/UI" className="bg-slate-950 border-slate-800 text-white" />
            </div>
            
            <div className="space-y-3 pt-2">
              <Label className="text-white">Lo que busco (Selecciona todas las que apliquen):</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {NETWORKING_TAGS.map(tag => (
                  <div key={tag} className="flex items-start space-x-3 bg-slate-950/50 p-3 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors">
                    <Checkbox id={tag} className="border-slate-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-0.5" />
                    <Label htmlFor={tag} className="text-slate-300 font-normal cursor-pointer leading-tight">
                      {tag}
                    </Label>
                  </div>
                ))}
              </div>
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
                    <SelectItem value="running">Running / Carrera</SelectItem>
                    <SelectItem value="ciclismo">Ciclismo / Ruta</SelectItem>
                    <SelectItem value="tenis">Tenis</SelectItem>
                    <SelectItem value="escalada">Escalada / Bouldering</SelectItem>
                    <SelectItem value="barre">Barre / Pilates</SelectItem>
                    <SelectItem value="crossfit">CrossFit / Funcional</SelectItem>
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
