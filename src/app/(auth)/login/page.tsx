"use client";

import Link from "next/link";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 relative overflow-hidden bg-background">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      
      <Link href="/" className="absolute top-8 left-8 text-2xl font-bold tracking-tighter text-white z-10">
        swyng<span className="text-primary">.</span>
      </Link>

      <Card className="w-full max-w-md bg-slate-900/80 border-slate-800 backdrop-blur-xl shadow-2xl z-10">
        <CardHeader className="space-y-2 text-center pb-6">
          <CardTitle className="text-3xl font-bold text-white tracking-tight">Welcome to the Club</CardTitle>
          <CardDescription className="text-slate-400">Sign in via Magic Link.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => window.location.href = '/onboarding', 1000); }}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email address</Label>
              <Input 
                id="email" 
                required
                placeholder="founder@startup.com" 
                type="email" 
                className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600 h-12 focus-visible:ring-primary"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className={buttonVariants({ variant: "default", className: "w-full h-12 text-md font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all mt-4" })}
            >
              {loading ? "Sending link..." : "Continue with Email"}
            </button>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-800" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-900 px-2 text-slate-500">Or continue with</span></div>
            </div>

            <button type="button" className={buttonVariants({ variant: "outline", className: "w-full h-12 text-md bg-slate-950/50 border-slate-700 hover:bg-slate-800 text-white transition-all" })}>
              Google
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
