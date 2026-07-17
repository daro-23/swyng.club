"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Role, SportType, SkillLevel } from "@/types";

export default function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [role, setRole] = useState<Role | null>(null);
  const [sport, setSport] = useState<SportType | null>(null);
  const [skill, setSkill] = useState<SkillLevel | null>(null);
  
  // Step 3 Fields
  const [goal, setGoal] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real implementation, we would call Supabase RPC or Server Action here:
    // await supabase.from('profiles').upsert({ role, business_goal: goal })
    // await supabase.from('sports_profiles').upsert({ sport_type: sport, skill_level: skill })
    
    setTimeout(() => {
      router.push("/discover");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 relative bg-background">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      
      <Card className="w-full max-w-lg bg-slate-900/80 border-slate-800 backdrop-blur-xl shadow-2xl z-10">
        <CardHeader className="space-y-2 text-center pb-6 border-b border-slate-800">
          <CardTitle className="text-2xl font-bold text-white tracking-tight">Complete Your Profile</CardTitle>
          <CardDescription className="text-slate-400">Step {step} of 3</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-4">
                <Label className="text-slate-300 text-lg">What is your primary role?</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(['founder', 'investor', 'provider'] as Role[]).map((r) => (
                    <button 
                      key={r}
                      onClick={() => setRole(r)}
                      className={`h-24 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${role === r ? 'border-primary bg-primary/20 text-primary' : 'border-slate-700 bg-slate-950/50 text-slate-400 hover:border-slate-500 hover:text-slate-200'}`}
                    >
                      <span className="font-semibold capitalize">{r}</span>
                    </button>
                  ))}
                </div>
              </div>
              <button 
                disabled={!role}
                onClick={() => setStep(2)}
                className={buttonVariants({ variant: "default", className: "w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold" })}
              >
                Next Step
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-4">
                <Label className="text-slate-300 text-lg">Pick your main sport & skill</Label>
                <div className="grid grid-cols-2 gap-3">
                  {(['padel', 'golf', 'tennis', 'barre'] as SportType[]).map((s) => (
                    <button 
                      key={s}
                      onClick={() => setSport(s)}
                      className={`h-12 rounded-lg border flex items-center justify-center transition-all ${sport === s ? 'border-primary bg-primary/20 text-primary' : 'border-slate-700 bg-slate-950/50 text-slate-400'}`}
                    >
                      <span className="font-semibold capitalize">{s}</span>
                    </button>
                  ))}
                </div>
                
                {sport && (
                  <div className="pt-4 space-y-3">
                    <Label className="text-slate-400">Skill Level</Label>
                    <div className="flex gap-2">
                      {(['beginner', 'intermediate', 'advanced'] as SkillLevel[]).map((sk) => (
                        <button 
                          key={sk}
                          onClick={() => setSkill(sk)}
                          className={`flex-1 h-10 rounded-lg border text-sm transition-all ${skill === sk ? 'border-primary bg-primary/20 text-primary' : 'border-slate-700 bg-slate-950/50 text-slate-400'}`}
                        >
                          <span className="capitalize">{sk}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className={buttonVariants({ variant: "outline", className: "w-1/3 h-12 bg-slate-950/50 border-slate-700 text-white" })}>Back</button>
                <button 
                  disabled={!sport || !skill}
                  onClick={() => setStep(3)}
                  className={buttonVariants({ variant: "default", className: "w-2/3 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold" })}
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleComplete} className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-4">
                <Label className="text-slate-300 text-sm">Cargo / Posición</Label>
                <Input 
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. CEO, Partner, Senior Dev" 
                  className="bg-slate-950/50 border-slate-700 text-white h-12 focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-slate-300 text-sm">¿Cuál es tu objetivo actual en Swyng?</Label>
                <Input 
                  required
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="e.g. Levantar $1M Seed, Conseguir clientes" 
                  className="bg-slate-950/50 border-slate-700 text-white h-12 focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-slate-300 text-sm">LinkedIn URL</Label>
                <Input 
                  required
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/tu-perfil" 
                  className="bg-slate-950/50 border-slate-700 text-white h-12 focus-visible:ring-primary"
                />
              </div>
              
              <div className="flex gap-3 mt-8">
                <button type="button" onClick={() => setStep(2)} className={buttonVariants({ variant: "outline", className: "w-1/3 h-12 bg-slate-950/50 border-slate-700 text-white" })}>Back</button>
                <button 
                  type="submit"
                  disabled={!goal || !jobTitle || !linkedin || loading}
                  className={buttonVariants({ variant: "default", className: "w-2/3 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold" })}
                >
                  {loading ? "Verificando..." : "Entrar al Club"}
                </button>
              </div>
            </form>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
