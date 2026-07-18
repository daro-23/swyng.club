"use client";

import { useState } from "react";
import { MatchesBar } from "@/components/networking/MatchesBar";
import { SwipeCard, SwipeProfile } from "@/components/networking/SwipeCard";
import { AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Clock, Lock, Zap } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// Mock profiles for swipe
const MOCK_PROFILES: SwipeProfile[] = [
  {
    id: "p1",
    name: "Alejandro M.",
    role: "Founder & CEO",
    company: "PropTech Latam",
    bio: "Construyendo el futuro de Real Estate en México. Buscando levantar Serie A y conocer C-levels técnicos.",
    interests: ["Real Estate", "Venture Capital", "Pádel"],
    imageUrl: "https://i.pravatar.cc/150?u=p1",
  },
  {
    id: "p2",
    name: "Valeria G.",
    role: "Partner",
    company: "Seed Ventures",
    bio: "Inversora temprana en SaaS y Fintech. Me encanta rebotar ideas en el hoyo 19.",
    interests: ["B2B SaaS", "Fintech", "Golf"],
    imageUrl: "https://i.pravatar.cc/150?u=p2",
  },
  {
    id: "p3",
    name: "Roberto S.",
    role: "CTO",
    company: "Fintech Startup",
    bio: "Arquitecto de software escalable. Apasionado por crypto y nuevos modelos de pago.",
    interests: ["Blockchain", "Engineering", "Barre"],
    imageUrl: "https://i.pravatar.cc/150?u=p3",
  },
];

const UPCOMING_EVENTS = [
  {
    id: 1,
    sport: "padel",
    time: "Mañana, 08:00 hrs",
    location: "Club Pádel MTY",
  },
];

export default function HomeDashboard() {
  const [profiles, setProfiles] = useState(MOCK_PROFILES);
  const [swipesLeft, setSwipesLeft] = useState(5); // Simulated free tier
  const [showPaywall, setShowPaywall] = useState(false);

  const handleSwipe = (id: string, direction: "left" | "right") => {
    if (direction === "right") {
      toast.success("¡Sinergia enviada!", {
        description: "Te avisaremos si hay Match mutuo.",
      });
    }

    // Remove profile from stack
    setTimeout(() => {
      setProfiles((prev) => prev.filter((p) => p.id !== id));
      
      const remaining = swipesLeft - 1;
      setSwipesLeft(remaining);
      
      if (remaining <= 0) {
        setShowPaywall(true);
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-[#040814] pt-4 px-4 pb-24 flex flex-col">
      <div className="max-w-2xl mx-auto w-full space-y-6 flex-1 flex flex-col">
        
        {/* Header Area */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-white tracking-tight">Inicio</h1>
          <p className="text-slate-400">Tu radar de networking y partidos.</p>
        </div>

        {/* Matches Bar */}
        <MatchesBar />

        {/* Swipe Module */}
        <div className="w-full flex-1 min-h-[450px] relative">
          <h2 className="text-white font-bold mb-3">Descubre Miembros</h2>
          
          <div className="relative w-full h-[450px]">
            {showPaywall || profiles.length === 0 ? (
              <div className="absolute inset-0 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col items-center justify-center p-8 text-center shadow-2xl">
                {showPaywall ? (
                  <>
                    <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 border border-primary/50">
                      <Lock className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Límite Alcanzado</h3>
                    <p className="text-slate-400 mb-6">
                      Has usado tus 5 swipes gratuitos diarios. Sube de nivel para hacer networking ilimitado.
                    </p>
                    <Link href="/pricing" className="w-full">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-lg h-12">
                        <Zap className="w-5 h-5 mr-2" />
                        Upgrade a Club Member
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="h-16 w-16 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                      <Zap className="h-8 w-8 text-slate-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">¡Estás al día!</h3>
                    <p className="text-slate-400">
                      No hay más perfiles en tu área por ahora. Vuelve más tarde.
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div className="absolute inset-0 pb-[60px]">
                <AnimatePresence>
                  {profiles.map((profile, index) => (
                    <SwipeCard
                      key={profile.id}
                      profile={profile}
                      index={index}
                      onSwipe={handleSwipe}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white font-bold">Tus Próximos Eventos</h2>
            <Link href="/mis-retas" className="text-primary text-sm font-medium hover:underline">Ver todos</Link>
          </div>
          
          <div className="space-y-3">
            {UPCOMING_EVENTS.map(event => (
              <Card key={event.id} className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                      <Trophy className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold capitalize">{event.sport}</h3>
                      <p className="text-slate-400 text-xs flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" /> {event.time}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800">
                    Detalles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
