import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#121212] px-4">
      <div className="text-center space-y-6">
        <h1 className="font-sans text-4xl font-semibold text-[#e5e5e5]">
          Gebiet nicht gefunden
        </h1>
        <p className="font-sans text-sm text-[#a3a3a3]">
          Dieses Gebiet existiert nicht oder ist nicht mehr aktiv.
        </p>
        <Button
          variant="ghost"
          asChild
          className="font-sans text-xs text-[#a3a3a3] hover:text-[#e5e5e5] hover:bg-[#262626]"
        >
          <Link href="/sectors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zur Karte
          </Link>
        </Button>
      </div>
    </div>
  );
}

