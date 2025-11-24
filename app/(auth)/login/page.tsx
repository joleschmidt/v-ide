import { LoginForm } from "@/features/auth/components/login-form";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { redirect?: string };
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(searchParams.redirect || "/command");
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
          <LoginForm redirectTo={searchParams.redirect || "/command"} />
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

