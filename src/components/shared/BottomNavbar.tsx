"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarPlus, MessageSquare, Bot, Users } from "lucide-react";

const NAV_ITEMS = [
  {
    name: "Clubhouse",
    href: "/discover",
    icon: Home,
  },
  {
    name: "Mis Retas",
    href: "/mis-retas",
    icon: CalendarPlus,
  },
  {
    name: "Caddy",
    href: "/caddy",
    icon: Bot,
  },
  {
    name: "Directorio",
    href: "/directory",
    icon: Users,
  },
  {
    name: "Locker",
    href: "/locker-room",
    icon: MessageSquare,
  },
];

export function BottomNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 w-full border-t border-slate-800 bg-[#040814]/90 backdrop-blur-xl pb-safe sm:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 ${
                isActive ? "text-primary" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "drop-shadow-[0_0_8px_rgba(255,106,0,0.8)]" : ""}`} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
