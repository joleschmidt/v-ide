"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => router.back()}
      className="font-sans text-xs text-[#a3a3a3] hover:text-[#e5e5e5] hover:bg-[#262626]"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Zurück
    </Button>
  );
};

