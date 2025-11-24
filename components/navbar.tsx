"use client";

import { Button } from "@/components/ui/button";
import { TACTICAL_COPY } from "@/lib/constants";
import { LogIn, Map, User, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/use-auth";

export function Navbar() {
  const pathname = usePathname();
  const { user, profile, signOut, loading } = useAuth();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-[#262626] bg-[#171717]/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-sans text-lg font-semibold text-[#e5e5e5]">
              VØIDE
            </span>
          </Link>

          {/* Navigation Links - Left Aligned */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/sectors"
              className={`font-sans text-sm transition-colors ${isActive("/sectors")
                ? "text-[#4a6f4a]"
                : "text-[#a3a3a3] hover:text-[#e5e5e5]"
                }`}
            >
              <Map className="mr-2 inline h-4 w-4" />
              Gebietssuche
            </Link>
          </div>
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="h-8 w-8 animate-pulse rounded-md bg-[#262626]" />
          ) : user ? (
            <>
              {profile?.role === "LANDOWNER" || profile?.role === "BOTH" ? (
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="font-sans text-xs text-[#a3a3a3] hover:text-[#e5e5e5] hover:bg-[#262626]"
                >
                  <Link href="/command">
                    Kommandostelle
                  </Link>
                </Button>
              ) : null}
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="font-sans text-xs text-[#a3a3a3] hover:text-[#e5e5e5] hover:bg-[#262626]"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {TACTICAL_COPY.LOGOUT}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="font-sans text-xs text-[#a3a3a3] hover:text-[#e5e5e5] hover:bg-[#262626]"
              >
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  {TACTICAL_COPY.LOGIN}
                </Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="bg-[#2d4a2d] font-sans text-xs hover:bg-[#3d5a3d]"
              >
                <Link href="/register">
                  <User className="mr-2 h-4 w-4" />
                  Registrieren
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

