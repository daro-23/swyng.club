"use client";

import { useState } from "react";
import { User, Briefcase, MapPin, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MOCK_MEMBERS = [
  {
    id: 1,
    name: "Ana Victoria",
    role: "Managing Partner",
    company: "Latam Ventures",
    location: "CDMX",
    sport: "Golf",
    level: "Avanzado",
    offers: ["Venture Capital", "Estrategia", "Networking"],
    lookingFor: ["Startups Seed", "B2B SaaS", "Fintech"],
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    role: "CTO & Co-founder",
    company: "PayStream",
    location: "Monterrey",
    sport: "Pádel",
    level: "Intermedio",
    offers: ["Arquitectura Cloud", "Desarrollo", "Pagos"],
    lookingFor: ["Inversión Pre-Seed", "Co-founder", "Ventas"],
  },
  {
    id: 3,
    name: "Sofía Téllez",
    role: "CEO",
    company: "Growth Hackers SC",
    location: "Guadalajara",
    sport: "Barre",
    level: "Principiante",
    offers: ["Marketing Digital", "Growth", "SEO"],
    lookingFor: ["Clientes B2B", "Networking", "Agencias Aliadas"],
  },
  {
    id: 4,
    name: "Darío (Tú)",
    role: "Founder",
    company: "Swyng",
    location: "CDMX",
    sport: "Pádel",
    level: "Principiante",
    offers: ["Desarrollo Full-Stack", "Producto", "UX/UI"],
    lookingFor: ["Usuarios Beta", "Feedback", "Inversión"],
  }
];

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = MOCK_MEMBERS.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8 overflow-y-auto pb-24">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-white">Directorio</h2>
        <p className="text-slate-400">Descubre a otros miembros del ecosistema y haz sinergia.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Buscar por nombre, empresa o rol..."
            className="pl-10 bg-slate-900 border-slate-800 text-white h-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-12 border-slate-700 bg-slate-800 text-white hover:bg-slate-700">
          <Filter className="mr-2 h-4 w-4" /> Filtros
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="bg-slate-900 border-slate-800 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 border border-slate-700">
                    <User className="h-6 w-6 text-slate-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg leading-none">{member.name}</h3>
                    <p className="text-sm text-primary mt-1">{member.role} @ {member.company}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {member.location}
                </div>
                <div className="flex items-center gap-1 text-slate-300">
                  <Badge variant="secondary" className="bg-slate-800 hover:bg-slate-700 text-slate-300 border-none">
                    {member.sport} ({member.level})
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wider">Ofrece</p>
                <div className="flex flex-wrap gap-1.5">
                  {member.offers.map((offer) => (
                    <Badge key={offer} variant="outline" className="border-slate-700 text-slate-300 bg-slate-900/50">
                      {offer}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wider">Busca</p>
                <div className="flex flex-wrap gap-1.5">
                  {member.lookingFor.map((look) => (
                    <Badge key={look} className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                      {look}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button className="w-full mt-2 bg-slate-800 hover:bg-primary hover:text-white text-slate-300 transition-colors">
                Conectar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
