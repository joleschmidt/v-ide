"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import type { User } from "@/types/user";

interface ProfileDetailsProps {
  profile: User;
}

export function ProfileDetails({ profile }: ProfileDetailsProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("de-DE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="border-[#262626] bg-[#171717]">
      <CardHeader>
        <CardTitle className="font-sans text-lg font-semibold text-[#e5e5e5]">
          Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#262626] pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#4a6f4a]" />
            <span className="font-sans text-sm text-[#a3a3a3]">Mitglied seit</span>
          </div>
          <span className="font-mono text-sm text-[#e5e5e5]">
            {formatDate(profile.createdAt)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#4a6f4a]" />
            <span className="font-sans text-sm text-[#a3a3a3]">Letzter Login</span>
          </div>
          <span className="font-mono text-sm text-[#e5e5e5]">
            {formatDate(profile.lastLoginAt)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

