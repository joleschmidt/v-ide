"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { ProfileStats } from "@/features/profile/components/profile-stats";
import { ProfileDetails } from "@/features/profile/components/profile-details";
import { transformUserRow } from "@/lib/users";
import type { User } from "@supabase/supabase-js";
import type { User as AppUser } from "@/types/user";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      // Check auth
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        router.push("/login?redirect=/profile");
        return;
      }

      setUser(session.user);

      // Load profile
      const { data: profileRow, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error || !profileRow) {
        console.error("Error loading profile:", error);
        router.push("/register");
        return;
      }

      setProfile(transformUserRow(profileRow));
      setLoading(false);
    }

    loadProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#121212]">
        <div className="h-8 w-8 animate-pulse rounded-md bg-[#262626]" />
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="container mx-auto px-4 py-8">
        <ProfileHeader user={user} profile={profile} />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <ProfileStats profile={profile} />
          <ProfileDetails profile={profile} />
        </div>
      </div>
    </div>
  );
}

