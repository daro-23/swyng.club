"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Briefcase, Handshake, Target, ChevronRight, Rocket, Zap, Coffee } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden relative">
      {/* Deep Dark Background & Orange Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[500px] bg-primary/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full max-w-md h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="container mx-auto px-6 py-6 flex items-center justify-between z-10 relative">
        <div className="text-2xl font-bold tracking-tighter text-white">
          swyng<span className="text-primary">.</span>
        </div>
        <nav className="flex gap-4 items-center">
          <Link href="#manifiesto" className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block">
            Manifiesto
          </Link>
          <Link href="#perfiles" className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block">
            Perfiles
          </Link>
          <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Log In
          </Link>
          <Link href="/login" className={buttonVariants({ variant: "default", className: "bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 font-semibold hidden sm:inline-flex" })}>
            Join the Club
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col z-10 relative pb-24">
        <section className="container mx-auto px-6 flex flex-col items-center justify-center text-center pt-24 pb-32">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Private Beta CDMX
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tighter mb-8 max-w-5xl text-white"
          >
            Menos pantallas. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Más cancha.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-slate-400 mb-12 max-w-3xl leading-relaxed"
          >
            Hackea tu networking. Únete a la comunidad privada de founders e inversores en LATAM que aceleran su dealflow, encuentran socios y cierran rondas a través de retas exclusivas y eventos deportivos de alto valor.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto"
          >
            <Link href="/login" className={buttonVariants({ variant: "default", size: "lg", className: "bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-14 text-lg w-full sm:w-auto shadow-[0_0_40px_-10px_rgba(255,106,0,0.5)] transition-all hover:scale-105 font-bold" })}>
              Apply for Membership <ChevronRight className="ml-2 w-5 h-5"/>
            </Link>
          </motion.div>
        </section>

        {/* Manifiesto / Cómo Funciona */}
        <section id="manifiesto" className="py-24 bg-slate-900/30 border-y border-slate-800 backdrop-blur-sm relative">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">El Ecosistema Swyng</h2>
              <p className="text-slate-400 text-lg leading-relaxed italic mb-4">
                "Las mejores alianzas no nacen en una sala de juntas fría, ni en un mensaje genérico de LinkedIn. Nacen cuando bajas la guardia, compartes un gran tiro o fallas una volea."
              </p>
              <p className="text-slate-400 text-lg leading-relaxed">
                En Swyng, eliminamos el networking por compromiso y lo cambiamos por conexiones reales. Usamos el deporte como el rompehielos definitivo para que fundadores, inversores y expertos hagan sinergia mientras juegan pádel, golf o asisten a sesiones de barre.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-md hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Target className="text-primary w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl text-white">1. Configura tu Juego y Negocio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">Dices qué deporte juegas (y tu nivel) y qué necesita tu negocio hoy (capital, clientes, un socio).</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-md hover:border-blue-500/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                    <Trophy className="text-blue-500 w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl text-white">2. Únete o Crea una Reta</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">¿Te falta uno para el pádel este jueves? Publica una reta exclusiva. El algoritmo te sugerirá al jugador ideal que puede ser tu próximo socio.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-md hover:border-emerald-500/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                    <Coffee className="text-emerald-500 w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl text-white">3. El Tercer Tiempo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">La magia ocurre al terminar el partido. Café, cervezas y charlas de negocios con personas que ya rompieron el hielo contigo en la cancha.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Perfiles */}
        <section id="perfiles" className="py-24 container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">¿Para qué perfiles es la App?</h2>
            <p className="text-slate-400 text-lg">
              Para que la comunidad sea de altísimo valor, la app segmentará a los usuarios en tres perfiles clave en la cancha.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Founder */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative h-full bg-[#040814] border border-slate-800 rounded-3xl p-8 flex flex-col hover:border-primary transition-colors">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-6">
                  <Rocket className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Founder</h3>
                <p className="text-primary text-sm font-semibold mb-6">Startups y PyMEs</p>
                
                <div className="mb-6 flex-1">
                  <h4 className="text-white font-medium mb-2">¿Qué buscan en el Club?</h4>
                  <p className="text-slate-400 text-sm">Levantar capital, validación de ideas, alianzas estratégicas y conseguir proveedores de confianza.</p>
                </div>
                
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                  <h4 className="text-white font-medium mb-1 text-sm flex items-center gap-2"><Trophy className="w-4 h-4 text-primary"/> Superpoder</h4>
                  <p className="text-slate-400 text-sm">Crear "Retas" públicas o privadas para atraer talento o inversores a su cancha.</p>
                </div>
              </div>
            </div>

            {/* Investor */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative h-full bg-[#040814] border border-slate-800 rounded-3xl p-8 flex flex-col hover:border-blue-500 transition-colors">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-6">
                  <Briefcase className="text-blue-500 w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Investor</h3>
                <p className="text-blue-500 text-sm font-semibold mb-6">Ángeles y VCs</p>
                
                <div className="mb-6 flex-1">
                  <h4 className="text-white font-medium mb-2">¿Qué buscan en el Club?</h4>
                  <p className="text-slate-400 text-sm">Descubrir proyectos con tracción real y conocer a los fundadores en un entorno transparente donde se ve su resiliencia.</p>
                </div>
                
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                  <h4 className="text-white font-medium mb-1 text-sm flex items-center gap-2"><Trophy className="w-4 h-4 text-blue-500"/> Superpoder</h4>
                  <p className="text-slate-400 text-sm">Modo Incógnito. Navegar de forma anónima y elegir a qué retas asistir sin ser bombardeados con spam.</p>
                </div>
              </div>
            </div>

            {/* Provider */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative h-full bg-[#040814] border border-slate-800 rounded-3xl p-8 flex flex-col hover:border-emerald-500 transition-colors">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-6">
                  <Zap className="text-emerald-500 w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Provider</h3>
                <p className="text-emerald-500 text-sm font-semibold mb-6">Agencias, Freelancers, Legal</p>
                
                <div className="mb-6 flex-1">
                  <h4 className="text-white font-medium mb-2">¿Qué buscan en el Club?</h4>
                  <p className="text-slate-400 text-sm">Encontrar clientes VIP, ofrecer servicios especializados de tecnología, diseño, marketing o leyes.</p>
                </div>
                
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                  <h4 className="text-white font-medium mb-1 text-sm flex items-center gap-2"><Trophy className="w-4 h-4 text-emerald-500"/> Superpoder</h4>
                  <p className="text-slate-400 text-sm">Validar su reputación mediante el feedback directo de otros miembros del club.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Sticky Mobile Floating CTA */}
      <div className="fixed bottom-6 left-0 right-0 px-6 z-50 sm:hidden">
        <Link href="/login" className={buttonVariants({ variant: "default", className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-14 rounded-full shadow-[0_10px_40px_-10px_rgba(255,106,0,0.4)]" })}>
          Join the Club
        </Link>
      </div>
    </div>
  );
}
