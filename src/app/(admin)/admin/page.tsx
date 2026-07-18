import { Users, Activity, CreditCard, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">Super Admin Dashboard</h1>
        <p className="text-slate-400">Visión general (God Mode) de toda la actividad en Swyng.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Usuarios</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1,248</div>
            <p className="text-xs text-primary mt-1">+12% este mes</p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Retas Activas</CardTitle>
            <Activity className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">84</div>
            <p className="text-xs text-slate-500 mt-1">32 Pádel, 40 Golf, 12 Barre</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Ingresos (MRR)</CardTitle>
            <CreditCard className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$14,500</div>
            <p className="text-xs text-primary mt-1">+4% este mes</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Reportes Abiertos</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3</div>
            <p className="text-xs text-slate-500 mt-1">Requieren atención</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Crecimiento de Usuarios</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center text-slate-500 border border-dashed border-slate-800 rounded-md m-6 mt-0">
            [Gráfico de Crecimiento]
          </CardContent>
        </Card>
        
        <Card className="col-span-3 bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Usuarios Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1,2,3,4,5].map((i) => (
                <div key={i} className="flex items-center justify-between border-b border-slate-800 pb-2 last:border-0 last:pb-0">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">Nuevo Founder {i}</span>
                    <span className="text-xs text-slate-500">hace {i * 10} minutos</span>
                  </div>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Founder</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
