"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AlertCircle } from "lucide-react";

const waiverSchema = z.object({
  liabilityAccepted: z.boolean().refine((val) => val === true, {
    message: "Du musst die Haftungsbedingungen akzeptieren",
  }),
  leaveNoTraceAccepted: z.boolean().refine((val) => val === true, {
    message: "Du musst die Leave No Trace Prinzipien akzeptieren",
  }),
  byotAccepted: z.boolean().refine((val) => val === true, {
    message: "Du musst die BYOT-Compliance bestätigen",
  }),
});

type WaiverFormValues = z.infer<typeof waiverSchema>;

interface WaiverFormProps {
  byotRequired: boolean;
  onSubmit: (data: WaiverFormValues) => void;
}

export const WaiverForm = ({ byotRequired, onSubmit }: WaiverFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<WaiverFormValues>({
    resolver: zodResolver(waiverSchema),
    defaultValues: {
      liabilityAccepted: false,
      leaveNoTraceAccepted: false,
      byotAccepted: false,
    },
  });

  const handleSubmit = async (data: WaiverFormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Legal Notice */}
      <div className="rounded-md border border-[#2a2a2a] bg-[#1a1a1a] p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-[#4a7a4a] flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h3 className="font-mono text-sm font-semibold text-[#e2e8f0]">
              Rechtliche Vereinbarung erforderlich
            </h3>
            <p className="text-xs text-[#a8a8a8] leading-relaxed">
              Diese Plattform vermittelt einen <strong className="text-[#e2e8f0]">Gestattungsvertrag</strong>{" "}
              zwischen dir und dem Grundbesitzer. Du betrittst das Grundstück{" "}
              <strong className="text-[#e2e8f0]">auf eigene Gefahr</strong> ("Betreten auf eigene Gefahr").
            </p>
          </div>
        </div>
      </div>

      {/* Waiver Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Liability */}
          <FormField
            control={form.control}
            name="liabilityAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-[#2a2a2a] p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-[#4a7a4a] data-[state=checked]:bg-[#4a7a4a]"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-mono text-[#e2e8f0]">
                    Haftungsausschluss akzeptieren
                  </FormLabel>
                  <p className="text-xs text-[#a8a8a8]">
                    Ich übernehme die volle Verantwortung für meine Sicherheit. Ich verzichte auf alle Ansprüche gegen den
                    Grundbesitzer für Verletzungen, Verluste oder Schäden, die auf dem Grundstück auftreten.
                  </p>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Leave No Trace */}
          <FormField
            control={form.control}
            name="leaveNoTraceAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-[#2a2a2a] p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-[#4a7a4a] data-[state=checked]:bg-[#4a7a4a]"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-mono text-[#e2e8f0]">
                    Leave No Trace Compliance
                  </FormLabel>
                  <p className="text-xs text-[#a8a8a8]">
                    Ich werde mich an die Leave No Trace Prinzipien halten. Ich werde allen Müll entfernen und den
                    Ort in seinem natürlichen Zustand belassen.
                  </p>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* BYOT */}
          {byotRequired && (
            <FormField
              control={form.control}
              name="byotAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-[#4a7a4a]/30 bg-[#4a7a4a]/5 p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-[#4a7a4a] data-[state=checked]:bg-[#4a7a4a]"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-mono text-[#e2e8f0]">
                      BYOT (Bring Your Own Toilet) Pflicht
                    </FormLabel>
                    <p className="text-xs text-[#a8a8a8]">
                      Dieses Gebiet hat keine sanitären Einrichtungen. Ich bestätige, dass ich eine tragbare sanitäre
                      Lösung mitführe und Abfälle ordnungsgemäß entsorgen werde.
                    </p>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#4a7a4a] font-mono text-sm hover:bg-[#5a8a5a]"
          >
            {isSubmitting ? "Wird verarbeitet..." : "Bedingungen akzeptieren & fortfahren"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

