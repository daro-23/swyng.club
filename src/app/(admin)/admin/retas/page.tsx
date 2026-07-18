import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MOCK_RETAS = [
  { id: 1, creator: "Carlos Mendoza", sport: "Pádel", location: "Club Pádel MTY", time: "Hoy, 19:00 hrs", players: "2/4", status: "Buscando" },
  { id: 2, creator: "Ana Victoria", sport: "Golf", location: "Bosque Real", time: "Sábado, 08:00 hrs", players: "3/4", status: "Confirmada" },
  { id: 3, creator: "Spam User", sport: "Pádel", location: "Fake Location", time: "Mañana", players: "1/4", status: "Reportada" },
];

export default function AdminRetasPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Moderación de Retas</h1>
        <p className="text-slate-400">Supervisa las retas creadas y elimina contenido inapropiado.</p>
      </div>

      <div className="rounded-md border border-slate-800 bg-slate-900">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-transparent">
              <TableHead className="text-slate-400">Deporte</TableHead>
              <TableHead className="text-slate-400">Creador</TableHead>
              <TableHead className="text-slate-400">Estado</TableHead>
              <TableHead className="text-slate-400 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_RETAS.map((reta) => (
              <TableRow key={reta.id} className="border-slate-800 hover:bg-slate-800/50">
                <TableCell className="font-medium text-white capitalize">
                  {reta.sport}
                  <div className="text-xs text-slate-500 font-normal">{reta.time}</div>
                </TableCell>
                <TableCell className="text-slate-300">
                  {reta.creator}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    reta.status === "Reportada" ? "bg-red-500/10 text-red-500 border-red-500/20" : 
                    "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                  }>
                    {reta.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
