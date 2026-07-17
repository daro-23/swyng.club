import Link from "next/link";
import { Bell } from "lucide-react";

export function TopHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#040814]/80 backdrop-blur-xl">
      <div className="container flex h-14 items-center justify-between px-4">
        <Link href="/clubhouse" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tighter text-white">
            swyng<span className="text-primary">.</span>
          </span>
        </Link>
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
          </span>
        </button>
      </div>
    </header>
  );
}
