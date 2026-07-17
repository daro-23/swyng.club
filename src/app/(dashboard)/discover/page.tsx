"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Briefcase, MapPin, Users, Rocket, Clock } from "lucide-react";
import { CreateRetaModal } from "@/components/events/CreateRetaModal";
import { motion, AnimatePresence } from "framer-motion";

// MOCK DATA for the feed
const MOCK_RETAS = [
  {
    id: 1,
    sport: "padel",
    creator: "David F.",
    role: "Founder, Fintech SaaS",
    topic: "Seed Round Discussion",
    location: "Club Pádel MTY",
    time: "Hoy, 19:00 hrs",
    spotsMissing: 2,
  },
  {
    id: 2,
    sport: "golf",
    creator: "Ana V.",
    role: "Partner, Latam Ventures",
    topic: "B2B Marketplaces",
    location: "Bosque Real",
    time: "Sábado, 08:00 hrs",
    spotsMissing: 1,
  },
  {
    id: 3,
    sport: "barre",
    creator: "Sofia T.",
    role: "Provider, Growth Agency",
    topic: "Estrategias de Adquisición",
    location: "Síciclo Polanco",
    time: "Viernes, 18:30 hrs",
    spotsMissing: 3,
  },
];

export default function ClubhouseFeed() {
  const [filter, setFilter] = useState("todos");

  const filteredRetas = filter === "todos" 
    ? MOCK_RETAS 
    : MOCK_RETAS.filter(r => r.sport === filter);

  return (
    <div className="min-h-screen bg-[#040814] pt-4 px-4 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header Area */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-white tracking-tight">The Clubhouse</h1>
          <p className="text-slate-400">Encuentra retas y haz sinergia.</p>
        </div>

        {/* Filters */}
        <Tabs defaultValue="todos" onValueChange={setFilter} className="w-full">
          <TabsList className="bg-slate-900 border border-slate-800 p-1 rounded-xl h-auto flex flex-wrap gap-1">
            <TabsTrigger value="todos" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-slate-400">Todos</TabsTrigger>
            <TabsTrigger value="padel" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-slate-400">Pádel</TabsTrigger>
            <TabsTrigger value="golf" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-slate-400">Golf</TabsTrigger>
            <TabsTrigger value="barre" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-slate-400">Barre</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Feed */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredRetas.map((reta) => (
              <motion.div
                key={reta.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-slate-900/50 border-slate-800 overflow-hidden hover:border-slate-700 transition-colors">
                  <CardContent className="p-5 space-y-5">
                    
                    {/* Top Row: Badge & Time */}
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10 capitalize rounded-full px-3 py-1">
                        <Trophy className="w-3 h-3 mr-1" />
                        {reta.sport}
                      </Badge>
                      <div className="flex items-center text-slate-400 text-xs font-medium">
                        <Clock className="w-3 h-3 mr-1" />
                        {reta.time}
                      </div>
                    </div>

                    {/* Middle Row: Creator & Topic */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                          <Rocket className="w-5 h-5 text-slate-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">{reta.creator}</h3>
                          <p className="text-slate-400 text-sm flex items-center gap-1">
                            <Briefcase className="w-3 h-3" /> {reta.role}
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50">
                        <p className="text-sm text-slate-300 font-medium">
                          <span className="text-primary mr-1">Tercer Tiempo:</span> 
                          {reta.topic}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Row: Location, Spots & Action */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                      <div className="space-y-1">
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {reta.location}
                        </p>
                        <p className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                          <Users className="w-3 h-3" /> Faltan {reta.spotsMissing} jugador{reta.spotsMissing > 1 ? 'es' : ''}
                        </p>
                      </div>
                      <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                        Unirse a la Reta
                      </Button>
                    </div>

                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Global Floating Action Button for Reta Creation */}
        <CreateRetaModal />

      </div>
    </div>
  );
}
