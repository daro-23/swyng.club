"use client";

import { Trophy, Calendar, MapPin, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MATCHES = [
  {
    id: 1,
    sport: "Pádel - Dobles",
    level: "Intermedio",
    date: "18 de Julio",
    time: "08:00 AM",
    location: "Club Sonoma MTY",
    players: ["Darío (Tú)", "Alejandro M.", "Carlos R.", "Pendiente"],
    status: "Buscando 1 Jugador",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a631d6?w=400&q=80"
  },
  {
    id: 2,
    sport: "Golf - 18 Hoyos",
    level: "Avanzado",
    date: "22 de Julio",
    time: "07:30 AM",
    location: "Club Campestre",
    players: ["Darío (Tú)", "Valeria G.", "Roberto S.", "Miguel A."],
    status: "Confirmado",
    image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=400&q=80"
  }
];

export default function MatchesPage() {
  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8 max-w-2xl mx-auto w-full pb-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
          <Trophy className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Tus Retas</h2>
      </div>

      <div className="space-y-6">
        {MATCHES.map(match => (
          <Card key={match.id} className="bg-slate-900 border-slate-800 overflow-hidden">
            <div className="h-32 w-full relative">
              <img src={match.image} alt={match.sport} className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
              <div className="absolute bottom-3 left-4">
                <h3 className="text-xl font-bold text-white">{match.sport}</h3>
                <span className="text-xs font-medium text-primary px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                  {match.level}
                </span>
              </div>
            </div>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-slate-300 text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-slate-500" /> {match.date}
                </div>
                <div className="flex items-center text-slate-300 text-sm">
                  <Clock className="w-4 h-4 mr-2 text-slate-500" /> {match.time}
                </div>
                <div className="flex items-center text-slate-300 text-sm col-span-2">
                  <MapPin className="w-4 h-4 mr-2 text-slate-500" /> {match.location}
                </div>
              </div>
              
              <div className="border-t border-slate-800 pt-4">
                <h4 className="text-sm text-slate-400 font-medium mb-2 flex items-center">
                  <Users className="w-4 h-4 mr-1" /> Jugadores ({match.players.length}/4)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {match.players.map((player, idx) => (
                    <div key={idx} className={`text-xs px-3 py-1 rounded-full border ${
                      player === "Pendiente" 
                        ? "border-dashed border-slate-600 text-slate-500 bg-transparent" 
                        : "border-slate-700 bg-slate-800 text-slate-300"
                    }`}>
                      {player}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <Button className="flex-1 bg-slate-800 text-white hover:bg-slate-700">Chat del Partido</Button>
                {match.status === "Buscando 1 Jugador" && (
                  <Button className="flex-1 bg-primary text-white hover:bg-primary/90">Invitar a Alguien</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
