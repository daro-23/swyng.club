"use client";

import { useState } from "react";
import { Search, MoreVertical, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
        <Table>
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-transparent">
              <TableHead className="text-slate-400">Usuario</TableHead>
              <TableHead className="text-slate-400">Plan</TableHead>
              <TableHead className="text-slate-400">Estado</TableHead>
              <TableHead className="text-slate-400 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((user) => (
              <TableRow key={user.id} className="border-slate-800 hover:bg-slate-800/50">
                <TableCell className="font-medium text-white">
                  {user.name}
                  <div className="text-xs text-slate-500 font-normal">{user.email}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    user.plan === "Founder" ? "border-primary text-primary" : 
                    user.plan === "Club Member" ? "border-emerald-500 text-emerald-500" : 
                    "border-slate-600 text-slate-400"
                  }>
                    {user.plan}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    user.status === "Activo" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : 
                    "bg-slate-800 text-slate-400 border-slate-700"
                  }>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
