"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import Link from "next/link";

interface Match {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
  isNew?: boolean;
}

const MOCK_MATCHES: Match[] = [
  { id: "1", name: "David F.", role: "Founder", isNew: true, imageUrl: "https://i.pravatar.cc/150?u=m1" },
  { id: "2", name: "Ana V.", role: "Partner VC", imageUrl: "https://i.pravatar.cc/150?u=m2" },
  { id: "3", name: "Carlos R.", role: "CTO", imageUrl: "https://i.pravatar.cc/150?u=m3" },
  { id: "4", name: "Sofia T.", role: "Growth", imageUrl: "https://i.pravatar.cc/150?u=m4" },
  { id: "5", name: "Miguel A.", role: "CEO", imageUrl: "https://i.pravatar.cc/150?u=m5" },
];

export function MatchesBar() {
  return (
    <div className="w-full">
      <h2 className="text-white font-bold mb-3 px-4">Tus Conexiones</h2>
      <div className="flex overflow-x-auto pb-4 pt-2 px-4 gap-4 hide-scrollbar">
        {MOCK_MATCHES.map((match, i) => (
          <Link href={`/member/${match.id}`} key={match.id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-2"
            >
              <div className={`relative h-16 w-16 rounded-full bg-slate-800 border-2 flex items-center justify-center overflow-hidden
                ${match.isNew ? "border-primary shadow-[0_0_15px_rgba(255,106,0,0.5)]" : "border-slate-700"}
              `}>
                {match.imageUrl ? (
                  <img src={match.imageUrl} alt={match.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="h-7 w-7 text-slate-400" />
                )}
                {match.isNew && (
                  <div className="absolute top-0 right-0 h-4 w-4 bg-primary rounded-full border-2 border-[#040814]"></div>
                )}
              </div>
              <span className="text-xs text-slate-300 font-medium">{match.name.split(" ")[0]}</span>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
