"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { ProfileStats } from "@/features/profile/components/profile-stats";
import { ProfileDetails } from "@/features/profile/components/profile-details";
import { SavedSectors } from "@/features/profile/components/saved-sectors";

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    console.log("Profile page auth state:", { loading, hasUser: !!user, hasProfile: !!profile });
    
    // Only redirect if we're sure there's no user (after loading is done)
    if (!loading && !user) {
      console.log("No user found, redirecting to login");
      window.location.href = "/login?redirect=/profile";
      return;
    }
    
    // If user exists but no profile, they might need to complete registration
    if (!loading && user && !profile) {
      console.log("User exists but no profile, redirecting to register");
      window.location.href = "/register";
      return;
    }
  }, [loading, user, profile, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#121212]">
        <div className="h-8 w-8 animate-pulse rounded-md bg-[#262626]" />
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#121212]">
        <div className="h-8 w-8 animate-pulse rounded-md bg-[#262626]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="container mx-auto px-4 py-8">
        <ProfileHeader user={user} profile={profile} />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <ProfileStats profile={profile} />
          <ProfileDetails profile={profile} />
        </div>
        <div className="mt-8">
          <SavedSectors />
        </div>
      </div>
    </div>
  );
}

