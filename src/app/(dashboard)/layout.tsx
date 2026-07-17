import { TopHeader } from "@/components/shared/TopHeader";
import { BottomNavbar } from "@/components/shared/BottomNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#040814]">
      <TopHeader />
      
      <main className="flex-1 pb-16 sm:pb-0">
        {children}
      </main>

      <BottomNavbar />
    </div>
  );
}
