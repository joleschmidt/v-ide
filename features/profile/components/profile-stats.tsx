"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, TrendingUp, Award, Euro } from "lucide-react";
import type { User } from "@/types/user";

interface ProfileStatsProps {
  profile: User;
}

export function ProfileStats({ profile }: ProfileStatsProps) {
  const isOperator = profile.role === "OPERATOR" || profile.role === "BOTH";
  const isLandowner = profile.role === "LANDOWNER" || profile.role === "BOTH";

  return (
    <Card className="border-[#262626] bg-[#171717]">
      <CardHeader>
        <CardTitle className="font-sans text-lg font-semibold text-[#e5e5e5]">
          Statistiken
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isOperator && (
          <>
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-[#4a6f4a]" />
                <span className="font-sans text-sm text-[#a3a3a3]">Reputation</span>
              </div>
              <span className="font-mono text-sm font-semibold text-[#e5e5e5]">
                {profile.reputationScore || 0}/100
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#4a6f4a]" />
                <span className="font-sans text-sm text-[#a3a3a3]">Abgeschlossene Trips</span>
              </div>
              <span className="font-mono text-sm font-semibold text-[#e5e5e5]">
                {profile.completedTrips || 0}
              </span>
            </div>
          </>
        )}
        {isLandowner && (
          <>
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#4a6f4a]" />
                <span className="font-sans text-sm text-[#a3a3a3]">Sektoren</span>
              </div>
              <span className="font-mono text-sm font-semibold text-[#e5e5e5]">
                {profile.totalSectors || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Euro className="h-4 w-4 text-[#4a6f4a]" />
                <span className="font-sans text-sm text-[#a3a3a3]">Gesamteinnahmen</span>
              </div>
              <span className="font-mono text-sm font-semibold text-[#e5e5e5]">
                €{profile.totalEarnings?.toLocaleString("de-DE") || "0"}
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

