"use client";

import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from "framer-motion";
import { Briefcase, Building, X, Heart, Info } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface SwipeProfile {
  id: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  interests: string[];
  imageUrl?: string;
}

interface SwipeCardProps {
  profile: SwipeProfile;
  index: number;
  onSwipe: (id: string, direction: "left" | "right") => void;
}

export function SwipeCard({ profile, index, onSwipe }: SwipeCardProps) {
  const x = useMotionValue(0);
  const controls = useAnimation();
  const [exitX, setExitX] = useState(0);

  // Rotation and opacity transforms based on x drag
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  // Icon opacities
  const nopeOpacity = useTransform(x, [-150, -50, 0], [1, 0, 0]);
  const likeOpacity = useTransform(x, [0, 50, 150], [0, 0, 1]);

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > 100 || velocity > 500) {
      setExitX(300);
      onSwipe(profile.id, "right");
    } else if (offset < -100 || velocity < -500) {
      setExitX(-300);
      onSwipe(profile.id, "left");
    } else {
      controls.start({ x: 0, rotate: 0 });
    }
  };

  const handleButtonSwipe = (direction: "left" | "right") => {
    setExitX(direction === "left" ? -300 : 300);
    onSwipe(profile.id, direction);
  };

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full"
      style={{
        zIndex: 100 - index,
        x,
        rotate,
        opacity,
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={controls}
      exit={{ x: exitX, opacity: 0, transition: { duration: 0.2 } }}
    >
      <div className="w-full h-full rounded-3xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden relative flex flex-col">
        
        {/* Swipe Indicators */}
        <motion.div 
          className="absolute top-12 right-8 border-4 border-red-500 rounded-xl px-6 py-2 z-30 rotate-12 bg-slate-900/40 backdrop-blur-sm"
          style={{ opacity: nopeOpacity }}
        >
          <span className="text-red-500 font-black text-4xl uppercase tracking-widest shadow-sm">Nope</span>
        </motion.div>
        
        <motion.div 
          className="absolute top-12 left-8 border-4 border-emerald-500 rounded-xl px-6 py-2 z-30 -rotate-12 bg-slate-900/40 backdrop-blur-sm"
          style={{ opacity: likeOpacity }}
        >
          <span className="text-emerald-500 font-black text-4xl uppercase tracking-widest shadow-sm">Sinergia</span>
        </motion.div>

        {/* Full Card Image Background */}
        <div className="absolute inset-0 z-0">
          {profile.imageUrl ? (
            <img 
              src={profile.imageUrl} 
              alt={profile.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center">
               <div className="w-32 h-32 rounded-full bg-slate-700 border-4 border-[#040814] flex items-center justify-center mb-4">
                 <span className="text-4xl text-slate-400 font-bold">{profile.name.charAt(0)}</span>
               </div>
            </div>
          )}
          
          {/* Gradient Overlay for Text Visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent/20 pointer-events-none" />
        </div>

        {/* Top left corner: Company Logo */}
        <div className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-slate-900/60 backdrop-blur-md pr-3 pl-1 py-1 rounded-full border border-slate-700/50">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden">
             {/* Mock company logo based on company name first letter or random */}
             <img src={`https://ui-avatars.com/api/?name=${profile.company}&background=random&color=fff&bold=true`} alt={profile.company} className="w-full h-full object-cover" />
          </div>
          <span className="text-xs font-semibold text-white/90">{profile.company}</span>
        </div>

        {/* Spacer to push content to bottom */}
        <div className="flex-1 z-10 pointer-events-none" />

        {/* Profile Info */}
        <div className="p-6 pb-24 z-10 flex flex-col justify-end pointer-events-none">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            {profile.name}
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Swynger</Badge>
          </h2>
          
          <div className="flex items-center text-slate-300 mt-2 text-sm font-medium">
            <Briefcase className="w-4 h-4 mr-2 text-slate-400" />
            {profile.role} en {profile.company}
          </div>

          <p className="text-slate-400 text-sm mt-4 line-clamp-3">
            {profile.bio}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {profile.interests.map((interest, i) => (
              <span key={i} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300">
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-6 left-0 w-full flex justify-center gap-8 z-20 pointer-events-none">
          <Button 
            size="icon" 
            variant="outline" 
            className="w-14 h-14 rounded-full border-red-500/50 bg-slate-900/80 text-red-500 hover:bg-red-500/20 hover:text-red-400 pointer-events-auto backdrop-blur-sm shadow-lg"
            onClick={() => handleButtonSwipe("left")}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <X className="w-6 h-6" />
          </Button>
          <Link href={`/member/${profile.id}`} className="pointer-events-auto">
            <Button 
              size="icon" 
              variant="outline" 
              className="w-12 h-12 rounded-full border-slate-500/50 bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white backdrop-blur-sm shadow-lg mb-2"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <Info className="w-5 h-5" />
            </Button>
          </Link>
          <Button 
            size="icon" 
            variant="outline" 
            className="w-14 h-14 rounded-full border-emerald-500/50 bg-slate-900/80 text-emerald-500 hover:bg-emerald-500/20 hover:text-emerald-400 pointer-events-auto backdrop-blur-sm shadow-lg"
            onClick={() => handleButtonSwipe("right")}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <Heart className="w-6 h-6" />
          </Button>
        </div>

      </div>
    </motion.div>
  );
}
