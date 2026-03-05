"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ScrollBackground from "@/components/scroll-background";
import Particles from "@/components/ui/particles";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");
  const isTools = pathname?.startsWith("/tools");
  const isLiffCommunity = pathname === "/liff-community";
  const isMission = pathname === "/mission";

  if (isStudio || isTools || isLiffCommunity || isMission) {
    return <>{children}</>;
  }

  return (
    <>
      <ScrollBackground />
      <main className="relative z-0 w-full pt-0">
        {children}
      </main>
      <Particles
        className="fixed inset-0 z-[100] pointer-events-none"
        quantity={150}
        staticity={25}
        ease={40}
      />
    </>
  );
}
