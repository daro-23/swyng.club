"use client";

import { Bell, Heart, MessageSquare, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const NOTIFICATIONS = [
  {
    id: 1,
    type: "like",
    icon: Heart,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    message: "A Alejandro M. le interesó tu servicio de Consultoría 1-1.",
    time: "Hace 10 min",
    link: "/member/p1"
  },
  {
    id: 2,
    type: "question",
    icon: MessageSquare,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    message: "Ana V. tiene una pregunta sobre tu Catálogo.",
    time: "Hace 1 hora",
    link: "/locker-room"
  },
  {
    id: 3,
    type: "match",
    icon: Trophy,
    color: "text-primary",
    bg: "bg-primary/10",
    message: "¡Match confirmado para la Reta de Pádel de mañana!",
    time: "Hace 3 horas",
    link: "/mis-retas"
  }
];

export default function NotificationsPage() {
  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8 max-w-2xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
          <Bell className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Notificaciones</h2>
      </div>

      <div className="space-y-3">
        {NOTIFICATIONS.map((notif) => {
          const Icon = notif.icon;
          return (
            <Link key={notif.id} href={notif.link} className="block group">
              <Card className="bg-slate-900 border-slate-800 group-hover:border-slate-700 transition-colors">
                <CardContent className="p-4 flex gap-4 items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${notif.bg}`}>
                    <Icon className={`w-6 h-6 ${notif.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-300 font-medium">{notif.message}</p>
                    <span className="text-xs text-slate-500 mt-1 block">{notif.time}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-slate-500 text-sm">No tienes más notificaciones.</p>
      </div>
    </div>
  );
}
