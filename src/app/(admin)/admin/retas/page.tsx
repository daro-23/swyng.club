import { CalendarDays, MapPin, Users, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_RETAS = [
  { id: 1, host: "Carlos Mendoza", sport: "Pádel", location: "Club Pádel MTY", date: "Hoy, 19:00 hrs", players: "2/4", status: "Buscando" },
  { id: 2, host: "Ana Victoria", sport: "Golf", location: "Bosque Real", date: "Sábado, 08:00 hrs", players: "3/4", status: "Confirmada" },
  { id: 3, host: "Spam User", sport: "Pádel", location: "Fake Location", date: "Mañana", players: "1/4", status: "Reportada" },
];

export default function AdminRetasPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Moderación de Retas</h1>
        <p className="text-slate-400">Supervisa las retas creadas y elimina contenido inapropiado.</p>
      </div>

      <div className="grid gap-4">
        {MOCK_RETAS.map(reta => (
          <div key={reta.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-slate-800 bg-slate-900 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{reta.sport}</span>
                <span className="text-slate-500 text-sm">organizado por {reta.host}</span>
                {reta.status === "Reportada" && (
                  <span className="bg-red-500/20 text-red-400 text-[10px] uppercase px-2 py-0.5 rounded font-bold">Reportada</span>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {reta.location}</span>
                <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" /> {reta.date}</span>
                <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {reta.players}</span>
              </div>
            </div>
            <div>
              <Button variant="outline" className="border-red-900 text-red-400 bg-red-950/30 hover:bg-red-900/50 hover:text-red-300">
                <Trash2 className="h-4 w-4 mr-2" /> Eliminar Reta
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
