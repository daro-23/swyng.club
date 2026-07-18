"use client";

import { useState } from "react";
import { User, Briefcase, Target, Activity, Heart, MessageCircle, ArrowLeft, Send, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

// Mock data for catalog items
const MOCK_CATALOG = [
  {
    id: "c1",
    title: "Auditoría de UX/UI",
    description: "Revisión completa de tu producto con reporte de mejoras y quick wins para aumentar conversión.",
    price: "$500 USD",
    likes: 12,
  },
  {
    id: "c2",
    title: "Asesoría para Levantar Capital",
    description: "1 hora de sesión 1-on-1 para revisar tu pitch deck antes de ir con inversionistas.",
    price: "$150 USD",
    likes: 34,
  }
];

// Mock database for profiles
const PROFILES_DB: Record<string, any> = {
  "1": { name: "David F.", role: "Founder", company: "Fintech Startup", imageUrl: "https://i.pravatar.cc/150?u=m1", rating: 4.9, bio: "Buscando escalar nuestra Serie A y encontrar partners clave en banca.", tags: ["Fintech", "Venture Capital"] },
  "2": { name: "Ana V.", role: "Partner VC", company: "Seed Ventures", imageUrl: "https://i.pravatar.cc/150?u=m2", rating: 4.8, bio: "Invierto en B2B SaaS y me encanta el padel. Siempre abierta a buenos pitchs.", tags: ["SaaS", "Inversión"] },
  "3": { name: "Carlos R.", role: "CTO", company: "DevShop Latam", imageUrl: "https://i.pravatar.cc/150?u=m3", rating: 4.5, bio: "Construyendo arquitecturas escalables. Ayudando a startups a lanzar su MVP.", tags: ["Ingeniería", "Web3"] },
  "4": { name: "Sofia T.", role: "Growth", company: "ScaleUp Co", imageUrl: "https://i.pravatar.cc/150?u=m4", rating: 5.0, bio: "Experta en growth hacking B2B. Acelerando startups de LATAM a nivel global.", tags: ["Growth", "Marketing"] },
  "5": { name: "Miguel A.", role: "CEO", company: "Retail Tech", imageUrl: "https://i.pravatar.cc/150?u=m5", rating: 4.7, bio: "Transformando el comercio local con IA y automatización.", tags: ["Retail", "AI"] },
  "p1": { name: "Alejandro M.", role: "Founder & CEO", company: "PropTech Latam", imageUrl: "https://i.pravatar.cc/150?u=p1", rating: 4.8, bio: "Construyendo el futuro de Real Estate en México. Buscando levantar Serie A y conocer C-levels técnicos.", tags: ["Real Estate", "Venture Capital"] },
  "p2": { name: "Valeria G.", role: "Partner", company: "Seed Ventures", imageUrl: "https://i.pravatar.cc/150?u=p2", rating: 4.9, bio: "Inversora temprana en SaaS y Fintech. Me encanta rebotar ideas en el hoyo 19.", tags: ["B2B SaaS", "Fintech"] },
  "p3": { name: "Roberto S.", role: "CTO", company: "Fintech Startup", imageUrl: "https://i.pravatar.cc/150?u=p3", rating: 4.6, bio: "Arquitecto de software escalable. Apasionado por crypto y nuevos modelos de pago.", tags: ["Blockchain", "Engineering"] }
};

export default function MemberProfilePage() {
  const router = useRouter();
  const { id } = useParams();
  
  const profile = PROFILES_DB[id as string] || PROFILES_DB["p1"];
  
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [questions, setQuestions] = useState<Record<string, string>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});

  const toggleLike = (itemId: string) => {
    setLikes(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const handleAskQuestion = (itemId: string) => {
    if (!questions[itemId]) return;
    setSubmittedQuestions(prev => ({ ...prev, [itemId]: true }));
  };

  return (
    <div className="flex-1 overflow-y-auto pb-24">
      {/* Header Cover */}
      <div className="h-32 bg-gradient-to-r from-slate-900 via-[#0a1128] to-slate-900 border-b border-slate-800 relative">
        <button 
          onClick={() => router.back()}
          className="absolute top-4 left-4 h-10 w-10 bg-slate-900/80 backdrop-blur-md rounded-full flex items-center justify-center border border-slate-700 text-white hover:bg-slate-800 z-10"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-16 space-y-6">
        {/* Basic Info */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative pt-16 shadow-xl">
          <div className="absolute -top-16 left-6 h-28 w-28 rounded-2xl bg-slate-800 border-4 border-slate-900 shadow-xl overflow-hidden flex items-center justify-center">
             <img src={profile.imageUrl} alt={profile.name} className="w-full h-full object-cover" />
          </div>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                {profile.name} 
                <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-0">Swynger PRO</Badge>
              </h1>
              <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
                <Briefcase className="h-4 w-4" /> {profile.role} en {profile.company}
              </p>
              {/* Reputación / Rating */}
              <div className="flex items-center gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`h-4 w-4 ${star <= Math.floor(profile.rating) ? "text-yellow-500 fill-yellow-500" : "text-slate-600"}`} />
                ))}
                <span className="text-slate-400 text-sm ml-2 font-medium">{profile.rating} (24 reseñas)</span>
              </div>
            </div>
            <Button className="bg-primary text-white hover:bg-primary/90">
              Conectar
            </Button>
          </div>

          <p className="text-slate-300 mt-5 leading-relaxed">
            {profile.bio}
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {profile.tags.map((tag: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-medium border border-slate-700">{tag}</span>
            ))}
          </div>
        </div>

        {/* AI Matchmaking Tags */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-primary" /> Lo que busca (Match Intent)
          </h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-primary/50 text-slate-200 bg-primary/10">Inversión (Venture Capital)</Badge>
            <Badge variant="outline" className="border-slate-700 text-slate-300">Socios / Co-founders</Badge>
            <Badge variant="outline" className="border-slate-700 text-slate-300">Feedback de Producto</Badge>
          </div>
        </div>

        {/* Startup Achievements & Presentation */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 px-2">Logros & Presentación</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            <Card className="min-w-[280px] bg-slate-900 border-slate-800 overflow-hidden shrink-0">
              <div className="h-40 w-full relative">
                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80" alt="Pitch deck" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white font-bold bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm text-sm border border-white/20">Pitch Deck 2024</span>
                </div>
              </div>
            </Card>
            <Card className="min-w-[280px] bg-slate-900 border-slate-800 overflow-hidden shrink-0">
              <div className="h-40 w-full relative">
                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?w=400&q=80" alt="Team meeting" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white font-bold bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm text-sm border border-white/20">Lanzamiento V2</span>
                </div>
              </div>
            </Card>
            <Card className="min-w-[280px] bg-slate-900 border-slate-800 overflow-hidden shrink-0 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
               <div className="text-center p-6">
                 <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                   <Activity className="h-6 w-6 text-primary" />
                 </div>
                 <p className="text-slate-300 font-medium text-sm">Ver todas las fotos</p>
               </div>
            </Card>
          </div>
        </div>

        {/* Product Catalog Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 px-2">Catálogo de Servicios</h2>
          
          <div className="space-y-4">
            {MOCK_CATALOG.map((item) => (
              <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg overflow-hidden relative">
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="w-full md:w-32 h-32 bg-slate-800 rounded-xl flex items-center justify-center shrink-0 border border-slate-700">
                    <Briefcase className="h-8 w-8 text-slate-500" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-white">{item.title}</h3>
                        <span className="text-primary font-bold">{item.price}</span>
                      </div>
                      <p className="text-sm text-slate-400 mt-2">{item.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-800/50">
                      <button 
                        onClick={() => toggleLike(item.id)}
                        className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${likes[item.id] ? 'text-red-500' : 'text-slate-500 hover:text-slate-300'}`}
                      >
                        <Heart className="h-4 w-4" fill={likes[item.id] ? "currentColor" : "none"} />
                        <span>{item.likes + (likes[item.id] ? 1 : 0)}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-300 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span>Preguntar</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Q&A Input Section */}
                <div className="mt-4 bg-slate-950/50 rounded-xl p-3 flex gap-2 border border-slate-800">
                  {submittedQuestions[item.id] ? (
                    <div className="text-sm text-green-400 flex items-center gap-2 py-1 px-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      Pregunta enviada. Te responderá pronto.
                    </div>
                  ) : (
                    <>
                      <Input 
                        placeholder="Pregunta sobre este servicio..." 
                        className="bg-transparent border-none text-white focus-visible:ring-0 px-2 h-9"
                        value={questions[item.id] || ""}
                        onChange={(e) => setQuestions(prev => ({ ...prev, [item.id]: e.target.value }))}
                      />
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-9 w-9 p-0 text-primary hover:text-primary hover:bg-primary/10"
                        onClick={() => handleAskQuestion(item.id)}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
