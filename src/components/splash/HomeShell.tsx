"use client";

import { useState } from "react";
import { SplashScreen } from "@/components/splash/SplashScreen";

export function HomeShell({ children }: { children: React.ReactNode }) {
  const [entered, setEntered] = useState(false);

  return (
    <>
      <SplashScreen onFinish={() => setEntered(true)} />
      <div
        className={entered ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}
        style={{ transition: "opacity 0.5s ease, transform 0.5s ease" }}
      >
        {children}
      </div>
    </>
  );
}
