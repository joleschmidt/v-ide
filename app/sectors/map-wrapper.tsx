"use client";

import { useEffect } from "react";

export function MapWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Prevent body scrolling on Safari
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.height = "100vh";
    document.documentElement.style.height = "100vh";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.height = "";
    };
  }, []);

  return <>{children}</>;
}

