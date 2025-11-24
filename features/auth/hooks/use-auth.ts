"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { User as AppUser } from "@/types/user";
import { transformUserRow } from "@/lib/users";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId);
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        // Profile doesn't exist yet - this can happen right after registration
        if (error.code === "PGRST116") {
          console.warn("Profile not found for user, may need to complete registration");
          setProfile(null);
        } else {
          console.error("Error fetching profile:", error.code, error.message);
          // Don't throw, just set profile to null
          setProfile(null);
        }
      } else if (data) {
        console.log("Profile fetched successfully");
        setProfile(transformUserRow(data));
      } else {
        console.warn("No profile data returned");
        setProfile(null);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setProfile(null);
    } finally {
      // Always set loading to false, even if there was an error
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;

    // Set a timeout to prevent infinite loading
    timeoutId = setTimeout(() => {
      if (mounted) {
        console.warn("Auth loading timeout - forcing loading to false");
        setLoading(false);
      }
    }, 3000); // 3 second timeout

    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!mounted) return;
      
      if (error) {
        console.error("Error getting session:", error);
        setLoading(false);
        clearTimeout(timeoutId);
        return;
      }

      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id).finally(() => {
          if (mounted) {
            clearTimeout(timeoutId);
          }
        });
      } else {
        setLoading(false);
        clearTimeout(timeoutId);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      console.log("Auth state changed:", event, session?.user?.id);
      setUser(session?.user ?? null);
      if (session?.user) {
        setLoading(true); // Set loading when auth state changes
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
      clearTimeout(timeoutId);
    });

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return {
    user,
    profile,
    loading,
    signOut,
  };
}

