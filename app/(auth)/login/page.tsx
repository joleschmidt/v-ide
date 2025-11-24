"use client";

import { LoginForm } from "@/features/auth/components/login-form";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isChecking, setIsChecking] = useState(true);
  const redirect = searchParams.get("redirect");

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const redirectTo = redirect ? decodeURIComponent(redirect) : "/";
        // Use window.location for hard navigation to ensure cookies are read
        window.location.href = redirectTo;
      } else {
        setIsChecking(false);
      }
    });
  }, [router, redirect]);

  if (isChecking) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#121212]">
        <div className="h-8 w-8 animate-pulse rounded-md bg-[#262626]" />
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#121212] px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="font-sans text-3xl font-semibold text-[#e5e5e5]">
            Systemzugang
          </h1>
          <p className="mt-2 font-sans text-sm text-[#a3a3a3]">
            Gib deine Zugangsdaten ein, um fortzufahren
          </p>
        </div>

        <div className="rounded-md border border-[#262626] bg-[#171717] p-6">
          <LoginForm redirectTo={redirect ? decodeURIComponent(redirect) : "/"} />
        </div>

        <div className="text-center">
          <p className="font-sans text-sm text-[#a3a3a3]">
            Noch kein Konto?{" "}
            <Link
              href="/register"
              className="font-sans text-sm text-[#4a6f4a] hover:text-[#5a8a5a]"
            >
              Operator registrieren
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
