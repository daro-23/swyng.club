"use client";

import { Check, Star, Zap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#040814] pt-8 px-4 pb-24">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">Eleva tu Ecosistema</h1>
          <p className="text-slate-400 text-lg">
            La versión gratuita es excelente para conectar, pero <span className="text-primary font-semibold">Club Member</span> te da los superpoderes para dominar el networking.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Free Tier */}
          <Card className="bg-slate-900/30 border-slate-800 h-full flex flex-col">
            <CardHeader className="text-center pb-8 border-b border-slate-800/50">
              <h2 className="text-2xl font-bold text-white mb-2">Player</h2>
              <div className="text-5xl font-black text-white mb-2">$0 <span className="text-xl text-slate-500 font-medium">/mes</span></div>
              <p className="text-slate-400 text-sm">Perfecto para explorar la red.</p>
            </CardHeader>
            <CardContent className="pt-8 flex-1 flex flex-col">
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-slate-500 shrink-0" />
                  <span className="text-slate-300">Unirse a Retas ilimitadas.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-slate-500 shrink-0" />
                  <span className="text-slate-300">Máximo 1 Reta creada por mes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-slate-500 shrink-0" />
                  <span className="text-slate-300">Filtros de búsqueda básicos.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-slate-500 shrink-0" />
                  <span className="text-slate-300">Perfil público estándar.</span>
                </li>
              </ul>
              <Link href="/discover" className={buttonVariants({ variant: "outline", className: "w-full bg-slate-950/50 border-slate-700 text-white h-12" })}>
                Plan Actual
              </Link>
            </CardContent>
          </Card>

          {/* Premium Tier */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card className="bg-[#040814] border-primary h-full flex flex-col relative overflow-hidden shadow-[0_0_50px_-12px_rgba(255,106,0,0.3)]">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                <Star className="w-3 h-3" fill="currentColor" /> RECOMENDADO
              </div>
              <CardHeader className="text-center pb-8 border-b border-slate-800/50 bg-primary/5">
                <h2 className="text-2xl font-bold text-primary mb-2">Club Member</h2>
                <div className="text-5xl font-black text-white mb-2">$49 <span className="text-xl text-slate-500 font-medium">/mes</span></div>
                <p className="text-slate-400 text-sm">El toolkit definitivo para cerrar deals.</p>
              </CardHeader>
              <CardContent className="pt-8 flex-1 flex flex-col">
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-slate-200"><strong className="text-white">Crear Retas Ilimitadas:</strong> Organiza el ecosistema y hostea tus propios eventos B2B.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-slate-200"><strong className="text-white">Modo Incógnito (Stealth):</strong> Privacidad total para Inversores. Solo te ven si te unes a su reta.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-slate-200"><strong className="text-white">Swyng Caddy Ilimitado:</strong> IA entrenada para revisar contratos y term sheets al instante.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-slate-200"><strong className="text-white">Beneficios Físicos:</strong> Descuentos en clubes de pádel/golf y torneos Swyng Open.</span>
                  </li>
                </ul>
                <button className={buttonVariants({ variant: "default", className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 shadow-lg shadow-primary/20" })}>
                  Actualizar a Club Member
                </button>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
