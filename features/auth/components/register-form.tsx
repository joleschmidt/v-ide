"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/lib/supabase/client";

const registerSchema = z.object({
  email: z.string().email("Ungültiges E-Mail-Format"),
  password: z.string().min(8, "Passwort muss mindestens 8 Zeichen lang sein"),
  displayName: z.string().min(2, "Anzeigename muss mindestens 2 Zeichen lang sein"),
  role: z.enum(["OPERATOR", "LANDOWNER", "BOTH"]).default("OPERATOR"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  redirectTo?: string;
}

export const RegisterForm = ({ redirectTo }: RegisterFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      displayName: "",
      role: "OPERATOR",
    },
  });

  const handleSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      // Sign up with Supabase Auth
      // Store metadata so the trigger can use it
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            display_name: data.displayName,
            displayName: data.displayName, // Also store as camelCase for compatibility
            role: data.role,
          },
        },
      });

      if (authError) {
        // Handle rate limiting and other auth errors
        if (authError.message.includes("rate limit") || authError.message.includes("48 seconds")) {
          setError("Zu viele Anfragen. Bitte warte einen Moment und versuche es erneut.");
        } else {
          setError(authError.message);
        }
        return;
      }

      if (!authData.user) {
        setError("Registrierung fehlgeschlagen");
        return;
      }

      // Create user profile (trigger may have already created it)
      const { error: profileError } = await supabase.from("users").insert({
        id: authData.user.id,
        email: data.email,
        display_name: data.displayName,
        role: data.role,
      });

      if (profileError) {
        // Handle RLS and other database errors
        if (profileError.message.includes("row-level security")) {
          setError("Registrierung fehlgeschlagen. Bitte kontaktiere den Support.");
        } else if (profileError.code === "23505") {
          // Unique constraint violation - profile already exists (created by trigger)
          // This is fine, the trigger already created the profile
          console.log("Profile already exists, continuing...");
        } else {
          setError(profileError.message);
          return;
        }
      }

      router.push(redirectTo || "/command");
      router.refresh();
    } catch (err) {
      setError("Ein unerwarteter Fehler ist aufgetreten");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-sans text-xs text-[#a3a3a3]">
                Anzeigename
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Operator-Name"
                  className="border-[#262626] bg-[#171717] font-sans text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-sans text-xs text-[#a3a3a3]">
                E-Mail
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="operator@voide.com"
                  className="border-[#262626] bg-[#171717] font-sans text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-sans text-xs text-[#a3a3a3]">
                Passwort
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="••••••••"
                  className="border-[#262626] bg-[#171717] font-sans text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3">
            <p className="font-sans text-xs text-red-400">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#2d4a2d] font-sans text-xs hover:bg-[#3d5a3d]"
        >
          {isLoading ? "Wird verarbeitet..." : "Operator registrieren"}
        </Button>
      </form>
    </Form>
  );
};

