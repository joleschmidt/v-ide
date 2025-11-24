"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Shield, User } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import type { User as AppUser } from "@/types/user";

interface ProfileHeaderProps {
  user: SupabaseUser;
  profile: AppUser;
}

export function ProfileHeader({ user, profile }: ProfileHeaderProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "OPERATOR":
        return "Operator";
      case "LANDOWNER":
        return "Grundbesitzer";
      case "BOTH":
        return "Operator & Grundbesitzer";
      default:
        return role;
    }
  };

  return (
    <div className="rounded-md border border-[#262626] bg-[#171717] p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        <Avatar className="h-20 w-20 border-2 border-[#262626]">
          <AvatarImage src={profile.avatarUrl || undefined} alt={profile.displayName} />
          <AvatarFallback className="bg-[#2d4a2d] text-[#e5e5e5] font-mono text-lg">
            {getInitials(profile.displayName)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-sans text-2xl font-semibold text-[#e5e5e5]">
              {profile.displayName}
            </h1>
            {profile.isVerified && (
              <Badge className="bg-[#2d4a2d] text-[#4a6f4a] border-[#4a6f4a]">
                <Shield className="mr-1 h-3 w-3" />
                Verifiziert
              </Badge>
            )}
          </div>
          <p className="font-sans text-sm text-[#a3a3a3] mb-2">{user.email}</p>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-[#262626] text-[#a3a3a3]">
              <User className="mr-1 h-3 w-3" />
              {getRoleLabel(profile.role)}
            </Badge>
          </div>
          {profile.bio && (
            <p className="font-sans text-sm text-[#a3a3a3] mt-3">{profile.bio}</p>
          )}
        </div>
      </div>
    </div>
  );
}

