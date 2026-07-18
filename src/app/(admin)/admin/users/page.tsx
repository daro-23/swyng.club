"use client";

import { useState } from "react";
import { Search, MoreVertical, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  Body,
  Cell,
  Head,
  Header,
  Row,
} from "@/components/ui/table"; // Assuming standard shadcn table or simple HTML tables
import { Badge } from "@/components/ui/badge";

const MOCK_USERS = [
  { id: "1", name: "Ana Victoria", email: "ana@latam.vc", role: "Investor", status: "Active", joined: "2024-01-15" },
  { id: "2", name: "Carlos Mendoza", email: "carlos@paystream.io", role: "Founder", status: "Active", joined: "2024-02-10" },
  { id: "3", name: "Sofía Téllez", email: "sofia@growth.com", role: "Provider", status: "Active", joined: "2024-03-05" },
  { id: "4", name: "Usuario Spam", email: "bot@spam.com", role: "Founder", status: "Suspended", joined: "2024-03-20" },
];

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = MOCK_USERS.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Gestión de Usuarios</h1>
          <p className="text-slate-400">Administra los accesos y roles de la comunidad.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input 
            placeholder="Buscar usuario..." 
            className="pl-10 bg-slate-900 border-slate-800 text-white"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border border-slate-800 bg-slate-900">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-slate-950/50 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4 font-medium">Nombre / Email</th>
              <th className="px-6 py-4 font-medium">Rol</th>
              <th className="px-6 py-4 font-medium">Estado</th>
              <th className="px-6 py-4 font-medium">Registro</th>
              <th className="px-6 py-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filtered.map(user => (
              <tr key={user.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-white">{user.name}</div>
                  <div className="text-slate-500">{user.email}</div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline" className="border-slate-700 text-slate-300">
                    {user.role}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  {user.status === "Active" ? (
                    <span className="flex items-center text-emerald-400 text-xs">
                      <CheckCircle2 className="mr-1 h-3 w-3" /> Activo
                    </span>
                  ) : (
                    <span className="flex items-center text-red-400 text-xs">
                      <ShieldAlert className="mr-1 h-3 w-3" /> Suspendido
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-slate-400">{user.joined}</td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
