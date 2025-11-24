"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function CommandPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        router.push("/login?redirect=/command");
        return;
      }

      setUser(session.user);

      // Load profile for display name
      const { data: profile } = await supabase
        .from("users")
        .select("display_name")
        .eq("id", session.user.id)
        .single();

      setDisplayName(profile?.display_name || session.user.email || "Operator");
      setLoading(false);
    }

    loadData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#121212]">
        <div className="h-8 w-8 animate-pulse rounded-md bg-[#262626]" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-sans text-3xl font-semibold text-[#e5e5e5] mb-2">
            Kommandostelle
          </h1>
          <p className="font-sans text-sm text-[#a3a3a3]">
            Willkommen, {displayName}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Placeholder cards */}
          <div className="rounded-md border border-[#262626] bg-[#171717] p-6">
            <h2 className="font-sans text-lg font-semibold text-[#e5e5e5] mb-2">
              Deine Buchungen
            </h2>
            <p className="font-sans text-sm text-[#a3a3a3]">
              Verwalte deine aktiven und vergangenen Buchungen
            </p>
          </div>

          <div className="rounded-md border border-[#262626] bg-[#171717] p-6">
            <h2 className="font-sans text-lg font-semibold text-[#e5e5e5] mb-2">
              Deine Sektoren
            </h2>
            <p className="font-sans text-sm text-[#a3a3a3]">
              Verwalte deine gelisteten Gebiete
            </p>
          </div>

          <div className="rounded-md border border-[#262626] bg-[#171717] p-6">
            <h2 className="font-sans text-lg font-semibold text-[#e5e5e5] mb-2">
              Einstellungen
            </h2>
            <p className="font-sans text-sm text-[#a3a3a3]">
              Profil und Kontoeinstellungen
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
