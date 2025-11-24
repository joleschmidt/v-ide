"use client";

import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useSavedSectors } from "../hooks/use-saved-sectors";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

interface SaveButtonProps {
  sectorId: string;
  variant?: "default" | "ghost" | "icon";
  size?: "sm" | "default" | "lg";
  className?: string;
}

export function SaveButton({
  sectorId,
  variant = "ghost",
  size = "sm",
  className,
}: SaveButtonProps) {
  const { isSaved, toggleSave } = useSavedSectors();
  const { user } = useAuth();
  const router = useRouter();
  const [isToggling, setIsToggling] = useState(false);
  const saved = isSaved(sectorId);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Prevent navigation if inside a Link
    if (e.nativeEvent) {
      e.nativeEvent.stopImmediatePropagation();
    }

    if (!user) {
      toast({
        title: "Anmeldung erforderlich",
        description: "Bitte melde dich an, um Gebiete zu speichern.",
        variant: "default",
      });
      router.push(`/login?redirect=/sectors/${sectorId}`);
      return;
    }

    setIsToggling(true);
    try {
      const result = await toggleSave(sectorId);
      if (result.success) {
        toast({
          title: saved ? "Entfernt" : "Gespeichert",
          description: saved 
            ? "Gebiet wurde von deinen gespeicherten Gebieten entfernt." 
            : "Gebiet wurde zu deinen gespeicherten Gebieten hinzugefügt.",
          variant: "default",
        });
      } else {
        const errorMsg = result.error || "Unbekannter Fehler";
        console.error("Failed to save sector:", errorMsg);
        toast({
          title: "Fehler",
          description: errorMsg.includes("migration") || errorMsg.includes("Table")
            ? "Die Datenbank-Migration wurde noch nicht ausgeführt. Bitte kontaktiere den Support."
            : `Das Gebiet konnte nicht gespeichert werden: ${errorMsg}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving sector:", error);
      toast({
        title: "Fehler",
        description: error instanceof Error ? error.message : "Ein Fehler ist aufgetreten. Bitte versuche es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={isToggling}
      className={className}
      aria-label={saved ? "Gespeichert entfernen" : "Speichern"}
    >
      {saved ? (
        <BookmarkCheck className="h-4 w-4 text-[#4a6f4a]" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
    </Button>
  );
}

