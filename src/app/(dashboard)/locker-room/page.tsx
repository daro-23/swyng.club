"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Rocket, Briefcase, MessageSquare, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ChatItem = {
  id: number;
  type: string;
  name: string;
  msg: string;
  unread: boolean;
  role?: string;
  sport?: string;
  players?: number;
};

const MATCHES: ChatItem[] = [
  { id: 1, type: "1on1", name: "Alex Founder", role: "FinTech CEO", msg: "¿Qué onda? ¿Armamos el pádel mañana?", unread: true },
  { id: 2, type: "1on1", name: "Sara VC", role: "Partner, Latam Fund", msg: "Me interesa mucho su tracción actual. Platiquemos.", unread: false },
];

const EVENTS: ChatItem[] = [
  { id: 3, type: "group", name: "Pádel & Pitch - Seed Rounds", sport: "Pádel", msg: "David F: ¡Excelente partido a todos! Les paso mi contacto.", unread: true, players: 4 },
  { id: 4, type: "group", name: "SaaS Founders Monterrey", sport: "Golf", msg: "Ana V: Nos vemos el sábado a las 8am.", unread: false, players: 3 },
];

export default function LockerRoomPage() {
  const [filter, setFilter] = useState("matches");

  const list = filter === "matches" ? MATCHES : EVENTS;

  return (
    <div className="min-h-screen bg-[#040814] pt-4 px-4 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-white tracking-tight">Locker Room</h1>
          <p className="text-slate-400">Tus conexiones y retas activas.</p>
        </div>

        {/* Filters */}
        <Tabs defaultValue="matches" onValueChange={setFilter} className="w-full">
          <TabsList className="bg-slate-900 border border-slate-800 p-1 rounded-xl h-auto w-full flex">
            <TabsTrigger value="matches" className="flex-1 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-slate-400">
              Matches Directos
            </TabsTrigger>
            <TabsTrigger value="events" className="flex-1 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-slate-400">
              Retas (Grupos)
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Chat List */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {list.map((chat) => (
              <motion.div
                key={chat.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="group cursor-pointer"
              >
                <Card className="bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700 transition-all overflow-hidden relative">
                  {chat.unread && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                  )}
                  <CardContent className="p-4 flex items-center gap-4">
                    
                    {/* Avatar */}
                    <div className="relative">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${chat.unread ? 'border-primary' : 'border-slate-700 bg-slate-800'}`}>
                        {chat.type === '1on1' ? (
                          <Rocket className={`w-6 h-6 ${chat.unread ? 'text-primary' : 'text-slate-400'}`} />
                        ) : (
                          <Users className={`w-6 h-6 ${chat.unread ? 'text-primary' : 'text-slate-400'}`} />
                        )}
                      </div>
                      {chat.unread && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-4 w-4 bg-primary border-2 border-[#040814]"></span>
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className={`text-base truncate pr-4 ${chat.unread ? 'text-white font-bold' : 'text-slate-300 font-medium'}`}>
                          {chat.name}
                        </h3>
                        <span className="text-[10px] text-slate-500 whitespace-nowrap mt-1">12:30 PM</span>
                      </div>
                      
                      {chat.type === '1on1' ? (
                        <p className="text-xs text-primary mb-1 flex items-center gap-1">
                          <Briefcase className="w-3 h-3" /> {chat.role}
                        </p>
                      ) : (
                        <p className="text-xs text-blue-400 mb-1 flex items-center gap-1">
                          <Trophy className="w-3 h-3" /> {chat.sport} • {chat.players} jugadores
                        </p>
                      )}

                      <p className={`text-sm truncate ${chat.unread ? 'text-slate-300 font-medium' : 'text-slate-500'}`}>
                        {chat.msg}
                      </p>
                    </div>

                    {/* Action */}
                    <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-800/50 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white" />
                    </div>

                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
