"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/features/auth/hooks/use-auth";

export function useSavedSectors() {
  const { user } = useAuth();
  const [savedSectorIds, setSavedSectorIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const fetchSavedSectors = useCallback(async () => {
    if (!user) {
      setSavedSectorIds(new Set());
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/saved-sectors", {
        credentials: "include",
      });
      if (response.ok) {
        const { savedSectorIds: ids } = await response.json();
        setSavedSectorIds(new Set(ids || []));
      }
    } catch (error) {
      console.error("Error fetching saved sectors:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchSavedSectors();
  }, [fetchSavedSectors]);

  const toggleSave = useCallback(
    async (sectorId: string): Promise<{ success: boolean; error?: string }> => {
      if (!user) {
        return { success: false, error: "User not authenticated" };
      }

      const isSaved = savedSectorIds.has(sectorId);
      const method = isSaved ? "DELETE" : "POST";
      const url = isSaved
        ? `/api/saved-sectors?sectorId=${sectorId}`
        : "/api/saved-sectors";

      try {
        const response = await fetch(url, {
          method,
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: method === "POST" ? JSON.stringify({ sectorId }) : undefined,
        });

        if (response.ok) {
          const result = await response.json();
          // Optimistically update UI
          if (isSaved) {
            setSavedSectorIds((prev) => {
              const next = new Set(prev);
              next.delete(sectorId);
              return next;
            });
          } else {
            setSavedSectorIds((prev) => {
              const next = new Set(prev);
              next.add(sectorId);
              return next;
            });
          }
          // Refetch to ensure consistency
          await fetchSavedSectors();
          return { success: true };
        } else {
          // Get error message from response
          const errorData = await response.json().catch(() => ({}));
          const errorMessage = errorData.error || errorData.message || `HTTP ${response.status}: ${response.statusText}`;
          console.error("Error toggling save:", {
            status: response.status,
            statusText: response.statusText,
            error: errorMessage,
            sectorId,
          });
          // Refetch on error to restore correct state
          await fetchSavedSectors();
          return { success: false, error: errorMessage };
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Network error";
        console.error("Error toggling save:", error);
        // Refetch on error to restore correct state
        await fetchSavedSectors();
        return { success: false, error: errorMessage };
      }
    },
    [user, savedSectorIds, fetchSavedSectors]
  );

  const isSaved = useCallback(
    (sectorId: string) => savedSectorIds.has(sectorId),
    [savedSectorIds]
  );

  return {
    savedSectorIds,
    isSaved,
    toggleSave,
    loading,
    refetch: fetchSavedSectors,
  };
}

