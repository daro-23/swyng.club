import { TopHeader } from "@/components/shared/TopHeader";
import { BottomNavbar } from "@/components/shared/BottomNavbar";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_completed")
      .eq("id", user.id)
      .single();

    if (!profile || !profile.onboarding_completed) {
      redirect("/onboarding");
    }
  }

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
