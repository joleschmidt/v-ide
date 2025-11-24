"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { TACTICAL_COPY } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

const loginSchema = z.object({
  email: z.string().email("Ungültiges E-Mail-Format"),
  password: z.string().min(8, "Passwort muss mindestens 8 Zeichen lang sein"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  redirectTo?: string;
}

export const LoginForm = ({ redirectTo }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        setError(authError.message);
        setIsLoading(false);
        return;
      }

      // Force a hard navigation to ensure cookies are sent to server
      const targetUrl = redirectTo || "/command";
      router.refresh();
      router.push(targetUrl);
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "Ein unerwarteter Fehler ist aufgetreten");
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-mono text-xs text-[#a8a8a8]">
                E-Mail
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="operator@voide.com"
                  className="border-[#2a2a2a] bg-[#1a1a1a] font-mono text-sm"
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
              <FormLabel className="font-mono text-xs text-[#a8a8a8]">
                Passwort
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="••••••••"
                  className="border-[#2a2a2a] bg-[#1a1a1a] font-mono text-sm"
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
          {isLoading ? "Wird verarbeitet..." : TACTICAL_COPY.LOGIN}
        </Button>
      </form>
    </Form>
  );
};

